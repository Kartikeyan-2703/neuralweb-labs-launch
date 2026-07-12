import { useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { Check, Copy, Info, AlertTriangle, Lightbulb, CheckCircle2, Code as CodeIcon } from "lucide-react";

export function MarkdownArticle({ content }: { content: string }) {
  return (
    <div className="prose-article">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeHighlight, { detect: true, ignoreMissing: true }]]}
        components={{
          blockquote({ children }) {
            return <Callout>{children}</Callout>;
          },
          pre({ children }) {
            return <CodeBlock>{children as ReactNode}</CodeBlock>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

/** Parse the leading `**Tip:**` / `**Warning:**` etc. from a blockquote into a callout variant. */
function Callout({ children }: { children: ReactNode }) {
  const text = extractText(children).trim().toLowerCase();
  const map: Record<string, { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; color: string; label: string }> = {
    tip: { icon: Lightbulb, color: "oklch(0.72 0.14 205)", label: "Tip" },
    info: { icon: Info, color: "oklch(0.65 0.15 240)", label: "Info" },
    information: { icon: Info, color: "oklch(0.65 0.15 240)", label: "Info" },
    warning: { icon: AlertTriangle, color: "oklch(0.72 0.17 65)", label: "Warning" },
    success: { icon: CheckCircle2, color: "oklch(0.65 0.16 150)", label: "Success" },
    example: { icon: CodeIcon, color: "oklch(0.66 0.18 300)", label: "Example" },
  };
  const key = Object.keys(map).find((k) => text.startsWith(k + ":") || text.startsWith(k + " "));
  const cfg = key ? map[key] : null;
  if (!cfg) {
    return <blockquote>{children}</blockquote>;
  }
  const Icon = cfg.icon;
  return (
    <div
      className="my-6 flex gap-3 rounded-xl border p-4"
      style={{
        borderColor: `color-mix(in oklab, ${cfg.color} 40%, transparent)`,
        background: `color-mix(in oklab, ${cfg.color} 10%, transparent)`,
      }}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: cfg.color }} />
      <div className="min-w-0 flex-1 [&>p]:m-0 [&>p]:text-[15px]">
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const codeEl = extractCode(children);
  const lang = extractLang(children);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(codeEl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="group relative my-6">
      <div className="flex items-center justify-between rounded-t-xl border border-b-0 border-border bg-[var(--color-code-bg)]/80 px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {lang || "code"}
        </span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-heading"
        >
          {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
        </button>
      </div>
      <pre className="!mt-0 !rounded-t-none">{children}</pre>
    </div>
  );
}

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    // @ts-expect-error - runtime children
    return extractText(node.props.children);
  }
  return "";
}

function extractCode(node: ReactNode): string {
  return extractText(node);
}

function extractLang(node: ReactNode): string {
  // <pre><code class="language-xxx"> ...
  if (node && typeof node === "object" && "props" in node) {
    // @ts-expect-error - runtime
    const cls = node.props?.className as string | undefined;
    const m = cls && /language-(\w+)/.exec(cls);
    if (m) return m[1];
    // @ts-expect-error - runtime
    return extractLang(node.props.children);
  }
  if (Array.isArray(node)) {
    for (const c of node) {
      const l = extractLang(c);
      if (l) return l;
    }
  }
  return "";
}
