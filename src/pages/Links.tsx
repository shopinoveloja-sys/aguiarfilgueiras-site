import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpenText,
  FileText,
  MessageCircle,
  Scale,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import founderImg from "@/assets/founder.jpg";
import logoImg from "@/assets/aguiar-filgueiras-logo.png";
import { blogPosts } from "@/data/blogPosts";
import { trackEvent } from "@/lib/analytics";

const latestArticle = blogPosts[0];

const cards = [
  {
    icon: UserRound,
    label: "Quem sou eu",
    eyebrow: "Fundador",
    text: "Conheça a trajetória de Carlos Filgueiras e a atuação dedicada ao Direito Militar.",
    to: "/#fundador",
    variant: "light",
  },
  {
    icon: BookOpenText,
    label: "Blog",
    eyebrow: "Análises",
    text: "Artigos sobre Direito Penal Militar, previdência militar e defesa disciplinar.",
    to: "/#blog",
    variant: "light",
  },
  {
    icon: FileText,
    label: "Último artigo",
    eyebrow: latestArticle?.category ?? "Publicação",
    text: latestArticle?.title ?? "Leia a publicação mais recente do escritório.",
    to: latestArticle ? `/blog/${latestArticle.slug}` : "/#blog",
    variant: "light",
  },
  {
    icon: MessageCircle,
    label: "Contato",
    eyebrow: "Atendimento",
    text: "Fale pelo WhatsApp para orientação jurídica especializada.",
    to: "https://wa.me/5561981833328",
    variant: "dark",
    external: true,
  },
];

const Links = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-cream text-primary">
      <div className="absolute inset-x-0 top-0 h-[330px] bg-gradient-to-br from-primary via-navy to-navy-light" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 py-7 sm:px-8">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-sm border border-gold/20 bg-primary/40 p-4 shadow-[0_28px_70px_-45px_hsl(0_0%_0%/.95)] backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0">
              <img
                src={founderImg}
                alt="Carlos Filgueiras"
                className="h-full w-full rounded-full object-cover object-[52%_43%] shadow-lg ring-1 ring-gold/50"
              />
              <img
                src={logoImg}
                alt="Aguiar Filgueiras Advocacia"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full object-cover ring-2 ring-primary"
              />
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">
                Aguiar Filgueiras
              </p>
              <h1 className="mt-1 font-heading text-xl font-semibold leading-tight text-primary-foreground sm:text-2xl">
                Advocacia Militar
              </h1>
              <p className="mt-1 max-w-[250px] break-words text-xs leading-relaxed text-gold-light/75 sm:max-w-none">
                Defesa técnica, estratégia e experiência para militares.
              </p>
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55 }}
          className="mt-7 rounded-sm border border-border bg-card px-5 py-6 shadow-[var(--shadow-card)]"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            Acesso rápido
          </span>
          <p className="mt-2 max-w-full break-words font-heading text-2xl font-semibold leading-tight text-primary sm:text-4xl">
            O essencial em um só lugar.
          </p>
          <p className="mt-3 max-w-lg break-words text-sm leading-relaxed text-muted-foreground">
            Conheça o escritório, leia conteúdos recentes ou fale com a equipe sem perder tempo.
          </p>
        </motion.div>

        <div className="mt-4 grid flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2.5 pb-8 sm:gap-4">
          {cards.map((card, index) => {
            const CardIcon = card.icon;
            const isDark = card.variant === "dark";
            const className = `group relative flex min-h-[172px] w-full min-w-0 flex-col justify-between overflow-hidden rounded-sm border p-3.5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 sm:p-4 ${
              isDark
                ? "border-primary/20 bg-primary text-primary-foreground hover:border-gold"
                : "border-border bg-card text-primary hover:border-gold"
            }`;

            const content = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-sm border ${
                      isDark
                        ? "border-gold/25 bg-gold/10 text-gold"
                        : "border-accent/20 bg-accent/10 text-accent"
                    }`}
                  >
                    <CardIcon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight
                    className={`h-4 w-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isDark ? "text-gold/60 group-hover:text-gold" : "text-accent/55 group-hover:text-accent"
                    }`}
                  />
                </div>
                <div>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                      isDark ? "text-gold-light/70" : "text-accent"
                    }`}
                  >
                    {card.eyebrow}
                  </span>
                  <h2
                    className={`mt-2 break-words font-heading text-xl font-semibold leading-tight ${
                      isDark ? "text-primary-foreground" : "text-primary"
                    }`}
                  >
                    {card.label}
                  </h2>
                  <p
                    className={`mt-2 line-clamp-4 break-words text-xs leading-relaxed ${
                      isDark ? "text-gold-light/75" : "text-muted-foreground"
                    }`}
                  >
                    {card.text}
                  </p>
                </div>
                <span
                  className={`absolute inset-x-4 bottom-0 h-px opacity-0 transition-opacity group-hover:opacity-100 ${
                    isDark
                      ? "bg-gradient-to-r from-gold/80 via-gold/20 to-transparent"
                      : "bg-gradient-to-r from-accent/70 via-accent/20 to-transparent"
                  }`}
                />
              </>
            );

            return card.external ? (
              <motion.a
                key={card.label}
                href={card.to}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_whatsapp", { cta_location: "bio_links", cta_label: card.label })}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.45 }}
                className={className}
              >
                {content}
              </motion.a>
            ) : (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.45 }}
                className="min-w-0"
              >
                <Link to={card.to} className={className}>
                  {content}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="border-t border-border py-5 text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-accent"
          >
            <Scale className="h-3.5 w-3.5" />
            aguiarfilgueiras.com.br
          </Link>
        </motion.footer>
      </section>
    </main>
  );
};

export default Links;
