const fs = require('fs');
const path = 'c:\\Users\\S Kartikeyan\\Documents\\NeuralWeb Labs\\Portfolio\\neuralweb-labs-launch\\src\\routes\\index.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldMainRegex = /<main>[\s\S]*?<\/main>/;

const newMain = `<main>
                <Hero onStart={() => setFlowState('form')} />
                <Marquee />
                <Feature />
                <WhyUs />
                <Services />
                <Projects />
                <Testimonials />
                <AboutUs />
                <Founders />
                <CTA onStart={() => setFlowState('form')} />
              </main>`;

if (oldMainRegex.test(content)) {
  content = content.replace(oldMainRegex, newMain);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Reordered main components successfully.");
} else {
  console.log("Could not find <main> block.");
}
