import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, PlayCircle, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { videoLibrary } from "@/data/videos";
import { applyJsonLd, applySeoMeta, SEO } from "@/lib/seo";

const BlogVideos = () => {
  const featuredVideo = videoLibrary[0];

  useEffect(() => {
    const title = "Videos de Direito Militar | Aguiar Filgueiras Advocacia";
    const description =
      "Biblioteca de videos do escritorio Aguiar Filgueiras Advocacia com conteudos sobre Direito Militar, defesa disciplinar, processo administrativo e orientacao juridica para militares.";

    applySeoMeta({
      title,
      description,
      canonicalPath: "/blog/videos",
      keywords: [
        "videos direito militar",
        "advogado militar youtube",
        "direito militar video",
        "punicao disciplinar militar video",
        "processo administrativo militar video",
      ],
      image: featuredVideo?.thumbnailUrl || SEO.defaultImage,
      imageAlt: featuredVideo?.title || title,
    });

    applyJsonLd("blog-videos-jsonld", [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        url: `${SEO.siteUrl}/blog/videos/`,
        description,
        isPartOf: {
          "@type": "Blog",
          name: "Blog de Direito Militar - Aguiar Filgueiras Advocacia",
          url: `${SEO.siteUrl}/blog/`,
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${SEO.siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SEO.siteUrl}/blog/` },
          { "@type": "ListItem", position: 3, name: "Videos", item: `${SEO.siteUrl}/blog/videos/` },
        ],
      },
      ...videoLibrary.map((video) => ({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: video.title,
        description: video.description,
        thumbnailUrl: video.thumbnailUrl,
        embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
        contentUrl: video.youtubeUrl,
        url: `${SEO.siteUrl}/blog/videos/#${video.slug}`,
        publisher: {
          "@type": "LegalService",
          name: SEO.siteName,
          url: SEO.siteUrl,
        },
      })),
    ]);
  }, [featuredVideo]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border/70 bg-cream/40 py-6">
          <div className="container mx-auto max-w-6xl px-6">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/" className="hover:text-accent">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/blog" className="hover:text-accent">
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-primary">Videos</li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="bg-primary py-16 text-primary-foreground sm:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              <PlayCircle className="h-4 w-4" />
              Videos do canal
            </span>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-end">
              <div>
                <h1 className="max-w-3xl font-heading text-3xl font-bold leading-tight sm:text-5xl">
                  Conteudo em video sobre Direito Militar
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-gold-light/80">
                  Nesta area, reunimos videos do canal Aguiar Filgueiras Advocacia para facilitar o acesso a
                  orientacoes iniciais sobre direitos, punicoes disciplinares, defesa administrativa e temas
                  relevantes da carreira militar.
                </p>
              </div>
              <div className="rounded-sm border border-gold/20 bg-primary-foreground/5 p-5">
                <p className="text-sm font-semibold text-gold">Video em destaque</p>
                <h2 className="mt-3 font-heading text-xl font-bold leading-snug text-primary-foreground">
                  {featuredVideo.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gold-light/80">{featuredVideo.intro}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
              <ArrowLeft className="h-4 w-4" />
              Voltar para o blog
            </Link>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
              {videoLibrary.map((video) => (
                <article
                  key={video.id}
                  id={video.slug}
                  className="rounded-sm border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="rounded-sm bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      {video.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Shield className="h-4 w-4" />
                      {video.theme}
                    </span>
                    {video.publishedDate ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {video.publishedDate}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mt-5 font-heading text-2xl font-bold leading-tight text-primary sm:text-3xl">
                    {video.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">{video.intro}</p>

                  <YouTubeEmbed videoId={video.youtubeId} title={video.title} className="mt-6" />

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-placement="blog_videos_page"
                      data-content-type="youtube_video_link"
                      className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
                    >
                      Assistir no YouTube
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <Link
                      to="/blog"
                      className="inline-flex items-center gap-2 rounded-sm border border-accent px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Ver outros conteudos do blog
                    </Link>
                  </div>
                </article>
              ))}

              <aside className="space-y-6">
                <div className="rounded-sm border border-border bg-cream p-6">
                  <h2 className="font-heading text-xl font-bold text-primary">O que voce encontra aqui</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <li>Videos com orientacao inicial sobre Direito Militar.</li>
                    <li>Temas ligados a processo disciplinar, defesa e direitos do militar.</li>
                    <li>Links diretos para o canal do YouTube e para o blog do escritorio.</li>
                  </ul>
                </div>

                <div className="rounded-sm border border-border bg-background p-6">
                  <h2 className="font-heading text-xl font-bold text-primary">Estrutura reutilizavel</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Esta pagina ja esta preparada para receber novos videos com titulo, descricao,
                    tema, categoria, thumbnail e link direto para o YouTube.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogVideos;
