import { Link } from "@tanstack/react-router";
import { Moon, Sun, Github } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function Navbar() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-elegant">
            <span className="font-mono text-[13px] font-bold">N</span>
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-semibold tracking-tight text-heading">NeuralWeb Labs</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Engineering
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {[
            { to: "/", label: "Home" },
            { to: "/blogs", label: "Articles" },
            { to: "/about", label: "About" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-heading bg-accent" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-heading" }}
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent/60"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-heading sm:inline-flex"
          >
            <Github className="h-4 w-4" />
          </a>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-heading"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
