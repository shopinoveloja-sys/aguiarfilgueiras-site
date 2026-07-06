import { motion } from "framer-motion";
import { ArrowRight, Building2, FileText, Gavel, HeartPulse, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { servicePages } from "@/data/servicePages";

const areas = [
  {
    icon: Gavel,
    title: "Direito Penal Militar",
    desc: "Defesa em crimes militares, IPM, oitivas, interrogatorios e acusacoes com reflexo direto na carreira.",
    to: "/direito-penal-militar",
  },
  {
    icon: FileText,
    title: "Direito Disciplinar Militar",
    desc: "Orientacao e defesa em punicao disciplinar, recurso, ampla defesa e preservacao do historico funcional.",
    to: "/punicao-disciplinar-militar",
  },
  {
    icon: Building2,
    title: "Direito Administrativo Militar",
    desc: "Atuacao em sindicancia, processo administrativo militar, exclusao, licenciamento e promocao preterida.",
    to: "/processo-administrativo-militar",
  },
  {
    icon: HeartPulse,
    title: "Direito Previdenciario Militar",
    desc: "Reforma por invalidez, pensao militar, abate-teto e casos com inspecao de saude ou incapacidade.",
    to: "/reforma-militar-por-invalidez",
  },
  {
    icon: Users,
    title: "Familiares e pensionistas",
    desc: "Atendimento a dependentes e pensionistas em duvidas de habilitacao, revisao de valores e documentacao.",
    to: "/pensao-militar",
  },
];

const AreasSection = () => {
  return (
    <section id="areas" className="bg-card py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Especialidades
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
            Areas de atuacao em Direito Militar
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-16 bg-accent" />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Cada area abaixo leva para uma pagina propria, com explicacao mais detalhada sobre
            sintomas do problema, documentos uteis e primeiros passos.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => (
            <motion.article
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-sm border border-border bg-background p-8 transition-all hover:border-accent hover:shadow-[var(--shadow-elegant)]"
            >
              <area.icon className="mb-5 h-8 w-8 text-accent transition-transform group-hover:scale-110" />
              <h3 className="font-heading text-xl font-semibold text-primary">{area.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.desc}</p>
              <Link
                to={area.to}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all hover:gap-3"
              >
                Entender esta area
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 rounded-sm border border-border bg-background p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-heading text-2xl font-bold text-primary">Casos e temas mais buscados</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Esta malha de links ajuda o visitante a chegar mais rapido ao tema certo e reforca para o Google
                quais assuntos o escritorio cobre com profundidade.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all hover:gap-3"
            >
              Ver biblioteca completa
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {servicePages.map((page) => (
              <Link
                key={page.slug}
                to={`/${page.slug}`}
                className="rounded-sm border border-border bg-card px-3 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
              >
                {page.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-sm border border-accent/20 bg-primary p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Buscas de alta intencao
              </span>
              <h3 className="mt-3 font-heading text-2xl font-bold text-primary-foreground">
                Temas para quem precisa agir agora
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gold-light/75">
                Este bloco prioriza pesquisas mais urgentes, como intimacao para IPM, problema de saude
                de militar temporario e defesa de policial militar.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Fui intimado para IPM",
                desc: "Orientacao inicial para depoimento, documentos e risco de investigacao penal militar.",
                to: "/intimado-para-ipm",
              },
              {
                title: "Militar temporario doente",
                desc: "Leitura tecnica sobre tratamento, licenciamento, incapacidade e medidas possiveis.",
                to: "/militar-temporario-doente",
              },
              {
                title: "Advogado para policial militar",
                desc: "Defesa em punicao disciplinar, sindicancia, IPM e casos com impacto direto na carreira.",
                to: "/advogado-para-policial-militar",
              },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-sm border border-gold/20 bg-primary-foreground/5 p-5 transition-colors hover:border-gold hover:bg-primary-foreground/10"
              >
                <h4 className="font-heading text-lg font-semibold text-primary-foreground">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-gold-light/75">{item.desc}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                  Ver pagina <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreasSection;
