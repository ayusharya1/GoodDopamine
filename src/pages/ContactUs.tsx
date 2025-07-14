import  { useState, useMemo } from 'react';
import { FooterSection } from '../components/footer-section';
import { Navigation } from '../components/Navigation';
import { useTheme } from '../components/theme-provider';

// 1. Update faqs array
const faqs = [
  {
    question: 'What’s the meaning of Ridan?',
    answer: 'Resist Interesting yet Damaging Act or Notion. And for the 998th time, it is not the name of a girl I like. Or maybe...'
  },
  {
    question: 'Is it free?',
    answer: "Yes, we operate on a freemium model. Most features are free, but some come with a premium subscription. More than just unlocking extra features, going premium is about supporting our fight for the cause. If you're a premium user, you're the reason hundreds of others can access Ridan for free. So, thank you."
  },
  {
    question: 'Why does the app need so many permissions? Is it safe?',
    answer: "Absolutely. We don’t store any personal data. We only request device-specific permissions to block exactly what you ask us to. If you don’t use a feature, we won’t ask for the respective permission. We get that you’re concerned about your data. If at any point you want us to delete it, just let us know. And if you're ever unsure, you can uninstall the app anytime. No worries at all."
  },
  {
    question: 'You guys are blocking social media, but I found you on social media. Irony...',
    answer: "Lol, that means it's working! Our goal is to help you—but to do that, we need to reach you first, right? If your screen time is under control, you probably won’t see us again. We hope so. But if you do, well... maybe it’s time to block us—or block your addiction using us. Haha."
  },
 
];

