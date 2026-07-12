import { Linkedin, Github, Briefcase } from "lucide-react";
import kartikeyanImg from "@/assets/kartikeyan.png";
import prasannaImg from "@/assets/prasanna.png";

const AUTHORS_DATA: Record<string, any> = {
  "Kartikeyan Suresh": {
    name: "Kartikeyan Suresh",
    role: "Co-Founder & Software Engineer · NeuralWeb Labs",
    description: "Passionate about AI engineering, backend systems, cloud architecture and building scalable software solutions.",
    image: kartikeyanImg,
    linkedin: "https://www.linkedin.com/in/kartikeyan-suresh-48738335a",
    github: "https://github.com/Kartikeyan-2703",
  },
  "Prasanna Saravanan": {
    name: "Prasanna Saravanan",
    role: "Co-Founder & Software Engineer · NeuralWeb Labs",
    description: "Passionate about AI engineering, backend systems, cloud architecture and building scalable software solutions.",
    image: prasannaImg,
    linkedin: "https://www.linkedin.com/in/prasanna-saravanan-802071312/",
    github: "https://github.com/Prasanna-2267",
  }
};

export function AuthorCard({ authorName }: { authorName?: string }) {
  const normalizedAuthorName = (authorName || "").trim().toLowerCase();
  const isKartikeyan = normalizedAuthorName.includes("kartikeyan");
  const authorKey = isKartikeyan ? "Kartikeyan Suresh" : "Prasanna Saravanan";
  const author = AUTHORS_DATA[authorKey];

  return (
    <aside className="rounded-2xl border border-border bg-card/70 p-6 shadow-card">
      <div className="flex items-start gap-4">
        <img
          src={author.image}
          alt={author.name}
          className="h-14 w-14 shrink-0 rounded-full object-contain border border-border"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-heading">{author.name}</p>
          <p className="text-xs text-muted-foreground">{author.role}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {author.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <SocialLink href={author.linkedin} icon={Linkedin} label="LinkedIn" />
        <SocialLink href={author.github} icon={Github} label="GitHub" />
        <SocialLink href="https://www.neuralweblabs.com" icon={Briefcase} label="NeuralWeb Labs" />
      </div>
    </aside>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-heading"
    >
      <Icon className="h-3 w-3" /> {label}
    </a>
  );
}
