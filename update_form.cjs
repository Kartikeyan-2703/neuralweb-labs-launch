const fs = require('fs');

const path = 'src/routes/index.tsx';
let content = fs.readFileSync(path, 'utf8');

const newFormCode = `function RegistrationForm({ onSubmit, onBack }: { onSubmit: (name: string) => void; onBack: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [projectDetails, setProjectDetails] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setToast(null);

    const formData = new URLSearchParams();
    formData.append('entry.200735690', name);
    formData.append('entry.1612063088', email);
    formData.append('entry.1818063459', phone);
    formData.append('entry.1401290427', company);
    formData.append('entry.794342549', selectedType || '');
    formData.append('entry.1972350427', projectDetails);

    try {
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSdpkyQ6EtV8VQmVP5isYZVKrNCA1rypVNpVyGD78jhrUmLXvA/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });

      // Clear fields
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setSelectedType(null);
      setProjectDetails('');
      
      setToast({ type: 'success', message: "Thank you! We've received your message and will get back to you soon." });
      
      // Auto dismiss toast after 5s
      setTimeout(() => setToast(null), 5000);
      
      // We can also call onSubmit(name) if we want to proceed to the success screen,
      // but the user specifically asked for a toast and to clear fields. Let's just show the toast.
      // Wait, if we don't call onSubmit, we don't show the SuccessScreen. The prompt says:
      // "On successful submission: Clear all form fields. Show a professional success toast."
      // So we will NOT transition to the SuccessScreen, just show the toast as requested.
    } catch (err) {
      setToast({ type: 'error', message: "Something went wrong. Please try again later." });
      setTimeout(() => setToast(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full min-h-screen relative z-[100] flex flex-col lg:flex-row"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={\`fixed bottom-8 right-8 z-[200] flex items-center gap-3 rounded-2xl border bg-black/80 p-4 px-6 shadow-2xl backdrop-blur-xl \${toast.type === 'success' ? 'border-[#3B82F6]/30' : 'border-red-500/30'}\`}
          >
            <div className={\`grid h-8 w-8 place-items-center rounded-full \${toast.type === 'success' ? 'bg-[#3B82F6]/20 text-[#3B82F6]' : 'bg-red-500/20 text-red-500'}\`}>
              {toast.type === 'success' ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </div>
            <p className="text-[14px] font-medium text-white">{toast.message}</p>
            <button onClick={() => setToast(null)} className="ml-4 text-white/50 hover:text-white transition-colors">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Side: Sticky Quote */}
      <div className="w-full lg:w-[45%] lg:h-screen lg:sticky top-0 flex flex-col justify-center px-8 py-16 lg:px-16 z-20">
        <button onClick={onBack} className="absolute top-8 left-8 lg:top-16 lg:left-16 inline-flex items-center gap-2 text-[14px] text-white/50 hover:text-white transition-colors">
          ← Back to Home
        </button>
        <h2 className="w-full whitespace-pre-line text-[clamp(2rem,3.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-white mt-8 lg:mt-0 lg:pr-4" style={{ fontFamily: "var(--font-display)" }}>
          <TypewriterText text={"Let's turn your vision\\ninto a product\\npeople love to use."} />
        </h2>
      </div>

      {/* Right Side: Scrollable Form */}
      <div className="w-full lg:w-[55%] min-h-screen pb-32 pt-8 lg:pt-24 px-4 lg:px-12 z-10 flex flex-col justify-center">
        <form className="contact-form mx-auto w-full max-w-2xl mt-8 lg:mt-0" onSubmit={handleSubmit}>
          <p className="contact-form-heading">Client Inquiry</p>

          <div className="contact-field mb-4">
            <svg className="contact-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" /></svg>
            <input required placeholder="Full Name *" className="contact-input-field" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="contact-field mb-4">
            <svg className="contact-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z" /></svg>
            <input required placeholder="Work Email *" className="contact-input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="contact-field mb-4">
            <svg className="contact-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" /></svg>
            <input required placeholder="Phone Number *" className="contact-input-field" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="contact-field mb-8">
            <svg className="contact-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" /></svg>
            <input placeholder="Organization / Company" className="contact-input-field" type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>

          <p className="text-white/60 mb-2 ml-2 text-sm font-medium">What are you looking to build?</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {PROJECT_TYPES.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={\`flex h-auto min-h-[5rem] py-3 flex-col items-center justify-center text-center px-2 rounded-2xl border transition-all duration-300 \${selectedType === type ? 'border-white/40 bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'border-white/10 bg-black/30 backdrop-blur-md text-white/60 hover:border-white/30 hover:text-white hover:bg-white/5'}\`}
              >
                <span className="text-[13px] font-medium leading-tight">{type}</span>
              </button>
            ))}
          </div>

          <p className="text-white/60 mb-2 ml-2 text-sm font-medium">Tell us about your project</p>
          <div className="contact-field mb-8 rounded-[20px]">
            <textarea
              rows={4}
              required
              className="contact-input-field resize-none h-auto pt-2"
              placeholder="Describe your idea, goals, challenges..."
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
            />
          </div>

          <div className="contact-btn-container flex justify-center mt-6">
            <button type="submit" disabled={isSubmitting} className="cta disabled:opacity-70 disabled:cursor-not-allowed">
              <span className="hover-underline-animation flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Start the Conversation"
                )}
              </span>
              {!isSubmitting && (
                <svg
                  id="arrow-horizontal"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="10"
                  viewBox="0 0 46 16"
                  fill="white"
                >
                  <path
                    id="Path_10"
                    data-name="Path 10"
                    d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                    transform="translate(30)"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}`;

const startRegex = /function RegistrationForm\(\{ onSubmit, onBack \}: \{ onSubmit: \(name: string\) => void; onBack: \(\) => void \}\) \{/;
const match = content.match(startRegex);

if (match) {
  const startIndex = match.index;
  // find the end of the RegistrationForm function by looking for function SuccessScreen
  const endRegex = /function SuccessScreen\(/;
  const endMatch = content.match(endRegex);
  
  if (endMatch) {
    const endIndex = endMatch.index;
    const before = content.substring(0, startIndex);
    const after = content.substring(endIndex);
    
    fs.writeFileSync(path, before + newFormCode + '\\n\\n' + after, 'utf8');
    console.log("Replaced RegistrationForm successfully!");
  } else {
    console.log("Could not find end of RegistrationForm");
  }
} else {
  console.log("Could not find RegistrationForm");
}
