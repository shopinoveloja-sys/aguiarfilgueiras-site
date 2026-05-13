import { motion } from "framer-motion";
import { Calendar, MessageSquareQuote, ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import founderImg from "@/assets/founder.jpg";

const articles = [
  {
    id: 1,
    date: "28 Fev 2026",
    category: "Direito Penal Militar",
    title: "Reforma do Código Penal Militar: o que muda para os militares da ativa",
    excerpt:
      "As recentes propostas de alteração do CPM trazem impactos significativos na tipificação de crimes militares e nos procedimentos processuais.",
    carlosComment:
      "Em mais de 35 anos acompanhando a Justiça Militar, vejo esta reforma como um momento decisivo. Os militares precisam de orientação jurídica especializada para entender como essas mudanças afetam diretamente suas carreiras e direitos.",
  },
  {
    id: 2,
    date: "15 Fev 2026",
    category: "Direito Previdenciário Militar",
    title: "Pensão militar: direitos dos dependentes após a reforma previdenciária",
    excerpt:
      "Entenda como a reforma da previdência alterou os critérios de concessão de pensão para dependentes de militares das Forças Armadas.",
    carlosComment:
      "Na minha experiência à frente de seções de inativos e pensionistas, posso afirmar que muitos militares e familiares desconhecem direitos importantes. A orientação preventiva pode evitar anos de litígio desnecessário.",
  },
  {
    id: 3,
    date: "02 Fev 2026",
    category: "Direito Disciplinar Militar",
    title: "Transgressões disciplinares: como garantir o direito à ampla defesa",
    excerpt:
      "Os procedimentos administrativos disciplinares exigem respeito estrito ao contraditório. Saiba como proteger seus direitos.",
    carlosComment:
      "O Direito Disciplinar Militar é uma das áreas mais sensíveis. Um processo mal conduzido pode encerrar prematuramente uma carreira promissora. A defesa técnica desde o início é fundamental.",
  },
];

const BlogSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section id="blog" className="bg-card py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Insights Jurídicos
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
            Blog &amp; Notícias sobre Direito Militar
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-16 bg-accent" />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Conteúdo exclusivo com análises do nosso fundador Carlos Filgueiras sobre temas
            relevantes do Direito Militar.
          </p>
        </motion.div>

        {/* Articles */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {articles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group flex flex-col overflow-hidden rounded-sm border border-border bg-background transition-all hover:border-accent hover:shadow-[var(--shadow-elegant)]"
            >
              {/* Category + Date */}
              <div className="flex items-center justify-between border-b border-border px-6 py-3">
                <span className="rounded-sm bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {article.date}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-lg font-semibold leading-snug text-primary group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>

                {/* Carlos Comment */}
                <div className="mt-6 rounded-sm border-l-2 border-accent/40 bg-cream p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <img
                      src={founderImg}
                      alt="Carlos Filgueiras"
                      className="h-8 w-8 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <span className="text-xs font-semibold text-primary">Carlos Filgueiras</span>
                      <span className="ml-1.5 text-[10px] text-muted-foreground">• Fundador</span>
                    </div>
                    <MessageSquareQuote className="ml-auto h-4 w-4 text-accent/50" />
                  </div>
                  <p className="text-xs italic leading-relaxed text-muted-foreground">
                    "{article.carlosComment}"
                  </p>
                </div>

                <a
                  href="#contato"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all hover:gap-3"
                >
                  Saiba mais <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-20 max-w-2xl rounded-sm bg-primary p-8 text-center sm:p-12"
        >
          <Mail className="mx-auto mb-4 h-8 w-8 text-gold" />
          <h3 className="font-heading text-2xl font-bold text-primary-foreground">
            Receba nossos conteúdos exclusivos
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-gold-light/70">
            Assine nossa newsletter e fique por dentro das novidades do Direito Militar,
            análises do Carlos Filgueiras e dicas jurídicas para militares.
          </p>

          {subscribed ? (
            <div className="mt-6 rounded-sm bg-accent/20 px-6 py-4">
              <p className="text-sm font-semibold text-gold">
                ✓ Inscrição realizada com sucesso! Em breve você receberá nossos conteúdos.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                maxLength={255}
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-sm border border-gold/20 bg-primary/50 px-5 py-3 text-sm text-primary-foreground placeholder:text-gold-light/40 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-sm bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
              >
                Assinar Newsletter
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
