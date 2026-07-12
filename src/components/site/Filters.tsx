import { CATEGORIES } from "@/lib/articles";
import { Search } from "lucide-react";

interface Props {
  active: string;
  onActive: (c: string) => void;
  query: string;
  onQuery: (q: string) => void;
}

export function Filters({ active, onActive, query, onQuery }: Props) {
  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search articles, topics, tags…"
          className="w-full rounded-xl border border-border bg-card/80 py-3 pl-11 pr-4 text-sm text-heading placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-4 focus:ring-primary/15"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const isActive = active === c;
          return (
            <button
              key={c}
              onClick={() => onActive(c)}
              className={
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all " +
                (isActive
                  ? "border-primary/60 bg-primary/15 text-primary shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-primary)_12%,transparent)]"
                  : "border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-heading")
              }
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}
