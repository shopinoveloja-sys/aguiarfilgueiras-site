import posts from "./blogPosts.json";

export type BlogPost = {
  id: number;
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  carlosComment: string;
  content: string[];
};

export const blogPosts = posts as BlogPost[];

export const getBlogPostBySlug = (slug: string | undefined) =>
  blogPosts.find((post) => post.slug === slug);

export const getRelatedServiceSlugsForPost = (slug: string | undefined) => {
  switch (slug) {
    case "reforma-codigo-penal-militar":
      return ["direito-penal-militar", "defesa-em-ipm", "processo-administrativo-militar"];
    case "pensao-militar-direitos-dependentes":
      return ["pensao-militar", "abate-teto-pensao-militar", "advogado-direito-militar"];
    case "transgressoes-disciplinares-ampla-defesa":
      return ["punicao-disciplinar-militar", "processo-administrativo-militar", "exclusao-das-forcas-armadas"];
    default:
      return ["advogado-direito-militar", "advogado-militar-brasilia"];
  }
};
