const fs = require('fs');
const path = 'c:\\Users\\S Kartikeyan\\Documents\\NeuralWeb Labs\\Portfolio\\neuralweb-labs-launch\\src\\routes\\index.tsx';
let content = fs.readFileSync(path, 'utf8');

// 0. Add BrandReveal import
if (!content.includes('import { BrandReveal }')) {
  content = content.replace(
    /import \{ motion, useScroll, useTransform, AnimatePresence \} from "framer-motion";/,
    'import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";\nimport { BrandReveal } from "@/components/BrandReveal";'
  );
}

// 1. Reorder NAV array
content = content.replace(
  /const NAV = \[\s*\{ name: "Overview", id: "hero" \},\s*\{ name: "Solutions", id: "solutions" \},\s*\{ name: "Services", id: "services" \},\s*\{ name: "Showcase", id: "showcase" \},\s*\{ name: "About Us", id: "about" \}\s*\];/,
  'const NAV = [\n' +
  '  { name: "Overview", id: "hero" },\n' +
  '  { name: "About Us", id: "about" },\n' +
  '  { name: "Services", id: "services" },\n' +
  '  { name: "Solutions", id: "solutions" },\n' +
  '  { name: "Showcase", id: "showcase" }\n' +
  '];'
);

// 2. Remove staggered timeouts in Hero
content = content.replace(
  /(\} else if \(bootStage === 4\) \{)[\s\S]*?(  \}, \[bootStage, text1Count, text2Count, text3Count\]\);)/,
  '$1\n' +
  '      // Wait 300ms, hide cursor, reveal everything else together\n' +
  '      const t = setTimeout(() => setBootStage(5), 300);\n' +
  '      return () => clearTimeout(t);\n' +
  '    }\n' +
  '$2'
);

// 3. Fix planet glow condition
content = content.replace(
  /animate=\{\{ opacity: bootStage >= 8 \? 1 : 0, scale: bootStage >= 8 \? 1 : 0\.95 \}\}/,
  'animate={{ opacity: bootStage >= 5 ? 1 : 0, scale: bootStage >= 5 ? 1 : 0.95 }}'
);

// 4. Fix description condition
content = content.replace(
  /<motion\.p\s*initial=\{\{ opacity: 0, y: 15, filter: 'blur\(4px\)' \}\}\s*animate=\{bootStage >= 6 \? \{ opacity: 1, y: 0, filter: 'blur\(0px\)' \} : \{ opacity: 0, y: 15, filter: 'blur\(4px\)' \}\}/,
  '<motion.p \n' +
  '          initial={{ opacity: 0, y: 15, filter: \'blur(4px)\' }}\n' +
  '          animate={bootStage >= 5 ? { opacity: 1, y: 0, filter: \'blur(0px)\' } : { opacity: 0, y: 15, filter: \'blur(4px)\' }}'
);

// 5. Fix buttons condition
content = content.replace(
  /\{(\/\* CTA Buttons \*\/)\}\s*<motion\.div\s*initial=\{\{ opacity: 0, y: 12 \}\}\s*animate=\{bootStage >= 7 \? \{ opacity: 1, y: 0 \} : \{ opacity: 0, y: 12 \}\}/,
  '{$1}\n' +
  '        <motion.div \n' +
  '          initial={{ opacity: 0, y: 12 }}\n' +
  '          animate={bootStage >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}'
);

fs.writeFileSync(path, content, 'utf8');
console.log("Final sync applied successfully!");
