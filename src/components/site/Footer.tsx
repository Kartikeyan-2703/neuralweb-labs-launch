import { Mail, Linkedin } from "lucide-react";
import nwlLogo from "@/assets/nwl-logo.jpg";
import { useNavigate } from "@tanstack/react-router";

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function Footer({ onContactClick }: { onContactClick?: () => void }) {
  const navigate = useNavigate();
  return (
    <footer className="relative pb-12 pt-10 mt-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="glass-panel rounded-3xl p-10 md:p-14">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <a href="/" className="flex items-center gap-2.5">
                <img src={nwlLogo} alt="NeuralWeb Labs Logo" className="h-8 w-8 rounded-md object-contain" />
                <span className="text-[14px] font-medium tracking-tight text-white">
                  NeuralWeb<span className="text-white/40"> Labs</span>
                </span>
              </a>
              <p className="mt-6 max-w-xs text-[13px] leading-relaxed text-white/50">
                An AI innovation studio engineering the future of intelligent systems.
              </p>
              <div className="mt-8 flex items-center gap-2">
                {[
                  { icon: Mail, href: "mailto:admin@neuralweblabs.com" },
                  { icon: Linkedin, href: "https://www.linkedin.com/company/neuralweblabs/" },
                  { icon: WhatsappIcon, href: "https://wa.me/916381999421?text=Hi%20NeuralWeb%20Labs%2C%0A%0AI'm%20interested%20in%20discussing%20a%20project%20with%20your%20team.%20I'd%20like%20to%20learn%20more%20about%20your%20services%20and%20explore%20how%20we%20can%20work%20together." }
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/55 transition-colors hover:border-white/25 hover:text-white"
                  >
                    <s.icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                h: "Company",
                l: [
                  { label: "About Us", id: "about" },
                  { label: "Our Approach", id: "solutions" },
                  { label: "Showcase", id: "showcase" },
                  { label: "Contact Us", action: "contact" }
                ]
              },
              {
                h: "Services",
                l: [
                  { label: "AI Solutions", id: "services" },
                  { label: "Web Applications", id: "services" },
                  { label: "Mobile Apps", id: "services" },
                  { label: "Custom Software", id: "services" }
                ]
              },
              {
                h: "Contact",
                l: [
                  { label: "Start a Project", action: "contact" },
                  { label: "admin@neuralweblabs.com", href: "mailto:admin@neuralweblabs.com" }
                ]
              },
            ].map((col) => (
              <div key={col.h}>
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  {col.h}
                </div>
                <ul className="mt-5 space-y-3">
                  {col.l.map((item) => (
                    <li key={item.label}>
                      {'href' in item && item.href ? (
                        <a href={item.href as string} className="text-[13px] text-white/65 transition-colors hover:text-white">
                          {item.label}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={async (e) => {
                            e.preventDefault();
                            if ('action' in item && item.action === 'contact') {
                              if (onContactClick) {
                                onContactClick();
                              } else {
                                await navigate({ to: '/', hash: 'contact' });
                              }
                            } else if ('id' in item && item.id) {
                              const el = document.getElementById(item.id as string);
                              if (el) {
                                el.scrollIntoView({ behavior: 'smooth' });
                              } else {
                                await navigate({ to: '/', hash: item.id as string });
                              }
                            }
                          }}
                          className="cursor-pointer text-[13px] text-white/65 transition-colors hover:text-white text-left"
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-[12px] text-white/40 md:flex-row md:items-center">
            <div>© {new Date().getFullYear()} NeuralWeb Labs. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <span className="cursor-pointer transition-colors hover:text-white">Privacy</span>
              <span className="cursor-pointer transition-colors hover:text-white">Terms</span>
              <span className="cursor-pointer transition-colors hover:text-white">Security</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
