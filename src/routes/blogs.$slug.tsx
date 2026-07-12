import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ShieldCheck, ArrowLeft, Share2, Link2, Check } from "lucide-react";
import { getArticle, getRelated } from "@/lib/articles";
import { MarkdownArticle } from "@/components/site/MarkdownArticle";
import { TableOfContents } from "@/components/site/TableOfContents";
import { AuthorCard } from "@/components/site/AuthorCard";
import { Sources } from "@/components/site/Sources";
import { RelatedArticles } from "@/components/site/RelatedArticles";
import { ReadingProgress } from "@/components/site/ReadingProgress";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article — NeuralWeb Labs" }, { name: "robots", content: "noindex" }] };
    }
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title} — NeuralWeb Labs Engineering` },
        { name: "description", content: a.description },
        { name: "author", content: a.author },
        { property: "article:published_time", content: a.publishedAt },
        { property: "article:modified_time", content: a.updatedAt },
        { property: "article:section", content: a.category },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blogs/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: a.title },
        { name: "twitter:description", content: a.description },
      ],
      links: [{ rel: "canonical", href: `/blogs/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.description,
            author: { "@type": "Person", name: a.author },
            datePublished: a.publishedAt,
            dateModified: a.updatedAt,
            publisher: { "@type": "Organization", name: "NeuralWeb Labs" },
            mainEntityOfPage: `/blogs/${params.slug}`,
            keywords: a.tags.join(", "),
            articleSection: a.category,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Articles", item: "/blogs" },
              { "@type": "ListItem", position: 3, name: a.title, item: `/blogs/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-5 py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-heading">Article not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">This article may have been moved or deleted.</p>
      <Link to="/blogs" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to articles
      </Link>
    </div>
  ),
});

const difficultyStyles: Record<string, string> = {
  Beginner: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  Intermediate: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  Advanced: "border-rose-500/40 bg-rose-500/10 text-rose-400",
};

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = getRelated(article.slug);
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try { await navigator.share({ title: article.title, url }); } catch {}
      return;
    }
    copyLink();
  };
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="blog-theme bg-background text-foreground min-h-screen">
      <ReadingProgress />

      <article className="mx-auto max-w-6xl px-5 pt-12 md:pt-16">
        <Link to="/blogs" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-heading">
          <ArrowLeft className="h-3.5 w-3.5" /> All articles
        </Link>

        <header className="mt-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
              {article.category}
            </span>
            <span className={`rounded-full border px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${difficultyStyles[article.difficulty]}`}>
              {article.difficulty}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
              <ShieldCheck className="h-3 w-3" /> Verified {article.lastVerified}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-5 font-serif text-4xl font-medium leading-[1.15] tracking-[-0.01em] text-heading md:text-6xl"
          >
            {article.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-[17px] leading-relaxed text-muted-foreground"
          >
            {article.description}
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> Published {fmt(article.publishedAt)}</span>
            <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> Updated {fmt(article.updatedAt)}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readingTime} min read</span>
            <div className="ml-auto flex items-center gap-1.5">
              <button onClick={share} className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-accent hover:text-heading">
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
              <button onClick={copyLink} className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-accent hover:text-heading">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy link"}
              </button>
            </div>
          </div>
        </header>

        {/* Cover */}
        <div
          className="relative mt-8 h-56 overflow-hidden rounded-3xl border border-border md:h-80"
          style={{ background: article.cover.gradient }}
        >
          <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(oklch(1_0_0/.2)_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="absolute bottom-5 left-6 font-mono text-xs uppercase tracking-[0.22em] text-white/90">
            {article.cover.label}
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="min-w-0">
            <div className="container-prose !mx-0 !px-0">
              <MarkdownArticle content={article.content} />

              <div className="mt-10 flex flex-wrap gap-1.5">
                {article.tags.map((t: string) => (
                  <span key={t} className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    #{t}
                  </span>
                ))}
              </div>

              <Sources sources={article.sources} />

              <div className="mt-14">
                {/* Author Card Component */}
                <AuthorCard authorName={article.author} />
              </div>


            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents content={article.content} />
            </div>
          </aside>
        </div>

        <RelatedArticles items={related} />
      </article>
      <Footer />
    </div>
  );
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
