const fs = require('fs');
const path = 'c:\\Users\\S Kartikeyan\\Documents\\NeuralWeb Labs\\Portfolio\\neuralweb-labs-launch\\src\\routes\\index.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace all instances of [0.22, 1, 0.36, 1] without 'as const' with 'as const'
content = content.replace(/ease:\s*\[0\.22,\s*1,\s*0\.36,\s*1\](?! as const)/g, 'ease: [0.22, 1, 0.36, 1] as const');

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed easing tuples in index.tsx');
