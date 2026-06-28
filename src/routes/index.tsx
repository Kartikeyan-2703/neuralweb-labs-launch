import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  X,
  Users,
  Code,
  Lock,
  Rocket,
  CheckCircle,
} from "lucide-react";
import eclipse from "@/assets/eclipse.jpg";
import dashboard from "@/assets/dashboard.png";
import project1 from "@/assets/project-1.png";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import { SpaceBackground } from "@/components/SpaceBackground";
import { InteractiveDotField } from "@/components/InteractiveDotField";
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

const ease = [0.16, 1, 0.3, 1] as const;

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
      transition={{ duration: 1.4, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GlossyOverlay({ radius = "24px", isButton = false }: { radius?: string; isButton?: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300" style={{ borderRadius: radius }}>
      <div
        className="absolute inset-0"
        style={{
          borderRadius: radius,
          border: "1px solid transparent",
          background: `radial-gradient(${isHovered ? (isButton ? "120px" : "200px") : "80px"} circle at ${isHovered ? mousePosition.x + "px" : "0%"} ${isHovered ? mousePosition.y + "px" : "50%"}, rgba(255, 255, 255, ${isHovered ? (isButton ? 0.9 : 0.5) : 0.2}) 0%, rgba(255, 255, 255, 0) 100%) border-box`,
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude"
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          borderRadius: radius,
          background: `radial-gradient(${isHovered ? (isButton ? "150px" : "300px") : "100px"} circle at ${isHovered ? mousePosition.x + "px" : "0%"} ${isHovered ? mousePosition.y + "px" : "50%"}, rgba(255, 255, 255, ${isHovered ? 0.04 : 0.01}), transparent 100%)`
        }}
      />
    </div>
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
  onClick,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="group glass-button relative overflow-hidden inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium text-white hover:scale-[1.02] hover:border-white/25">
      <GlossyOverlay radius="9999px" isButton />
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
    <button className="group relative overflow-hidden inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:text-white">
      <GlossyOverlay radius="9999px" isButton />
      <span className="relative grid h-6 w-6 place-items-center rounded-full border border-white/10">
        {icon ?? <Play className="h-3 w-3 fill-white/80" />}
      </span>
      <span className="relative">{children}</span>
    </button>
  );
}

/* ---------------------------------------------------------- */
/* NAVBAR                                                     */
/* ---------------------------------------------------------- */

const NAV = ["Overview", "Solutions", "Services", "Showcase", "About Us"];

function Navbar({ onContactClick }: { onContactClick?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.6, ease }}
      className="fixed left-1/2 top-6 z-50 -translate-x-1/2 px-4"
    >
      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`glass-nav relative flex h-[64px] items-center gap-2 rounded-full pl-5 pr-2 transition-all duration-500 overflow-hidden ${scrolled ? "shadow-2xl" : ""
          }`}
        style={{ backdropFilter: scrolled ? "blur(40px) saturate(180%)" : "blur(30px) saturate(160%)" }}
      >
        {/* Dynamic Glossy Border */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            border: "1px solid transparent",
            background: `radial-gradient(${isHovered ? "120px" : "80px"} circle at ${isHovered ? mousePosition.x + "px" : "0%"} ${isHovered ? mousePosition.y + "px" : "50%"}, rgba(255, 255, 255, ${isHovered ? 0.9 : 0.5}) 0%, rgba(255, 255, 255, 0) 100%) border-box`,
            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude"
          }}
        />
        {/* Dynamic Inner Glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
          style={{
            background: `radial-gradient(${isHovered ? "250px" : "150px"} circle at ${isHovered ? mousePosition.x + "px" : "0%"} ${isHovered ? mousePosition.y + "px" : "50%"}, rgba(255, 255, 255, ${isHovered ? 0.06 : 0.02}), transparent 100%)`
          }}
        />

        {/* Logo */}
        <a href="#" className="relative z-10 flex items-center gap-2.5 pr-6">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-white/15 to-white/0 ring-1 ring-white/10">
            <span className="block h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
          </span>
          <span className="text-[13px] font-medium tracking-tight text-white">
            NeuralWeb<span className="text-white/40"> Labs</span>
          </span>
        </a>

        <div className="relative z-10 hidden h-6 w-px bg-white/10 lg:block" />

        <ul className="relative z-10 hidden items-center gap-1 px-2 lg:flex">
          {NAV.map((n, i) => (
            <li key={n}>
              <a
                href="#"
                onClick={(e) => {
                  if (n === "Contact" && onContactClick) {
                    e.preventDefault();
                    onContactClick();
                  }
                }}
                className={`relative block rounded-full px-3.5 py-1.5 text-[13px] whitespace-nowrap transition-colors duration-300 ${i === 0 ? "text-white" : "text-white/55 hover:text-white"
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

        <div className="relative z-10 ml-auto flex items-center gap-1.5">
          <button className="glass-button inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-medium text-white">
            Contact Us
            <ArrowRight className="h-3.5 w-3.5" />
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
          className="h-full w-full object-contain opacity-50 mix-blend-screen scale-75"
          style={{ filter: "blur(4px)" }}
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
      >
        <FadeUp>
          <PillBadge>Powered by NWL Studios</PillBadge>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1
            className="text-display max-w-5xl text-[46px] font-semibold leading-[1.08] tracking-[-0.042em] md:text-[66px] lg:text-[86px]"
            style={{
              /* 1. Multi-stop brushed titanium gradient for the main text */
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E8EDF4 16%, #C4CDD9 34%, #8A96A8 52%, #5E6878 65%, #7A8898 78%, #9DAABB 90%, #B8C4D0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              // Adds a subtle dark drop shadow to separate it from the background
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.7))',
            }}
          >
            Transforming Ideas into{' '}
            <br className="hidden md:block" />
            Intelligent Digital{' '}

            {/* 2. Blue "light." word with chrome reflection and glow */}
            <span className="relative inline-block">

              {/* Ambient glow bloom (rendered behind the actual text) */}
              <span
                className="absolute inset-0 select-none pointer-events-none"
                aria-hidden="true"
                style={{
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #82B8FF 45%, #2E8CFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'blur(18px)', // This creates the soft glow spreading out
                  opacity: 0.7,
                }}
              >
                solutions.
              </span>

              {/* Crisp foreground text on top */}
              <span
                style={{
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #A8D0FF 40%, #2E8CFF 80%, #1A6ED4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  position: 'relative',
                }}
              >
                solutions.
              </span>

            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted-soft">
            We partner with startups and enterprises to transform ideas into scalable AI solutions, modern web platforms, and intelligent digital products.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton>Start a Project</PrimaryButton>
            <GhostButton icon={<Users className="h-3.5 w-3.5" />}>About Us</GhostButton>
          </div>
        </FadeUp>


        {/* Stats panel */}
        {/* 
        <FadeUp delay={0.45} className="mt-24 w-full">
          <div className="glass-panel relative mx-auto grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4">
            <GlossyOverlay radius="1.5rem" />
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
        */}
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------- */
/* MARQUEE                                                    */
/* ---------------------------------------------------------- */

function Marquee() {
  const items = [
    "OpenAI",
    "Anthropic",
    "Google Cloud",
    "AWS",
    "React",
    "Next.js",
    "Node.js",
    "React Native",
    "Docker",
    "Supabase",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "Vercel",
  ];
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mb-10 text-center text-[11px] uppercase tracking-[0.24em] text-white/60">
        Powering every solution using trusted technologies
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#030303] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#030303] to-transparent" />
        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap px-8">
          {[...items, ...items].map((b, i) => (
            <span key={i} className="text-2xl font-light tracking-tight text-white/50">
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
  { icon: Cpu, title: "AI Solutions", desc: "Build intelligent AI solutions tailored to your business needs." },
  { icon: Globe, title: "Web Application", desc: "Performant, accessible web experiences built on a modern stack." },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native-feeling iOS and Android apps crafted with obsessive care." },
  { icon: Bot, title: "Agentic AI", desc: "Autonomous agents that plan, reason, and execute real workflows." },
  { icon: Layers3, title: "UI / UX Design", desc: "Optical, considered interfaces designed to outlast trends." },
  { icon: Cloud, title: "Cloud Solutions", desc: "Scalable, observable infrastructure on AWS, GCP and the edge." },
  { icon: Zap, title: "Automation", desc: "End-to-end automation that compounds efficiency over time." },
  { icon: Code, title: "Custom Software", desc: "Bespoke software solutions engineered to solve complex business challenges." },
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="service-card group relative h-full rounded-2xl cursor-pointer"
    >
      <div className="service-card-inner relative h-full rounded-2xl p-7 flex flex-col overflow-hidden">
        {/* Mouse Light Reflection */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05), transparent 40%)`,
          }}
        />

        {/* Diagonal Light Reflection */}
        <div className="service-card-reflection" />

        {/* Top Edge Light */}
        <div className="service-top-led" />

        <div className="relative mb-12 flex justify-start">
          <div className="service-icon-wrapper">
            <div className="service-icon-halo" />
            <Icon className="relative z-10 h-4 w-4 text-white" strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="text-base font-medium tracking-tight text-white mb-2 relative z-10">{title}</h3>
        <p className="text-[13px] leading-relaxed text-white/55 flex-grow relative z-10">{desc}</p>

        <div className="mt-8 flex justify-start items-end relative z-10">
          <ArrowRight className="service-arrow h-4 w-4 text-[#3B82F6]" strokeWidth={2} />
        </div>
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
          <SectionEyebrow label="OUR APPROACH" />
          <SectionTitle>From idea to intelligent products.</SectionTitle>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted-soft">
            Every system we ship runs on a unified intelligence layer — observability, evaluation,
            and orchestration designed for production from day one.
          </p>
          <ul className="mt-10 space-y-5">
            {[
              "Scalable Architecture",
              "Secure by Design",
              "Future Proof",
              "Launch & Scale",
            ].map((f) => (
              <li key={f} className="flex items-center gap-4 text-[17px] tracking-tight text-white/90">
                <span className="grid h-7 w-7 place-items-center rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 shadow-[0_0_10px_rgba(59,130,246,0.15)]">
                  <Check className="h-4 w-4 text-[#60A5FA]" strokeWidth={2.5} />
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
    title: "Security",
    desc: "Security built into every layer.",
    tags: ["JWT", "OAuth"],
    icon: Lock,
    code: (
      <>
        <span className="text-[#60A5FA]">const</span> token = jwt.sign(payload, <span className="text-[#60A5FA]">SECRET</span>);
        <br />verifyToken(token);
      </>
    )
  },
  {
    title: "Performance",
    desc: "Sub-100ms latency and optimized routing.",
    tags: ["Caching", "Edge"],
    icon: Zap,
    code: (
      <>
        <span className="text-[#60A5FA]">await</span> cache.get(key);
        <br /><span className="text-[#60A5FA]">return</span> edgeResponse(data);
      </>
    )
  },
  {
    title: "User Experience",
    desc: "Optical interfaces designed to outlast trends.",
    tags: ["React", "Motion"],
    icon: Sparkles,
    code: (
      <>
        &lt;<span className="text-[#60A5FA]">Button</span>
        <br />&nbsp;&nbsp;variant=<span className="text-[#60A5FA]">"glass"</span>
        <br />&nbsp;&nbsp;motion=<span className="text-[#60A5FA]">"smooth"</span>
        <br />/&gt;
      </>
    )
  },
  {
    title: "Rapid Delivery",
    desc: "We ship production AI at the velocity of a startup.",
    tags: ["CI/CD", "Docker"],
    icon: Rocket,
    code: (
      <>
        git push origin <span className="text-[#60A5FA]">main</span>
        <br />Deploy Successful <span className="text-[#60A5FA]">✓</span>
      </>
    )
  },
  {
    title: "Scalability",
    desc: "Built to scale from MVP to enterprise.",
    tags: ["Kubernetes", "Cloud"],
    icon: Cloud,
    code: (
      <>
        replicas: <span className="text-[#60A5FA]">8</span>
        <br />autoScaling: <span className="text-[#60A5FA]">enabled</span>
      </>
    )
  },
  {
    title: "Quality Engineering",
    desc: "Rigorous testing for production stability.",
    tags: ["Testing", "QA"],
    icon: CheckCircle,
    code: (
      <>
        expect(api.status).toBe(<span className="text-[#60A5FA]">200</span>);
        <br /><span className="text-[#60A5FA]">✓</span> All tests passed
      </>
    )
  },
];

function WhyUs() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp className="max-w-2xl">
          <SectionEyebrow label="Why NeuralWeb Labs" />
          <SectionTitle>Built for Scale. Engineered for Trust.</SectionTitle>
        </FadeUp>

        <div className="mt-20 flex flex-wrap justify-center gap-6 md:gap-8">
          {WHY.map((w, i) => (
            <FadeUp key={w.title} delay={i * 0.08}>
              <div className="mac-card group">
                <div className="mac-header">
                  <w.icon className="h-5 w-5" />
                </div>
                <span className="card-title">{w.title}</span>
                <p className="card-description">{w.desc}</p>
                {w.tags.map(t => <span key={t} className="card-tag">{t}</span>)}
                <div className="code-editor">
                  <pre><code>{w.code}</code></pre>
                </div>
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
  { title: "ERP", category: "INK · Academy", img: project1, link: "https://inkacademy.in/" },
  { title: "Billing Systems", category: "Shri Pandian Chettinad · Restaurant", img: project2, link: "#", isOngoing: true },
  { title: "E - Commerce Web App", category: "Vani's Beauty Care · Parlour", img: project3, link: "#", isOngoing: true },
];

function Projects() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-10">
          <FadeUp>
            <SectionEyebrow label="Showcase" />
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

function ProjectCard({ title, category, img, link = "#", isOngoing }: { title: string; category: string; img: string; link?: string; isOngoing?: boolean }) {
  return (
    <a href={link} onClick={(e) => { if (isOngoing) e.preventDefault(); }} target={link !== "#" ? "_blank" : undefined} rel={link !== "#" ? "noopener noreferrer" : undefined} className={`block ${isOngoing ? 'cursor-default' : 'group cursor-pointer'}`}>
      <div className="glass-panel relative overflow-hidden rounded-3xl p-3 transition-all duration-700 group-hover:-translate-y-1 group-hover:border-white/20">
        <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-black">
          <img
            src={img}
            alt={title}
            loading="lazy"
            width={1280}
            height={800}
            className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105 ${isOngoing ? 'blur-md opacity-40 scale-105' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />

          {isOngoing && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="loader-wrapper scale-75">
                <span className="loader-letter">O</span>
                <span className="loader-letter">n</span>
                <span className="loader-letter">g</span>
                <span className="loader-letter">o</span>
                <span className="loader-letter">i</span>
                <span className="loader-letter">n</span>
                <span className="loader-letter">g</span>
                <span className="loader-letter">.</span>
                <span className="loader-letter">.</span>
                <span className="loader-letter">.</span>
                <div className="loader"></div>
              </div>
            </div>
          )}
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
/* TESTIMONIALS                                               */
/* ---------------------------------------------------------- */

const QUOTES = [
  {
    q: "NeuralWeb Labs understood our vision from day one. They delivered an ERP system that simplified and automated our manual work while maintaining exceptional quality and attention to detail.",
    a: "R Naveena",
    r: "Founder · INK Academy"
  },
  {
    q: "NeuralWeb Labs delivered a fast and reliable billing system that has made our daily operations smoother and more efficient. Their support throughout the process was excellent.",
    a: "V Saravanan",
    r: "Propreitor · Shri Pandian Chettinad Restaurant",
  },
  {
    q: "From admissions to administration, the ERP system has simplified our processes and improved overall efficiency. NeuralWeb Labs exceeded our expectations.",
    a: "Hem Kumar",
    r: "Operations Executive · Interactive Network of Knowledge",
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

function CTA({ onStart }: { onStart?: () => void }) {
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
              className="mt-8 text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-silver"
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
              <PrimaryButton onClick={onStart}>Let&apos;s talk</PrimaryButton>
              <GhostButton icon={<Mail className="h-3 w-3" />}>admin@neuralweb.com</GhostButton>
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
/* REGISTRATION FLOW COMPONENTS                               */
/* ---------------------------------------------------------- */



const PROJECT_TYPES = [
  "AI Product", "Web Application", "Mobile Application",
  "AI Automation", "ERP / CRM System", "Custom Software",
  "UI / UX Design", "Not Sure Yet"
];
const DATES = ["Tuesday", "Wednesday", "Thursday"];
const TIMES = ["10:00 AM", "11:30 AM", "2:00 PM", "4:00 PM"];

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 85);

    return () => clearInterval(typingInterval);
  }, [text]);

  return (
    <span>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[0.2em] h-[0.9em] bg-white ml-[6px] align-baseline"
      />
    </span>
  );
}

function RegistrationForm({ onSubmit, onBack }: { onSubmit: (name: string) => void; onBack: () => void }) {
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full min-h-screen relative z-[100] flex flex-col lg:flex-row"
    >
      {/* Left Side: Sticky Quote */}
      <div className="w-full lg:w-[45%] lg:h-screen lg:sticky top-0 flex flex-col justify-center px-8 py-16 lg:px-16 z-20">
        <button onClick={onBack} className="absolute top-8 left-8 lg:top-16 lg:left-16 inline-flex items-center gap-2 text-[14px] text-white/50 hover:text-white transition-colors">
          ← Back to Home
        </button>
        <h2 className="w-full whitespace-pre-line text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-white mt-8 lg:mt-0 pr-8" style={{ fontFamily: "var(--font-display)" }}>
          <TypewriterText text={"Let's turn your vision\ninto a product people love to use."} />
        </h2>
      </div>

      {/* Right Side: Scrollable Form */}
      <div className="w-full lg:w-[55%] min-h-screen pb-32 pt-8 lg:pt-24 px-4 lg:px-12 z-10 flex flex-col justify-center">
        <form className="contact-form mx-auto w-full max-w-2xl mt-8 lg:mt-0" onSubmit={(e) => { e.preventDefault(); onSubmit(name); }}>
          <p className="contact-form-heading">Client Inquiry</p>

          <div className="contact-field mb-4">
            <svg className="contact-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" /></svg>
            <input required placeholder="Full Name *" className="contact-input-field" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="contact-field mb-4">
            <svg className="contact-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z" /></svg>
            <input required placeholder="Work Email *" className="contact-input-field" type="email" />
          </div>

          <div className="contact-field mb-4">
            <svg className="contact-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" /></svg>
            <input required placeholder="Phone Number *" className="contact-input-field" type="tel" />
          </div>

          <div className="contact-field mb-8">
            <svg className="contact-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" /></svg>
            <input placeholder="Organization / Company" className="contact-input-field" type="text" />
          </div>

          <p className="text-white/60 mb-2 ml-2 text-sm font-medium">What are you looking to build?</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {PROJECT_TYPES.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`flex h-20 flex-col items-center justify-center text-center px-2 rounded-2xl border transition-all duration-300 ${selectedType === type ? 'border-white/40 bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'border-white/10 bg-black/30 backdrop-blur-md text-white/60 hover:border-white/30 hover:text-white hover:bg-white/5'}`}
              >
                <span className="text-[13px] font-medium leading-tight">{type}</span>
              </button>
            ))}
          </div>

          <p className="text-white/60 mb-2 ml-2 text-sm font-medium">Tell us about your project</p>
          <div className="contact-field mb-8 rounded-[20px]">
            <textarea
              rows={4}
              className="contact-input-field resize-none h-auto pt-2"
              placeholder="Describe your idea, goals, challenges..."
            />
          </div>

          <div className="contact-btn-container flex justify-center mt-6">
            <button type="submit" className="cta">
              <span className="hover-underline-animation">Start the Conversation</span>
              <svg
                id="arrow-horizontal"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="10"
                viewBox="0 0 46 16"
                fill="white"
              >
                <path
                  id="Path_10"
                  data-name="Path 10"
                  d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                  transform="translate(30)"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

function SuccessScreen({ onReturn, clientName }: { onReturn: () => void; clientName: string }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-screen flex-col items-center justify-center px-6 overflow-hidden relative z-[100]"
    >
      {/* Subtle particle/glow background effect */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <div className="absolute h-[600px] w-[600px] rounded-full bg-white/10 blur-[150px] opacity-10 mix-blend-screen" />
        <InteractiveDotField />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="glass-panel relative z-10 max-w-xl rounded-3xl p-12 text-center shadow-2xl"
      >
        <div className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full bg-white/10 border border-white/20 text-white">
          <Check className="h-7 w-7" />
        </div>
        <h2 className="text-3xl font-semibold text-white mb-6 tracking-tight">Hi {clientName || 'there'},</h2>
        <div className="space-y-4 text-[15px] text-white/60 mb-10 leading-relaxed">
          <p>Thanks for contacting NeuralWeb Labs.</p>
          <p>We've successfully received your project details.</p>
          <p>Our team will review everything and reach out within 24 hours.</p>
          <p>Looking forward to building something exceptional together.</p>
        </div>
        <p className="text-[14px] text-white/40 mb-10">— NeuralWeb Labs</p>

        <PrimaryButton onClick={onReturn}>Return to Home</PrimaryButton>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------- */
/* PAGE                                                       */
/* ---------------------------------------------------------- */

type FlowState = 'landing' | 'transition' | 'form' | 'success';

function Landing() {
  const [flowState, setFlowState] = useState<FlowState>('landing');
  const [clientName, setClientName] = useState('');

  useEffect(() => {
    // When flow state changes, smoothly scroll back to top before sliding in
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [flowState]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030303] text-white">

      {/* Background Elements (Persist across all screens) */}
      <div className="fixed inset-0 bg-space" />
      <div className="fixed inset-0 cosmic-dust opacity-30" />
      <div className="fixed inset-0 bg-vignette" />
      <div className="fixed inset-0 pointer-events-none z-0"><SpaceBackground /></div>

      {/* Main Content Area - Grid to stack all screens seamlessly */}
      <div
        className="grid w-full min-h-screen relative z-10"
        style={{ gridTemplateColumns: '100%', gridTemplateRows: '1fr' }}
      >
        <AnimatePresence mode="sync" initial={false}>
          {flowState === 'landing' && (
            <motion.div
              key="landing"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ gridArea: '1 / 1' }}
              className="w-full relative z-10"
            >
              <Navbar onContactClick={() => setFlowState('form')} />
              <main>
                <Hero />
                <Marquee />
                <Services />
                <Feature />
                <WhyUs />
                <Projects />
                <Testimonials />
                <CTA onStart={() => setFlowState('form')} />
              </main>
              <Footer />
            </motion.div>
          )}

          {flowState === 'form' && (
            <div style={{ gridArea: '1 / 1' }} className="w-full relative z-20">
              <RegistrationForm key="form" onSubmit={(submittedName) => { setClientName(submittedName); setFlowState('success'); }} onBack={() => setFlowState('landing')} />
            </div>
          )}

          {flowState === 'success' && (
            <div style={{ gridArea: '1 / 1' }} className="w-full relative z-20">
              <SuccessScreen key="success" clientName={clientName} onReturn={() => setFlowState('landing')} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
