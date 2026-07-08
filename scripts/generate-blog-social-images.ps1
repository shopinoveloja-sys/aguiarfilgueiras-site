$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$repoRoot = 'C:\Users\PICHAU\aguiarfilgueiras-site'
$postsPath = Join-Path $repoRoot 'src\data\blogPosts.json'
$outputDir = Join-Path $repoRoot 'public\social'
$founderPath = Join-Path $repoRoot 'src\assets\founder.jpg'
$logoPath = Join-Path $repoRoot 'src\assets\aguiar-filgueiras-logo.png'

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$posts = Get-Content $postsPath -Raw | ConvertFrom-Json
$founderImage = [System.Drawing.Image]::FromFile($founderPath)
$logoImage = [System.Drawing.Image]::FromFile($logoPath)

$dimensions = @(
  @{ Channel = 'facebook'; Width = 1200; Height = 630; TitleSize = 36; ExcerptSize = 17; QuoteSize = 16 },
  @{ Channel = 'linkedin'; Width = 1200; Height = 627; TitleSize = 34; ExcerptSize = 16; QuoteSize = 15 },
  @{ Channel = 'gmb'; Width = 1200; Height = 900; TitleSize = 42; ExcerptSize = 21; QuoteSize = 18 }
)

function New-Brush([string]$hex) {
  return New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
}

function New-PenColor([string]$hex, [float]$width) {
  return New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($hex)), $width
}

function Get-WrappedLines {
  param(
    [System.Drawing.Graphics]$Graphics,
    [string]$Text,
    [System.Drawing.Font]$Font,
    [float]$MaxWidth,
    [int]$MaxLines
  )

  $words = ($Text -replace '\s+', ' ').Trim().Split(' ')
  $lines = New-Object System.Collections.Generic.List[string]
  $current = ''

  foreach ($word in $words) {
    $candidate = if ([string]::IsNullOrWhiteSpace($current)) { $word } else { "$current $word" }
    $size = $Graphics.MeasureString($candidate, $Font)
    if ($size.Width -le $MaxWidth) {
      $current = $candidate
      continue
    }

    if (-not [string]::IsNullOrWhiteSpace($current)) {
      $lines.Add($current)
      if ($lines.Count -ge $MaxLines) { break }
    }
    $current = $word
  }

  if ($lines.Count -lt $MaxLines -and -not [string]::IsNullOrWhiteSpace($current)) {
    $lines.Add($current)
  }

  if ($lines.Count -gt $MaxLines) {
    $lines = [System.Collections.Generic.List[string]]($lines[0..($MaxLines - 1)])
  }

  if ($lines.Count -eq $MaxLines) {
    $last = $lines[$lines.Count - 1]
    if ($last.Length -gt 3 -and $words.Count -gt 0) {
      while ($Graphics.MeasureString("$last...", $Font).Width -gt $MaxWidth -and $last.Length -gt 10) {
        $last = $last.Substring(0, $last.Length - 1).TrimEnd()
      }
      if ($last -ne $lines[$lines.Count - 1]) {
        $lines[$lines.Count - 1] = "$last..."
      }
    }
  }

  return $lines
}

function Save-Jpeg {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [string]$Path
  )

  $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $params = New-Object System.Drawing.Imaging.EncoderParameters 1
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 88L
  $Bitmap.Save($Path, $encoder, $params)
  $params.Dispose()
}

