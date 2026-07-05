import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AreasSection from "@/components/AreasSection";
import FounderSection from "@/components/FounderSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import HomeFaqSection from "@/components/HomeFaqSection";
import { applySeo, setJsonLd } from "@/lib/seo";

const SITE_URL = "https://aguiarfilgueiras.com.br";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const Index = () => {
  useEffect(() => {
    applySeo({
      title: "Advogado Militar em Brasilia e Atendimento Nacional | Aguiar Filgueiras",
      description:
        "Escritorio de advocacia militar em Brasilia com atendimento nacional para IPM, punicao disciplinar, sindicancia, conselho de disciplina, licenciamento indevido, junta medica e pensao militar.",
      canonicalUrl: `${SITE_URL}/`,
      keywords:
        "advogado militar brasilia, advogado criminal militar, advogado direito militar, punicao disciplinar militar, sindicancia militar, conselho de disciplina militar, IPM, junta medica militar, licenciamento indevido militar, pensao militar, reforma militar por invalidez",
      image: DEFAULT_IMAGE,
    });

    setJsonLd("home-page-jsonld", [
      {
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: "Aguiar Filgueiras Advocacia",
        url: `${SITE_URL}/`,
        image: DEFAULT_IMAGE,
        description:
          "Escritorio de advocacia especializado em Direito Militar, com atendimento em Brasilia e online para todo o Brasil.",
        telephone: "+55-61-98183-3328",
        email: "contato@aguiarfilgueiras.com.br",
        areaServed: "Brasil",
        address: {
          "@type": "PostalAddress",
          streetAddress: "CNB 3, Taguatinga",
          addressLocality: "Brasilia",
          addressRegion: "DF",
          postalCode: "72115-035",
          addressCountry: "BR",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Quando vale procurar um advogado militar?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "O ideal e buscar orientacao assim que surgir notificacao, punicao, sindicancia, IPM, licenciamento, problema de saude com reflexo funcional ou qualquer prazo para defesa ou recurso.",
            },
          },
          {
            "@type": "Question",
            name: "O escritorio atende apenas Brasilia?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Nao. O Aguiar Filgueiras Advocacia atende presencialmente em Taguatinga e virtualmente militares, pensionistas e familiares de todo o Brasil.",
            },
          },
          {
            "@type": "Question",
            name: "Quais documentos ajudam na primeira analise?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Notificacao recebida, boletim, portaria, decisao, ficha funcional, contracheques, laudos, exames, mensagens e nomes de testemunhas costumam ajudar bastante na triagem inicial.",
            },
          },
        ],
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <AreasSection />
      <FounderSection />
      <HomeFaqSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
