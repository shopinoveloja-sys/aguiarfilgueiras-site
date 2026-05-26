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
import logoImg from "@/assets/aguiar-filgueiras-logo.jpeg";
import { blogPosts } from "@/data/blogPosts";

const latestArticle = blogPosts[0];

const cards = [
  {
    icon: UserRound,
    label: "Quem sou eu",
    eyebrow: "Fundador",
    text: "Conheça a trajetória de Carlos Filgueiras e a atuação dedicada ao Direito Militar.",
    to: "/#fundador",
    tone: "tall",
  },
  {
    icon: BookOpenText,
    label: "Blog",
    eyebrow: "Análises",
    text: "Artigos sobre Direito Penal Militar, previdência militar e defesa disciplinar.",
    to: "/#blog",
    tone: "short",
  },
  {
    icon: FileText,
    label: "Último artigo",
    eyebrow: latestArticle?.category ?? "Publicação",
    text: latestArticle?.title ?? "Leia a publicação mais recente do escritório.",
    to: latestArticle ? `/blog/${latestArticle.slug}` : "/#blog",
    tone: "short",
  },
  {
    icon: MessageCircle,
    label: "Contato",
    eyebrow: "Atendimento",
    text: "Fale pelo WhatsApp para orientação jurídica especializada.",
    to: "https://wa.me/5561981833328",
    tone: "tall",
    external: true,
  },
];

const Links = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(42_55%_52%/.18),transparent_34%),linear-gradient(135deg,hsl(220_45%_11%),hsl(220_36%_20%))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 py-8 sm:px-8">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="relative h-20 w-20 shrink-0">
            <img
              src={founderImg}
              alt="Carlos Filgueiras"
              className="h-full w-full rounded-full object-cover object-[52%_43%] shadow-lg ring-1 ring-gold/40"
            />
            <img
              src={logoImg}
              alt="Aguiar Filgueiras Advocacia"
              className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full object-cover ring-2 ring-primary"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">
              Aguiar Filgueiras
            </p>
            <h1 className="mt-1 font-heading text-xl font-semibold leading-tight text-primary-foreground sm:text-2xl">
              Advocacia Militar
            </h1>
            <p className="mt-1 max-w-[240px] text-xs leading-relaxed text-gold-light/70 sm:max-w-none">
              Defesa técnica, estratégia e experiência para militares.
            </p>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55 }}
          className="mt-8 border-l border-gold/40 pl-4"
        >
          <p className="max-w-full break-words font-heading text-2xl font-semibold leading-tight sm:text-4xl">
            Um acesso direto ao essencial.
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-gold-light/75">
            Escolha o caminho mais rápido para conhecer o escritório, ler os conteúdos
            recentes ou falar com a equipe.
          </p>
        </motion.div>

        <div className="mt-9 grid flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 pb-8 sm:gap-4">
          {cards.map((card, index) => {
            const CardIcon = card.icon;
            const className = `group relative flex min-h-[168px] w-full min-w-0 flex-col justify-between overflow-hidden rounded-sm border border-gold/25 bg-primary-foreground/[0.035] p-4 shadow-[0_20px_60px_-30px_hsl(0_0%_0%/.8)] backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-gold hover:bg-primary-foreground/[0.075] ${
              card.tone === "tall" ? "sm:min-h-[220px]" : "sm:min-h-[190px]"
            }`;

            const content = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold/20 bg-gold/10 text-gold">
                    <CardIcon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-gold/55 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light/60">
                    {card.eyebrow}
                  </span>
                  <h2 className="mt-2 break-words font-heading text-xl font-semibold leading-tight text-primary-foreground">
                    {card.label}
                  </h2>
                  <p className="mt-2 line-clamp-4 break-words text-xs leading-relaxed text-gold-light/70">
                    {card.text}
                  </p>
                </div>
                <span className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-gold/70 via-gold/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </>
            );

            return card.external ? (
              <motion.a
                key={card.label}
                href={card.to}
                target="_blank"
                rel="noopener noreferrer"
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
          className="border-t border-gold/15 py-5 text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-light/60 transition-colors hover:text-gold"
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
