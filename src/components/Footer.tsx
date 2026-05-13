const Footer = () => {
  return (
    <footer className="bg-primary py-10">
      <div className="container mx-auto px-6 text-center">
        <span className="font-heading text-lg font-bold text-primary-foreground">
          Aguiar Filgueiras
        </span>
        <span className="ml-2 text-xs uppercase tracking-[0.2em] text-gold-light/60">
          Advocacia
        </span>
        <p className="mt-4 text-xs text-gold-light/40">
          © {new Date().getFullYear()} Aguiar Filgueiras Advocacia. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
