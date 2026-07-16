import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { applySeo, setJsonLd } from "@/lib/seo";

const SITE_URL = "https://aguiarfilgueiras.com.br";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const UPDATED_AT = "16 de julho de 2026";

type Section = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  canonicalPath: string;
  eyebrow: string;
  sections: Section[];
};

const LegalPage = ({
  title,
  description,
  canonicalPath,
  eyebrow,
  sections,
}: LegalPageProps) => {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;

    applySeo({
      title: `${title} | Aguiar Filgueiras Advocacia`,
      description,
      canonicalUrl,
      image: DEFAULT_IMAGE,
      robots: "index, follow",
    });

    setJsonLd("legal-page-jsonld", {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: canonicalUrl,
      isPartOf: {
        "@type": "WebSite",
        name: "Aguiar Filgueiras Advocacia",
        url: SITE_URL,
      },
      publisher: {
        "@type": "LegalService",
        name: "Aguiar Filgueiras Advocacia",
        url: SITE_URL,
      },
      dateModified: "2026-07-16",
    });
  }, [canonicalPath, description, title]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <section className="border-b border-border bg-card">
          <div className="container mx-auto px-6 py-14">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {eyebrow}
              </p>
              <h1 className="mt-4 font-heading text-4xl font-semibold text-primary sm:text-5xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Ultima atualizacao: {UPDATED_AT}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl space-y-8">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-sm border border-border bg-card px-6 py-6 shadow-[var(--shadow-card)]"
                >
                  <h2 className="font-heading text-2xl font-semibold text-primary">
                    {section.title}
                  </h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets?.length ? (
                    <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-muted-foreground sm:text-base">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="list-disc">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}

              <div className="rounded-sm border border-gold/30 bg-gold/5 px-6 py-6">
                <h2 className="font-heading text-2xl font-semibold text-primary">
                  Contato do escritorio
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  Para duvidas relacionadas a estes documentos ou ao tratamento de dados pessoais,
                  entre em contato pelo e-mail{" "}
                  <a
                    href="mailto:contato@aguiarfilgueiras.com.br"
                    className="font-medium text-primary underline underline-offset-4 hover:text-accent"
                  >
                    contato@aguiarfilgueiras.com.br
                  </a>{" "}
                  ou pelo WhatsApp{" "}
                  <a
                    href="https://wa.me/5561981833328"
                    className="font-medium text-primary underline underline-offset-4 hover:text-accent"
                  >
                    (61) 98183-3328
                  </a>
                  .
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm">
                  <Link
                    to="/"
                    className="font-medium text-primary underline underline-offset-4 hover:text-accent"
                  >
                    Voltar para a pagina inicial
                  </Link>
                  <Link
                    to="/blog"
                    className="font-medium text-primary underline underline-offset-4 hover:text-accent"
                  >
                    Acessar o blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
