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
