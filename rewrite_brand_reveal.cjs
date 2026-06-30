const fs = require('fs');

// 1. Rewrite BrandReveal.tsx
const brandRevealPath = 'src/components/BrandReveal.tsx';
const brandRevealContent = `import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function BrandReveal({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // 0 -> 1: Wait for text fade-in (400ms) + 300ms = 700ms
    const t1 = setTimeout(() => {
      setStage(1);
    }, 700);

    // 1 -> 2: Line animation takes 700ms
    const t2 = setTimeout(() => {
      setStage(2);
    }, 1400);

    // 2 -> 3: Hold for 700ms
    const t3 = setTimeout(() => {
      setStage(3);
      if (onCompleteRef.current) onCompleteRef.current();
    }, 2100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full pointer-events-none bg-black">
      <div className="relative flex flex-col items-center justify-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-white text-[60px] sm:text-[68px] font-[900] uppercase tracking-[0.18em]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          NEURALWEB LABS
        </motion.div>
        
        {/* Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: stage >= 1 ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="h-[2px] w-[260px] bg-[#BFC7D5] rounded-full mt-6"
          style={{ transformOrigin: "center" }}
        />
      </div>
    </div>
  );
}
`;
fs.writeFileSync(brandRevealPath, brandRevealContent, 'utf8');

// 2. Add Orbitron to styles.css
const stylesPath = 'src/styles.css';
let stylesContent = fs.readFileSync(stylesPath, 'utf8');
if (!stylesContent.includes('Orbitron')) {
  stylesContent = `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@800;900&display=swap');\n` + stylesContent;
  fs.writeFileSync(stylesPath, stylesContent, 'utf8');
}

// 3. Update index.tsx for transition duration and pure black background
const indexPath = 'src/routes/index.tsx';
let indexContent = fs.readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace(
  /className="w-full relative z-\[100\] bg-\[#030303\]"/g,
  'className="w-full relative z-[100] bg-black"'
);
indexContent = indexContent.replace(
  /key="intro"\s+exit=\{\{ opacity: 0 \}\}\s+transition=\{\{ duration: 0\.5 \}\}/g,
  'key="intro"\n              exit={{ opacity: 0 }}\n              transition={{ duration: 0.6 }}'
);
fs.writeFileSync(indexPath, indexContent, 'utf8');

console.log("BrandReveal rewritten successfully!");
