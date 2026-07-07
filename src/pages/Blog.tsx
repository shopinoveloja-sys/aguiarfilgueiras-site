import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, FileSearch, MapPin, Search, Shield, Tags } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import { servicePages } from "@/data/servicePages";
import { applySeo, setJsonLd } from "@/lib/seo";

const SITE_URL = "https://aguiarfilgueiras.com.br";

const audiences = [
  {
    id: "federais",
    label: "Forcas Federais",
    description: "Exercito, Marinha, Aeronautica, Policia Federal, Policia Rodoviaria Federal e outros servidores federais.",
    terms: ["militar", "forcas armadas", "exercito", "marinha", "aeronautica", "federal", "prf", "policia federal"],
    groups: [
      { label: "Exercito", query: "exercito" },
      { label: "Marinha", query: "marinha" },
      { label: "Aeronautica", query: "aeronautica" },
      { label: "Policia Federal", query: "policia federal" },
      { label: "Policia Rodoviaria Federal", query: "policia rodoviaria federal" },
      { label: "Outros servidores federais", query: "federal" },
    ],
    topics: [
      {
        id: "todos",
        label: "Todos",
        description: "Todos os artigos aplicaveis ao publico federal.",
        serviceSlugs: [] as string[],
        terms: [] as string[],
      },
      {
        id: "penal-ipm",
        label: "Penal militar e IPM",
        description: "Crimes militares, IPM, oitivas e defesa tecnica.",
        serviceSlugs: ["direito-penal-militar", "defesa-em-ipm"],
        terms: ["penal", "crime", "ipm", "codigo penal", "inquerito"],
      },
      {
        id: "carreira",
        label: "Carreira militar",
        description: "Promocao, exclusao, licenciamento e reintegracao.",
        serviceSlugs: ["exclusao-das-forcas-armadas", "licenciamento-indevido-militar", "promocao-militar-preterida"],
        terms: ["exclusao", "licenciamento", "promocao", "carreira", "forcas armadas"],
      },
      {
        id: "saude-beneficios",
        label: "Saude, pensao e beneficios",
        description: "Reforma, invalidez, pensao militar e abate-teto.",
        serviceSlugs: ["reforma-militar-por-invalidez", "pensao-militar", "abate-teto-pensao-militar"],
        terms: ["pensao", "previdenciario", "reforma", "invalidez", "abate-teto", "beneficio"],
      },
    ],
  },
  {
    id: "estaduais",
    label: "Forcas Estaduais",
    description: "Policiais militares, bombeiros militares e carreiras estaduais com demandas disciplinares e administrativas.",
    terms: ["policial", "bombeiro", "estadual", "disciplinar", "punicao", "administrativo", "transgressao"],
    groups: [
      { label: "Policiais militares", query: "policial" },
      { label: "Bombeiros militares", query: "bombeiro" },
    ],
    topics: [
      {
        id: "todos",
        label: "Todos",
        description: "Todos os artigos aplicaveis ao publico estadual.",
        serviceSlugs: ["punicao-disciplinar-militar", "processo-administrativo-militar", "advogado-direito-militar"],
        terms: [] as string[],
      },
      {
        id: "disciplina",
        label: "Disciplina e punicoes",
        description: "Punicoes, transgressoes, ampla defesa e recursos disciplinares.",
        serviceSlugs: ["punicao-disciplinar-militar", "processo-administrativo-militar"],
        terms: ["disciplinar", "punicao", "transgressao", "ampla defesa"],
      },
      {
        id: "processos",
        label: "Processos administrativos",
        description: "Sindicancias, PAD, conselhos e defesa administrativa.",
        serviceSlugs: ["processo-administrativo-militar", "punicao-disciplinar-militar"],
        terms: ["administrativo", "sindicancia", "processo", "conselho", "defesa"],
      },
      {
        id: "carreira-estadual",
        label: "Carreira e permanencia",
        description: "Promocao, exclusao, licenciamento e impactos na carreira estadual.",
        serviceSlugs: ["promocao-militar-preterida", "exclusao-das-forcas-armadas", "licenciamento-indevido-militar"],
        terms: ["promocao", "exclusao", "licenciamento", "carreira", "permanencia"],
      },
    ],
  },
];

