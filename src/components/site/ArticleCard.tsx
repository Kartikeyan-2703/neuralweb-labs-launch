import { Link } from "@tanstack/react-router";
import { Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import type { Article } from "@/lib/articles";

export function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
    >
      <Link
        to="/blogs/$slug"
        params={{ slug: article.slug }}
        className="flex h-full flex-col"
      >
        <div
          className="relative h-40 w-full overflow-hidden"
          style={{ background: article.cover.gradient }}
        >
          <div className="absolute inset-0 opacity-40 mix-blend-overlay [background-image:radial-gradient(oklch(0_0_0/.2)_1px,transparent_1px)] [background-size:14px_14px]" />
          <div className="absolute bottom-3 left-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-black/80">
            {article.cover.label}
          </div>
          <div className="absolute right-3 top-3 rounded-full border border-black/10 bg-white/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-black/90 backdrop-blur">
            {article.category}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-serif text-xl font-medium leading-[1.25] text-heading transition-colors group-hover:text-primary">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {article.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
            <span className="font-medium text-heading">{article.author}</span>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readingTime} min
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
