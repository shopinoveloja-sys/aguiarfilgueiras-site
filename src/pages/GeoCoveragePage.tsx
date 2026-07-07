import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Compass,
  MapPin,
  Scale,
  Shield,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts, getRelatedServiceSlugsForPost } from "@/data/blogPosts";
import {
  blogAudiences,
  getBlogAudienceById,
  getBlogTopicById,
} from "@/data/blogTaxonomy";
import {
  geoCoverageHub,
  geoStates,
  geoCities,
  getGeoCityBySlug,
  getGeoCityPath,
  getGeoCitiesForState,
  getGeoStateBySlug,
  getGeoStatePath,
} from "@/data/geoCoverage";
import { getServicePageBySlug } from "@/data/servicePages";
import { applySeo, setJsonLd } from "@/lib/seo";

const SITE_URL = "https://aguiarfilgueiras.com.br";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const stateNames = new Intl.DisplayNames(["pt-BR"], { type: "region" });

const buildBlogFilterUrl = (audienceId: string, topicId = "todos", stateCode?: string, search?: string) => {
  const params = new URLSearchParams();
  params.set("audience", audienceId);
  params.set("topic", topicId);
  if (stateCode) params.set("state", stateCode);
  if (search) params.set("search", search);
  return `/blog?${params.toString()}`;
};

const buildFaqs = (placeLabel: string, serviceNames: string[]) => [
  {
    question: `O atendimento para casos em ${placeLabel} pode comecar online?`,
    answer:
      "Sim. A analise inicial pode comecar online, com leitura dos documentos, definicao do prazo relevante e orientacao sobre o que precisa ser preservado para a defesa.",
  },
  {
    question: `Quais documentos costumam ser mais uteis em ${placeLabel}?`,
    answer:
      "Normalmente ajudam notificacao, portaria, boletins, escalas, mensagens, laudos, exames, ficha funcional e qualquer registro que permita montar uma cronologia objetiva do caso.",
  },
  {
    question: `Que temas costumam exigir mais rapidez em ${placeLabel}?`,
    answer: `Casos ligados a ${serviceNames.slice(0, 3).join(", ").toLowerCase()} costumam pedir resposta mais cuidadosa quando ha prazo curto, risco funcional ou impacto imediato na carreira.`,
  },
];

const buildBreadcrumbJsonLd = (items: { name: string; item: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((entry, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: entry.name,
    item: entry.item,
  })),
});

