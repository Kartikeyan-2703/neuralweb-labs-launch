import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollTopButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-heading shadow-elegant backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/60"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
