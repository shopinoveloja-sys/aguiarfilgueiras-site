import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Clock, FileText, HelpCircle, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getServicePageBySlug } from "@/data/servicePages";
import { blogPosts } from "@/data/blogPosts";
import { trackEvent } from "@/lib/analytics";
import servicePageGuides from "@/data/servicePageGuides.json";

const SITE_URL = "https://aguiarfilgueiras.com.br";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const relatedBlogByService: Record<string, string[]> = {
  "direito-penal-militar": ["reforma-codigo-penal-militar"],
  "defesa-em-ipm": ["reforma-codigo-penal-militar"],
  "punicao-disciplinar-militar": ["transgressoes-disciplinares-ampla-defesa"],
  "processo-administrativo-militar": ["transgressoes-disciplinares-ampla-defesa"],
  "pensao-militar": ["pensao-militar-direitos-dependentes"],
  "abate-teto-pensao-militar": ["pensao-militar-direitos-dependentes"],
};

type ServicePageProps = {
  slug?: string;
};

const ServicePage = ({ slug: fixedSlug }: ServicePageProps) => {
  const { slug } = useParams();
  const page = getServicePageBySlug(fixedSlug || slug);
  const guide = page ? servicePageGuides[page.slug as keyof typeof servicePageGuides] : null;
  const relatedPosts = (page ? relatedBlogByService[page.slug] || [] : [])
    .map((postSlug) => blogPosts.find((post) => post.slug === postSlug))
    .filter(Boolean);

  useEffect(() => {
    if (!page) {
      document.title = "Pagina nao encontrada | Aguiar Filgueiras Advocacia";
      return;
    }

    const canonicalUrl = `${SITE_URL}/${page.slug}/`;
    document.title = page.seoTitle;

    const setMeta = (selector: string, attribute: "content" | "href", value: string) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

      if (!element) {
        element = selector.startsWith("link")
          ? document.createElement("link")
          : document.createElement("meta");

        if (selector.includes("canonical")) element.setAttribute("rel", "canonical");
        if (selector.includes("description")) element.setAttribute("name", "description");
        if (selector.includes("keywords")) element.setAttribute("name", "keywords");
        if (selector.includes("og:")) element.setAttribute("property", selector.match(/og:[^'"]+/)?.[0] || "");
        if (selector.includes("twitter:")) element.setAttribute("name", selector.match(/twitter:[^'"]+/)?.[0] || "");

        document.head.appendChild(element);
      }

      element.setAttribute(attribute, value);
    };

    setMeta("meta[name='description']", "content", page.seoDescription);
    setMeta("meta[name='keywords']", "content", page.keywords.join(", "));
    setMeta("link[rel='canonical']", "href", canonicalUrl);
    setMeta("meta[property='og:type']", "content", "website");
    setMeta("meta[property='og:title']", "content", page.seoTitle);
    setMeta("meta[property='og:description']", "content", page.seoDescription);
    setMeta("meta[property='og:url']", "content", canonicalUrl);
    setMeta("meta[property='og:image']", "content", DEFAULT_IMAGE);
    setMeta("meta[name='twitter:card']", "content", "summary_large_image");
    setMeta("meta[name='twitter:title']", "content", page.seoTitle);
    setMeta("meta[name='twitter:description']", "content", page.seoDescription);
    setMeta("meta[name='twitter:image']", "content", DEFAULT_IMAGE);

    const scriptId = "service-page-jsonld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const legalServiceSchema = {
      "@context": "https://schema.org",
      "@type": "LegalService",
      name: "Aguiar Filgueiras Advocacia",
      url: canonicalUrl,
      description: page.seoDescription,
      areaServed: "Brasil",
      serviceType: page.title,
      telephone: "+55-61-98183-3328",
      founder: {
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
      address: {
        "@type": "PostalAddress",
        streetAddress: "Setor B Norte, CNB 3, Lote 12",
        addressLocality: "Brasilia",
        addressRegion: "DF",
        postalCode: "72115-035",
        addressCountry: "BR",
      },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.title,
          item: canonicalUrl,
        },
      ],
    };

    const faqSchema = guide?.faqs?.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

    script.textContent = JSON.stringify(
      faqSchema ? [legalServiceSchema, breadcrumbSchema, faqSchema] : [legalServiceSchema, breadcrumbSchema],
    );
  }, [page, guide]);

  if (!page) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-24">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o inicio
          </Link>
          <h1 className="mt-8 font-heading text-3xl font-bold text-primary">Pagina nao encontrada</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-primary py-16 text-primary-foreground sm:py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <Link to="/#areas" className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
              <ArrowLeft className="h-4 w-4" />
              Areas de atuacao
            </Link>
            <span className="mt-10 block text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {page.eyebrow}
            </span>
            <h1 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-gold-light/80 sm:text-lg">
              {page.intro}
            </p>
            <a
              href="https://wa.me/5561981833328"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", {
                  cta_location: "service_hero",
                  service_slug: page.slug,
                })
              }
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
            >
              <Phone className="h-4 w-4" />
              Falar com advogado militar
            </a>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary">Quando procurar orientacao juridica</h2>
              <div className="mt-6 grid gap-4">
                {page.problems.map((item) => (
                  <div key={item} className="flex gap-3 rounded-sm border border-border bg-card p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>

              <h2 className="mt-12 font-heading text-2xl font-bold text-primary">Como conduzimos a defesa</h2>
              <div className="mt-6 space-y-4">
                {page.approach.map((item, index) => (
                  <div key={item} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-foreground/80">{item}</p>
                  </div>
                ))}
              </div>

              {guide && (
                <>
                  <div className="mt-12 grid gap-6 md:grid-cols-2">
                    <section className="rounded-sm border border-border bg-card p-6">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-accent" />
                        <h2 className="font-heading text-xl font-bold text-primary">Prazos e primeiros passos</h2>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{guide.deadline}</p>
                    </section>

                    <section className="rounded-sm border border-border bg-card p-6">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-accent" />
                        <h2 className="font-heading text-xl font-bold text-primary">Quando falar com advogado</h2>
                      </div>
                      <ul className="mt-4 space-y-3">
                        {guide.whenToCall.map((item) => (
                          <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <section className="mt-12">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-accent" />
                      <h2 className="font-heading text-2xl font-bold text-primary">Riscos de agir sem orientacao</h2>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {guide.risks.map((item) => (
                        <div key={item} className="rounded-sm border border-border bg-card p-4">
                          <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="mt-12 rounded-sm bg-primary p-6 text-primary-foreground sm:p-8">
                    <h2 className="font-heading text-2xl font-bold">{guide.ctaTitle}</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gold-light/85">{guide.ctaText}</p>
                    <a
                      href="https://wa.me/5561981833328"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("whatsapp_click", {
                          cta_location: "service_guide",
                          service_slug: page.slug,
                        })
                      }
                      className="mt-6 inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
                    >
                      <Phone className="h-4 w-4" />
                      Enviar documentos para analise
                    </a>
                  </section>

                  <section className="mt-12">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-accent" />
                      <h2 className="font-heading text-2xl font-bold text-primary">Duvidas frequentes</h2>
                    </div>
                    <div className="mt-6 space-y-4">
                      {guide.faqs.map((faq) => (
                        <article key={faq.question} className="rounded-sm border border-border bg-card p-5">
                          <h3 className="font-heading text-lg font-bold text-primary">{faq.question}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </div>

            <aside className="h-fit rounded-sm border border-border bg-cream p-6">
              <FileText className="h-7 w-7 text-accent" />
              <h2 className="mt-4 font-heading text-xl font-bold text-primary">Documentos uteis</h2>
              <ul className="mt-5 space-y-3">
                {page.documents.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-border pt-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Temas relacionados</h3>
                <div className="mt-4 space-y-3">
                  {page.related.map((relatedSlug) => (
                    <Link
                      key={relatedSlug}
                      to={`/${relatedSlug}`}
                      className="flex items-center justify-between text-sm font-semibold text-accent hover:underline"
                    >
                      {relatedSlug.replace(/-/g, " ")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
              {relatedPosts.length > 0 && (
                <div className="mt-8 border-t border-border pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Artigos relacionados</h3>
                  <div className="mt-4 space-y-3">
                    {relatedPosts.map((post) => (
                      <Link
                        key={post!.slug}
                        to={`/blog/${post!.slug}`}
                        className="block text-sm font-semibold leading-relaxed text-accent hover:underline"
                      >
                        {post!.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicePage;
