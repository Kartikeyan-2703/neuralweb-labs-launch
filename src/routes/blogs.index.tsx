import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { getAllArticles } from "@/lib/articles";
import { FeaturedCard } from "@/components/site/FeaturedCard";
import { ArticleCard } from "@/components/site/ArticleCard";
import { Filters } from "@/components/site/Filters";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/blogs/")({
  component: Home,
});

function Home() {
  const all = getAllArticles();
  const featured = all.find((a) => a.featured) ?? all[0];
  const rest = all.filter((a) => a.slug !== featured?.slug);

  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rest.filter((a) => {
      const inCat = category === "All" || a.category === category || a.tags.includes(category);
      if (!inCat) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [rest, category, query]);

  return (
    <div className="blog-theme bg-background text-foreground min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden grain-bg">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-20 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur"
          >
            NeuralWeb Labs · Publication
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-6 max-w-4xl text-[42px] font-semibold leading-[1.05] tracking-[-0.03em] text-heading md:text-6xl"
          >
            NeuralWeb Labs{" "}
            <span className="text-heading">
              Blog
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-[17px]"
          >
            Learn about AI, LLMs, backend development, cloud computing, system design,
            and emerging technologies through practical articles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-muted-foreground backdrop-blur transition-all duration-500 hover:border-primary/50 hover:text-heading"
            >
              Read latest articles <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="https://neuralweblabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-primary/50"
            >
              Visit NeuralWeb Labs <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="mt-14 flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>Topics we cover:</span>
            <div className="hidden flex-1 border-t border-border md:block" />
            <div className="hidden gap-6 md:flex">
              <span>AI Systems</span>
              <span>Backend</span>
              <span>Cloud</span>
              <span>System Design</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured && (
        <section className="mx-auto max-w-6xl px-5">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-heading">Featured</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Editor's pick
            </span>
          </div>
          <FeaturedCard article={featured} />
        </section>
      )}

      {/* LATEST + FILTERS */}
      <section id="latest" className="mx-auto mt-20 max-w-6xl px-5">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-heading">Latest articles</h2>
          <Link to="/blogs" className="text-xs font-medium text-muted-foreground hover:text-heading">
            Browse all →
          </Link>
        </div>

        <Filters active={category} onActive={setCategory} query={query} onQuery={setQuery} />

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a, i) => <ArticleCard key={a.slug} article={a} index={i} />)}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            No articles match your filters yet.
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
