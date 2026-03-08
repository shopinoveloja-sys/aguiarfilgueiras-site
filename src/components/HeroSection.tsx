import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Forças Armadas e segurança pública do Brasil - Direito Militar" className="h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8 h-[2px] bg-gold"
          />

          <h1 className="font-heading text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Mais de 35 anos de{" "}
            <span className="text-gradient-gold">experiência</span> em Direito Militar
          </h1>
          <p className="sr-only">Aguiar Filgueiras Advocacia - Escritório especializado em Direito Penal Militar, Administrativo, Disciplinar e Previdenciário Militar em Brasília-DF</p>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-gold-light/80">
            Advocacia e consultoria especializada nas áreas de Direito Penal, Administrativo, 
            Disciplinar e Previdenciário Militar.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#areas"
              className="inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
            >
              Áreas de Atuação
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-sm border border-gold/30 px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:border-gold/60"
            >
              Fale Conosco
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