const states = [
  "Todos os estados",
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const Blog = () => {
  const [activeAudience, setActiveAudience] = useState("federais");
  const [activeTopic, setActiveTopic] = useState("todos");
  const [activeState, setActiveState] = useState("Todos os estados");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const description =
      "Artigos, guias e analises sobre Direito Militar, IPM, punicoes disciplinares, carreira, pensao e beneficios militares.";
    const canonicalUrl = `${SITE_URL}/blog/`;

    applySeo({
      title: "Blog de Direito Militar | Aguiar Filgueiras Advocacia",
      description,
      canonicalUrl,
      keywords:
        "blog direito militar, IPM, punicao disciplinar militar, pensao militar, processo administrativo militar, advogado militar",
    });

    setJsonLd("blog-page-jsonld", {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Blog de Direito Militar",
      url: canonicalUrl,
      description,
      hasPart: blogPosts.map((post) => ({
        "@type": "Article",
        headline: post.title,
        url: `${SITE_URL}/blog/${post.slug}/`,
      })),
    });
  }, []);

  const filteredPosts = useMemo(() => {
    const audience = audiences.find((item) => item.id === activeAudience) || audiences[0];
    const topic = audience.topics.find((item) => item.id === activeTopic) || audience.topics[0];
    const query = normalize(search.trim());
    const selectedState = activeState === "Todos os estados" ? "" : normalize(activeState);

    return blogPosts.filter((post) => {
      const text = normalize(
        [post.title, post.category, post.excerpt, post.carlosComment, ...(post.keywords || [])].join(" "),
      );
      const matchesAudience = audience.terms.some((term) => text.includes(normalize(term)));
      const matchesTopic = topic.id === "todos" || topic.terms.some((term) => text.includes(normalize(term)));
      const matchesState = !selectedState || text.includes(selectedState);
      const matchesSearch = !query || text.includes(query);
      return matchesAudience && matchesTopic && matchesState && matchesSearch;
    });
  }, [activeAudience, activeTopic, activeState, search]);

  const activeAudienceData = audiences.find((audience) => audience.id === activeAudience) || audiences[0];
  const activeTopicData = activeAudienceData.topics.find((topic) => topic.id === activeTopic) || activeAudienceData.topics[0];
  const featuredPost = filteredPosts[0] || blogPosts[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="bg-primary py-16 text-primary-foreground sm:py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              <BookOpen className="h-4 w-4" />
              Biblioteca de Direito Militar
            </span>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
                <h1 className="max-w-3xl font-heading text-3xl font-bold leading-tight sm:text-5xl">
                  Artigos separados por forca, tema e estado
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-gold-light/80">
                  Comece escolhendo entre Forcas Federais e Forcas Estaduais. Depois filtre por assunto, estado
                  ou palavra-chave para encontrar a orientacao mais proxima do seu caso.
                </p>
              </div>
              <div className="rounded-sm border border-gold/20 bg-primary-foreground/5 p-5">
                <p className="text-sm font-semibold text-gold">Artigo em destaque</p>
                <h2 className="mt-3 font-heading text-xl font-bold leading-snug text-primary-foreground">
                  {featuredPost.title}
                </h2>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
                >
                  Ler artigo <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card py-8">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid gap-4 md:grid-cols-2">
              {audiences.map((audience) => (
                <button
                  key={audience.id}
                  type="button"
                  onClick={() => {
                    setActiveAudience(audience.id);
                    setActiveTopic("todos");
                    setActiveState("Todos os estados");
                  }}
                  className={`group relative overflow-hidden rounded-sm border p-5 text-left transition-all ${
                    activeAudience === audience.id
                      ? "border-accent bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]"
                      : "border-border bg-background text-muted-foreground hover:-translate-y-0.5 hover:border-accent hover:text-primary hover:shadow-[var(--shadow-soft)]"
                  }`}
                >
                  <span
                    className={`absolute right-0 top-0 h-full w-1 ${
                      activeAudience === audience.id ? "bg-accent" : "bg-border group-hover:bg-accent"
                    }`}
                  />
                  <span className="block font-heading text-2xl font-bold">{audience.label}</span>
                  <span className={`mt-2 block text-sm leading-relaxed ${activeAudience === audience.id ? "text-gold-light/80" : ""}`}>
                    {audience.description}
                  </span>
                  <span className="mt-4 flex flex-wrap gap-2">
                    {audience.groups.slice(0, 3).map((group) => (
                      <span
                        key={group.label}
                        className={`rounded-sm px-2.5 py-1 text-xs font-semibold ${
                          activeAudience === audience.id ? "bg-primary-foreground/10 text-gold" : "bg-accent/10 text-accent"
                        }`}
                      >
                        {group.label}
                      </span>
                    ))}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.28fr_0.45fr]">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {activeAudienceData.topics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setActiveTopic(topic.id)}
                    className={`shrink-0 rounded-sm border px-4 py-3 text-left transition-colors ${
                      activeTopic === topic.id
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-accent hover:text-primary"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{topic.label}</span>
                  </button>
                ))}
              </div>
              {activeAudience === "estaduais" ? (
                <label className="relative block">
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={activeState}
                    onChange={(event) => setActiveState(event.target.value)}
                    className="min-h-12 w-full rounded-sm border border-border bg-background pl-11 pr-4 text-sm outline-none transition-colors focus:border-accent"
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <div className="hidden lg:block" />
              )}
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por tema, palavra ou area"
                  className="h-full min-h-12 w-full rounded-sm border border-border bg-background pl-11 pr-4 text-sm outline-none transition-colors focus:border-accent"
                />
              </label>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[0.32fr_1fr]">
              <aside className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                    <Tags className="h-4 w-4" />
                    Segmento
                  </span>
                  <h2 className="mt-3 font-heading text-2xl font-bold text-primary">{activeAudienceData.label}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{activeAudienceData.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {activeAudienceData.groups.map((group) => (
                      <button
                        key={group.label}
                        type="button"
                        onClick={() => setSearch(group.query)}
                        className="rounded-sm border border-border bg-card px-3 py-2 text-left text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
                      >
                        {group.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-border pt-5">
                    <p className="text-sm font-semibold text-primary">{activeTopicData.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{activeTopicData.description}</p>
                    {activeAudience === "estaduais" && activeState !== "Todos os estados" && (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        Filtro de estado ativo: <span className="font-semibold text-primary">{activeState}</span>.
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-sm border border-border bg-cream p-5">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    <h3 className="font-heading text-lg font-bold text-primary">Areas relacionadas</h3>
                  </div>
                  <div className="mt-4 space-y-3">
                    {(activeTopicData.serviceSlugs.length ? activeTopicData.serviceSlugs : servicePages.slice(0, 4).map((page) => page.slug))
                      .map((slug) => servicePages.find((page) => page.slug === slug))
                      .filter(Boolean)
                      .map((page) => (
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
              </aside>

              <div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-primary">Publicacoes</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {filteredPosts.length} artigo{filteredPosts.length === 1 ? "" : "s"} encontrado
                      {filteredPosts.length === 1 ? "" : "s"}.
                    </p>
                  </div>
                </div>

                {filteredPosts.length ? (
                  <div className="mt-6 grid gap-5">
                    {filteredPosts.map((post) => (
                      <article
                        key={post.slug}
                        className="group rounded-sm border border-border bg-card p-5 transition-colors hover:border-accent"
                      >
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="rounded-sm bg-accent/10 px-3 py-1 font-semibold text-accent">
                            {post.category}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {post.date}
                          </span>
                        </div>
                        <h3 className="mt-4 font-heading text-2xl font-bold leading-snug text-primary transition-colors group-hover:text-accent">
                          {post.title}
                        </h3>
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all hover:gap-3"
                        >
                          Ler artigo completo <ArrowRight className="h-4 w-4" />
                        </Link>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 rounded-sm border border-border bg-card p-8">
                    <FileSearch className="h-8 w-8 text-accent" />
                    <h3 className="mt-4 font-heading text-xl font-bold text-primary">Nenhum artigo encontrado</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Tente outro termo ou selecione todos os topicos para visualizar os demais artigos.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
