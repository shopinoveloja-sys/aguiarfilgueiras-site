import { Link } from "react-router-dom";
import { trackSocialClick } from "@/lib/analytics";

const Footer = () => {
  return (
    <footer className="bg-primary py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div>
            <span className="font-heading text-lg font-bold text-primary-foreground">Aguiar Filgueiras</span>
            <span className="ml-2 text-xs uppercase tracking-[0.2em] text-gold-light/60">Advocacia</span>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-gold-light/55">
              Escritorio de advocacia militar em Brasilia, com atendimento virtual para todo o
              Brasil em casos disciplinares, administrativos, penais e previdenciarios militares.
            </p>
          </div>

          <div className="space-y-2 text-xs text-gold-light/70">
            <p>CNB 3, Taguatinga, Brasilia/DF, CEP 72115-035</p>
            <p>Seg. a Sab. das 9h as 12h e das 14h as 19h</p>
            <p>
              <a href="mailto:contato@aguiarfilgueiras.com.br" className="hover:text-gold">
                contato@aguiarfilgueiras.com.br
              </a>
              {"  "} | {"  "}
              <a href="https://wa.me/5561981833328" className="hover:text-gold">
                (61) 98183-3328
              </a>
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
              <a
                href="https://www.instagram.com/carlosfilgueiras.adv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackSocialClick({
                    socialNetwork: "instagram",
                    linkUrl: "https://www.instagram.com/carlosfilgueiras.adv",
                    buttonText: "Instagram",
                    placement: "footer",
                  })
                }
                className="text-gold-light/70 hover:text-gold"
              >
                Instagram
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
                    placement: "footer",
                  })
                }
                className="text-gold-light/70 hover:text-gold"
              >
                Facebook
              </a>
              <a
                href="https://www.youtube.com/@aguiarfilgueirasadvocacia"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackSocialClick({
                    socialNetwork: "youtube",
                    linkUrl: "https://www.youtube.com/@aguiarfilgueirasadvocacia",
                    buttonText: "YouTube",
                    placement: "footer",
                  })
                }
                className="text-gold-light/70 hover:text-gold"
              >
                YouTube
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
                    placement: "footer",
                  })
                }
                className="text-gold-light/70 hover:text-gold"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
              <Link to="/advogado-direito-militar" className="text-gold-light/55 hover:text-gold">
                Direito Militar
              </Link>
              <Link to="/atendimento-militar" className="text-gold-light/55 hover:text-gold">
                Atendimento por cidade
              </Link>
              <Link to="/blog" className="text-gold-light/55 hover:text-gold">
                Blog
              </Link>
              <Link to="/blog/videos" className="text-gold-light/55 hover:text-gold">
                Videos
              </Link>
              <Link to="/bio" className="text-gold-light/55 hover:text-gold">
                Bio
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
              <Link
                to="/politica-de-privacidade"
                className="text-gold-light/55 hover:text-gold"
              >
                Politica de Privacidade
              </Link>
              <Link to="/termos-de-uso" className="text-gold-light/55 hover:text-gold">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gold-light/40">
          Copyright {new Date().getFullYear()} Aguiar Filgueiras Advocacia. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
