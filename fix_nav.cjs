const fs = require('fs');
const path = 'c:\\Users\\S Kartikeyan\\Documents\\NeuralWeb Labs\\Portfolio\\neuralweb-labs-launch\\src\\routes\\index.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace the line that starts with "const [mousePosition" with the missing chunk
const match = content.match(/(\r?\n)([ \t]*const \[mousePosition, setMousePosition\] = useState\(\{ x: 0, y: 0 \}\);)/);

if (match) {
  const replacement = `\n}

/* ---------------------------------------------------------- */
/* NAVBAR                                                     */
/* ---------------------------------------------------------- */

const NAV = [
  { name: "Overview", id: "hero" },
  { name: "About Us", id: "about" },
  { name: "Services", id: "services" },
  { name: "Solutions", id: "solutions" },
  { name: "Showcase", id: "showcase" }
];

function Navbar({ onContactClick }: { onContactClick?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");` + match[1] + match[2].trimStart();

  content = content.replace(match[0], replacement);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Navbar restored and fixed using regex.");
} else {
  console.log("Could not find target to fix.");
}
