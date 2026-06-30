const fs = require('fs');
const path = 'c:\\Users\\S Kartikeyan\\Documents\\NeuralWeb Labs\\Portfolio\\neuralweb-labs-launch\\src\\routes\\index.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /className="w-full whitespace-pre-line text-\[clamp\(2\.5rem,4vw,3\.5rem\)\] font-semibold leading-\[1\.05\] tracking-tight text-white mt-8 lg:mt-0 pr-8" style=\{\{ fontFamily: "var\(--font-display\)" \}\}>\s*<TypewriterText text=\{"Let's turn your vision\\ninto a product people love to use\."\} \/>/g,
  'className="w-full whitespace-pre-line text-[clamp(2rem,3.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-white mt-8 lg:mt-0 lg:pr-4" style={{ fontFamily: "var(--font-display)" }}>\n          <TypewriterText text={"Let\'s turn your vision\\\\ninto a product\\\\npeople love to use."} />'
);

fs.writeFileSync(path, content, 'utf8');
console.log("Text replaced successfully!");
