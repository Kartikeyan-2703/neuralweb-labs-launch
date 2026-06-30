const fs = require('fs');
const path = 'c:\\Users\\S Kartikeyan\\Documents\\NeuralWeb Labs\\Portfolio\\neuralweb-labs-launch\\src\\routes\\index.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add BrandReveal import if not exists
if (!content.includes('import { BrandReveal }')) {
  content = content.replace(
    'import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";',
    'import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";\nimport { BrandReveal } from "@/components/BrandReveal";'
  );
}

// 2. Update FlowState type
content = content.replace(
  "type FlowState = 'landing' | 'transition' | 'form' | 'success';",
  "type FlowState = 'intro' | 'landing' | 'transition' | 'form' | 'success';"
);

// 3. Initialize flowState to 'intro'
content = content.replace(
  "const [flowState, setFlowState] = useState<FlowState>('landing');",
  "const [flowState, setFlowState] = useState<FlowState>('intro');"
);

// 4. Inject BrandReveal into Landing AnimatePresence
const landingMotionStart = content.indexOf("{flowState === 'landing' && (");
if (landingMotionStart !== -1 && !content.includes("{flowState === 'intro'")) {
  const introBlock = `          {flowState === 'intro' && (
            <motion.div
              key="intro"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ gridArea: '1 / 1' }}
              className="w-full relative z-[100] bg-[#030303]"
            >
              <BrandReveal onComplete={() => setFlowState('landing')} />
            </motion.div>
          )}

`;
  content = content.substring(0, landingMotionStart) + introBlock + content.substring(landingMotionStart);
}

// 5. Update Navbar animation
content = content.replace(
  /<motion\.header\s+initial=\{\{ opacity: 0, y: -20 \}\}\s+animate=\{\{ opacity: 1, y: 0 \}\}\s+transition=\{\{ duration: [0-9.]+, ease \}\}/,
  `<motion.header\n      initial={{ opacity: 0, y: -20 }}\n      animate={{ opacity: 1, y: 0 }}\n      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}`
);

// 6. Replace Hero Component completely
const heroRegex = /function Hero\(\{ onStart \}: \{ onStart\?: \(\) => void \}\) \{[\s\S]*?\}\s*(?=\/\* ---------------------------------------------------------- \*\/\r?\n\/\* MARQUEE)/;

const newHero = `function Hero({ onStart }: { onStart?: () => void }) {
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
      // Wait 300ms, hide cursor, start reveals
      const t = setTimeout(() => setBootStage(5), 300);
      return () => clearTimeout(t);
    } else if (bootStage === 5) {
      // Badge instantly
      const t1 = setTimeout(() => setBootStage(6), 350);
      return () => clearTimeout(t1);
    } else if (bootStage === 6) {
      // Desc
      const t2 = setTimeout(() => setBootStage(7), 400);
      return () => clearTimeout(t2);
    } else if (bootStage === 7) {
      // Buttons
      const t3 = setTimeout(() => setBootStage(8), 400);
      return () => clearTimeout(t3);
    }
  }, [bootStage, text1Count, text2Count, text3Count]);

  const showCursor = bootStage >= 1 && bootStage <= 4;

  return (
    <section id="hero" ref={ref} className="relative isolate flex min-h-[100svh] items-center justify-center pt-44 pb-24">
      {/* Eclipse / planet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: bootStage >= 8 ? 1 : 0, scale: bootStage >= 8 ? 1 : 0.95 }}
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
          animate={bootStage >= 6 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 15, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: premiumEasing }}
          className="mt-8 max-w-lg text-[14px] leading-relaxed text-muted-soft"
        >
          We partner with startups and enterprises to transform ideas into scalable AI solutions, modern web platforms, and intelligent digital products.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={bootStage >= 7 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: premiumEasing }}
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
  console.log("Hero replaced successfully");
} else {
  console.log("Could not find Hero block");
}

fs.writeFileSync(path, content, 'utf8');
console.log("Boot sequence applied!");
