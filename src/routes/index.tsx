import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { BrandReveal } from "@/components/BrandReveal";
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
  MessageCircle,
} from "lucide-react";
import eclipse from "@/assets/eclipse.jpg";
import dashboard from "@/assets/dashboard.png";
import project1 from "@/assets/project-1.png";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import nwlLogo from "@/assets/nwl-logo.jpg";
import prasannaImg from "@/assets/prasanna.png";
import kartikeyanImg from "@/assets/kartikeyan.png";
import { SpaceBackground } from "@/components/SpaceBackground";
import { InteractiveDotField } from "@/components/InteractiveDotField";

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuralWeb Labs" },
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
    <button onClick={onClick} className="group relative overflow-hidden inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/10 bg-white/[0.02] px-5 sm:px-7 py-3 sm:py-3.5 text-[13px] sm:text-sm font-medium text-white/80 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:text-white">
      <GlossyOverlay radius="9999px" isButton />
      <span className="relative">{children}</span>
      <span className="relative grid h-6 w-6 place-items-center rounded-full border border-white/10 transition-transform duration-500 group-hover:translate-x-1">
        {icon ?? <ArrowRight className="h-3 w-3" />}
      </span>
    </button>
  );
}

function GhostButton({ children, icon, onClick }: { children: React.ReactNode; icon?: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="group relative overflow-hidden inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/10 bg-white/[0.02] px-5 sm:px-7 py-3 sm:py-3.5 text-[13px] sm:text-sm font-medium text-white/80 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:text-white">
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

const NAV = [
  { name: "Overview", id: "hero" },
  { name: "About Us", id: "about" },
  { name: "Services", id: "services" },
  { name: "Solutions", id: "solutions" },
  { name: "Showcase", id: "showcase" }
];

function Navbar({ onContactClick }: { onContactClick?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      let current = "hero";
      for (const n of NAV) {
        const section = document.getElementById(n.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = n.id;
          }
        }
      }
      setActiveSection(current);
    };
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
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-6 z-50 -translate-x-1/2 px-4"
    >
      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`glass-nav relative flex h-[64px] items-center gap-1 sm:gap-2 rounded-full pl-3 sm:pl-5 pr-1.5 sm:pr-2 transition-all duration-500 overflow-hidden ${scrolled ? "shadow-2xl" : ""
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
        <a href="#" className="relative z-10 flex items-center gap-2 sm:gap-2.5 pr-2 sm:pr-6 shrink-0">
          <img src={nwlLogo} alt="NeuralWeb Labs Logo" className="h-8 w-8 rounded-md object-contain shrink-0" />
          <span className="text-[13px] font-medium tracking-tight text-white whitespace-nowrap">
            NeuralWeb<span className="text-white/40"> Labs</span>
          </span>
        </a>

        <div className="relative z-10 hidden h-6 w-px bg-white/10 lg:block" />

        <ul className="relative z-10 hidden items-center gap-1 px-2 lg:flex">
          {NAV.map((n, i) => (
            <li key={n.name}>
              <a
                href={`#${n.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(n.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`relative block rounded-full px-3.5 py-1.5 text-[13px] whitespace-nowrap transition-colors duration-300 ${activeSection === n.id ? "text-white" : "text-white/55 hover:text-white"
                  }`}
              >
                {n.name}
                {activeSection === n.id && (
                  <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[color:var(--accent-glow)] shadow-[0_0_8px_rgba(111,156,255,0.8)]" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="relative z-10 ml-auto flex items-center gap-1.5">
          <button onClick={onContactClick} className="glass-button inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-medium text-white">
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

function Hero({ onStart }: { onStart?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const planetY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const planetRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const premiumEasing = [0.22, 1, 0.36, 1] as const;

  const [bootStage, setBootStage] = useState(0);
  const [text1Count, setText1Count] = useState(0);
  const [text2Count, setText2Count] = useState(0);
  const [text3Count, setText3Count] = useState(0);

  const text1 = "Transforming Ideas into";
  const text2 = "Intelligent Digital ";
  const text3 = "solutions.";

  useEffect(() => {
    // Stage 1: Navbar slides down for 500ms
    const t = setTimeout(() => setBootStage(1), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const charSpeed = 38; // 35-40ms per char

    if (bootStage === 1) {
      if (text1Count < text1.length) {
        const t = setTimeout(() => setText1Count(prev => prev + 1), charSpeed);
        return () => clearTimeout(t);
      } else {
        setBootStage(2);
      }
    } else if (bootStage === 2) {
      if (text2Count < text2.length) {
        const t = setTimeout(() => setText2Count(prev => prev + 1), charSpeed);
        return () => clearTimeout(t);
      } else {
        setBootStage(3);
      }
    } else if (bootStage === 3) {
      if (text3Count < text3.length) {
        const t = setTimeout(() => setText3Count(prev => prev + 1), charSpeed);
        return () => clearTimeout(t);
      } else {
        setBootStage(4); // Typing done
      }
    } else if (bootStage === 4) {
      // Wait 300ms, hide cursor, reveal everything else together
      const t = setTimeout(() => setBootStage(5), 300);
      return () => clearTimeout(t);
    }
  }, [bootStage, text1Count, text2Count, text3Count]);

  const showCursor = bootStage >= 1 && bootStage <= 4;

  return (
    <section id="hero" ref={ref} className="relative isolate flex min-h-[100svh] items-center justify-center pt-44 pb-24">
      {/* Eclipse / planet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: bootStage >= 5 ? 1 : 0, scale: bootStage >= 5 ? 1 : 0.95 }}
        transition={{ duration: 0.7, ease: premiumEasing }}
        style={{ y: planetY, rotate: planetRotate }}
        className="pointer-events-none absolute -right-[20%] top-1/2 -z-10 h-[140%] w-[80%] -translate-y-1/2 sm:-right-[15%] lg:-right-[8%]"
      >
        <img
          src={eclipse}
          alt=""
          aria-hidden
          width={1280}
          height={1280}
          className="h-full w-full object-contain mix-blend-screen scale-75 opacity-50"
          style={{ filter: "blur(4px)" }}
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={bootStage >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.35, ease: premiumEasing }}
          className="mb-8"
        >
          <PillBadge>POWERED BY NWL STUDIOS</PillBadge>
        </motion.div>

        {/* Hero Headline */}
        <div className="relative text-display max-w-4xl text-[36px] font-semibold leading-[1.08] tracking-[-0.042em] md:text-[52px] lg:text-[68px] mx-auto text-center">
          <span style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #E8EDF4 16%, #C4CDD9 34%, #8A96A8 52%, #5E6878 65%, #7A8898 78%, #9DAABB 90%, #B8C4D0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.7))',
          }}>
            {text1.substring(0, text1Count)}
            {text1Count === text1.length && <><br className="hidden md:block" /> {text2.substring(0, text2Count)}</>}
          </span>
          {text2Count === text2.length && (
            <span style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #A8D0FF 40%, #2E8CFF 80%, #1A6ED4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {text3.substring(0, text3Count)}
            </span>
          )}

          <motion.span
            animate={showCursor ? { opacity: [1, 0, 1] } : { opacity: 0 }}
            transition={showCursor ? { duration: 0.8, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
            className="inline-block w-[0.08em] h-[0.8em] bg-white ml-2 align-middle"
          />
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
          animate={bootStage >= 5 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 15, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: premiumEasing }}
          className="mt-8 max-w-lg text-[14px] leading-relaxed text-muted-soft"
        >
          We partner with startups and enterprises to transform ideas into scalable AI solutions, modern web platforms, and intelligent digital products.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={bootStage >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: premiumEasing }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <PrimaryButton onClick={onStart}>Start a Project</PrimaryButton>
          <GhostButton onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} icon={<Users className="h-3.5 w-3.5" />}>About Us</GhostButton>
        </motion.div>

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
    <section id="services" className="relative py-32">
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
    <section id="solutions" className="relative py-32">
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
            <div className="absolute sm:-inset-10 -inset-4 -z-10 rounded-full bg-[color:var(--accent-glow)]/10 blur-3xl" />
            <div className="glass-panel relative overflow-hidden rounded-3xl p-6">
              <img
                src={dashboard}
                alt="Enterprise Software Dashboard"
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
    <section id="showcase" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-10">
          <FadeUp>
            <SectionEyebrow label="Showcase" />
            <SectionTitle>Recent projects.</SectionTitle>
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
          <div className="relative flex items-center justify-center group/btn">
            {isOngoing && (
              <span className="absolute -top-8 right-0 rounded bg-white/10 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 whitespace-nowrap pointer-events-none">
                Coming soon
              </span>
            )}
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-500 group-hover:translate-x-1 group-hover:border-white/20 group-hover/btn:border-white/20 group-hover/btn:bg-white/[0.06]">
              <ArrowRight className="h-3.5 w-3.5 text-white/70" />
            </span>
          </div>
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
              <figure className="glass-panel relative flex h-full flex-col rounded-3xl p-9">
                <span
                  className="absolute right-7 top-4 text-7xl leading-none text-white/[0.06]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  &ldquo;
                </span>
                <blockquote className="mb-8 text-[15px] leading-relaxed text-white/80">
                  &ldquo;{qq.q}&rdquo;
                </blockquote>
                <figcaption className="mt-auto border-t border-white/5 pt-5">
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
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
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
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton onClick={onStart}>Let&apos;s talk</PrimaryButton>
              <GhostButton onClick={() => window.location.href = 'mailto:admin@neuralweblabs.com'} icon={<Mail className="h-3 w-3" />}>admin@neuralweblabs.com</GhostButton>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- */
/* ABOUT US                                                   */
/* ---------------------------------------------------------- */

function EngineeringVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(93,169,255,0.08),transparent_60%)] blur-2xl" />

      {/* Main glass container */}
      <div className="absolute inset-4 overflow-hidden rounded-3xl border border-white/10 bg-[#090B11]/80 shadow-2xl backdrop-blur-xl transition-transform duration-1000 ease-out hover:scale-[1.02] hover:border-white/20">

        {/* SVG Drawing Canvas */}
        <svg viewBox="0 0 400 400" className="h-full w-full text-white/20">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(93,169,255,0.1)" />
              <stop offset="50%" stopColor="rgba(93,169,255,0.6)" />
              <stop offset="100%" stopColor="rgba(93,169,255,0.1)" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Lines */}
          <path d="M 50 150 C 150 150, 150 250, 200 250" fill="none" stroke="url(#line-gradient)" strokeWidth="1.5" />
          <path d="M 200 250 C 250 250, 300 200, 350 200" fill="none" stroke="url(#line-gradient)" strokeWidth="1.5" />
          <path d="M 100 300 C 150 300, 200 250, 250 150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 230 67 C 200 67, 180 150, 150 150" fill="none" stroke="rgba(93,169,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Central AI Node */}
          <circle cx="200" cy="250" r="30" fill="#090B11" stroke="rgba(93,169,255,0.5)" strokeWidth="1.5" filter="url(#glow)" />
          <circle cx="200" cy="250" r="15" fill="rgba(93,169,255,0.2)" />
          <circle cx="200" cy="250" r="4" fill="#5DA9FF" />

          {/* Mobile Device Outline */}
          <rect x="40" y="80" width="60" height="120" rx="8" fill="#050608" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <rect x="45" y="85" width="50" height="110" rx="4" fill="rgba(255,255,255,0.02)" />

          {/* Web App Window Outline */}
          <rect x="220" y="60" width="140" height="90" rx="6" fill="#050608" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <line x1="220" y1="75" x2="360" y2="75" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <circle cx="230" cy="67.5" r="2" fill="rgba(255,255,255,0.3)" />
          <circle cx="236" cy="67.5" r="2" fill="rgba(255,255,255,0.3)" />
          <circle cx="242" cy="67.5" r="2" fill="rgba(255,255,255,0.3)" />

          {/* Analytics Bars inside Web App */}
          <rect x="235" y="125" width="10" height="15" rx="2" fill="rgba(93,169,255,0.4)" />
          <rect x="250" y="110" width="10" height="30" rx="2" fill="rgba(93,169,255,0.6)" />
          <rect x="265" y="90" width="10" height="50" rx="2" fill="rgba(93,169,255,0.8)" />

          {/* Cloud / Architecture Blocks */}
          <rect x="300" y="240" width="70" height="80" rx="8" fill="#090B11" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="310" y1="260" x2="360" y2="260" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" />
          <line x1="310" y1="275" x2="340" y2="275" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" />
          <line x1="310" y1="290" x2="350" y2="290" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeLinecap="round" />

          {/* API Connection Indicator */}
          <circle cx="150" cy="150" r="4" fill="#5DA9FF" filter="url(#glow)" className="animate-pulse" />
          <circle cx="300" cy="200" r="4" fill="#5DA9FF" filter="url(#glow)" className="animate-pulse" />

          {/* Floating Nodes */}
          <circle cx="100" cy="300" r="12" fill="#090B11" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <circle cx="250" cy="150" r="12" fill="#090B11" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>

        {/* CSS Floating Particles */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[30%] top-[20%] h-1 w-1 animate-pulse rounded-full bg-[#5DA9FF] blur-[1px]" />
          <div className="absolute left-[70%] top-[60%] h-1.5 w-1.5 animate-pulse rounded-full bg-[#5DA9FF] blur-[1px] delay-1000" />
          <div className="absolute left-[40%] top-[80%] h-1 w-1 animate-pulse rounded-full bg-white/50 blur-[1px] delay-500" />
        </div>
      </div>
    </div>
  );
}

function AboutUs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(93,169,255,0.03),transparent_60%)] blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-[45%_55%] lg:gap-24">
        {/* Left Column */}
        <motion.div style={{ y }} className="relative z-10">
          <FadeUp>
            <SectionEyebrow label="About Us" />
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2
              className="mb-6 pb-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #E8EDF4 16%, #C4CDD9 34%, #8A96A8 52%, #5E6878 65%, #7A8898 78%, #9DAABB 90%, #B8C4D0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.7))',
                fontFamily: "var(--font-display)"
              }}
            >
              Engineering Intelligent<br />Digital Experiences.
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mb-10 text-[17px] leading-relaxed text-white/60">
              At NeuralWeb Labs, we deliver AI-powered applications, enterprise software, web platforms, mobile experiences, and intelligent automation tailored to business needs. Our engineering approach emphasizes quality, scalability, security, and long-term value, ensuring every solution is built to perform today and adapt for tomorrow.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <PrimaryButton onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} icon={<ArrowRight className="h-3 w-3" />}>
              Learn More
            </PrimaryButton>
          </FadeUp>
        </motion.div>

        {/* Right Column */}
        <FadeUp delay={0.4} className="relative z-10 h-full w-full">
          <EngineeringVisual />
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- */
/* FOUNDERS                                                   */
/* ---------------------------------------------------------- */

function FounderCard({
  name,
  role,
  imageSrc,
  email,
  linkedin,
  github,
  phone,
}: {
  name: string;
  role: string;
  imageSrc: string;
  email: string;
  linkedin?: string;
  github?: string;
  phone?: string;
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
      className="group relative flex flex-col items-center w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/40 p-6 sm:p-10 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1.5 hover:border-white/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
    >
      {/* Subtle blue ambient glow behind card content */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]" />

      {/* Cursor-following glossy reflection */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />

      {/* Founder Image */}
      <div className="relative mb-6">
        <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-[#3B82F6]/20 blur-xl transition-all duration-500 group-hover:bg-[#3B82F6]/40 group-hover:blur-2xl" />
        <img
          src={imageSrc}
          alt={name}
          className="h-40 w-40 rounded-full bg-[#050505] object-cover object-[center_10%] ring-1 ring-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Founder Details */}
      <h3 className="mb-1 text-2xl font-medium tracking-tight text-[#E8EDF4]">
        {name}
      </h3>
      <p className="mb-4 text-[14px] text-white/50">{role}</p>
      <a href={`mailto:${email}`} className="mb-10 text-[12px] sm:text-[13px] text-white/40 transition-colors hover:text-[#60A5FA] break-all text-center max-w-full px-2">
        {email}
      </a>

      {/* Contact Links */}
      <div className="relative z-30 mt-auto flex items-center justify-center gap-5">
        {[
          { icon: Linkedin, href: linkedin || "#" },
          { icon: Github, href: github || "#" },
          { icon: Smartphone, href: phone ? `tel:${phone.replace(/\s/g, "")}` : "#" },
        ].map((item, i) => (
          <a
            key={i}
            href={item.href}
            target={item.href !== "#" && !item.href.startsWith("tel:") ? "_blank" : undefined}
            rel={item.href !== "#" && !item.href.startsWith("tel:") ? "noopener noreferrer" : undefined}
            onClick={(e) => {
              if (item.href !== "#" && !item.href.startsWith("tel:")) {
                e.stopPropagation();
              }
            }}
            className="text-white/40 transition-all duration-300 hover:scale-110 hover:text-[#60A5FA] hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
          >
            <item.icon className="h-5 w-5" strokeWidth={1.5} />
          </a>
        ))}
      </div>
    </div>
  );
}

function Founders() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="founders" ref={ref} className="relative py-40 overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_60%)] blur-3xl" />
      </div>

      <motion.div style={{ y }} className="relative mx-auto max-w-5xl px-6 text-center">
        <FadeUp>
          <div className="mb-6 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/40">
            MEET THE FOUNDERS
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            className="mx-auto mb-20 max-w-3xl text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.042em]"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E8EDF4 16%, #C4CDD9 34%, #8A96A8 52%, #5E6878 65%, #7A8898 78%, #9DAABB 90%, #B8C4D0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.7))',
              fontFamily: "var(--font-display)"
            }}
          >
            The Minds Behind<br />NeuralWeb Labs.
          </h2>
        </FadeUp>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <FadeUp delay={0.2}>
            <FounderCard
              name="Kartikeyan Suresh"
              role="Co-Founder & Software Engineer"
              imageSrc={kartikeyanImg}
              email="kartikeyansuresh@neuralweblabs.com"
              linkedin="https://www.linkedin.com/in/kartikeyan-suresh-48738335a/"
              github="http://github.com/Kartikeyan-2703"
              phone="+91 63819 99421"
            />
          </FadeUp>
          <FadeUp delay={0.3}>
            <FounderCard
              name="Prasanna Saravanan"
              role="Co-Founder & Software Engineer"
              imageSrc={prasannaImg}
              email="prasannasaravanan@neuralweblabs.com"
              linkedin="https://www.linkedin.com/in/prasanna-saravanan-802071312/"
              github="https://github.com/Prasanna-2267"
              phone="+91 93601 45782"
            />
          </FadeUp>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------- */
/* FOOTER                                                     */
/* ---------------------------------------------------------- */

function Footer({ onContactClick }: { onContactClick?: () => void }) {
  return (
    <footer className="relative pb-12 pt-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="glass-panel rounded-3xl p-10 md:p-14">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <a href="#" className="flex items-center gap-2.5">
                <img src={nwlLogo} alt="NeuralWeb Labs Logo" className="h-8 w-8 rounded-md object-contain" />
                <span className="text-[14px] font-medium tracking-tight text-white">
                  NeuralWeb<span className="text-white/40"> Labs</span>
                </span>
              </a>
              <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-white/50">
                An AI innovation studio engineering the future of intelligent systems.
              </p>
              <div className="mt-8 flex items-center gap-2">
                {[
                  { icon: Mail, href: "mailto:admin@neuralweblabs.com" },
                  { icon: Linkedin, href: "https://www.linkedin.com/company/neuralweblabs/" },
                  { icon: WhatsappIcon, href: "https://wa.me/916381999421?text=Hi%20NeuralWeb%20Labs%2C%0A%0AI'm%20interested%20in%20discussing%20a%20project%20with%20your%20team.%20I'd%20like%20to%20learn%20more%20about%20your%20services%20and%20explore%20how%20we%20can%20work%20together." }
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/55 transition-colors hover:border-white/25 hover:text-white"
                  >
                    <s.icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                h: "Company",
                l: [
                  { label: "About Us", id: "about" },
                  { label: "Our Approach", id: "solutions" },
                  { label: "Showcase", id: "showcase" },
                  { label: "Contact Us", action: "contact" }
                ]
              },
              {
                h: "Services",
                l: [
                  { label: "AI Solutions", id: "services" },
                  { label: "Web Applications", id: "services" },
                  { label: "Mobile Apps", id: "services" },
                  { label: "Custom Software", id: "services" }
                ]
              },
              {
                h: "Contact",
                l: [
                  { label: "Start a Project", action: "contact" },
                  { label: "admin@neuralweblabs.com", href: "mailto:admin@neuralweblabs.com" }
                ]
              },
            ].map((col) => (
              <div key={col.h}>
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  {col.h}
                </div>
                <ul className="mt-5 space-y-3">
                  {col.l.map((item) => (
                    <li key={item.label}>
                      {'href' in item && item.href ? (
                        <a href={item.href as string} className="text-[13px] text-white/65 transition-colors hover:text-white">
                          {item.label}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            if ('action' in item && item.action === 'contact' && onContactClick) {
                              onContactClick();
                            } else if ('id' in item && item.id) {
                              document.getElementById(item.id as string)?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="text-[13px] text-white/65 transition-colors hover:text-white text-left"
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-[12px] text-white/40 md:flex-row md:items-center">
            <div>© {new Date().getFullYear()} NeuralWeb Labs. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <span className="cursor-pointer transition-colors hover:text-white">Privacy</span>
              <span className="cursor-pointer transition-colors hover:text-white">Terms</span>
              <span className="cursor-pointer transition-colors hover:text-white">Security</span>
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
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [projectDetails, setProjectDetails] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setToast(null);

    const formData = new URLSearchParams();
    formData.append('entry.200735690', name);
    formData.append('entry.1612063088', email);
    formData.append('entry.1818063459', phone);
    formData.append('entry.1401290427', company);
    formData.append('entry.794342549', selectedType || '');
    formData.append('entry.1972350427', projectDetails);

    try {
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSdpkyQ6EtV8VQmVP5isYZVKrNCA1rypVNpVyGD78jhrUmLXvA/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });

      // Clear fields
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setSelectedType(null);
      setProjectDetails('');

      setToast({ type: 'success', message: "Thank you! We've received your message and will get back to you soon." });

      // Auto dismiss toast after 5s
      setTimeout(() => setToast(null), 5000);

      // Trigger transition to success screen
      onSubmit(name);
    } catch (err) {
      setToast({ type: 'error', message: "Something went wrong. Please try again later." });
      setTimeout(() => setToast(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full min-h-screen relative z-[100] flex flex-col lg:flex-row"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-[200] flex items-center gap-3 rounded-2xl border bg-black/80 p-4 px-6 shadow-2xl backdrop-blur-xl ${toast.type === 'success' ? 'border-[#3B82F6]/30' : 'border-red-500/30'}`}
          >
            <div className={`grid h-8 w-8 place-items-center rounded-full ${toast.type === 'success' ? 'bg-[#3B82F6]/20 text-[#3B82F6]' : 'bg-red-500/20 text-red-500'}`}>
              {toast.type === 'success' ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </div>
            <p className="text-[14px] font-medium text-white">{toast.message}</p>
            <button onClick={() => setToast(null)} className="ml-4 text-white/50 hover:text-white transition-colors">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Side: Sticky Quote */}
      <div className="w-full lg:w-[45%] lg:h-screen lg:sticky top-0 flex flex-col justify-center px-8 py-16 lg:px-16 z-20">
        <button onClick={onBack} className="absolute top-8 left-8 lg:top-16 lg:left-16 inline-flex items-center gap-2 text-[14px] text-white/50 hover:text-white transition-colors">
          ← Back to Home
        </button>
        <h2 className="w-full whitespace-pre-line text-[clamp(2rem,3.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-white mt-8 lg:mt-0 lg:pr-4" style={{ fontFamily: "var(--font-display)" }}>
          <TypewriterText text={"Let's turn your vision\ninto a product\npeople love to use."} />
        </h2>
      </div>

      {/* Right Side: Scrollable Form */}
      <div className="w-full lg:w-[55%] min-h-screen pb-32 pt-8 lg:pt-24 px-4 lg:px-12 z-10 flex flex-col justify-center">
        <form className="contact-form mx-auto w-full max-w-2xl mt-8 lg:mt-0" onSubmit={handleSubmit}>
          <p className="contact-form-heading">Client Inquiry</p>

          <div className="contact-field mb-4">
            <svg className="contact-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" /></svg>
            <input required placeholder="Full Name *" className="contact-input-field" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="contact-field mb-4">
            <svg className="contact-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z" /></svg>
            <input required placeholder="Work Email *" className="contact-input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="contact-field mb-4">
            <svg className="contact-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" /></svg>
            <input required placeholder="Phone Number *" className="contact-input-field" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="contact-field mb-8">
            <svg className="contact-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" /></svg>
            <input placeholder="Organization / Company" className="contact-input-field" type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>

          <p className="text-white/60 mb-2 ml-2 text-sm font-medium">What are you looking to build?</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {PROJECT_TYPES.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`flex h-auto min-h-[5rem] py-3 flex-col items-center justify-center text-center px-2 rounded-2xl border transition-all duration-300 ${selectedType === type ? 'border-white/40 bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'border-white/10 bg-black/30 backdrop-blur-md text-white/60 hover:border-white/30 hover:text-white hover:bg-white/5'}`}
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
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
            />
          </div>

          <div className="contact-btn-container flex justify-center mt-6">
            <button type="submit" disabled={isSubmitting} className="cta disabled:opacity-70 disabled:cursor-not-allowed">
              <span className="hover-underline-animation flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Start the Conversation"
                )}
              </span>
              {!isSubmitting && (
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
              )}
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

        <div className="flex flex-wrap items-center justify-center gap-4">
          <GhostButton onClick={onReturn}>Return to Home</GhostButton>
          <PrimaryButton
            onClick={() => window.open('https://wa.me/916381999421?text=Hi%20NeuralWeb%20Labs%2C%0A%0AI\'m%20interested%20in%20discussing%20a%20project%20with%20your%20team.%20I\'d%20like%20to%20learn%20more%20about%20your%20services%20and%20explore%20how%20we%20can%20work%20together.', '_blank')}
          >
            Chat on WhatsApp
          </PrimaryButton>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------- */
