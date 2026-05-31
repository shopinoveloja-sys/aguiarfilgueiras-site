import { motion } from "framer-motion";
import { Calendar, MessageSquareQuote, ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import founderImg from "@/assets/founder.jpg";
import { blogPosts } from "@/data/blogPosts";

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Insights Juridicos
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
            Blog &amp; Noticias sobre Direito Militar
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-16 bg-accent" />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Conteudo exclusivo com analises do nosso fundador Carlos Filgueiras sobre temas
            relevantes do Direito Militar.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {blogPosts.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group flex flex-col overflow-hidden rounded-sm border border-border bg-background transition-all hover:border-accent hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-3">
                <span className="rounded-sm bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {article.date}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-lg font-semibold leading-snug text-primary transition-colors group-hover:text-accent">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>

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
                      <span className="ml-1.5 text-[10px] text-muted-foreground">- Fundador</span>
                    </div>
                    <MessageSquareQuote className="ml-auto h-4 w-4 text-accent/50" />
                  </div>
                  <p className="text-xs italic leading-relaxed text-muted-foreground">
                    "{article.carlosComment}"
                  </p>
                </div>

                <Link
                  to={`/blog/${article.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all hover:gap-3"
                >
                  Saiba mais <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-sm border border-accent px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Ver biblioteca por topicos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-20 max-w-2xl rounded-sm bg-primary p-8 text-center sm:p-12"
        >
          <Mail className="mx-auto mb-4 h-8 w-8 text-gold" />
          <h3 className="font-heading text-2xl font-bold text-primary-foreground">
            Receba nossos conteudos exclusivos
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-gold-light/70">
            Assine nossa newsletter e fique por dentro das novidades do Direito Militar,
            analises do Carlos Filgueiras e dicas juridicas para militares.
          </p>

          {subscribed ? (
            <div className="mt-6 rounded-sm bg-accent/20 px-6 py-4">
              <p className="text-sm font-semibold text-gold">
                Inscricao realizada com sucesso. Em breve voce recebera nossos conteudos.
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
