import React, { useState, useEffect, useRef, useMemo } from "react"

const cloudUrl = "https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/66f367536d9cdf539095c9eb_footer-cloud-right_night.png";

interface FooterSectionProps {
  theme?: 'light' | 'dark';
}

export function FooterSection({ theme = 'light' }: FooterSectionProps) {
  const [email, setEmail] = useState("")
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMouse({ x, y });
    };
    const node = footerRef.current;
    if (node) node.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (node) node.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Parallax values
  const cloudLeftTop = {
    transform: `translateY(-35%) translateX(${mouse.x * 60}px) translateY(${mouse.y * 20}px)`
  };
  const cloudLeftMid = {
    transform: `translateY(35%) translateX(${mouse.x * 30}px) translateY(${mouse.y * 16}px)`
  };
  const cloudRightTop = {
    transform: `translateY(-25%) translateX(${mouse.x * -60}px) translateY(${mouse.y * 20}px)`
  };
  const bgParallax = {
    transform: `translateY(${mouse.y * 20}px) translateX(${mouse.x * 20}px)`
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => setEmail(""), 3000)
  }

  // Generate random stars for dark mode
  const [numStars, setNumStars] = useState(32);

  useEffect(() => {
    const updateStarCount = () => {
      if (window.innerWidth <= 768) {
        // Mobile and tablet: fewer stars
        setNumStars(6);
      } else if (window.innerWidth <= 1024) {
        // Small laptop: medium stars
        setNumStars(7);
      } else {
        // Large laptop and desktop: full stars
        setNumStars(7);
      }
    };

    updateStarCount();
    window.addEventListener('resize', updateStarCount);
    return () => window.removeEventListener('resize', updateStarCount);
  }, []);

  const stars = useMemo(() => Array.from({ length: numStars }, (_) => {
    const left = Math.random() * 100;
    const top = Math.random() * 70;
    const size = 2 + Math.random() * 5;
    const color = Math.random() > 0.5 ? '#fff' : '#A9CAF5';
    const opacity = 0.6 + Math.random() * 0.4;
    const duration = 2 + Math.random() * 2;
    const delay = Math.random() * 2;
    return { left, top, size, color, opacity, duration, delay };
  }), [numStars, theme]);

  return (
    <section
      ref={footerRef}
      className="footer-section relative w-full overflow-hidden flex flex-col items-center justify-center px-2"
      style={theme === 'dark'
        ? { background: 'linear-gradient(to bottom, #23244a 0%, #181a3a 100%)' }
        : { background: 'linear-gradient(to bottom, #58B5FF, #99CEFF, #C9E1FF)' }
      }
    >
      {/* Night mode stars */}
      {theme === 'dark' && (
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
      )}
      {/* Parallax background wrapper */}
      <div className="absolute inset-0 w-full h-full z-0 transition-transform duration-300" style={{...bgParallax, willChange: 'transform'}}></div>
      {/* Clouds */}
      <img src={cloudUrl} alt="cloud" className="hidden md:block absolute right-[75%] top-[16%] w-[500px] h-auto z-30 transition-transform duration-300" style={{...cloudLeftTop, willChange: 'transform'}} />
      <img src={cloudUrl} alt="cloud" className="hidden md:block absolute left-0 bottom-[35%] w-[300px] h-auto z-10 transition-transform duration-300" style={{...cloudLeftMid, willChange: 'transform'}} />
      <img src={cloudUrl} alt="cloud" className="hidden md:block absolute left-[80%] top-[16%] w-[350px] h-auto z-30 transition-transform duration-300" style={{...cloudRightTop, willChange: 'transform'}} />
      <div className="footer-content max-w-7xl mx-auto relative z-20">
        <div className="flex flex-col md:flex-row gap-y-6 md:gap-y-0 gap-x-4 md:gap-x-8 mb-4 px-2 md:px-4 w-full">
          {/* Newsletter Signup */}
          <div className={`rounded-3xl border-[6px] border-[#D2E4FF] p-4 md:p-10 flex flex-col h-full shadow-xl w-full md:w-[60%] justify-between ${theme === 'dark' ? 'bg-[#07002F]' : 'bg-[#085494]'}`} style={{minHeight: '365px'}}>
            <h3 className="footer-title text-4xl font-medium text-[#D2E4FF] mb-4 leading-tight">Stay up to date with Good Dopamines</h3>
            <p className="footer-description mb-8 text-lg font-medium leading-relaxed text-[#A6C8F5]">Join our mailing list to be the first to know about new features and releases.</p>
            <form className="w-full flex justify-start items-center" onSubmit={handleSubmit}>
              <div className="flex w-full items-center bg-[#D2E4FF] rounded-2xl border-4 border-[#b7d4ff] p-2">
                <input
                  type="email"
                  placeholder="Good@stuff"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="footer-input flex-1 bg-transparent text-[#000] placeholder-[#85A9D6] text-lg px-4 py-3 rounded-2xl focus:outline-none border-none"
                  required
                />
                <button
                  type="submit"
                  className="footer-button text-[#000] font-medium text-sm px-6 py-3 rounded-2xl  flex items-center justify-center transition-all duration-200 shadow group"
                  style={{ minWidth: '145px', background: 'linear-gradient(135deg, #f59abc, #f56197)' }}
                >
                  Sign up
                  <span className="w-2 h-2 ml-2 bg-black rounded-full inline-block ml-2 transition-all duration-200 group-hover:opacity-0 group-hover:scale-50"></span>
                  <span className="inline-block ml-2 align-middle text-xl transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5">→</span>
                </button>
              </div>
            </form>
          </div>
          {/* Navigation Links + Rooms/Things Combined */}
          <div className={`rounded-3xl border-[6px] border-[#D2E4FF] p-1 flex gap-2 h-full shadow-xl w-full md:w-[60%] ${theme === 'dark' ? 'bg-[#CBCFFF]' : 'bg-[#e3f0ff]'}`} style={{minHeight: '365px'}}>
            {/* Navigation Links */}
            <div className={`flex flex-col gap-1 w-[100%] p-2 rounded-lg ${theme === 'dark' ? 'bg-[#07002F]' : 'bg-[#085494]'}`}>
              {['Home', 'About', 'Logbook', 'Contact'].map((item) => (
                <a
                href={item=="Home"?"/":`/${item}`}
                  key={item}
                  className={`footer-nav-button w-full text-left rounded-lg px-6 py-1 text-lg border-2 transition-all duration-200 shadow mb-2 ${theme === 'dark' ? 'bg-[#CBCFFF] text-[#07002F] border-[#07002F] hover:!bg-[#F5699C] hover:!text-white' : 'bg-[#D2E4FF] text-[#054D85] border-[#e3f0ff] hover:!bg-[#F5699C] hover:!bg-opacity-100 cursor-pointer'}`}
                >
                  • {item}
                </a>
              ))}
            </div>
            {/* Rooms/Things */}
            {/* <div className={`flex flex-col gap-1 w-[60%] p-2 rounded-lg ${theme === 'dark' ? 'bg-[#07002F]' : 'bg-[#085494]'}`}>
              {['Rooms', 'A Things'].map((item) => (
                <button
                  key={item}
                  className={`footer-nav-button w-full text-left rounded-lg px-4 py-1 text-lg border-2 transition-all duration-200 shadow mb-2 ${theme === 'dark' ? 'bg-[#CBCFFF] text-[#07002F] border-[#07002F] hover:!bg-[#F5699C] hover:!text-white' : 'bg-[#D2E4FF] text-[#054D85] border-[#e3f0ff] hover:!bg-[#F5699C] hover:!bg-opacity-100'}`}
                >
                  • {item}
                </button>
              ))}
              <div className="flex justify-center items-end mt-[60%]">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl shadow-lg" style={{ transform: 'rotate(20deg)' }}></div>
              </div>
            </div> */}
          </div>
          {/* Social Media */}
          <div className={`rounded-3xl py-2 px-2 md:py-4 md:px-3 flex flex-col h-full shadow-xl w-full md:w-[50%] items-center justify-center ${theme === 'dark' ? 'bg-[#07002F]' : 'bg-[#D2E4FF]'}`} style={{minHeight: '365px'}}>
            <h4 className={`footer-social-title font-medium mb-2 md:mb-2 mt-8 md:mt-[6rem] text-base md:text-lg w-full text-left pl-2 ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]'}`}>Follow us</h4>
            <div className={`flex-1 w-full flex items-center justify-center rounded-2xl px-2 md:px-4 py-1 ${theme === 'dark' ? 'bg-[#07002F] text-[#085494]' : 'bg-[#085494]'}`}>
              <div className="grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-1 md:gap-x-4 md:gap-y-1 w-full h-full place-items-center">
                {[
                  { icon: () => <span className='footer-social-icon text-2xl'>🕹️</span>, name: 'Discord' },
                  { icon: () => <span className='footer-social-icon text-2xl'>🎵</span>, name: 'Tiktok' },
                  { icon: () => <span className='footer-social-icon text-2xl'>📸</span>, name: 'Instagram' },
                  { icon: () => <span className='footer-social-icon text-2xl'>𝕏</span>, name: 'X/Twitter' },
                  { icon: () => <span className='footer-social-icon text-2xl'>▶️</span>, name: 'Youtube' },
                  { icon: () => <span className='footer-social-icon text-2xl'>#</span>, name: 'Threads' },
                ].map((social, idx) => (
                  <div key={idx} className="footer-social-item bg-[#D2E4FF] rounded-2xl flex flex-col items-center justify-center aspect-square w-10 h-10 md:w-[5.5rem] md:h-[5.5rem] shadow-sm border-2 border-[#e3f0ff] relative transition-all duration-200 cursor-pointer hover:scale-105">
                    <div className="absolute top-1 right-1 md:top-2 md:right-2 w-1 h-1 md:w-2 md:h-2 bg-[#085494] rounded-full"></div>
                    <social.icon />
                    <span className="footer-social-name text-xs mt-1 md:mt-2 text-[#054D85] text-center w-full font-medium">{social.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bar */}
        <div className="footer-bar flex flex-wrap justify-between items-center text-sm text-[#054d85] bg-[#D2E4FF] rounded-2xl px-10 py-2 border-2 border-[#e3f0ff] shadow-xl w-[98%] place-self-center">
          <span className="font-medium">© Good Dopamine. 2025</span>
          <div className="flex gap-8">
            {['Terms', 'Privacy', 'Media'].map((link) => (
              <a
                key={link}
                href={`/${link}`}
                className="hover:text-[#054D85] font-medium transition-all duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Responsive styles for mobile scaling */}
      <style>{`
        .footer-section {
          padding-top: 8rem;
          padding-bottom: 2rem;
        }
        
        @media (max-width: 1024px) {
          .footer-section {
            padding-top: 2rem !important;
            padding-bottom: 1rem !important;
            min-height: auto !important;
          }
          
          .footer-content {
            transform: none !important;
          }
          
          .footer-title {
            font-size: 2.25rem !important;
            margin-bottom: 1rem !important;
            line-height: 1.2 !important;
          }
          
          .footer-description {
            font-size: 0.875rem !important;
            margin-bottom: 1.5rem !important;
            line-height: 1.4 !important;
          }
          
          .footer-input {
            font-size: 0.875rem !important;
            padding: 0.75rem 1rem !important;
          }
          
          .footer-button {
            font-size: 0.75rem !important;
            padding: 0.75rem 1.25rem !important;
            min-width: 100px !important;
          }
          
          .footer-nav-button {
            font-size: 0.875rem !important;
            padding: 0.5rem 0.75rem !important;
            margin-bottom: 0.5rem !important;
          }
          
          .footer-social-title {
            font-size: 0.875rem !important;
            margin-bottom: 0.75rem !important;
          }
          
          .footer-social-item {
            width: 100% !important;
            height: 100% !important;
            min-width: 4rem !important;
            min-height: 4rem !important;
          }
          
          .footer-social-icon {
            font-size: 1.5rem !important;
          }
          
          .footer-social-name {
            font-size: 0.875rem !important;
          }
          
          .footer-bar {
            font-size: 0.75rem !important;
            padding: 0.75rem 1.5rem !important;
            margin-bottom: 1.5rem !important;
          }
        }
        
        @media (max-width: 768px) {
          .footer-section {
            padding-top: 1.5rem !important;
            padding-bottom: 5rem !important;
            min-height: auto !important;
          }
          
          .footer-content {
            transform: none !important;
          }
          
          .footer-title {
            font-size: 1.875rem !important;
            margin-bottom: 0.75rem !important;
            line-height: 1.2 !important;
          }
          
          .footer-description {
            font-size: 0.75rem !important;
            margin-bottom: 1.25rem !important;
            line-height: 1.4 !important;
          }
          
          .footer-input {
            font-size: 0.75rem !important;
            padding: 0.625rem 0.875rem !important;
          }
          
          .footer-button {
            font-size: 0.625rem !important;
            padding: 0.625rem 1rem !important;
            min-width: 80px !important;
          }
          
          .footer-nav-button {
            font-size: 0.75rem !important;
            padding: 0.375rem 0.5rem !important;
            margin-bottom: 0.375rem !important;
          }
          
          .footer-social-title {
            font-size: 0.75rem !important;
            margin-bottom: 0.5rem !important;
          }
          
          .footer-social-item {
            width: 100% !important;
            height: 100% !important;
            min-width: 3.5rem !important;
            min-height: 3.5rem !important;
          }
          
          .footer-social-icon {
            font-size: 1.25rem !important;
          }
          
          .footer-social-name {
            font-size: 0.75rem !important;
          }
          
          .footer-bar {
            font-size: 0.625rem !important;
            padding: 0.625rem 1.25rem !important;
            margin-bottom: 1rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .footer-section {
            padding-top: 5rem !important;
            padding-bottom: 6rem !important;
            min-height: auto !important;
          }
          
          .footer-content {
            transform: none !important;
          }
          
          .footer-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.5rem !important;
            line-height: 1.2 !important;
          }
          
          .footer-description {
            font-size: 0.625rem !important;
            margin-bottom: 1rem !important;
            line-height: 1.4 !important;
          }
          
          .footer-input {
            font-size: 0.625rem !important;
            padding: 0.5rem 0.75rem !important;
          }
          
          .footer-button {
            font-size: 0.5rem !important;
            padding: 0.5rem 0.75rem !important;
            min-width: 60px !important;
          }
          
          .footer-nav-button {
            font-size: 0.625rem !important;
            padding: 0.25rem 0.375rem !important;
            margin-bottom: 0.25rem !important;
          }
          
          .footer-social-title {
            font-size: 0.625rem !important;
            margin-bottom: 0.375rem !important;
          }
          
          .footer-social-item {
            width: 100% !important;
            height: 100% !important;
            min-width: 3rem !important;
            min-height: 3rem !important;
          }
          
          .footer-social-icon {
            font-size: 1rem !important;
          }
          
          .footer-social-name {
            font-size: 0.625rem !important;
          }
          
          .footer-bar {
            font-size: 0.5rem !important;
            padding: 0.5rem 1rem !important;
            margin-bottom: 0.75rem !important;
          }
        }
        
        @media (max-width: 360px) {
          .footer-section {
            padding-top: 0.75rem !important;
            padding-bottom: 8.5rem !important;
            min-height: auto !important;
          }
          
          .footer-content {
            transform: none !important;
          }
          
          .footer-title {
            font-size: 1.25rem !important;
            margin-bottom: 0.375rem !important;
            line-height: 1.2 !important;
          }
          
          .footer-description {
            font-size: 0.5rem !important;
            margin-bottom: 0.75rem !important;
            line-height: 1.4 !important;
          }
          
          .footer-input {
            font-size: 0.5rem !important;
            padding: 0.375rem 0.625rem !important;
          }
          
          .footer-button {
            font-size: 0.375rem !important;
            padding: 0.375rem 0.5rem !important;
            min-width: 50px !important;
          }
          
          .footer-nav-button {
            font-size: 0.5rem !important;
            padding: 0.125rem 0.25rem !important;
            margin-bottom: 0.125rem !important;
          }
          
          .footer-social-title {
            font-size: 0.5rem !important;
            margin-bottom: 0.25rem !important;
          }
          
          .footer-social-item {
            width: 100% !important;
            height: 100% !important;
            min-width: 2.5rem !important;
            min-height: 2.5rem !important;
          }
          
          .footer-social-icon {
            font-size: 0.875rem !important;
          }
          
          .footer-social-name {
            font-size: 0.5rem !important;
          }
          
          .footer-bar {
            font-size: 0.375rem !important;
            padding: 0.375rem 0.75rem !important;
            margin-bottom: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  )
} 