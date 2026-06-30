const fs = require('fs');

const brandRevealPath = 'src/components/BrandReveal.tsx';
let brandRevealContent = fs.readFileSync(brandRevealPath, 'utf8');

// Reduce pause time from 800ms to 400ms (total from 2200 to 1800)
brandRevealContent = brandRevealContent.replace(
  /\/\/ 2 -> 3: Hold for 800ms\s*const t3 = setTimeout\(\(\) => \{\s*setStage\(3\);\s*if \(onCompleteRef\.current\) onCompleteRef\.current\(\);\s*\}, 2200\);/g,
  `// 2 -> 3: Hold for 400ms\n    const t3 = setTimeout(() => {\n      setStage(3);\n      if (onCompleteRef.current) onCompleteRef.current();\n    }, 1800);`
);

// Reduce font size even more
brandRevealContent = brandRevealContent.replace(
  /className="text-white text-\[48px\] sm:text-\[54px\] md:text-\[58px\] font-\[900\] uppercase tracking-\[0\.18em\] whitespace-nowrap text-center"/g,
  'className="text-white text-[36px] sm:text-[42px] md:text-[46px] font-[900] uppercase tracking-[0.18em] whitespace-nowrap text-center"'
);

// Reduce line max-width slightly to match smaller text
brandRevealContent = brandRevealContent.replace(
  /className="h-\[1\.5px\] w-\[75%\] sm:w-\[80%\] max-w-\[480px\] bg-\[#BFC7D5\] opacity-75 rounded-full mt-12"/g,
  'className="h-[1.5px] w-[75%] sm:w-[80%] max-w-[380px] bg-[#BFC7D5] opacity-75 rounded-full mt-12"'
);

fs.writeFileSync(brandRevealPath, brandRevealContent, 'utf8');
console.log("BrandReveal tweaked successfully!");
