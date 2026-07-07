import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Quando vale procurar um advogado militar?",
    answer:
      "O ideal e buscar orientacao assim que surgir notificacao, punicao, sindicancia, IPM, licenciamento, problema de saude com reflexo funcional ou qualquer prazo para defesa ou recurso.",
  },
  {
    question: "O escritorio atende apenas Brasilia?",
    answer:
      "Nao. O Aguiar Filgueiras Advocacia atende presencialmente em Taguatinga e virtualmente militares, pensionistas e familiares de todo o Brasil.",
  },
  {
    question: "Quais documentos ajudam na primeira analise?",
    answer:
      "Notificacao recebida, boletim, portaria, decisao, ficha funcional, contracheques, laudos, exames, mensagens e nomes de testemunhas costumam ajudar bastante na triagem inicial.",
  },
  {
    question: "Punicao disciplinar pequena tambem merece atencao?",
    answer:
      "Sim. Mesmo medidas consideradas leves podem afetar conceito, promocao, escala, permanencia e historico funcional, especialmente quando ha reincidencia ou prazo curto para reagir.",
  },
];

const HomeFaqSection = () => {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Duvidas frequentes
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
            O que o militar mais precisa saber antes de agir
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Estas sao algumas das perguntas que costumam surgir logo no inicio, especialmente
            quando existe prazo curto, notificacao recebida ou necessidade de reunir documentos.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <motion.article
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-sm border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <h3 className="font-heading text-xl font-semibold text-primary">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/advogado-direito-militar"
            className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
          >
            Entender como funciona a analise inicial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent hover:text-accent"
          >
            Ver artigos por tema
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFaqSection;
