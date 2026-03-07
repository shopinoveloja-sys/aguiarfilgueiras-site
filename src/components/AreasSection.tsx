import { motion } from "framer-motion";
import { Gavel, FileText, Building2, HeartPulse, Users } from "lucide-react";

const areas = [
  {
    icon: Gavel,
    title: "Direito Penal Militar",
    desc: "Expertise incomparável com mais de três décadas de atuação na defesa de militares em processos penais.",
  },
  {
    icon: FileText,
    title: "Direito Disciplinar Militar",
    desc: "Aliado estratégico dos militares na esfera desafiadora do Direito Disciplinar.",
  },
  {
    icon: Building2,
    title: "Direito Administrativo Militar",
    desc: "Referência de excelência e comprometimento na seara administrativa militar.",
  },
  {
    icon: HeartPulse,
    title: "Direito Previdenciário Militar",
    desc: "Suporte jurídico sólido e dedicado nas questões previdenciárias dos militares.",
  },
  {
    icon: Users,
    title: "Outras Áreas (Parcerias)",
    desc: "Serviços expandidos para atender às diversas necessidades jurídicas da família militar.",
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
            Áreas de Atuação
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-16 bg-accent" />
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-sm border border-border bg-background p-8 transition-all hover:border-accent hover:shadow-[var(--shadow-elegant)]"
            >
              <area.icon className="mb-5 h-8 w-8 text-accent transition-transform group-hover:scale-110" />
              <h3 className="font-heading text-xl font-semibold text-primary">{area.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{area.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreasSection;
