import { useEffect, useState } from "react";

interface Heading { id: string; text: string; level: number }

export function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    // Extract H2/H3 from markdown source
    const lines = content.split("\n");
    const hs: Heading[] = [];
    for (const l of lines) {
      const m = /^(##|###)\s+(.+?)\s*$/.exec(l);
      if (!m) continue;
      const level = m[1].length;
      const text = m[2].replace(/[`*_]/g, "");
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
      hs.push({ id, text, level });
    }
    setHeadings(hs);
  }, [content]);

  useEffect(() => {
    if (!headings.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: [0, 1] },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [headings]);

  if (!headings.length) return null;
  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-border">
        {headings.map((h) => {
          const isActive = active === h.id;
          return (
            <li key={h.id} style={{ paddingLeft: h.level === 3 ? 20 : 12 }}>
              <a
                href={`#${h.id}`}
                className={
                  "relative -ml-px block border-l-2 py-0.5 pl-3 text-[13px] leading-snug transition-colors " +
                  (isActive
                    ? "border-primary text-heading"
                    : "border-transparent text-muted-foreground hover:text-heading")
                }
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
