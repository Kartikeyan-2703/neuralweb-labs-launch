const fs = require('fs');
const path = 'c:\\Users\\S Kartikeyan\\Documents\\NeuralWeb Labs\\Portfolio\\neuralweb-labs-launch\\src\\routes\\index.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Skip Intro
content = content.replace(
  `const [flowState, setFlowState] = useState<FlowState>('intro');`,
  `const [flowState, setFlowState] = useState<FlowState>('landing');`
);

// 2. Remove HeroTypewriter completely
const heroTypewriterRegex = /function HeroTypewriter[\s\S]*?function Hero/m;
content = content.replace(heroTypewriterRegex, 'function Hero');

// 3. Replace Hero component body
const heroRegex = /function Hero\(\{ onStart \}: \{ onStart\?: \(\) => void \}\) \{[\s\S]*?\}\s*\n\/\* ---------------------------------------------------------- \*\/\n\/\* MARQUEE/m;

const newHero = `function Hero({ onStart }: { onStart?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const planetY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const planetRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [revealState, setRevealState] = useState(0);

  useEffect(() => {
    // Start stagger reveal immediately on mount since there is no typewriter
    const t = setTimeout(() => {
      setRevealState(1); // Badge
      setTimeout(() => setRevealState(2), 150); // Description
      setTimeout(() => setRevealState(3), 300); // Buttons
      setTimeout(() => setRevealState(4), 450); // Planet Glow
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" ref={ref} className="relative isolate flex min-h-[100svh] items-center justify-center pt-44 pb-24">
      {/* Eclipse / planet */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealState >= 4 ? 1 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
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
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={revealState >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mb-8"
        >
          <PillBadge>Powered by NWL Studios</PillBadge>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative text-display max-w-4xl text-[36px] font-semibold leading-[1.08] tracking-[-0.042em] md:text-[52px] lg:text-[68px] mx-auto text-center"
        >
          <span style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #E8EDF4 16%, #C4CDD9 34%, #8A96A8 52%, #5E6878 65%, #7A8898 78%, #9DAABB 90%, #B8C4D0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.7))',
          }}>
            Transforming Ideas into <br className="hidden md:block" /> Intelligent Digital 
          </span>{' '}
          <span style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #A8D0FF 40%, #2E8CFF 80%, #1A6ED4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            solutions.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={revealState >= 2 ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(4px)" }}
          transition={{ duration: 0.40, ease: "easeOut" }}
          className="mt-8 max-w-lg text-[14px] leading-relaxed text-muted-soft"
        >
          We partner with startups and enterprises to transform ideas into scalable AI solutions, modern web platforms, and intelligent digital products.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={revealState >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.40, ease: "easeOut" }}
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
/* MARQUEE`;

content = content.replace(heroRegex, newHero);

fs.writeFileSync(path, content, 'utf8');
console.log('index.tsx modified to skip intro and typewriter.');
