import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Play,
  Github,
  Moon,
  Cpu,
  Globe,
  Smartphone,
  Bot,
  Sparkles,
  Cloud,
  Zap,
  Layers,
  Box,
  Layers3,
  Infinity as InfinityIcon,
  Check,
  Twitter,
  Linkedin,
  Mail,
  ChevronRight,
} from "lucide-react";
import eclipse from "@/assets/eclipse.jpg";
import dashboard from "@/assets/dashboard.png";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuralWeb Labs — Engineering Intelligent Systems" },
      { name: "description", content: "AI products, intelligent automation, scalable software and next-generation digital experiences." },
      { property: "og:title", content: "NeuralWeb Labs" },
      { property: "og:description", content: "Engineering the future of intelligent systems." },
    ],
  }),
  component: Landing,
});

/* ---------------------------------------------------------- */
/* PRIMITIVES                                                 */
/* ---------------------------------------------------------- */

const ease = [0.22, 1, 0.36, 1] as const;

function FadeUp({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PillBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/70">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--accent-glow)] opacity-50" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent-glow)]" />
      </span>
      {children}
    </span>
  );
}

function PrimaryButton({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <button className="group glass-button relative inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium text-white hover:scale-[1.02] hover:border-white/25">
      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative">{children}</span>
      <span className="relative grid h-7 w-7 place-items-center rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-x-1">
        {icon ?? <ArrowRight className="h-3.5 w-3.5" />}
      </span>
      <span className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: "0 0 60px -10px rgba(111,156,255,0.45)" }} />
    </button>
  );
}

function GhostButton({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <button className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:text-white">
      <span className="grid h-6 w-6 place-items-center rounded-full border border-white/10">
        {icon ?? <Play className="h-3 w-3 fill-white/80" />}
      </span>
      {children}
    </button>
  );
}

/* ---------------------------------------------------------- */
/* NAVBAR                                                     */
/* ---------------------------------------------------------- */