foreach ($post in $posts) {
  foreach ($spec in $dimensions) {
    $bitmap = New-Object System.Drawing.Bitmap $spec.Width, $spec.Height
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $bgBrush = New-Brush '#0f1c33'
    $panelBrush = New-Brush '#152540'
    $goldBrush = New-Brush '#d6aa54'
    $textBrush = New-Brush '#f2f1eb'
    $mutedBrush = New-Brush '#d8dce7'
    $quoteBg = New-Brush '#f4efe4'
    $quoteText = New-Brush '#4d4d4d'
    $borderPen = New-PenColor '#d6aa54' 2

    $graphics.FillRectangle($bgBrush, 0, 0, $spec.Width, $spec.Height)

    $leftMargin = [int]($spec.Width * 0.07)
    $topMargin = [int]($spec.Height * 0.09)
    $rightImageWidth = [int]($spec.Width * 0.28)
    $contentWidth = $spec.Width - $leftMargin - $rightImageWidth - 110
    $imageX = $spec.Width - $rightImageWidth - 55
    $imageY = [int]($spec.Height * 0.16)
    $imageHeight = [int]($spec.Height * 0.62)

    $graphics.FillRectangle($panelBrush, 32, 32, $spec.Width - 64, $spec.Height - 64)
    $graphics.DrawRectangle($borderPen, 32, 32, $spec.Width - 65, $spec.Height - 65)

    $logoSize = [int]($spec.Height * 0.12)
    $graphics.DrawImage($logoImage, $leftMargin, $topMargin - 5, $logoSize, $logoSize)

    $eyebrowFont = New-Object System.Drawing.Font 'Segoe UI Semibold', ([float]([Math]::Max(13, $spec.TitleSize * 0.38))), ([System.Drawing.FontStyle]::Regular)
    $titleFont = New-Object System.Drawing.Font 'Georgia', ([float]$spec.TitleSize), ([System.Drawing.FontStyle]::Bold)
    $excerptFont = New-Object System.Drawing.Font 'Segoe UI', ([float]$spec.ExcerptSize), ([System.Drawing.FontStyle]::Regular)
    $quoteFont = New-Object System.Drawing.Font 'Segoe UI Italic', ([float]$spec.QuoteSize), ([System.Drawing.FontStyle]::Regular)
    $footerFont = New-Object System.Drawing.Font 'Segoe UI Semibold', 15, ([System.Drawing.FontStyle]::Regular)

    $graphics.DrawString('Aguiar Filgueiras Advocacia', $eyebrowFont, $goldBrush, $leftMargin + $logoSize + 16, $topMargin + 6)
    $graphics.DrawString('Direito Militar', $eyebrowFont, $goldBrush, $leftMargin, $topMargin + $logoSize + 20)

    $titleLines = Get-WrappedLines -Graphics $graphics -Text $post.title -Font $titleFont -MaxWidth $contentWidth -MaxLines 3
    $currentY = $topMargin + $logoSize + 62
    foreach ($line in $titleLines) {
      $graphics.DrawString($line, $titleFont, $textBrush, $leftMargin, $currentY)
      $currentY += ($spec.TitleSize + 12)
    }

    $excerptLines = Get-WrappedLines -Graphics $graphics -Text $post.excerpt -Font $excerptFont -MaxWidth $contentWidth -MaxLines 3
    $currentY += 10
    foreach ($line in $excerptLines) {
      $graphics.DrawString($line, $excerptFont, $mutedBrush, $leftMargin, $currentY)
      $currentY += ($spec.ExcerptSize + 10)
    }

    $quoteHeight = [int]($spec.Height * 0.18)
    $quoteY = [Math]::Min($spec.Height - $quoteHeight - 78, $currentY + 22)
    $graphics.FillRectangle($quoteBg, $leftMargin, $quoteY, $contentWidth, $quoteHeight)
    $graphics.FillRectangle($goldBrush, $leftMargin, $quoteY, 6, $quoteHeight)

    $commentText = '"' + $post.carlosComment + '"'
    $quoteLines = Get-WrappedLines -Graphics $graphics -Text $commentText -Font $quoteFont -MaxWidth ($contentWidth - 34) -MaxLines 3
    $quoteTextY = $quoteY + 18
    foreach ($line in $quoteLines) {
      $graphics.DrawString($line, $quoteFont, $quoteText, $leftMargin + 18, $quoteTextY)
      $quoteTextY += ($spec.QuoteSize + 9)
    }

    $graphics.DrawString('aguiarfilgueiras.com.br', $footerFont, $textBrush, $leftMargin, $spec.Height - 72)

    $imageRect = New-Object System.Drawing.Rectangle $imageX, $imageY, $rightImageWidth, $imageHeight
    $graphics.DrawImage($founderImage, $imageRect)
    $graphics.DrawRectangle((New-PenColor '#ffffff' 3), $imageX, $imageY, $rightImageWidth, $imageHeight)

    $outPath = Join-Path $outputDir ($post.slug + '-' + $spec.Channel + '.jpg')
    Save-Jpeg -Bitmap $bitmap -Path $outPath

    $borderPen.Dispose()
    $bgBrush.Dispose()
    $panelBrush.Dispose()
    $goldBrush.Dispose()
    $textBrush.Dispose()
    $mutedBrush.Dispose()
    $quoteBg.Dispose()
    $quoteText.Dispose()
    $eyebrowFont.Dispose()
    $titleFont.Dispose()
    $excerptFont.Dispose()
    $quoteFont.Dispose()
    $footerFont.Dispose()
    $graphics.Dispose()
    $bitmap.Dispose()
  }
}

$founderImage.Dispose()
$logoImage.Dispose()

Write-Host ('Generated social images for ' + $posts.Count + ' posts in ' + $outputDir)
