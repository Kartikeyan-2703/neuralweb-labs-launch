import { useState } from "react";
import { Send, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="mx-auto mt-24 max-w-4xl px-5">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card md:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">Newsletter</p>
          <h3 className="mt-2 text-2xl font-semibold text-heading md:text-3xl">
            Stay updated with the latest engineering articles.
          </h3>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            One deep-dive per week on AI systems, backend engineering, and cloud architecture.
            No spam, unsubscribe anytime.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
            className="mt-6 flex flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-heading placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-4 focus:ring-primary/15"
            />
            <button
              type="submit"
              disabled={done}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:brightness-110 disabled:opacity-70"
            >
              {done ? (<><Check className="h-4 w-4" /> Subscribed</>) : (<>Subscribe <Send className="h-4 w-4" /></>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
