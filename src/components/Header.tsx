import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import logoAf from "@/assets/aguiar-filgueiras-logo.png";
import { trackEvent } from "@/lib/analytics";

const navItems = [
  { label: "Inicio", href: "/#inicio" },
  { label: "O Escritorio", href: "/#escritorio" },
  { label: "Areas de Atuacao", href: "/#areas" },
  { label: "Fundador", href: "/#fundador" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/#contato" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="bg-primary py-2">
        <div className="container mx-auto flex items-center justify-center gap-4 text-sm text-gold-light">
          <span>Atendimento virtual para todo Brasil</span>
          <a
            href="https://wa.me/5561981833328"
            onClick={() => trackEvent("whatsapp_click", { cta_location: "top_bar" })}
            className="flex items-center gap-1 text-gold hover:underline"
          >
            <Phone className="h-3 w-3" />
            (61) 98183-3328
          </a>
        </div>
      </div>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md"
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <a href="/#inicio" className="flex items-center gap-3" aria-label="Aguiar Filgueiras Advocacia">
            <img
              src={logoAf}
              alt="Aguiar Filgueiras Advocacia"
              className="h-12 w-12 rounded-full object-cover shadow-sm ring-1 ring-border"
            />
            <span className="hidden font-heading text-xl font-bold tracking-wide text-primary sm:block">
              Aguiar Filgueiras
              <span className="block text-xs font-body font-normal uppercase tracking-[0.24em] text-muted-foreground">
                Advocacia
              </span>
            </span>
          </a>

          <nav aria-label="Menu principal" className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-primary md:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border bg-card md:hidden"
            >
              <div className="flex flex-col gap-4 px-6 py-6">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-accent"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