const GeoCoveragePage = () => {
  const { stateSlug, citySlug } = useParams();
  const state = stateSlug ? getGeoStateBySlug(stateSlug) : null;
  const city = stateSlug && citySlug ? getGeoCityBySlug(stateSlug, citySlug) : null;

  const mode = !stateSlug ? "hub" : citySlug ? "city" : "state";

  const servicePages = useMemo(() => {
    if (mode === "hub") return [];
    const slugs = mode === "city" && city ? city.serviceSlugs : state?.serviceSlugs || [];
    return slugs.map((slug) => getServicePageBySlug(slug)).filter(Boolean);
  }, [mode, city, state]);

  const relatedPosts = useMemo(() => {
    if (mode === "hub") return [];
    const slugs = new Set((mode === "city" && city ? city.serviceSlugs : state?.serviceSlugs || []));
    return blogPosts
      .filter((post) => getRelatedServiceSlugsForPost(post.slug).some((slug) => slugs.has(slug)))
      .slice(0, 6);
  }, [mode, city, state]);

  const audienceCards = useMemo(() => {
    if (mode === "hub") return blogAudiences;
    const ids = mode === "city" && city ? city.audiences : state?.audiences || [];
    return ids.map((id) => getBlogAudienceById(id));
  }, [mode, city, state]);

  const topicCards = useMemo(() => {
    if (mode === "hub") return [];
    const ids = mode === "city" && city ? city.topics : state?.topics || [];
    const sourceAudience = (mode === "city" && city ? city.audiences[0] : state?.audiences[0]) || "federais";
    return ids.map((topicId) => getBlogTopicById(sourceAudience, topicId));
  }, [mode, city, state]);

  const faqs = useMemo(() => {
    if (mode === "hub") return [];
    const placeLabel =
      mode === "city" && city && state
        ? `${city.name}/${state.code}`
        : state
          ? `${state.name}`
          : "todo o Brasil";
    return buildFaqs(placeLabel, servicePages.map((page) => page!.title));
  }, [mode, city, state, servicePages]);

  useEffect(() => {
    if (mode === "hub") {
      const canonicalUrl = `${SITE_URL}/atendimento-militar/`;
      const description = geoCoverageHub.description;

      applySeo({
        title: `${geoCoverageHub.title} | Aguiar Filgueiras Advocacia`,
        description,
        canonicalUrl,
        keywords:
          "advogado militar por estado, advogado militar por cidade, atendimento direito militar, direito militar brasil",
        image: DEFAULT_IMAGE,
      });

      setJsonLd("geo-coverage-jsonld", [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: geoCoverageHub.title,
          url: canonicalUrl,
          description,
          hasPart: geoStates.map((entry) => ({
            "@type": "WebPage",
            name: `Atendimento em Direito Militar em ${entry.name}`,
            url: `${SITE_URL}${getGeoStatePath(entry.slug)}/`,
          })),
        },
        buildBreadcrumbJsonLd([
          { name: "Inicio", item: `${SITE_URL}/` },
          { name: "Atendimento por estado e cidade", item: canonicalUrl },
        ]),
      ]);
      return;
    }

    if (mode === "state" && !state) {
      applySeo({
        title: "Pagina nao encontrada | Aguiar Filgueiras Advocacia",
        description: "A pagina solicitada nao foi encontrada.",
        canonicalUrl: `${SITE_URL}/atendimento-militar/`,
        robots: "noindex, nofollow",
      });
      return;
    }

    if (mode === "city" && (!state || !city)) {
      applySeo({
        title: "Pagina nao encontrada | Aguiar Filgueiras Advocacia",
        description: "A pagina solicitada nao foi encontrada.",
        canonicalUrl: `${SITE_URL}/atendimento-militar/`,
        robots: "noindex, nofollow",
      });
      return;
    }

    if (mode === "state" && state) {
      const canonicalUrl = `${SITE_URL}${getGeoStatePath(state.slug)}/`;
      const title = `Atendimento em Direito Militar em ${state.name} | Aguiar Filgueiras Advocacia`;
      const description = `${state.summary} ${state.localAngle}`;

      applySeo({
        title,
        description,
        canonicalUrl,
        keywords: [
          `advogado militar ${state.code.toLowerCase()}`,
          `direito militar ${state.name.toLowerCase()}`,
          `atendimento militar ${state.name.toLowerCase()}`,
        ].join(", "),
        image: DEFAULT_IMAGE,
      });

      setJsonLd("geo-coverage-jsonld", [
        {
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: "Aguiar Filgueiras Advocacia",
          url: canonicalUrl,
          description,
          areaServed: {
            "@type": "AdministrativeArea",
            name: state.name,
          },
          serviceType: "Direito Militar",
        },
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Atendimento em Direito Militar em ${state.name}`,
          url: canonicalUrl,
          hasPart: [
            ...servicePages.map((page) => ({
              "@type": "WebPage",
              name: page!.title,
              url: `${SITE_URL}/${page!.slug}/`,
            })),
            ...getGeoCitiesForState(state.slug).map((entry) => ({
              "@type": "WebPage",
              name: `Atendimento em Direito Militar em ${entry.name}/${state.code}`,
              url: `${SITE_URL}${getGeoCityPath(state.slug, entry.slug)}/`,
            })),
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
        buildBreadcrumbJsonLd([
          { name: "Inicio", item: `${SITE_URL}/` },
          { name: "Atendimento por estado e cidade", item: `${SITE_URL}/atendimento-militar/` },
          { name: state.name, item: canonicalUrl },
        ]),
      ]);
      return;
    }

    if (mode === "city" && state && city) {
      const canonicalUrl = `${SITE_URL}${getGeoCityPath(state.slug, city.slug)}/`;
      const title = `Atendimento em Direito Militar em ${city.name}/${state.code} | Aguiar Filgueiras Advocacia`;
      const description = `${city.summary} ${city.localAngle}`;

      applySeo({
        title,
        description,
        canonicalUrl,
        keywords: [
          `advogado militar ${city.name.toLowerCase()}`,
          `direito militar ${city.name.toLowerCase()}`,
          `advogado militar ${state.code.toLowerCase()}`,
        ].join(", "),
        image: DEFAULT_IMAGE,
      });

      setJsonLd("geo-coverage-jsonld", [
        {
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: "Aguiar Filgueiras Advocacia",
          url: canonicalUrl,
          description,
          areaServed: [
            { "@type": "City", name: city.name },
            { "@type": "AdministrativeArea", name: state.name },
          ],
          serviceType: "Direito Militar",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
        buildBreadcrumbJsonLd([
          { name: "Inicio", item: `${SITE_URL}/` },
          { name: "Atendimento por estado e cidade", item: `${SITE_URL}/atendimento-militar/` },
          { name: state.name, item: `${SITE_URL}${getGeoStatePath(state.slug)}/` },
          { name: city.name, item: canonicalUrl },
        ]),
      ]);
    }
  }, [mode, state, city, servicePages, faqs]);

  if ((mode === "state" && !state) || (mode === "city" && (!state || !city))) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-24">
          <Link to="/atendimento-militar" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
            <ArrowLeft className="h-4 w-4" />
            Voltar para atendimento por estado
          </Link>
          <h1 className="mt-8 font-heading text-3xl font-bold text-primary">Pagina nao encontrada</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const citiesForState = state ? getGeoCitiesForState(state.slug) : [];
  const featuredStates = geoCoverageHub.featuredStateSlugs
    .map((slug) => getGeoStateBySlug(slug))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-primary py-16 text-primary-foreground sm:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            {mode === "hub" ? (
              <>
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                  <Compass className="h-4 w-4" />
                  Atendimento nacional
                </span>
                <h1 className="mt-5 max-w-4xl font-heading text-3xl font-bold leading-tight sm:text-5xl">
                  Paginas por estado e cidades prioritarias para quem procura orientacao em Direito Militar
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-gold-light/80">
                  {geoCoverageHub.description} Cada pagina conecta o estado ou a cidade com os servicos juridicos mais
                  recorrentes, os temas do blog e os assuntos que costumam gerar mais urgencia para militares, policiais,
                  bombeiros, temporarios e familiares.
                </p>
              </>
            ) : mode === "state" && state ? (
              <>
                <Link to="/atendimento-militar" className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para atendimento por estado
                </Link>
                <div className="mt-8 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-gold-light/70">
                  <span>{state.region}</span>
                  <span>{state.code}</span>
                </div>
                <h1 className="mt-4 max-w-4xl font-heading text-3xl font-bold leading-tight sm:text-5xl">
                  Atendimento em Direito Militar em {state.name}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-gold-light/80">{state.summary}</p>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gold-light/70">{state.localAngle}</p>
              </>
            ) : state && city ? (
              <>
                <Link to={getGeoStatePath(state.slug)} className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para {state.name}
                </Link>
                <div className="mt-8 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-gold-light/70">
                  <span>{city.name}</span>
                  <span>{state.code}</span>
                  <span>{state.region}</span>
                </div>
                <h1 className="mt-4 max-w-4xl font-heading text-3xl font-bold leading-tight sm:text-5xl">
                  Atendimento em Direito Militar em {city.name}/{state.code}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-gold-light/80">{city.summary}</p>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gold-light/70">{city.localAngle}</p>
              </>
            ) : null}
          </div>
        </section>

        {mode === "hub" ? (
          <section className="py-14 sm:py-16">
            <div className="container mx-auto max-w-6xl px-6">
              <div className="grid gap-5 lg:grid-cols-2">
                {featuredStates.map((entry) => (
                  <article key={entry!.slug} className="rounded-sm border border-border bg-card p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                          {entry!.code} . {entry!.region}
                        </p>
                        <h2 className="mt-3 font-heading text-2xl font-bold text-primary">{entry!.name}</h2>
                      </div>
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{entry!.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {entry!.serviceSlugs.slice(0, 3).map((slug) => (
                        <Link
                          key={slug}
                          to={`/${slug}`}
                          className="rounded-sm border border-border bg-background px-3 py-2 text-xs font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
                        >
                          {getServicePageBySlug(slug)?.title || slug}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-3">
                      <Link
                        to={getGeoStatePath(entry!.slug)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                      >
                        Ver pagina do estado <ArrowRight className="h-4 w-4" />
                      </Link>
                      {entry!.citySlugs.length ? (
                        <span className="text-xs text-muted-foreground">{entry!.citySlugs.length} cidade(s) prioritarias</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Atendimento estadual</span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="py-14 sm:py-16">
            <div className="container mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
              <aside className="space-y-6">
                <div className="rounded-sm border border-border bg-cream p-6">
                  <Scale className="h-6 w-6 text-accent" />
                  <h2 className="mt-4 font-heading text-xl font-bold text-primary">Servicos juridicos relacionados</h2>
                  <div className="mt-5 space-y-3">
                    {servicePages.map((page) => (
                      <Link
                        key={page!.slug}
                        to={`/${page!.slug}`}
                        className="flex items-center justify-between gap-3 text-sm font-semibold text-accent hover:underline"
                      >
                        {page!.title}
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-sm border border-border bg-card p-6">
                  <Shield className="h-6 w-6 text-accent" />
                  <h2 className="mt-4 font-heading text-xl font-bold text-primary">Segmentos do blog conectados a esta pagina</h2>
                  <div className="mt-5 space-y-4">
                    {audienceCards.map((audience) => (
                      <div key={audience.id} className="rounded-sm border border-border bg-background p-4">
                        <h3 className="text-sm font-semibold text-primary">{audience.label}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{audience.description}</p>
                        <Link
                          to={buildBlogFilterUrl(audience.id, "todos", mode === "city" ? city?.stateCode : state?.code)}
                          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                        >
                          Ver artigos deste segmento <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="space-y-10">
                {mode === "state" && state ? (
                  <section className="rounded-sm border border-border bg-card p-6">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-accent" />
                      <h2 className="font-heading text-2xl font-bold text-primary">Cidades prioritarias em {state.name}</h2>
                    </div>
                    {state.slug === "df" ? (
                      <div className="mt-5 rounded-sm border border-border bg-background p-5">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          Para Brasilia, a pagina principal dedicada ja esta em funcionamento e cobre atendimento presencial em
                          Taguatinga e atendimento virtual para todo o pais.
                        </p>
                        <Link
                          to="/advogado-militar-brasilia"
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                        >
                          Ver pagina de Brasilia <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    ) : citiesForState.length ? (
                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {citiesForState.map((entry) => (
                          <Link
                            key={entry.slug}
                            to={getGeoCityPath(state.slug, entry.slug)}
                            className="rounded-sm border border-border bg-background p-5 transition-colors hover:border-accent"
                          >
                            <h3 className="font-heading text-xl font-bold text-primary">{entry.name}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>
                            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                              Abrir pagina da cidade <ArrowRight className="h-4 w-4" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                        Esta pagina estadual ja esta pronta para crescer com novas cidades quando houver prioridade comercial ou editorial.
                      </p>
                    )}
                  </section>
                ) : null}

                {mode === "city" && state && city ? (
                  <section className="rounded-sm border border-border bg-card p-6">
                    <div className="flex items-center gap-3">
                      <Compass className="h-5 w-5 text-accent" />
                      <h2 className="font-heading text-2xl font-bold text-primary">Cobertura na mesma regiao</h2>
                    </div>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <Link
                        to={getGeoStatePath(state.slug)}
                        className="rounded-sm border border-border bg-background p-5 transition-colors hover:border-accent"
                      >
                        <h3 className="font-heading text-xl font-bold text-primary">{state.name}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          Pagina estadual com links para temas recorrentes, servicos juridicos e outras cidades prioritarias.
                        </p>
                      </Link>
                      {city.nearbySlugs.map((nearbySlug) => {
                        const nearbyCity = geoCities.find((entry) => entry.slug === nearbySlug && entry.stateSlug === state.slug);
                        if (!nearbyCity) return null;
                        return (
                          <Link
                            key={nearbyCity.slug}
                            to={getGeoCityPath(state.slug, nearbyCity.slug)}
                            className="rounded-sm border border-border bg-background p-5 transition-colors hover:border-accent"
                          >
                            <h3 className="font-heading text-xl font-bold text-primary">{nearbyCity.name}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{nearbyCity.summary}</p>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                ) : null}

                <section className="rounded-sm border border-border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <h2 className="font-heading text-2xl font-bold text-primary">Temas e leituras conectadas a este territorio</h2>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {topicCards.map((topic) => (
                      <div key={topic.id} className="rounded-sm border border-border bg-background p-5">
                        <h3 className="font-heading text-xl font-bold text-primary">{topic.label}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{topic.description}</p>
                        <Link
                          to={buildBlogFilterUrl(
                            (mode === "city" && city ? city.audiences[0] : state?.audiences[0]) || "federais",
                            topic.id,
                            mode === "city" ? city?.stateCode : state?.code,
                          )}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                        >
                          Ver artigos deste tema <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    ))}
                  </div>

                  {relatedPosts.length > 0 ? (
                    <div className="mt-8 grid gap-4">
                      {relatedPosts.map((post) => (
                        <article key={post.slug} className="rounded-sm border border-border bg-background p-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{post.category}</p>
                          <h3 className="mt-3 font-heading text-2xl font-bold text-primary">{post.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                          <Link
                            to={`/blog/${post.slug}`}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                          >
                            Ler artigo completo <ArrowRight className="h-4 w-4" />
                          </Link>
                        </article>
                      ))}
                    </div>
                  ) : null}
                </section>

                <section className="rounded-sm border border-border bg-primary p-6 text-primary-foreground">
                  <h2 className="font-heading text-2xl font-bold">Duvidas frequentes sobre atendimento em {(mode === "city" && city) ? `${city.name}/${state!.code}` : state!.name}</h2>
                  <div className="mt-6 space-y-4">
                    {faqs.map((faq) => (
                      <article key={faq.question} className="rounded-sm border border-primary-foreground/10 bg-primary-foreground/5 p-5">
                        <h3 className="font-heading text-lg font-bold text-primary-foreground">{faq.question}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-gold-light/85">{faq.answer}</p>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GeoCoveragePage;
