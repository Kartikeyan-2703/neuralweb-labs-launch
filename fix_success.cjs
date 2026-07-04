const fs = require('fs');
const path = 'src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

const brokenString = `  );
      className="flex min-h-screen flex-col items-center justify-center px-6 overflow-hidden relative z-\\[100\\]"`;

const fixedString = `  );
}

function SuccessScreen({ onReturn, clientName }: { onReturn: () => void; clientName: string }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-screen flex-col items-center justify-center px-6 overflow-hidden relative z-[100]"`;

content = content.replace(/  \);\n      className="flex min-h-screen flex-col items-center justify-center px-6 overflow-hidden relative z-\[100\]"/, fixedString);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed SuccessScreen');
