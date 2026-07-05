import { motion } from "framer-motion";
import { Shield, Scale, Award } from "lucide-react";

const stats = [
  { icon: Shield, value: "35+", label: "Anos de vivencia militar" },
  { icon: Scale, value: "20+", label: "Anos de advocacia" },
  { icon: Award, value: "Brasil", label: "Atendimento virtual nacional" },
];

const AboutSection = () => {
  return (
    <section id="escritorio" className="bg-cream py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Quem Somos
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
              Escritorio de advocacia militar em Brasilia
            </h2>
            <div className="mt-2 h-[2px] w-16 bg-accent" />

            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              O Aguiar Filgueiras Advocacia atua com foco em Direito Militar, reunindo
              experiencia pratica na caserna e conhecimento juridico para casos que exigem
              rapidez, leitura tecnica dos regulamentos e estrategia de defesa.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              O escritorio atende demandas de Direito Penal Militar, Direito Administrativo
              Militar, Direito Disciplinar Militar e Direito Previdenciario Militar, tanto para
              militares da ativa quanto para familiares e pensionistas.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              A base presencial fica em Taguatinga, Brasilia/DF, com atendimento virtual para
              todo o Brasil em casos de IPM, sindicancia, licenciamento indevido, reforma por
              invalidez, pensao militar, punicoes disciplinares e questoes de carreira.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid gap-6 sm:grid-cols-3"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-sm bg-card p-8 text-center shadow-[var(--shadow-card)]"
              >
                <stat.icon className="mb-4 h-8 w-8 text-accent" />
                <span className="font-heading text-3xl font-bold text-primary">{stat.value}</span>
                <span className="mt-2 text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
