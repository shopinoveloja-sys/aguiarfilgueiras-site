import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "O Escritório", href: "#escritorio" },
  { label: "Áreas de Atuação", href: "#areas" },
  { label: "Fundador", href: "#fundador" },
  { label: "Contato", href: "#contato" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary py-2">
        <div className="container mx-auto flex items-center justify-center gap-4 text-sm text-gold-light">
          <span>Atendimento virtual para todo Brasil</span>
          <a
            href="https://wa.me/5561981833328"
            className="flex items-center gap-1 text-gold hover:underline"
          >
            <Phone className="h-3 w-3" />
            (61) 98183-3328
          </a>
        </div>
      </div>

      {/* Main nav */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md"
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="#inicio" className="font-heading text-2xl font-bold tracking-wide text-primary">
            Aguiar Filgueiras
            <span className="block text-xs font-body font-normal tracking-[0.3em] uppercase text-muted-foreground">
              Advocacia
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
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

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-primary"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
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
