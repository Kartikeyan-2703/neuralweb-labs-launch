const fs = require('fs');

const brandRevealPath = 'src/components/BrandReveal.tsx';
let brandRevealContent = fs.readFileSync(brandRevealPath, 'utf8');

// Reduce pause time from 400ms to 100ms (total from 1800 to 1500)
brandRevealContent = brandRevealContent.replace(
  /\/\/ 2 -> 3: Hold for 400ms\s*const t3 = setTimeout\(\(\) => \{\s*setStage\(3\);\s*if \(onCompleteRef\.current\) onCompleteRef\.current\(\);\s*\}, 1800\);/g,
  `// 2 -> 3: Hold for 100ms\n    const t3 = setTimeout(() => {\n      setStage(3);\n      if (onCompleteRef.current) onCompleteRef.current();\n    }, 1500);`
);

fs.writeFileSync(brandRevealPath, brandRevealContent, 'utf8');
console.log("BrandReveal pause tweaked successfully!");
