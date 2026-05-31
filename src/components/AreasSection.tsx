import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, FileText, Gavel, HeartPulse, Users } from "lucide-react";

const areas = [
  {
    icon: Gavel,
    title: "Direito Penal Militar",
    desc: "Defesa tecnica de militares em IPM, acao penal militar e acusacoes baseadas no Codigo Penal Militar.",
    href: "/direito-penal-militar",
  },
  {
    icon: FileText,
    title: "Direito Disciplinar Militar",
    desc: "Atuacao em punicoes, sindicancias, recursos disciplinares e procedimentos que afetam a carreira.",
    href: "/punicao-disciplinar-militar",
  },
  {
    icon: Building2,
    title: "Defesa em IPM",
    desc: "Orientacao desde o inicio do inquerito policial militar para reduzir riscos penais e funcionais.",
    href: "/defesa-em-ipm",
  },
  {
    icon: HeartPulse,
    title: "Direito Previdenciario Militar",
    desc: "Analise de reforma, invalidez, pensao militar, abate-teto e direitos de familiares.",
    href: "/advogado-direito-militar",
  },
  {
    icon: Users,
    title: "Advogado Militar em Brasilia",
    desc: "Atendimento em Brasilia/DF e orientacao virtual para militares, pensionistas e familiares em todo o Brasil.",
    href: "/advogado-militar-brasilia",
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
            Areas de Atuacao em Direito Militar
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-16 bg-accent" />
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => (
            <motion.div
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
                to={area.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all hover:gap-3"
              >
                Ver orientacao <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AreasSection;
