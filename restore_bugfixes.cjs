const fs = require('fs');
const path = 'c:\\Users\\S Kartikeyan\\Documents\\NeuralWeb Labs\\Portfolio\\neuralweb-labs-launch\\src\\routes\\index.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Footer typings
content = content.replace(
  `{item.href ? (`,
  `{'href' in item && item.href ? (`
);
content = content.replace(
  `<a href={item.href} className="text-[13px] text-white/65 transition-colors hover:text-white">`,
  `<a href={item.href as string} className="text-[13px] text-white/65 transition-colors hover:text-white">`
);
content = content.replace(
  `if (item.action === 'contact' && onContactClick) {`,
  `if ('action' in item && item.action === 'contact' && onContactClick) {`
);
content = content.replace(
  `} else if (item.id) {`,
  `} else if ('id' in item && item.id) {`
);
content = content.replace(
  `document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });`,
  `document.getElementById(item.id as string)?.scrollIntoView({ behavior: 'smooth' });`
);

// 2. Framer motion steps(2) crash fix
content = content.replace(
  /ease:\s*"steps\(2\)"/g,
  'ease: "linear"'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Restored bugfixes to index.tsx');
