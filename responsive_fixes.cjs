const fs = require('fs');

const path = 'src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Feature Section Glow
content = content.replace(
  /className="absolute -inset-10 -z-10 rounded-full bg-\[color:var\(--accent-glow\)]\/10 blur-3xl"/g,
  'className="absolute sm:-inset-10 -inset-4 -z-10 rounded-full bg-[color:var(--accent-glow)]/10 blur-3xl"'
);

// 2. CTA Section Glow
content = content.replace(
  /className="pointer-events-none absolute left-1\/2 top-1\/2 -z-10 h-\[400px\] w-\[600px\] -translate-x-1\/2 -translate-y-1\/2 rounded-full"/g,
  'className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"'
);

// 3. Founders Section Glow
content = content.replace(
  /className="absolute left-1\/2 top-1\/2 h-\[600px\] w-\[800px\] -translate-x-1\/2 -translate-y-1\/2/g,
  'className="absolute left-1/2 top-1/2 h-[600px] w-full max-w-[800px] -translate-x-1/2 -translate-y-1/2'
);

// 4. RegistrationForm buttons
content = content.replace(
  /className={`flex h-20 flex-col items-center/g,
  'className={`flex h-auto min-h-[5rem] py-3 flex-col items-center'
);

fs.writeFileSync(path, content, 'utf8');
console.log("Responsive fixes applied to index.tsx!");
