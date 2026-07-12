import { ExternalLink } from "lucide-react";
import type { Source } from "@/lib/articles";

export function Sources({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  return (
    <section className="mt-14 border-t border-border pt-10">
      <h2 className="text-lg font-semibold text-heading">Sources</h2>
      <ul className="mt-5 space-y-2">
        {sources.map((s) => {
          let host = "";
          try { host = new URL(s.url).hostname; } catch {}
          return (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 transition-colors hover:border-primary/50 hover:bg-card"
              >
                {host && (
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${host}&sz=64`}
                    alt=""
                    loading="lazy"
                    className="h-5 w-5 rounded-sm"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-heading">{s.title}</p>
                  <p className="truncate text-[11px] uppercase tracking-wider text-muted-foreground">
                    {s.name}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
