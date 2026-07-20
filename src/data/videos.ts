export type VideoItem = {
  id: number;
  slug: string;
  title: string;
  intro: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  thumbnailUrl: string;
  theme: string;
  category: string;
  publishedDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
};

export const videoLibrary: VideoItem[] = [
  {
    id: 1,
    slug: "direito-militar-duvidas-comuns",
    title: "Direito Militar: duvidas mais comuns sobre direitos, punicoes e defesa",
    intro:
      "Carlos Filgueiras apresenta, de forma objetiva, duvidas recorrentes sobre Direito Militar, processo disciplinar, deveres funcionais e momentos em que a defesa tecnica faz diferenca.",
    description:
      "Video introdutorio sobre Direito Militar para militares da ativa, reserva, familiares e quem busca orientacao inicial sobre direitos, punicoes disciplinares e defesa administrativa.",
    youtubeUrl: "https://youtu.be/1ZoJq4T7mA8",
    youtubeId: "1ZoJq4T7mA8",
    thumbnailUrl: "https://i.ytimg.com/vi/1ZoJq4T7mA8/maxresdefault.jpg",
    theme: "Direito Militar",
    category: "Videos juridicos",
    seoTitle: "Video sobre Direito Militar | Duvidas comuns sobre direitos, punicoes e defesa",
    seoDescription:
      "Assista ao video do escritorio Aguiar Filgueiras Advocacia sobre duvidas comuns em Direito Militar, punicoes disciplinares e defesa tecnica.",
    keywords: [
      "direito militar",
      "advogado militar",
      "punicao disciplinar militar",
      "processo administrativo militar",
      "defesa militar",
      "video direito militar",
    ],
  },
];

export const getVideoBySlug = (slug: string | undefined) => videoLibrary.find((video) => video.slug === slug);
