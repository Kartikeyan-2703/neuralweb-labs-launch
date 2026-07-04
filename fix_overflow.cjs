const fs = require('fs');

const path = 'src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix PrimaryButton padding
content = content.replace(
  /className="group relative overflow-hidden inline-flex items-center gap-3 rounded-full border border-white\/10 bg-white\/\[0\.02\] px-7 py-3\.5 text-sm/g,
  'className="group relative overflow-hidden inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/10 bg-white/[0.02] px-5 sm:px-7 py-3 sm:py-3.5 text-[13px] sm:text-sm'
);

// 2. Fix GhostButton padding
content = content.replace(
  /className="group relative overflow-hidden inline-flex items-center gap-3 rounded-full border border-white\/10 bg-white\/\[0\.02\] px-7 py-3\.5 text-sm/g,
  'className="group relative overflow-hidden inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/10 bg-white/[0.02] px-5 sm:px-7 py-3 sm:py-3.5 text-[13px] sm:text-sm'
);

// 3. Fix FounderCard padding
content = content.replace(
  /className="group relative flex flex-col items-center overflow-hidden rounded-\[24px\] border border-white\/10 bg-black\/40 p-10/g,
  'className="group relative flex flex-col items-center w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/40 p-6 sm:p-10'
);

// 4. Fix FounderCard email breaking
content = content.replace(
  /className="mb-10 text-\[13px\] text-white\/40 transition-colors hover:text-\[#60A5FA\]"/g,
  'className="mb-10 text-[12px] sm:text-[13px] text-white/40 transition-colors hover:text-[#60A5FA] break-all text-center max-w-full px-2"'
);

// 5. Fix Navbar padding to prevent logo/button collision on ultra small screens
content = content.replace(
  /className={`glass-nav relative flex h-\[64px\] items-center gap-2 rounded-full pl-5 pr-2/g,
  'className={`glass-nav relative flex h-[64px] items-center gap-1 sm:gap-2 rounded-full pl-3 sm:pl-5 pr-1.5 sm:pr-2'
);

// 6. Navbar logo padding
content = content.replace(
  /className="relative z-10 flex items-center gap-2\.5 pr-6"/g,
  'className="relative z-10 flex items-center gap-2 sm:gap-2.5 pr-2 sm:pr-6"'
);


fs.writeFileSync(path, content, 'utf8');
console.log("Overflow fixes applied to index.tsx!");
