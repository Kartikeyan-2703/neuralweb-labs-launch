const fs = require('fs');
const path = 'c:\\Users\\S Kartikeyan\\Documents\\NeuralWeb Labs\\Portfolio\\neuralweb-labs-launch\\src\\routes\\index.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /function GhostButton\(\{[^]*?const onScroll = \(\) => \{/;

const replacement = `function GhostButton({ children, icon, onClick }: { children: React.ReactNode; icon?: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="group relative overflow-hidden inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:text-white">
      <GlossyOverlay radius="9999px" isButton />
      <span className="relative grid h-6 w-6 place-items-center rounded-full border border-white/10">
        {icon ?? <Play className="h-3 w-3 fill-white/80" />}
      </span>
      <span className="relative">{children}</span>
    </button>
  );
}

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
  const [activeSection, setActiveSection] = useState("hero");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Navbar successfully reconstructed!");
} else {
  console.log("Regex did not match.");
}
