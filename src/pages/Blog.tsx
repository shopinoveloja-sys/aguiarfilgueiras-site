import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, FileSearch, MapPin, PlayCircle, Search, Shield, Tags } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import { blogAudiences, blogStates, getBlogAudienceById, getBlogTopicById, normalizeText } from "@/data/blogTaxonomy";
import { geoStates, getGeoStatePath } from "@/data/geoCoverage";
import { servicePages } from "@/data/servicePages";
import { applySeo, setJsonLd } from "@/lib/seo";

const SITE_URL = "https://aguiarfilgueiras.com.br";

const Blog = () => {
  const [searchParams] = useSearchParams();
  const initialAudience = getBlogAudienceById(searchParams.get("audience")).id;
  const initialTopic = getBlogTopicById(initialAudience, searchParams.get("topic")).id;
  const initialState = blogStates.includes(searchParams.get("state") || "")
    ? (searchParams.get("state") as string)
    : "Todos os estados";
  const initialSearch = searchParams.get("search") || "";

  const [activeAudience, setActiveAudience] = useState(initialAudience);
  const [activeTopic, setActiveTopic] = useState(initialTopic);
  const [activeState, setActiveState] = useState(initialState);
  const [search, setSearch] = useState(initialSearch);

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
    const audience = getBlogAudienceById(activeAudience);
    const topic = audience.topics.find((item) => item.id === activeTopic) || audience.topics[0];
    const query = normalizeText(search.trim());
    const selectedState = activeState === "Todos os estados" ? "" : normalizeText(activeState);

    return blogPosts.filter((post) => {
      const text = normalizeText(
        [post.title, post.category, post.excerpt, post.carlosComment, ...(post.keywords || [])].join(" "),
      );
      const matchesAudience = audience.terms.some((term) => text.includes(normalizeText(term)));
      const matchesTopic = topic.id === "todos" || topic.terms.some((term) => text.includes(normalizeText(term)));
      const matchesState = !selectedState || text.includes(selectedState);
      const matchesSearch = !query || text.includes(query);
      return matchesAudience && matchesTopic && matchesState && matchesSearch;
    });
  }, [activeAudience, activeTopic, activeState, search]);

  const activeAudienceData = getBlogAudienceById(activeAudience);
  const activeTopicData = activeAudienceData.topics.find((topic) => topic.id === activeTopic) || activeAudienceData.topics[0];
  const featuredPost = filteredPosts[0] || blogPosts[0];
  const geoState = geoStates.find((state) => state.code === activeState);

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
                  Conteudo juridico para quem precisa entender o proprio caso com clareza
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-gold-light/80">
                  Os artigos estao organizados por perfil de atendimento, assunto e contexto funcional para facilitar
                  a leitura de temas que costumam surgir na rotina militar, disciplinar, administrativa e previdenciaria.
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
            <div className="mb-6 rounded-sm border border-accent/20 bg-accent/5 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Videos do canal</p>
                  <h2 className="mt-2 font-heading text-2xl font-bold text-primary">
                    Assista aos conteudos em video sobre Direito Militar
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    Reunimos uma area propria para videos do canal Aguiar Filgueiras Advocacia, com embed responsivo,
                    link direto para o YouTube e estrutura pronta para novos conteudos.
                  </p>
                </div>
                <Link
                  to="/blog/videos"
                  className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
                >
                  Ir para videos
                  <PlayCircle className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {blogAudiences.map((audience) => (
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
                    {blogStates.map((state) => (
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
                  placeholder="Buscar por tema, palavra ou assunto"
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
                    <h3 className="font-heading text-lg font-bold text-primary">Paginas relacionadas</h3>
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

                <div className="rounded-sm border border-border bg-card p-5">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    <h3 className="font-heading text-lg font-bold text-primary">Atendimento por estado e cidade</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Navegue pelas paginas geograficas para encontrar temas e servicos conectados ao seu estado ou cidade.
                  </p>
                  <div className="mt-4 space-y-3">
                    <Link to="/atendimento-militar" className="flex items-center justify-between text-sm font-semibold text-accent hover:underline">
                      Ver mapa de atendimento
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    {geoState ? (
                      <Link
                        to={getGeoStatePath(geoState.slug)}
                        className="flex items-center justify-between text-sm font-semibold text-accent hover:underline"
                      >
                        Abrir pagina de {geoState.name}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </aside>

              <div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-primary">Artigos e orientacoes</h2>
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
                      Tente outro termo de busca ou remova um dos filtros para ampliar os resultados.
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
