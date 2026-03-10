import { motion } from "framer-motion";
import { Phone, Mail, Globe, Instagram, MapPin, FileText, Scale } from "lucide-react";
import founderImg from "@/assets/founder.jpg";

const links = [
  {
    icon: Phone,
    label: "WhatsApp",
    desc: "Fale diretamente conosco",
    href: "https://wa.me/5561981833328",
  },
  {
    icon: Globe,
    label: "Site Oficial",
    desc: "aguiarfilgueiras.com.br",
    href: "https://chic-web-evolve.lovable.app",
  },
  {
    icon: Mail,
    label: "E-mail",
    desc: "contato@aguiarfilgueiras.com.br",
    href: "mailto:contato@aguiarfilgueiras.com.br",
  },
  {
    icon: Instagram,
    label: "Instagram",
    desc: "@aguiarfilgueiras.adv",
    href: "https://instagram.com/aguiarfilgueiras.adv",
  },
  {
    icon: Scale,
    label: "Áreas de Atuação",
    desc: "Conheça nossas especialidades",
    href: "https://chic-web-evolve.lovable.app/#areas",
  },
  {
    icon: FileText,
    label: "Blog Jurídico",
    desc: "Artigos e publicações",
    href: "https://chic-web-evolve.lovable.app/#blog",
  },
  {
    icon: MapPin,
    label: "Localização",
    desc: "CNB 3 – Taguatinga Norte, Brasília/DF",
    href: "https://maps.google.com/?q=CNB+3+Taguatinga+Norte+Brasilia+DF",
  },
];

const Links = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="h-28 w-28 rounded-full border-2 border-accent overflow-hidden mb-4 shadow-lg">
            <img
              src={founderImg}
              alt="Dr. Carlos Filgueiras"
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="font-heading text-2xl font-bold text-primary-foreground">
            Aguiar Filgueiras
          </h1>
          <p className="text-sm text-gold-light tracking-[0.15em] uppercase mt-1">
            Advocacia Militar &amp; Criminal
          </p>
          <p className="text-xs text-muted-foreground mt-2 max-w-[280px]">
            Defesa especializada para militares em Brasília e em todo o Brasil.
          </p>
        </motion.div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
              className="group flex items-center gap-4 rounded-sm border border-accent/20 bg-card/5 backdrop-blur-sm px-5 py-4 transition-all hover:border-accent/60 hover:bg-card/10"
            >
              <link.icon className="h-5 w-5 shrink-0 text-accent" />
              <div className="flex-1 min-w-0">
                <span className="block text-sm font-semibold text-primary-foreground group-hover:text-accent transition-colors">
                  {link.label}
                </span>
                <span className="block text-xs text-gold-light/70 truncate">
                  {link.desc}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 text-center text-[10px] text-gold-light/40 tracking-wider uppercase"
        >
          © {new Date().getFullYear()} Aguiar Filgueiras Advocacia
        </motion.p>
      </div>
    </div>
  );
};

export default Links;