const NAV = ["Overview", "Solutions", "Services", "Projects", "About", "Contact"];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease }}
      className="fixed left-1/2 top-6 z-50 -translate-x-1/2 px-4"
    >
      <nav
        className={`glass-nav flex h-[64px] items-center gap-2 rounded-full pl-5 pr-2 transition-all duration-500 ${
          scrolled ? "shadow-2xl" : ""
        }`}
        style={{ backdropFilter: scrolled ? "blur(40px) saturate(180%)" : "blur(30px) saturate(160%)" }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 pr-6">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-white/15 to-white/0 ring-1 ring-white/10">
            <span className="block h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
          </span>
          <span className="text-[13px] font-medium tracking-tight text-white">
            NeuralWeb<span className="text-white/40"> Labs</span>
          </span>
        </a>

        <div className="hidden h-6 w-px bg-white/10 lg:block" />

        <ul className="hidden items-center gap-1 px-2 lg:flex">
          {NAV.map((n, i) => (
            <li key={n}>
              <a
                href="#"
                className={`relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-300 ${
                  i === 0 ? "text-white" : "text-white/55 hover:text-white"
                }`}
              >
                {n}
                {i === 0 && (
                  <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[color:var(--accent-glow)] shadow-[0_0_8px_rgba(111,156,255,0.8)]" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1.5">
          <button className="hidden h-9 w-9 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/5 hover:text-white sm:grid">
            <Moon className="h-4 w-4" />
          </button>
          <button className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] text-white/70 transition-colors hover:bg-white/5 hover:text-white md:inline-flex">
            <Github className="h-3.5 w-3.5" /> GitHub
          </button>
          <button className="glass-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium text-white">
            Book a Call
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}

/* ---------------------------------------------------------- */
/* HERO                                                       */
/* ---------------------------------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const planetY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const planetRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center justify-center pt-44 pb-24">
      {/* Eclipse / planet */}
      <motion.div
        style={{ y: planetY, rotate: planetRotate }}
        className="pointer-events-none absolute -right-[20%] top-1/2 -z-10 h-[140%] w-[80%] -translate-y-1/2 sm:-right-[15%] lg:-right-[8%]"
      >
        <img
          src={eclipse}
          alt=""
          aria-hidden
          width={1280}
          height={1280}
          className="h-full w-full object-contain opacity-90 mix-blend-screen"
          style={{ filter: "blur(0.4px)" }}
        />
        {/* lens flare */}
        <div className="absolute left-[18%] top-[42%] h-40 w-40 rounded-full bg-[color:var(--accent-glow)] opacity-25 blur-3xl" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
      >
        <FadeUp>
          <PillBadge>AI Innovation Studio · v2.0</PillBadge>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="mt-10 text-balance text-[clamp(2.6rem,7.5vw,6.25rem)] font-medium leading-[0.96] tracking-[-0.03em] text-silver" style={{ fontFamily: "var(--font-display)" }}>
            Engineering the future
            <br />
            of intelligent systems.
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted-soft">
            NeuralWeb Labs designs AI products, intelligent automation, and next-generation digital
            experiences for companies building what comes next.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton>Start your project</PrimaryButton>
            <GhostButton>Watch the demo</GhostButton>
          </div>
        </FadeUp>

        {/* Stats panel */}
        <FadeUp delay={0.45} className="mt-24 w-full">
          <div className="glass-panel mx-auto grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4">
            {[
              { icon: Box, value: "240+", label: "Projects delivered" },
              { icon: Layers, value: "80+", label: "Global clients" },
              { icon: Sparkles, value: "32", label: "AI solutions" },
              { icon: InfinityIcon, value: "9 yrs", label: "Innovation" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-4 bg-[#0a0a0d]/40 px-6 py-7">
                <s.icon className="h-5 w-5 text-white/60" strokeWidth={1.2} />
                <div className="text-left">
                  <div className="text-2xl font-light tracking-tight text-white">{s.value}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-white/45">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------- */
/* MARQUEE                                                    */
/* ---------------------------------------------------------- */

function Marquee() {
  const items = [
    "Stripe", "Linear", "Vercel", "Apple", "OpenAI", "Anthropic", "Nvidia", "Notion", "Figma", "Arc",
  ];
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mb-10 text-center text-[11px] uppercase tracking-[0.24em] text-white/35">
        Trusted by teams shaping the next decade
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#030303] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#030303] to-transparent" />
        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap px-8">
          {[...items, ...items].map((b, i) => (
            <span key={i} className="text-2xl font-light tracking-tight text-white/30">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- */
/* SECTION HEADING                                            */
/* ---------------------------------------------------------- */

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/40">
      <span className="h-px w-8 bg-white/20" />
      {label}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.025em] text-silver"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </h2>
  );
}

/* ---------------------------------------------------------- */
/* SERVICES                                                   */
/* ---------------------------------------------------------- */

const SERVICES = [
  { icon: Cpu, title: "AI Development", desc: "Custom models, fine-tuning, and production-grade inference pipelines." },
  { icon: Globe, title: "Web Development", desc: "Performant, accessible web experiences built on a modern stack." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native-feeling iOS and Android apps crafted with obsessive care." },
  { icon: Bot, title: "Agentic AI", desc: "Autonomous agents that plan, reason, and execute real workflows." },
  { icon: Sparkles, title: "Generative AI", desc: "Image, video, voice and language systems shaped for your brand." },
  { icon: Cloud, title: "Cloud Solutions", desc: "Scalable, observable infrastructure on AWS, GCP and the edge." },
  { icon: Zap, title: "Automation", desc: "End-to-end automation that compounds efficiency over time." },
  { icon: Layers3, title: "UI / UX Design", desc: "Optical, considered interfaces designed to outlast trends." },
];

function Services() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-end gap-10 md:grid-cols-2 md:gap-20">
          <FadeUp>
            <SectionEyebrow label="Services" />
            <SectionTitle>A complete studio for intelligent products.</SectionTitle>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-soft md:ml-auto">
              From strategy to deployment, every capability lives under one roof. We move with the
              precision of a product team and the rigor of a research lab.
            </p>
          </FadeUp>
        </div>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.04}>
              <ServiceCard {...s} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl">
      <div className="glass-panel relative h-full rounded-2xl p-7 transition-all duration-700 group-hover:-translate-y-1 group-hover:border-white/20">
        <div className="mb-12 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
          <Icon className="h-4 w-4 text-white/80" strokeWidth={1.3} />
        </div>
        <h3 className="text-base font-medium tracking-tight text-white">{title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-white/55">{desc}</p>
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[200%] w-[200%] -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: "radial-gradient(circle at center, rgba(111,156,255,0.10), transparent 50%)",
          }}
        />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- */
/* FEATURE / DASHBOARD                                        */
/* ---------------------------------------------------------- */

function Feature() {
  return (
    <section className="relative py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">
        <FadeUp>
          <SectionEyebrow label="The Platform" />
          <SectionTitle>One canvas, infinite intelligence.</SectionTitle>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted-soft">
            Every system we ship runs on a unified intelligence layer — observability, evaluation,
            and orchestration designed for production from day one.
          </p>
          <ul className="mt-10 space-y-4">
            {[
              "Composable model orchestration",
              "Realtime evals & guardrails",
              "Edge-native, sub-100ms inference",
              "Enterprise compliance built in",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-[14px] text-white/75">
                <span className="grid h-5 w-5 place-items-center rounded-full border border-white/15 bg-white/[0.04]">
                  <Check className="h-3 w-3 text-[color:var(--accent-glow)]" strokeWidth={2.4} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-10 -z-10 rounded-full bg-[color:var(--accent-glow)]/10 blur-3xl" />
            <div className="glass-panel relative overflow-hidden rounded-3xl p-6">
              <img
                src={dashboard}
                alt="NeuralWeb dashboard"
                width={1280}
                height={960}
                loading="lazy"
                className="animate-float-y w-full"
              />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- */
/* WHY CHOOSE US                                              */
/* ---------------------------------------------------------- */

const WHY = [
  {
    icon: Zap,
    title: "Speed",
    desc: "Weeks, not quarters. We ship production AI at the velocity of a startup with the discipline of an enterprise.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "Research-grade craftsmanship applied to the most ambitious product problems in the industry.",
  },
  {
    icon: Layers,
    title: "Scalability",
    desc: "Architectures that handle ten users today and ten million tomorrow — without rewrites.",
  },
];

function WhyUs() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp className="max-w-2xl">
          <SectionEyebrow label="Why NeuralWeb" />
          <SectionTitle>Built with conviction. Engineered for trust.</SectionTitle>
        </FadeUp>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {WHY.map((w, i) => (
            <FadeUp key={w.title} delay={i * 0.08}>
              <div className="glass-panel relative h-full overflow-hidden rounded-3xl p-10">
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <w.icon className="h-5 w-5 text-white/80" strokeWidth={1.2} />
                </div>
                <h3
                  className="mt-14 text-3xl font-medium tracking-tight text-silver"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {w.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/55">{w.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- */
/* PROJECTS                                                   */
/* ---------------------------------------------------------- */

const PROJECTS = [
  { title: "Eventium Analytics", category: "AI · Web", img: project1 },
  { title: "Atelier Assistant", category: "Generative · Mobile", img: project2 },
  { title: "Helix Automations", category: "Agentic · Cloud", img: project3 },
];

function Projects() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-10">
          <FadeUp>
            <SectionEyebrow label="Selected Work" />
            <SectionTitle>Recent projects.</SectionTitle>
          </FadeUp>
          <FadeUp delay={0.1}>
            <a className="hidden text-[13px] text-white/55 hover:text-white md:inline-flex md:items-center md:gap-2" href="#">
              View archive <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.06}>
              <ProjectCard {...p} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ title, category, img }: { title: string; category: string; img: string }) {
  return (
    <a href="#" className="group block">
      <div className="glass-panel relative overflow-hidden rounded-3xl p-3 transition-all duration-700 group-hover:-translate-y-1 group-hover:border-white/20">
        <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-black">
          <img
            src={img}
            alt={title}
            loading="lazy"
            width={1280}
            height={800}
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
        </div>
        <div className="flex items-center justify-between px-3 pb-1 pt-5">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">{category}</div>
            <div className="mt-1.5 text-[15px] font-medium tracking-tight text-white">{title}</div>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition-transform duration-500 group-hover:translate-x-1 group-hover:border-white/20">
            <ArrowRight className="h-3.5 w-3.5 text-white/70" />
          </span>
        </div>
      </div>
    </a>
  );
}

/* ---------------------------------------------------------- */
/* PROCESS                                                    */
/* ---------------------------------------------------------- */

const STEPS = [
  { n: "01", t: "Discover", d: "Audit, align, define." },
  { n: "02", t: "Design", d: "Architect the intelligence." },
  { n: "03", t: "Develop", d: "Build, evaluate, refine." },
  { n: "04", t: "Deploy", d: "Ship to production." },
  { n: "05", t: "Scale", d: "Observe, iterate, grow." },
];

function Process() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp className="max-w-2xl">
          <SectionEyebrow label="Process" />
          <SectionTitle>A workflow as refined as the work.</SectionTitle>
        </FadeUp>

        <div className="relative mt-20">
          {/* connection line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[28px] hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(111,156,255,0.35) 20%, rgba(111,156,255,0.35) 80%, transparent 100%)",
            }}
          />
          <div className="grid gap-10 md:grid-cols-5">
            {STEPS.map((s, i) => (
              <FadeUp key={s.n} delay={i * 0.08}>
                <div className="relative">
                  <div className="relative grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-[#0a0a0d]">
                    <span className="text-[11px] tracking-[0.2em] text-white/55">{s.n}</span>
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ boxShadow: "0 0 30px -5px rgba(111,156,255,0.4)" }}
                    />
                  </div>
                  <h3 className="mt-6 text-base font-medium tracking-tight text-white">{s.t}</h3>
                  <p className="mt-1 text-[13px] text-white/55">{s.d}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- */
/* TESTIMONIALS                                               */
/* ---------------------------------------------------------- */

const QUOTES = [
  {
    q: "NeuralWeb shipped a system in six weeks that our internal team had circled for two years. The craftsmanship is unmistakable.",
    a: "Eleanor Vance",
    r: "VP Product, Northstack",
  },
  {
    q: "Working with them feels less like a vendor and more like a research partner that happens to ship beautifully.",
    a: "Marcus Hale",
    r: "CTO, Atelier Group",
  },
  {
    q: "Every detail — from model evals to micro-interactions — was treated with the same level of obsession.",
    a: "Priya Anand",
    r: "Head of AI, Helix",
  },
];

function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp className="max-w-2xl">
          <SectionEyebrow label="Voices" />
          <SectionTitle>Words from the people we build with.</SectionTitle>
        </FadeUp>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {QUOTES.map((qq, i) => (
            <FadeUp key={qq.a} delay={i * 0.07}>
              <figure className="glass-panel relative h-full rounded-3xl p-9">
                <span
                  className="absolute right-7 top-4 text-7xl leading-none text-white/[0.06]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  &ldquo;
                </span>
                <blockquote className="text-[15px] leading-relaxed text-white/80">
                  &ldquo;{qq.q}&rdquo;
                </blockquote>
                <figcaption className="mt-8 border-t border-white/5 pt-5">
                  <div className="text-[13px] font-medium text-white">{qq.a}</div>
                  <div className="mt-0.5 text-[12px] text-white/45">{qq.r}</div>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- */
/* CTA                                                        */
/* ---------------------------------------------------------- */

function CTA() {
  return (
    <section className="relative py-40">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(111,156,255,0.18), transparent 70%)",
            }}
          />
          <FadeUp>
            <PillBadge>Let&apos;s build</PillBadge>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="mt-8 text-[clamp(2.2rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-silver"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to build something
              <br />
              extraordinary?
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mx-auto mt-7 max-w-lg text-[15px] leading-relaxed text-muted-soft">
              We partner with a small number of ambitious teams each quarter. Tell us about your
              next chapter.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-12 flex items-center justify-center gap-3">
              <PrimaryButton>Let&apos;s talk</PrimaryButton>
              <GhostButton icon={<Mail className="h-3 w-3" />}>hello@neuralweb.com</GhostButton>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- */
/* FOOTER                                                     */
/* ---------------------------------------------------------- */

function Footer() {
  return (
    <footer className="relative pb-12 pt-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="glass-panel rounded-3xl p-10 md:p-14">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <a href="#" className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-white/15 to-white/0 ring-1 ring-white/10">
                  <span className="block h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
                </span>
                <span className="text-[14px] font-medium tracking-tight text-white">
                  NeuralWeb<span className="text-white/40"> Labs</span>
                </span>
              </a>
              <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-white/50">
                An AI innovation studio engineering the future of intelligent systems.
              </p>
              <div className="mt-8 flex items-center gap-2">
                {[Twitter, Linkedin, Github].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/55 transition-colors hover:border-white/25 hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { h: "Studio", l: ["About", "Services", "Process", "Careers"] },
              { h: "Work", l: ["Projects", "Case Studies", "Clients", "Press"] },
              { h: "Contact", l: ["Book a call", "hello@neuralweb.com", "Lisbon · Remote"] },
            ].map((col) => (
              <div key={col.h}>
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  {col.h}
                </div>
                <ul className="mt-5 space-y-3">
                  {col.l.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-[13px] text-white/65 transition-colors hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-[12px] text-white/40 md:flex-row md:items-center">
            <div>© {new Date().getFullYear()} NeuralWeb Labs. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------- */
/* PAGE                                                       */
/* ---------------------------------------------------------- */

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="bg-space" />
      <div className="stars" />
      <div className="bg-vignette" />

      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Feature />
        <WhyUs />
        <Projects />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
