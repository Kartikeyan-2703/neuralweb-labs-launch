const fs = require('fs');
const path = 'c:\\Users\\S Kartikeyan\\Documents\\NeuralWeb Labs\\Portfolio\\neuralweb-labs-launch\\src\\routes\\index.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix the slide-in animation for Landing
content = content.replace(
  /initial=\{\{ x: '100%', opacity: 0 \}\}\s*animate=\{\{ x: 0, opacity: 1 \}\}\s*exit=\{\{ x: '-100%', opacity: 0 \}\}/,
  `initial={{ opacity: 0 }}\n              animate={{ opacity: 1 }}\n              exit={{ opacity: 0 }}`
);

// 2. Replace the entire Hero component
const heroRegex = /function Hero\(\{ onStart \}: \{ onStart\?: \(\) => void \}\) \{[\s\S]*?\}\s*(?=\/\* ---------------------------------------------------------- \*\/\r?\n\/\* MARQUEE)/;

const newHero = `function Hero({ onStart }: { onStart?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const planetY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const planetRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const premiumEasing = [0.22, 1, 0.36, 1];
  const [revealState, setRevealState] = useState(0);

  useEffect(() => {
    // Start stagger reveal immediately on mount since there is no typewriter
    const t = setTimeout(() => {
      setRevealState(1); // Badge
      setTimeout(() => setRevealState(2), 150); // Headline
      setTimeout(() => setRevealState(3), 300); // Description
      setTimeout(() => setRevealState(4), 450); // Buttons
      setTimeout(() => setRevealState(5), 600); // Planet Glow
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" ref={ref} className="relative isolate flex min-h-[100svh] items-center justify-center pt-44 pb-24">
      {/* Eclipse / planet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: revealState >= 5 ? 1 : 0, scale: revealState >= 5 ? 1 : 0.95 }}
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
          animate={revealState >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, ease: premiumEasing }}
          className="mb-8"
        >
          <PillBadge>Powered by NWL Studios</PillBadge>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={revealState >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, ease: premiumEasing }}
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

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={revealState >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, ease: premiumEasing }}
          className="mt-8 max-w-lg text-[14px] leading-relaxed text-muted-soft"
        >
          We partner with startups and enterprises to transform ideas into scalable AI solutions, modern web platforms, and intelligent digital products.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={revealState >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, ease: premiumEasing }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <PrimaryButton onClick={onStart}>Start a Project</PrimaryButton>
          <GhostButton onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} icon={<Users className="h-3.5 w-3.5" />}>About Us</GhostButton>
        </motion.div>

      </motion.div>
    </section>
  );
}\n\n`;

if (heroRegex.test(content)) {
  content = content.replace(heroRegex, newHero);
  console.log("Replaced Hero successfully.");
} else {
  console.log("Regex failed to match Hero!");
}

fs.writeFileSync(path, content, 'utf8');
