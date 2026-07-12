import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { Article } from "@/lib/articles";

export function FeaturedCard({ article }: { article: Article }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card"
    >
      <Link
        to="/blogs/$slug"
        params={{ slug: article.slug }}
        className="grid gap-0 md:grid-cols-[1.05fr_1fr]"
      >
        <div
          className="relative min-h-[220px] overflow-hidden md:min-h-[380px]"
          style={{ background: article.cover.gradient }}
        >
          <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(oklch(0_0_0/.3)_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute left-6 top-6 flex items-center gap-2">
            <span className="rounded-full border border-black/10 bg-white/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/90 backdrop-blur">
              Featured
            </span>
            <span className="rounded-full border border-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/90">
              {article.category}
            </span>
          </div>
          <div className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-[0.2em] text-black/80">
            {article.cover.label}
          </div>
        </div>

        <div className="flex flex-col justify-between p-7 md:p-9">
          <div>
            <h2 className="font-serif text-3xl font-medium leading-[1.15] tracking-tight text-heading md:text-4xl">
              {article.title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              {article.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-5">
            <div className="text-xs text-muted-foreground">
              <span className="font-medium text-heading">{article.author}</span>
              <span className="mx-2">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readingTime} min read
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-all group-hover:text-heading group-hover:translate-x-0.5">
              Read article <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
