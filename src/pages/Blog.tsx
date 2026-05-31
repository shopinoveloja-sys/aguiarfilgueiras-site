import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, FileSearch, Search, Shield, Tags } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import { servicePages } from "@/data/servicePages";

const SITE_URL = "https://aguiarfilgueiras.com.br";

const topics = [
  {
    id: "todos",
    label: "Todos",
    description: "Todos os artigos publicados.",
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
    id: "disciplina",
    label: "Disciplina e punicoes",
    description: "Punicoes, transgressoes, ampla defesa e processo administrativo.",
    serviceSlugs: ["punicao-disciplinar-militar", "processo-administrativo-militar"],
    terms: ["disciplinar", "punicao", "transgressao", "ampla defesa", "administrativo"],
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
  {
    id: "policiais",
    label: "Policiais e bombeiros",
    description: "Conteudos uteis para militares estaduais, policiais e bombeiros militares.",
    serviceSlugs: ["punicao-disciplinar-militar", "processo-administrativo-militar", "advogado-direito-militar"],
    terms: ["policial", "bombeiro", "estadual", "disciplinar", "punicao"],
  },
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const Blog = () => {
  const [activeTopic, setActiveTopic] = useState("todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const canonicalUrl = `${SITE_URL}/blog/`;
    document.title = "Blog de Direito Militar | Aguiar Filgueiras Advocacia";

    const setMeta = (selector: string, attribute: "content" | "href", value: string) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

      if (!element) {
        element = selector.startsWith("link")
          ? document.createElement("link")
          : document.createElement("meta");

        if (selector.includes("canonical")) element.setAttribute("rel", "canonical");
        if (selector.includes("description")) element.setAttribute("name", "description");
        if (selector.includes("og:")) element.setAttribute("property", selector.match(/og:[^'"]+/)?.[0] || "");
        if (selector.includes("twitter:")) element.setAttribute("name", selector.match(/twitter:[^'"]+/)?.[0] || "");

        document.head.appendChild(element);
      }

      element.setAttribute(attribute, value);
    };

    const description =
      "Artigos, guias e analises sobre Direito Militar, IPM, punicoes disciplinares, carreira, pensao e beneficios militares.";

    setMeta("meta[name='description']", "content", description);
    setMeta("link[rel='canonical']", "href", canonicalUrl);
    setMeta("meta[property='og:type']", "content", "website");
    setMeta("meta[property='og:title']", "content", "Blog de Direito Militar | Aguiar Filgueiras Advocacia");
    setMeta("meta[property='og:description']", "content", description);
    setMeta("meta[property='og:url']", "content", canonicalUrl);
    setMeta("meta[name='twitter:card']", "content", "summary_large_image");
    setMeta("meta[name='twitter:title']", "content", "Blog de Direito Militar | Aguiar Filgueiras Advocacia");
    setMeta("meta[name='twitter:description']", "content", description);
  }, []);

  const filteredPosts = useMemo(() => {
    const topic = topics.find((item) => item.id === activeTopic) || topics[0];
    const query = normalize(search.trim());

    return blogPosts.filter((post) => {
      const text = normalize(
        [post.title, post.category, post.excerpt, post.carlosComment, ...(post.keywords || [])].join(" "),
      );
      const matchesTopic = topic.id === "todos" || topic.terms.some((term) => text.includes(normalize(term)));
      const matchesSearch = !query || text.includes(query);
      return matchesTopic && matchesSearch;
    });
  }, [activeTopic, search]);

  const activeTopicData = topics.find((topic) => topic.id === activeTopic) || topics[0];
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
                  Artigos organizados por tema para militares e familiares
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-gold-light/80">
                  Encontre orientacoes sobre IPM, punicoes, carreira, pensao e beneficios militares sem precisar
                  navegar por uma lista solta de publicacoes.
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
            <div className="grid gap-4 lg:grid-cols-[1fr_0.45fr]">
              <div className="flex gap-3 overflow-x-auto pb-2">
                {topics.map((topic) => (
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
                    Topico
                  </span>
                  <h2 className="mt-3 font-heading text-2xl font-bold text-primary">{activeTopicData.label}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{activeTopicData.description}</p>
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
                      Tente outro termo ou selecione todos os topicos para ver a biblioteca completa.
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
