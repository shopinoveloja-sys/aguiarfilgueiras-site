import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, MessageSquareQuote } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import founderImg from "@/assets/founder.jpg";
import { getBlogPostBySlug, getRelatedServiceSlugsForPost } from "@/data/blogPosts";
import { getServicePageBySlug } from "@/data/servicePages";
import { trackEvent } from "@/lib/analytics";

const SITE_URL = "https://aguiarfilgueiras.com.br";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);
  const relatedServices = getRelatedServiceSlugsForPost(slug)
    .map((serviceSlug) => getServicePageBySlug(serviceSlug))
    .filter(Boolean);

  useEffect(() => {
    if (!post) {
      document.title = "Artigo nao encontrado | Aguiar Filgueiras Advocacia";
      return;
    }

    const canonicalUrl = `${SITE_URL}/blog/${post.slug}/`;
    const seoTitle = post.seoTitle || `${post.title} | Aguiar Filgueiras Advocacia`;
    const seoDescription = post.seoDescription || post.excerpt;
    const keywords = post.keywords?.join(", ") || post.category;
    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: seoDescription,
      mainEntityOfPage: canonicalUrl,
      url: canonicalUrl,
      datePublished: post.date,
      dateModified: post.date,
      articleSection: post.category,
      keywords,
      author: {
        "@type": "Person",
        name: "Carlos Filgueiras",
        url: `${SITE_URL}/#fundador`,
        jobTitle: "Advogado especializado em Direito Militar",
        sameAs: [
          "https://www.instagram.com/carlosfilgueiras.adv",
          "https://www.linkedin.com/in/carlos-filgueiras-992396154/",
          "https://www.facebook.com/carlosfilgueiras.adv",
        ],
      },
      publisher: {
        "@type": "LegalService",
        name: "Aguiar Filgueiras Advocacia",
        url: SITE_URL,
      },
    };

    const setMeta = (selector: string, attribute: "content" | "href", value: string) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

      if (!element) {
        element = selector.startsWith("link")
          ? document.createElement("link")
          : document.createElement("meta");

        if (selector.includes("canonical")) {
          element.setAttribute("rel", "canonical");
        }
        if (selector.includes("description")) {
          element.setAttribute("name", "description");
        }
        if (selector.includes("keywords")) {
          element.setAttribute("name", "keywords");
        }
        if (selector.includes("og:")) {
          element.setAttribute("property", selector.match(/og:[^'"]+/)?.[0] || "");
        }
        if (selector.includes("twitter:")) {
          element.setAttribute("name", selector.match(/twitter:[^'"]+/)?.[0] || "");
        }

        document.head.appendChild(element);
      }

      element.setAttribute(attribute, value);
    };

    document.title = seoTitle;
    setMeta("meta[name='description']", "content", seoDescription);
    setMeta("meta[name='keywords']", "content", keywords);
    setMeta("link[rel='canonical']", "href", canonicalUrl);
    setMeta("meta[property='og:type']", "content", "article");
    setMeta("meta[property='og:title']", "content", seoTitle);
    setMeta("meta[property='og:description']", "content", seoDescription);
    setMeta("meta[property='og:url']", "content", canonicalUrl);
    setMeta("meta[property='og:image']", "content", DEFAULT_IMAGE);
    setMeta("meta[name='twitter:card']", "content", "summary_large_image");
    setMeta("meta[name='twitter:title']", "content", seoTitle);
    setMeta("meta[name='twitter:description']", "content", seoDescription);
    setMeta("meta[name='twitter:image']", "content", DEFAULT_IMAGE);

    const scriptId = "blog-article-jsonld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(articleJsonLd);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-24">
          <Link to="/#blog" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o blog
          </Link>
          <h1 className="mt-8 font-heading text-3xl font-bold text-primary">
            Artigo nao encontrado
          </h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-4xl px-6 py-16">
        <Link to="/#blog" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
          <ArrowLeft className="h-4 w-4" />
          Voltar para o blog
        </Link>

        <article className="mt-10">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="rounded-sm bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
          </div>

          <h1 className="mt-6 font-heading text-3xl font-bold leading-tight text-primary sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="my-10 rounded-sm border-l-2 border-accent/50 bg-cream p-6">
            <div className="mb-3 flex items-center gap-3">
              <img
                src={founderImg}
                alt="Carlos Filgueiras"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <span className="block text-sm font-semibold text-primary">Carlos Filgueiras</span>
                <span className="text-xs text-muted-foreground">Fundador</span>
              </div>
              <MessageSquareQuote className="ml-auto h-5 w-5 text-accent/60" />
            </div>
            <p className="text-sm italic leading-relaxed text-muted-foreground">
              "{post.carlosComment}"
            </p>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-foreground/80">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {relatedServices.length > 0 && (
            <section className="mt-12 rounded-sm border border-border bg-cream p-6">
              <h2 className="font-heading text-xl font-bold text-primary">
                Orientacoes relacionadas
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {relatedServices.map((service) => (
                  <Link
                    key={service!.slug}
                    to={`/${service!.slug}`}
                    className="rounded-sm border border-border bg-background px-4 py-3 text-sm font-semibold text-accent transition-colors hover:border-accent"
                  >
                    {service!.title}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 border-t border-border pt-8">
            <Link
              to="/#contato"
              onClick={() =>
                post &&
                trackEvent("blog_cta_whatsapp", {
                  cta_location: "blog_post_footer",
                  article_slug: post.slug,
                  article_category: post.category,
                })
              }
              className="inline-flex items-center rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
            >
              Falar com o escritorio
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
