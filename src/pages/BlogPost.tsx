import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, MessageSquareQuote } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import founderImg from "@/assets/founder.jpg";
import { getBlogPostBySlug } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-24">
          <Link to="/#blog" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o blog
          </Link>
          <h1 className="mt-8 font-heading text-3xl font-bold text-primary">
            Artigo nao encontrado
          </h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-4xl px-6 py-16">
        <Link to="/#blog" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
          <ArrowLeft className="h-4 w-4" />
          Voltar para o blog
        </Link>

        <article className="mt-10">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="rounded-sm bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
          </div>

          <h1 className="mt-6 font-heading text-3xl font-bold leading-tight text-primary sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="my-10 rounded-sm border-l-2 border-accent/50 bg-cream p-6">
            <div className="mb-3 flex items-center gap-3">
              <img
                src={founderImg}
                alt="Carlos Filgueiras"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <span className="block text-sm font-semibold text-primary">Carlos Filgueiras</span>
                <span className="text-xs text-muted-foreground">Fundador</span>
              </div>
              <MessageSquareQuote className="ml-auto h-5 w-5 text-accent/60" />
            </div>
            <p className="text-sm italic leading-relaxed text-muted-foreground">
              "{post.carlosComment}"
            </p>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-foreground/80">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <Link
              to="/#contato"
              className="inline-flex items-center rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
            >
              Falar com o escritorio
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
