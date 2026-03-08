import { motion } from "framer-motion";
import { Shield, Scale, Award } from "lucide-react";

const stats = [
  { icon: Shield, value: "35+", label: "Anos de vivência militar" },
  { icon: Scale, value: "20+", label: "Anos de advocacia" },
  { icon: Award, value: "100%", label: "Dedicação ao cliente" },
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
              Escritório de Advocacia Militar
            </h2>
            <div className="mt-2 h-[2px] w-16 bg-accent" />

            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Bem-vindo ao Aguiar Filgueiras Advocacia, onde a expertise em Direito Militar
              encontra-se com mais de 35 anos de vivência na caserna das FFAA.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Nosso compromisso é oferecer advocacia e consultoria especializadas nas áreas de
              Direito Penal Militar, Direito Administrativo Militar, Direito Disciplinar Militar e
              Direito Previdenciário Militar.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Realizamos atendimento virtualmente para todo Brasil. Conte conosco para soluções
              jurídicas sólidas e dedicadas às necessidades específicas de nosso público.
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