const ContactUs = () => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Generate random stars for dark mode (matching log-book section)
  const numStars = 10;
  const stars = useMemo(() => Array.from({ length: numStars }, () => {
    const left = Math.random() * 100;
    const top = Math.random() * 70;
    const size = 2 + Math.random() * 5;
    const color = Math.random() > 0.5 ? '#fff' : '#A9CAF5';
    const opacity = 0.6 + Math.random() * 0.4;
    const duration = 2 + Math.random() * 2;
    const delay = Math.random() * 2;
    return { left, top, size, color, opacity, duration, delay };
  }), [theme]);

  const handleCopy = () => {
    navigator.clipboard.writeText('hi@things.inc');
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className={`min-h-screen w-full flex flex-col ${theme === 'dark' ? 'bg-gradient-to-b from-[#4952b0] via-[#181a3a] to-[#23244a]' : ''}`} style={{
      background: theme === 'dark'
        ? 'none'
        : 'linear-gradient(135deg, #57B5FF 0%, #74BDFF 30%, #82C1FF 55%, #9DC8FE 100%)',
    }}>
      {/* Responsive: global adjustments for mobile/tablet */}
      {/* Night mode background and stars - only for main content area */}
      {theme === 'dark' && (
        <>
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: 'url("https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_day.png")',
              backgroundSize: '200px',
              backgroundPosition: 'center',
              backgroundRepeat: 'repeat',
              opacity: 0.3,
              backgroundBlendMode: 'normal',
            }}
          />
          <div className="absolute inset-0 z-10 pointer-events-none">
            <style>{`
              @keyframes twinkle {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 1; }
              }
            `}</style>
            {stars.map((star, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: star.size,
                  height: star.size,
                  background: star.color,
                  borderRadius: '50%',
                  opacity: star.opacity,
                  boxShadow: `0 0 8px ${star.color}`,
                  animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                  pointerEvents: 'none',
                }}
              />
            ))}
          </div>
        </>
      )}
      <Navigation />
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-start justify-between w-full max-w-[100vw] min-h-[85vh] mx-auto px-8 pt-8 pb-0 relative z-20 contact-main-content">
        {/* Left Side */}
        <div className="flex flex-col items-start justify-start w-full lg:w-1/2 pt-8 sm:pt-12 md:pt-16 pl-0 sm:pl-2 md:pl-4 z-10 lg:ml-8">
          <h1 className={"text-3xl sm:text-5xl md:text-6xl lg:text-[6rem] font-medium leading-none mb-4 sm:mb-6 mt-4 sm:mt-8 md:mt-16 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>Contact</h1>
          <p className={"text-xl mb-8 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#2563eb]')}>We read every email. Really.</p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full">
            <div className={"rounded-xl px-6 py-3 text-lg font-medium min-w-[220px] flex items-center border-none " + (theme === 'dark' ? 'bg-[#23244a] text-[#CBCFFF]' : 'bg-[#D2E4FF] text-[#054D85]')}>gooddopamines@gmail.com</div>
            <button
              className={"rounded-xl px-6 py-3 text-lg font-medium flex items-center gap-2 border-none transition " + (theme === 'dark' ? 'bg-[#23244a] text-[#CBCFFF] hover:bg-[#2a2b5a]' : 'bg-[#D2E4FF] text-[#054D85] hover:bg-[#b7d4ff]')}
              onClick={handleCopy}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-7 8h6a2 2 0 002-2V7a2 2 0 00-2-2h-6a2 2 0 00-2 2v13z" /></svg>
              {copied ? 'Copied!' : 'Click to Copy'}
            </button>
          </div>
        </div>
        {/* Mailbox Image */}
        <img src="/images/contact.png" alt="Mailbox" className="absolute right-2 top-8 w-[80px] sm:w-[120px] md:w-[220px] lg:w-[420px] h-auto z-10 hidden lg:block" style={{filter:'drop-shadow(0 8px 32px rgba(0,0,0,0.10))'}} />
      
      </div>
      {/* Form and FAQ Section with log-book style dark theme */}
      <div className="relative w-full flex flex-col lg:flex-row items-stretch justify-between px-2 pt-4 pb-24 z-10" style={{minHeight:'600px'}}>
        {/* Grid background: full width, fixed height - matching log-book section */}
        <div
          className="absolute left-0 top-[200px] w-full z-0 pointer-events-none rounded-t-[4rem] rounded-b-[0rem] sm:rounded-b-[0rem] md:rounded-b-[0rem] lg:rounded-b-[2rem]"
          style={{
            height: '163vh',
            backgroundColor: theme === 'dark' ? '#0F0E16' : '#B7D4FF',
            backgroundImage: 'url("https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_day.png")',
            backgroundSize: '200px',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            opacity: theme === 'dark' ? 1 : undefined,
            backgroundBlendMode: theme === 'dark' ? 'normal' : undefined,
          }}
        />
        {/* Left: Crab and FAQ */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start items-start pt-4 sm:pt-8 relative z-10 px-2 sm:px-4 md:px-8">
          {/* Crab image */}
          <img src="/images/contact.png" alt="Crab" className="w-[60px] sm:w-[90px] md:w-[120px] h-auto mb-4 sm:mb-8 ml-4 sm:ml-12" style={{transform:'rotate(-20deg)'}} />
          {/* FAQ */}
          <div className="w-full h-full rounded-2xl sm:rounded-[4rem] p-4 sm:p-8 md:p-12 pt-0 relative bg-transparent mt-8 sm:mt-[6rem] md:mt-[10rem]" style={{minHeight: 320}}>
            <h2 className={"text-xl sm:text-2xl md:text-4xl lg:text-[4rem] font-light mb-4 sm:mb-8 leading-none " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')} style={{lineHeight:'4rem'}}>Frequently<br />Asked Questions</h2>
            <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 w-full sm:w-[90%] mt-2 sm:mt-4">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className={
                    "faq-laptop-width border-4 rounded-xl sm:rounded-[2rem] px-4 sm:px-8 py-3 sm:py-6 text-base sm:text-xl md:text-2xl font-normal flex flex-col shadow-lg relative transition-all duration-200 " +
                    (theme === 'dark' ? 'bg-[#23244a] border-[#CBCFFF] text-[#CBCFFF]' : 'bg-[#D2E4FF] border-[#054D85] text-[#054D85]')
                  } style={{minHeight: '48px', cursor: 'pointer', overflow: 'hidden'}} onClick={() => setOpenFaq(isOpen ? null : i)}>
                    <div className="flex items-center gap-2 sm:gap-4 w-full">
                      <span className={"text-lg sm:text-xl md:text-xl font-bold mr-2 sm:mr-4 transition-transform duration-200 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>
                        {isOpen ? '–' : '•'}
                      </span>
                      <span className="flex-1 break-words text-left">{faq.question}</span>
                    </div>
                    <div className={`faq-answer transition-all duration-300 overflow-hidden text-base sm:text-lg md:text-xl font-light mt-2 sm:mt-3 ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'} ${theme === 'dark' ? 'text-[#A9CAF5]' : 'text-[#085494]'}`}
                      style={{
                        paddingLeft: isOpen ? '2.5rem' : 0,
                        paddingRight: '0.5rem',
                        maxHeight: isOpen ? '300px' : '0',
                        transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Right: Form, visually overlapping grid background on left half */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-start pt-8 sm:pt-12 relative z-20 px-2 sm:px-4 md:px-8 lg:mt-[-120px]">
          <div className={"w-full max-w-xl rounded-[2.5rem] p-10 shadow-xl border-none " + (theme === 'dark' ? 'bg-[#23244a]' : 'bg-[#D2E4FF]')} style={{marginTop: '1rem'}}>
            <h2 className={"text-3xl font-light mb-8 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>Or, message us here</h2>
            <form className="flex flex-col gap-6">
              <div className="flex flex-row gap-4">
                <div className="flex flex-col w-1/2">
                  <label className={"text-lg mb-2 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>Your name</label>
                  <input type="text" placeholder="john smith" className={"rounded-xl px-4 py-3 text-md border-2 focus:outline-none " + (theme === 'dark' ? 'bg-[#181a3a] text-[#CBCFFF] border-[#CBCFFF] placeholder-[#A9CAF5]' : 'bg-[#e0e7ef] text-[#054D85] border-[#054D85]')} value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className={"text-lg mb-2 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>Your email address</label>
                  <input type="email" placeholder="gooddopamines@gmail.com" className={"rounded-xl px-2 py-3 text-md border-2 focus:outline-none " + (theme === 'dark' ? 'bg-[#181a3a] text-[#CBCFFF] border-[#CBCFFF] placeholder-[#A9CAF5]' : 'bg-[#e0e7ef] text-[#054D85] border-[#054D85]')} value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
                </div>
              </div>
              <div className="flex flex-col">
                <label className={"text-lg mb-2 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>Subject</label>
                <input type="text" placeholder="About a certain thing.." className={"rounded-xl px-4 py-3 text-md border-2 focus:outline-none " + (theme === 'dark' ? 'bg-[#181a3a] text-[#CBCFFF] border-[#CBCFFF] placeholder-[#A9CAF5]' : 'bg-[#e0e7ef] text-[#054D85] border-[#054D85]')} value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} />
              </div>
              <div className="flex flex-col">
                <label className={"text-lg mb-2 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>Message</label>
                <textarea placeholder="Write something here..." className={"rounded-xl px-4 py-3 text-md border-2 focus:outline-none min-h-[120px] " + (theme === 'dark' ? 'bg-[#181a3a] text-[#CBCFFF] border-[#CBCFFF] placeholder-[#A9CAF5]' : 'bg-[#e0e7ef] text-[#054D85] border-[#054D85]')} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} />
              </div>
              <div className="flex justify-end mt-2">
                <button type="submit" className={"text-xl hover:text-black font-medium flex items-center gap-2 shadow-lg transition relative rounded-xl px-8 py-3 group " + (theme === 'dark' ? 'bg-[#F5699C] text-[#CBCFFF] hover:bg-[#ff8bb0]' : 'bg-[#F5699C] text-[#054D85] hover:bg-[#ff8bb0]')}> 
                  Send
                  <span className="relative ml-2" style={{ width: '1em', display: 'inline-block' }}>
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-300 group-hover:opacity-0 opacity-100 w-full flex justify-center">
                      <span className={`inline-block w-[4px] h-[4px] rounded-full ${theme === 'dark' ? 'bg-[#CBCFFF]' : 'bg-[#054D85]'}`}></span>
                    </span>
                    <span className="absolute left-0 top-[-2px] -translate-y-1/2 transition-opacity duration-300 group-hover:opacity-100 opacity-0 w-full flex justify-center">
                      <span className="text-black text-xl">→</span>
                    </span>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Add margin before FooterSection */}
      <div className="w-full" style={{marginTop: '6rem'}}></div>
      <FooterSection theme={theme} />
      
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .contact-main-content {
            flex-direction: column !important;
            padding: 1rem !important;
            min-height: auto !important;
            gap: 2rem !important;
          }
          
          .contact-main-content h1 {
            font-size: 3.5rem !important;
            margin-bottom: 1rem !important;
            margin-top: 1rem !important;
          }
          
          .contact-main-content p {
            font-size: 1.25rem !important;
            margin-bottom: 2rem !important;
          }
          
          .contact-main-content .flex {
            flex-direction: column !important;
            gap: 1rem !important;
            width: 100% !important;
          }
          
          .contact-main-content .flex > div {
            width: 100% !important;
            min-width: auto !important;
          }
          
          .contact-main-content button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
        
        @media (max-width: 768px) {
          .contact-main-content {
            padding: 0.75rem !important;
            gap: 1.5rem !important;
          }
          
          .contact-main-content h1 {
            font-size: 2.75rem !important;
            margin-bottom: 0.75rem !important;
            margin-top: 0.75rem !important;
          }
          
          .contact-main-content p {
            font-size: 1.125rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .contact-main-content .flex {
            gap: 0.75rem !important;
          }
          
          /* FAQ Section */
          .contact-main-content + div {
            padding: 0 0.75rem !important;
          }
          
          .contact-main-content + div > div:first-child {
            height: 150vh !important;
            top: 150px !important;
            border-radius: 2rem 2rem 4rem 4rem !important;
          }
          
          /* Crab and FAQ */
          .contact-main-content + div > div:nth-child(2) {
            width: 100% !important;
            padding: 0 0.75rem !important;
            margin-top: 0 !important;
          }
          
          .contact-main-content + div > div:nth-child(2) img {
            width: 60px !important;
            margin-bottom: 1rem !important;
            margin-left: 0.5rem !important;
          }
          
          .contact-main-content + div > div:nth-child(2) > div {
            padding: 1rem !important;
            margin-top: 2rem !important;
            border-radius: 1.5rem !important;
          }
          
          .contact-main-content + div > div:nth-child(2) h2 {
            font-size: 1.75rem !important;
            margin-bottom: 1rem !important;
            line-height: normal !important;
          }
          
          .contact-main-content + div > div:nth-child(2) .flex {
            gap: 0.75rem !important;
          }
          
          .contact-main-content + div > div:nth-child(2) .flex > div {
            padding: 0.75rem !important;
            font-size: 0.875rem !important;
            border-radius: 1rem !important;
            border-width: 3px !important;
          }
          
          /* Form Section */
          .contact-main-content + div > div:last-child {
            width: 100% !important;
            padding: 0 0.75rem !important;
            margin-top: 0 !important;
          }
          
          .contact-main-content + div > div:last-child > div {
            padding: 1.5rem !important;
            border-radius: 1.5rem !important;
            margin-top: 0 !important;
          }
          
          .contact-main-content + div > div:last-child h2 {
            font-size: 1.5rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .contact-main-content + div > div:last-child form {
            gap: 1rem !important;
          }
          
          .contact-main-content + div > div:last-child form > div:first-child {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          
          .contact-main-content + div > div:last-child form > div:first-child > div {
            width: 100% !important;
          }
          
          .contact-main-content + div > div:last-child input,
          .contact-main-content + div > div:last-child textarea {
            padding: 0.75rem !important;
            font-size: 0.875rem !important;
          }
          
          .contact-main-content + div > div:last-child button {
            width: 100% !important;
            padding: 0.75rem !important;
            font-size: 1rem !important;
            justify-content: center !important;
          }
        }
        
        @media (max-width: 480px) {
          .contact-main-content {
            padding: 0.5rem !important;
            gap: 1rem !important;
          }
          
          .contact-main-content h1 {
            font-size: 2.25rem !important;
            margin-bottom: 0.5rem !important;
            margin-top: 0.5rem !important;
          }
          
          .contact-main-content p {
            font-size: 1rem !important;
            margin-bottom: 1rem !important;
          }
          
          .contact-main-content .flex {
            gap: 0.5rem !important;
          }
          
          .contact-main-content .flex > div {
            padding: 0.5rem !important;
            font-size: 0.875rem !important;
            min-width: auto !important;
          }
          
          /* FAQ Section */
          .contact-main-content + div {
            padding: 0 0.5rem !important;
          }
          
          .contact-main-content + div > div:first-child {
            height: 155vh !important;
            top: 120px !important;
            border-radius: 1.5rem 1.5rem 3rem 3rem !important;
          }
          
          /* Crab and FAQ */
          .contact-main-content + div > div:nth-child(2) {
            padding: 0 0.5rem !important;
          }
          
          .contact-main-content + div > div:nth-child(2) img {
            width: 50px !important;
            margin-bottom: 0.75rem !important;
            margin-left: 0.25rem !important;
          }
          
          .contact-main-content + div > div:nth-child(2) > div {
            padding: 0.75rem !important;
            margin-top: 6.5rem !important;
            border-radius: 1rem !important;
          }
          
          .contact-main-content + div > div:nth-child(2) h2 {
            font-size: 1.5rem !important;
            margin-bottom: 0.75rem !important;
          }
          
          .contact-main-content + div > div:nth-child(2) .flex {
            gap: 0.5rem !important;
          }
          
          .contact-main-content + div > div:nth-child(2) .flex > div {
            padding: 0.5rem !important;
            font-size: 0.75rem !important;
            border-radius: 0.75rem !important;
            border-width: 2px !important;
            min-height: 40px !important;
          }
          
          /* Form Section */
          .contact-main-content + div > div:last-child {
            padding: 0 0.5rem !important;
          }
          
          .contact-main-content + div > div:last-child > div {
            padding: 1rem !important;
            border-radius: 1rem !important;
          }
          
          .contact-main-content + div > div:last-child h2 {
            font-size: 1.25rem !important;
            margin-bottom: 1rem !important;
          }
          
          .contact-main-content + div > div:last-child form {
            gap: 0.75rem !important;
          }
          
          .contact-main-content + div > div:last-child form > div:first-child {
            gap: 0.75rem !important;
          }
          
          .contact-main-content + div > div:last-child input,
          .contact-main-content + div > div:last-child textarea {
            padding: 0.5rem !important;
            font-size: 0.75rem !important;
          }
          
          .contact-main-content + div > div:last-child textarea {
            min-height: 80px !important;
          }
          
          .contact-main-content + div > div:last-child button {
            padding: 0.5rem !important;
            font-size: 0.875rem !important;
          }
        }
        
        @media (max-width: 360px) {
          .contact-main-content {
            padding: 0.25rem !important;
            gap: 0.75rem !important;
          }
          
          .contact-main-content h1 {
            font-size: 1.875rem !important;
            margin-bottom: 0.375rem !important;
            margin-top: 0.375rem !important;
          }
          
          .contact-main-content p {
            font-size: 0.875rem !important;
            margin-bottom: 0.75rem !important;
          }
          
          .contact-main-content .flex {
            gap: 0.375rem !important;
          }
          
          .contact-main-content .flex > div {
            padding: 0.375rem !important;
            font-size: 0.75rem !important;
          }
          
          /* FAQ Section */
          .contact-main-content + div {
            padding: 0 0.25rem !important;
          }
          
          .contact-main-content + div > div:first-child {
            height: 158vh !important;
            top: 100px !important;
            border-radius: 1rem 1rem 2rem 2rem !important;
          }
          
          /* Crab and FAQ */
          .contact-main-content + div > div:nth-child(2) {
            padding: 0 0.25rem !important;
          }
          
          .contact-main-content + div > div:nth-child(2) img {
            width: 40px !important;
            margin-bottom: 0.5rem !important;
            margin-left: 0.125rem !important;
          }
          
          .contact-main-content + div > div:nth-child(2) > div {
            padding: 0.5rem !important;
            margin-top: 4rem !important;
            border-radius: 0.75rem !important;
          }
          
          .contact-main-content + div > div:nth-child(2) h2 {
            font-size: 1.25rem !important;
            margin-bottom: 0.5rem !important;
          }
          
          .contact-main-content + div > div:nth-child(2) .flex {
            gap: 0.375rem !important;
          }
          
          .contact-main-content + div > div:nth-child(2) .flex > div {
            padding: 0.375rem !important;
            font-size: 0.625rem !important;
            border-radius: 0.5rem !important;
            border-width: 2px !important;
            min-height: 32px !important;
          }
          
          /* Form Section */
          .contact-main-content + div > div:last-child {
            padding: 0 0.25rem !important;
          }
          
          .contact-main-content + div > div:last-child > div {
            padding: 0.75rem !important;
            border-radius: 0.75rem !important;
          }
          
          .contact-main-content + div > div:last-child h2 {
            font-size: 1rem !important;
            margin-bottom: 0.75rem !important;
          }
          
          .contact-main-content + div > div:last-child form {
            gap: 0.5rem !important;
          }
          
          .contact-main-content + div > div:last-child form > div:first-child {
            gap: 0.5rem !important;
          }
          
          .contact-main-content + div > div:last-child input,
          .contact-main-content + div > div:last-child textarea {
            padding: 0.375rem !important;
            font-size: 0.625rem !important;
          }
          
          .contact-main-content + div > div:last-child textarea {
            min-height: 60px !important;
          }
          
          .contact-main-content + div > div:last-child button {
            padding: 0.375rem !important;
            font-size: 0.75rem !important;
          }
        }
        
        /* Footer mobile margin */
        @media (max-width: 768px) {
          .footer-section {
            margin-top: 7rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .footer-section {
            margin-top: 7rem !important;
          }
        }
        
        @media (max-width: 360px) {
          .footer-section {
            margin-top: 7rem !important;
          }
        }
        
        /* Laptop view line-height */
        @media (min-width: 1024px) {
          .contact-main-content + div > div:nth-child(2) h2 {
            line-height: 4rem !important;
          }
        }
        @media (min-width: 1025px) {
          .faq-laptop-width {
            width: 100% !important;
            max-width: 1200px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactUs; 