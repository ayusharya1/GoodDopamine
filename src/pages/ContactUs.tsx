import React, { useState, useMemo } from 'react';
import { FooterSection } from '../components/footer-section';
import { Navigation } from '../components/Navigation';
import { useTheme } from '../components/theme-provider';

const faqs = [
  'How can I support Things?',
  'How do I delete my account on Rooms?',
  'How does Things make money?',
  "What's the catch?",
  'When will Rooms be on Android?'
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

  // Generate random stars for dark mode (matching log-book section)
  const numStars = 38;
  const stars = useMemo(() => Array.from({ length: numStars }, (_, i) => {
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
      <style>{`
        @media (max-width: 1024px) {
          .contact-main-content {
            flex-direction: column !important;
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
            min-height: 60vh !important;
          }
          .contact-left, .contact-right {
            width: 100% !important;
            margin-left: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .contact-title {
            font-size: 3rem !important;
            margin-top: 2rem !important;
          }
          .contact-img-main {
            width: 220px !important;
            top: 2rem !important;
            right: 2vw !important;
          }
        }
        @media (max-width: 640px) {
          .contact-main-content {
            flex-direction: column !important;
            padding-left: 0.25rem !important;
            padding-right: 0.25rem !important;
            min-height: 40vh !important;
          }
          .contact-left, .contact-right {
            width: 100% !important;
            margin-left: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .contact-title {
            font-size: 2rem !important;
            margin-top: 1rem !important;
          }
          .contact-img-main {
            width: 120px !important;
            top: 1rem !important;
            right: 1vw !important;
          }
          .contact-faq-title {
            font-size: 1.5rem !important;
          }
          .contact-faq-card {
            font-size: 1rem !important;
            padding: 1rem !important;
          }
        }
        @media (max-width: 450px) {
          .contact-main-content {
            padding-left: 0.1rem !important;
            padding-right: 0.1rem !important;
            min-height: 30vh !important;
          }
          .contact-title {
            font-size: 1.2rem !important;
            margin-top: 0.5rem !important;
          }
          .contact-img-main {
            width: 70px !important;
            top: 0.5rem !important;
            right: 0.5vw !important;
          }
          .contact-faq-title {
            font-size: 1rem !important;
          }
          .contact-faq-card {
            font-size: 0.8rem !important;
            padding: 0.5rem !important;
            border-radius: 0.7rem !important;
          }
          .contact-left, .contact-right {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
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
        <div className="flex flex-col items-start justify-start w-full lg:w-1/2 pt-16 pl-4 z-10 ml-[2rem] contact-left">
          <h1 className={"text-[6rem] font-medium leading-none mb-6 mt-[5rem] contact-title " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>Contact</h1>
          <p className={"text-xl mb-8 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#2563eb]')}>We read every email. Really.</p>
          <div className="flex flex-row gap-4 mb-8">
            <div className={"rounded-xl px-6 py-3 text-lg font-medium min-w-[220px] flex items-center border-none " + (theme === 'dark' ? 'bg-[#23244a] text-[#CBCFFF]' : 'bg-[#D2E4FF] text-[#054D85]')}>hi@things.inc</div>
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
        <img src="/images/contact.png" alt="Mailbox" className="absolute right-[10vw] top-16 w-[420px] h-auto z-10 hidden lg:block contact-img-main" style={{filter:'drop-shadow(0 8px 32px rgba(0,0,0,0.10))'}} />
      
      </div>
      {/* Form and FAQ Section with log-book style dark theme */}
      <div className="relative w-full flex flex-col lg:flex-row items-stretch justify-between px-2 pt-4 pb-24 z-10" style={{minHeight:'600px'}}>
        {/* Grid background: full width, fixed height - matching log-book section */}
        <div
          className="absolute left-0 top-[200px] w-full z-0 pointer-events-none rounded-t-[4rem] rounded-b-[7rem]"
          style={theme === 'dark'
            ? {
                height: '135vh',
                backgroundColor: '#0F0E16',
                backgroundImage: 'url(https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_day.png)',
                backgroundSize: '200px',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
                opacity: 1,
                backgroundBlendMode: 'normal',
              }
            : {
                height: '135vh',
                backgroundColor: '#B7D4FF',
                backgroundImage: 'url("https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_day.png")',
                backgroundSize: '200px',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
              }
          }
        />
        {/* Left: Crab and FAQ */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start items-start pt-8 relative z-10 px-8 contact-left">
          {/* Crab image */}
          <img src="/images/contact.png" alt="Crab" className="w-[120px] h-auto mb-8 ml-24 contact-img-main" style={{transform:'rotate(-20deg)'}} />
          {/* FAQ */}
          <div className="w-full h-full rounded-[4rem] p-12 pt-0 relative bg-transparent mt-[10rem] contact-faq-title" style={{minHeight: 480}}>
            <h2 className={"text-[4rem] font-light mb-8 leading-none contact-faq-title " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>Frequently<br />Asked Questions</h2>
            <div className="flex flex-col gap-6 w-[90%] mt-4">
              {faqs.map((faq, i) => (
                <div key={i} className={"border-4 rounded-[2rem] px-8 py-6 text-2xl font-normal flex items-center gap-4 shadow-lg relative contact-faq-card " + (theme === 'dark' ? 'bg-[#23244a] border-[#CBCFFF] text-[#CBCFFF]' : 'bg-[#D2E4FF] border-[#054D85] text-[#054D85]')} style={{minHeight: '64px'}}>
                  <span className={"text-3xl font-bold mr-4 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>•</span> {faq}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right: Form, visually overlapping grid background on left half */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-start pt-12 relative z-20 px-8 lg:mt-[-120px] contact-right">
          <div className={"w-full max-w-xl rounded-[2.5rem] p-10 shadow-xl border-none " + (theme === 'dark' ? 'bg-[#23244a]' : 'bg-[#D2E4FF]')} style={{marginTop: '1rem'}}>
            <h2 className={"text-3xl font-light mb-8 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>Or, message us here</h2>
            <form className="flex flex-col gap-6">
              <div className="flex flex-row gap-4">
                <div className="flex flex-col w-1/2">
                  <label className={"text-lg mb-2 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>Your name</label>
                  <input type="text" placeholder="john smith" className={"rounded-xl px-4 py-3 text-lg border-2 focus:outline-none " + (theme === 'dark' ? 'bg-[#181a3a] text-[#CBCFFF] border-[#CBCFFF] placeholder-[#A9CAF5]' : 'bg-[#e0e7ef] text-[#054D85] border-[#054D85]')} value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className={"text-lg mb-2 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>Your email address</label>
                  <input type="email" placeholder="hi@things.inc" className={"rounded-xl px-4 py-3 text-lg border-2 focus:outline-none " + (theme === 'dark' ? 'bg-[#181a3a] text-[#CBCFFF] border-[#CBCFFF] placeholder-[#A9CAF5]' : 'bg-[#e0e7ef] text-[#054D85] border-[#054D85]')} value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
                </div>
              </div>
              <div className="flex flex-col">
                <label className={"text-lg mb-2 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>Subject</label>
                <input type="text" placeholder="About a certain thing.." className={"rounded-xl px-4 py-3 text-lg border-2 focus:outline-none " + (theme === 'dark' ? 'bg-[#181a3a] text-[#CBCFFF] border-[#CBCFFF] placeholder-[#A9CAF5]' : 'bg-[#e0e7ef] text-[#054D85] border-[#054D85]')} value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} />
              </div>
              <div className="flex flex-col">
                <label className={"text-lg mb-2 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>Message</label>
                <textarea placeholder="Write something here..." className={"rounded-xl px-4 py-3 text-lg border-2 focus:outline-none min-h-[120px] " + (theme === 'dark' ? 'bg-[#181a3a] text-[#CBCFFF] border-[#CBCFFF] placeholder-[#A9CAF5]' : 'bg-[#e0e7ef] text-[#054D85] border-[#054D85]')} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} />
              </div>
              <div className="flex justify-end mt-2">
                <button type="submit" className={"text-xl font-medium flex items-center gap-2 shadow-lg transition relative rounded-xl px-8 py-3 " + (theme === 'dark' ? 'bg-[#F5699C] text-[#CBCFFF] hover:bg-[#ff8bb0]' : 'bg-[#F5699C] text-[#054D85] hover:bg-[#ff8bb0]')}>
                  Send
                  <span className={"w-3 h-3 rounded-full inline-block ml-2 " + (theme === 'dark' ? 'bg-[#CBCFFF]' : 'bg-[#054D85]')}></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FooterSection theme={theme} />
    </div>
  );
};

export default ContactUs; 