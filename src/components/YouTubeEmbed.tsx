import { SEO } from "@/lib/seo";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  className?: string;
};

const buildEmbedUrl = (videoId: string) => {
  const origin = typeof window !== "undefined" ? window.location.origin : SEO.siteUrl;
  const params = new URLSearchParams({
    enablejsapi: "1",
    rel: "0",
    modestbranding: "1",
    origin,
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

const YouTubeEmbed = ({ videoId, title, className = "" }: YouTubeEmbedProps) => {
  return (
    <div className={`overflow-hidden rounded-sm border border-border bg-card shadow-[var(--shadow-soft)] ${className}`.trim()}>
      <div className="aspect-video w-full">
        <iframe
          src={buildEmbedUrl(videoId)}
          title={title}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          data-youtube-track="true"
          data-youtube-video-id={videoId}
          data-video-title={title}
          data-placement="blog_videos_page"
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed;
