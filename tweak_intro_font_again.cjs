const fs = require('fs');

const brandRevealPath = 'src/components/BrandReveal.tsx';
let brandRevealContent = fs.readFileSync(brandRevealPath, 'utf8');

// Reduce font size even more
brandRevealContent = brandRevealContent.replace(
  /className="text-white text-\[20px\] sm:text-\[24px\] md:text-\[28px\] font-\[900\] uppercase tracking-\[0\.25em\] whitespace-nowrap text-center"/g,
  'className="text-white text-[12px] sm:text-[14px] md:text-[16px] font-[900] uppercase tracking-[0.25em] whitespace-nowrap text-center"'
);

// Reduce line max-width to match the very small text
brandRevealContent = brandRevealContent.replace(
  /className="h-\[1px\] w-\[75%\] sm:w-\[80%\] max-w-\[240px\] bg-\[#BFC7D5\] opacity-75 rounded-full mt-8"/g,
  'className="h-[1px] w-[75%] sm:w-[80%] max-w-[140px] bg-[#BFC7D5] opacity-50 rounded-full mt-6"'
);

fs.writeFileSync(brandRevealPath, brandRevealContent, 'utf8');
console.log("BrandReveal font tweaked successfully!");
