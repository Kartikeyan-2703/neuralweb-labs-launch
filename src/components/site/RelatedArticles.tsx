import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/lib/articles";

export function RelatedArticles({ items }: { items: Article[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-16 border-t border-border pt-12">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold text-heading">Related articles</h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Continue reading</span>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((a, i) => <ArticleCard key={a.slug} article={a} index={i} />)}
      </div>
    </section>
  );
}
