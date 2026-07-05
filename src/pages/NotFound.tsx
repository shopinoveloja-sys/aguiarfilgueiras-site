import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { applySeo } from "@/lib/seo";

const SITE_URL = "https://aguiarfilgueiras.com.br";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    applySeo({
      title: "Pagina nao encontrada | Aguiar Filgueiras Advocacia",
      description: "A pagina solicitada nao foi encontrada.",
      canonicalUrl: `${SITE_URL}/`,
      robots: "noindex, nofollow",
    });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-6">
      <div className="max-w-lg text-center">
        <h1 className="mb-4 font-heading text-4xl font-bold text-primary">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Esta pagina nao esta mais disponivel.</p>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          Se voce procura atendimento em Direito Militar, use o acesso abaixo para voltar ao site
          principal e encontrar a area mais proxima do seu caso.
        </p>
        <a href="/" className="text-sm font-semibold text-primary underline hover:text-accent">
          Voltar para a pagina inicial
        </a>
      </div>
    </div>
  );
};

export default NotFound;
