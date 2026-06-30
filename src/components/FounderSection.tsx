import { motion } from "framer-motion";
import founderImg from "@/assets/founder.jpg";
import { trackSocialClick } from "@/lib/analytics";

const FounderSection = () => {
  return (
    <section id="fundador" className="bg-navy py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto max-w-sm lg:mx-0"
          >
            <div className="absolute -inset-3 rounded-sm border border-gold/20" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-gradient-to-br from-primary via-navy to-gold/20 shadow-[0_30px_80px_-45px_hsl(0_0%_0%/.9)]">
              <img
                src={founderImg}
                alt="Carlos Filgueiras - Advogado Militar e Sócio Fundador do escritório Aguiar Filgueiras Advocacia"
                className="h-full w-full object-cover object-[52%_45%]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-gold/10 mix-blend-multiply" />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Sócio Fundador
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">
              Carlos Filgueiras
            </h2>
            <div className="mt-2 h-[2px] w-16 bg-gold" />

            <p className="mt-8 text-base leading-relaxed text-gold-light/70">
              Na ativa do Exército era conhecido como Capitão Aguiar. Graduado em Direito desde
              2002, aprovado na OAB desde 2003, com especializações em Direito Militar,
              Administração Pública e Direito Público.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gold-light/70">
              Na ativa, foi responsável por seções de inativos e pensionistas civis e militares, de
              pagamento de pessoal, de fundo de saúde e seções de pessoal.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="https://www.instagram.com/carlosfilgueiras.adv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackSocialClick({
                    socialNetwork: "instagram",
                    linkUrl: "https://www.instagram.com/carlosfilgueiras.adv",
                    buttonText: "Instagram",
                    placement: "founder_section",
                  })
                }
                className="text-sm text-gold hover:underline"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/carlos-filgueiras-992396154/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackSocialClick({
                    socialNetwork: "linkedin",
                    linkUrl: "https://www.linkedin.com/in/carlos-filgueiras-992396154/",
                    buttonText: "LinkedIn",
                    placement: "founder_section",
                  })
                }
                className="text-sm text-gold hover:underline"
              >
                LinkedIn
              </a>
              <a
                href="https://www.facebook.com/carlosfilgueiras.adv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackSocialClick({
                    socialNetwork: "facebook",
                    linkUrl: "https://www.facebook.com/carlosfilgueiras.adv",
                    buttonText: "Facebook",
                    placement: "founder_section",
                  })
                }
                className="text-sm text-gold hover:underline"
              >
                Facebook
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