/* PAGE                                                       */
/* ---------------------------------------------------------- */

type FlowState = 'intro' | 'landing' | 'transition' | 'form' | 'success';

function Landing() {
  const [flowState, setFlowState] = useState<FlowState>('intro');
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
          {flowState === 'intro' && (
            <motion.div
              key="intro"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ gridArea: '1 / 1' }}
              className="w-full relative z-[100] bg-transparent"
            >
              <BrandReveal onComplete={() => setFlowState('landing')} />
            </motion.div>
          )}

          {flowState === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ gridArea: '1 / 1' }}
              className="w-full relative z-10"
            >
              <Navbar onContactClick={() => {
                document.getElementById('founders')?.scrollIntoView({ behavior: 'smooth' });
              }} />

              {/* Floating Blogs Button */}
              <a
                href="/blogs"
                className="group fixed top-6 right-8 lg:right-12 h-[64px] z-[100] hidden md:flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.15em] text-white/90 hover:text-white"
              >
                <span className="relative pb-1 overflow-hidden">
                  BLOGS
                  <span className="absolute bottom-0 left-0 h-[1px] w-full bg-white transition-transform duration-300 group-hover:-translate-x-[105%]" />
                  <span className="absolute bottom-0 left-0 h-[1px] w-full bg-white translate-x-[105%] transition-transform duration-300 group-hover:translate-x-0" />
                </span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </a>

              <main>
                <Hero onStart={() => setFlowState('form')} />
                <Marquee />
                <AboutUs />
                <Services />
                <Feature />
                <WhyUs />
                <Projects />
                <Testimonials />
                <CTA onStart={() => setFlowState('form')} />
                <Founders />
              </main>
              <Footer onContactClick={() => setFlowState('form')} />
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
