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

  const [numStars, setNumStars] = useState(32);

  useEffect(() => {
    const updateStarCount = () => {
      if (window.innerWidth <= 768) {
        setNumStars(6);
      } else if (window.innerWidth <= 1024) {
        setNumStars(7);
      } else {
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
      <div className="absolute inset-0 w-full h-full z-0 transition-transform duration-300" style={{...bgParallax, willChange: 'transform'}}></div>
      <img src={cloudUrl} alt="cloud" className="hidden md:block absolute right-[75%] top-[16%] w-[500px] h-auto z-30 transition-transform duration-300" style={{...cloudLeftTop, willChange: 'transform'}} />
      <img src={cloudUrl} alt="cloud" className="hidden md:block absolute left-0 bottom-[35%] w-[300px] h-auto z-10 transition-transform duration-300" style={{...cloudLeftMid, willChange: 'transform'}} />
      <img src={cloudUrl} alt="cloud" className="hidden md:block absolute left-[80%] top-[16%] w-[350px] h-auto z-30 transition-transform duration-300" style={{...cloudRightTop, willChange: 'transform'}} />
      <div className="footer-content max-w-7xl mx-auto relative z-20">
        <div className="flex flex-col xl:flex-row gap-y-6 xl:gap-y-0 gap-x-0 xl:gap-x-8 mb-4 px-2 md:px-4 w-full md:gap-y-8 md:gap-x-0 md:flex-col lg:flex-col xl:gap-y-0 xl:gap-x-8">
          <div className={`rounded-3xl border-[6px] border-[#D2E4FF] p-4 md:p-10 flex flex-col h-full shadow-xl w-full md:w-full  justify-between ${theme === 'dark' ? 'bg-[#07002F]' : 'bg-[#085494]'}`} style={{minHeight: window.innerWidth > 1024 ? '365px' : '220px'}}>
            <h3 className="footer-title text-2xl font-base text-[#D2E4FF] mb-1 leading-tight lg:w-[60%]">Stay up to date with Good Dopamines</h3>
            <p className="footer-description mb-8 text-sm font-light leading-relaxed text-[#A6C8F5] lg:w-[50%]">Join our mailing list to be the first to know about new features and releases.</p>
            <form className="w-full flex justify-start items-center" onSubmit={handleSubmit}>
                             <div className="flex w-full items-center bg-[#D2E4FF] rounded-2xl border-4 border-[#b7d4ff] p-1 gap-2">
                  <input
                    type="email"
                    placeholder="Good@stuff"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="footer-input flex-1 bg-transparent text-[#000] placeholder-[#85A9D6] text-sm px-2 py-1 rounded-2xl focus:outline-none border-none"
                    required
                  />
                  <button
                    type="submit"
                    className="footer-button text-[#000] font-medium text-sm px-2 py-3 rounded-2xl flex items-center justify-center transition-all duration-200 shadow group"
                    style={{ minWidth: '105px', background: 'linear-gradient(135deg, #f59abc, #f56197)' }}
                  >
                  Sign up
                  <span className="relative ml-2" style={{ width: '1em', display: 'inline-block' }}>
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-300 group-hover:opacity-0 opacity-100 w-full flex justify-center">
                      <span className="inline-block w-[4px] h-[4px] rounded-full bg-black"></span>
                    </span>
                    <span className="absolute left-0 top-[-2px] -translate-y-1/2 transition-opacity duration-300 group-hover:opacity-100 opacity-0 w-full flex justify-center">
                      <span className="text-black text-xl">→</span>
                    </span>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className={`rounded-3xl border-[6px] border-[#D2E4FF] p-1 flex gap-2 h-full shadow-xl w-full md:w-full xl:w-[60%] ${theme === 'dark' ? 'bg-[#CBCFFF]' : 'bg-[#e3f0ff]'}`} style={{minHeight: window.innerWidth > 1024 ? '365px' : '220px'}}>
            <div className={`flex flex-col w-[100%] p-1 px-1 rounded-lg ${theme === 'dark' ? 'bg-[#07002F]' : 'bg-[#085494]'}`}>
              {['Home', 'About', 'Logbook', 'Contact'].map((item) => (
                <a
                  href={item=="Home"?"/":`/${item}`}
                  key={item}
                  className={`footer-nav-button flex items-center w-full rounded-lg px-6 py-1 text-[1.06rem] border-2 transition-all duration-200 shadow mb-1 group ${theme === 'dark' ? 'bg-[#CBCFFF] text-[#07002F] border-[#07002F] hover:!bg-[#F5699C] hover:!text-black' : 'bg-[#D2E4FF] text-[#054D85] border-[#e3f0ff] hover:!bg-[#F5699C] hover:!text-black cursor-pointer'}`}
                >
                  <span className="relative mr-2" style={{ width: '1em', display: 'inline-block' }}>
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-300 group-hover:opacity-0 opacity-100 w-full flex items-center justify-center">
                      <span className="inline-block w-[4px] h-[4px] rounded-full" style={{ backgroundColor: theme === 'dark' ? '#07002F' : '#054D85' }}></span>
                    </span>
                    <span className="absolute left-0 top-[-2px] -translate-y-1/2 transition-opacity duration-300 group-hover:opacity-100 opacity-0 w-full flex justify-center">
                      <span className="text-black text-xl">→</span>
                    </span>
                  </span>
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className={`rounded-3xl py-2 px-2 md:py-4 md:px-3 flex flex-col h-full shadow-xl w-full md:w-full xl:w-[70%] items-center justify-center ${theme === 'dark' ? 'bg-[#07002F]' : 'bg-[#D2E4FF]'}`} style={{minHeight: window.innerWidth > 1024 ? '365px' : '220px'}}>
            <h4 className={`footer-social-title font-medium mb-2 md:mb-2 mt-8 md:mt-[6rem] text-base md:text-lg w-full text-left pl-2 ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]'}`}>Follow us</h4>
            <div className={`flex-1 w-full flex items-center justify-center rounded-2xl px-1 md:px-2 ${theme === 'dark' ? 'bg-[#07002F] text-[#085494]' : 'bg-[#085494]'}`}>
            <div className="footer-social-item-container pt-1 pb-1  lg:pb-0 lg:pt-0 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-4 lg:gap-y-2 xl:gap-x-3 xl:gap-y-2 w-full h-full lg:place-items-center">
                {[
                  { icon: () => <span className='footer-social-icon text-2xl'>🕹️</span>, name: 'Discord', link: 'https://discord.com' },
                  { icon: () => <span className='footer-social-icon text-2xl'>🎵</span>, name: 'Tiktok', link: 'https://tiktok.com' },
                  { icon: () => <span className='footer-social-icon text-2xl'>📸</span>, name: 'Instagram', link: 'https://instagram.com' },
                  { icon: () => <span className='footer-social-icon text-2xl'>𝕏</span>, name: 'X/Twitter', link: 'https://twitter.com' },
                  { icon: () => <span className='footer-social-icon text-2xl'>▶️</span>, name: 'Youtube', link: 'https://www.youtube.com/shorts/LBLJPkiZgRU' },
                  { icon: () => (
                    <svg className='footer-social-icon text-2xl' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="4" fill="#0A66C2"/>
                      <path d="M7.75 9.5V16.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.75 7.75V7.76" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 12.5V16.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 12.5C12 11.2574 13.0074 10.25 14.25 10.25C15.4926 10.25 16.5 11.2574 16.5 12.5V16.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ), name: 'LinkedIn', link: 'https://www.linkedin.com/in/SasOnTheMove' },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    <div
                      className="footer-social-item bg-[#D2E4FF] rounded-2xl flex flex-col items-center justify-center aspect-square w-10 h-10 md:w-[5.5rem] md:h-[5.5rem] shadow-sm border-2 border-[#e3f0ff] relative transition-all duration-200 cursor-pointer lg:scale-105 group hover:!bg-[#F5699C]"
                    >
                      {/* Dot/Arrow in top-right */}
                      <div className="absolute top-1 right-1 md:top-2 md:right-2 w-2 h-2 md:w-3 md:h-3 flex items-center justify-center">
                        <span className="block w-1 h-1 rounded-full transition-all duration-200 group-hover:opacity-0 bg-[#054D85]"></span>
                        <svg className="absolute transition-all duration-200 opacity-0 group-hover:opacity-100" width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 20L20 8M12 8h8v8" stroke="#085494" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <social.icon />
                      <span className="footer-social-name text-xs mt-1 md:mt-2 text-[#054D85] text-center w-full font-medium group-hover:text-black">{social.name}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bar flex flex-col sm:flex-row flex-wrap justify-between items-center text-sm text-[#054d85] bg-[#D2E4FF] rounded-2xl px-10 py-2 border-2 border-[#e3f0ff] shadow-xl w-[98%] place-self-center gap-[1rem]">
          <span className="font-light text-xs" >© Good Dopamine. 2025</span>
          <div className="flex gap-8">
            {['Terms', 'Privacy', 'Media'].map((link) => (
              <a
                key={link}
                href={`/${link}`}
                className="hover:text-[#054D85] font-light text-xs  transition-all duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .footer-section {
          padding-top: 8rem;
          padding-bottom: 2rem;
        }
        
        @media (max-width: 1024px) {
          .footer-section {
            padding-top: 1rem;
            padding-bottom: 1rem;
            min-height: auto;
          }
          
          .footer-content {
            transform: none;
          }
          
          .footer-title {
            font-size: 2.25rem;
            margin-bottom: 1rem;
            line-height: 1.2;
          }
          
          .footer-description {
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
            line-height: 1.4;
          }
          
          .footer-input {
            font-size: 0.875rem;
            padding: 0.75rem 1rem;
          }
          
          .footer-button {
            font-size: 0.75rem;
            padding: 0.75rem 1.25rem;
            min-width: 100px;
          }
          
          .footer-nav-button {
            font-size: 0.875rem;
            padding: 0.5rem 0.75rem;
            margin-bottom: 0.5rem;
          }
          
          .footer-social-title {
            font-size: 0.875rem;
            margin-bottom: 0.75rem;
          }
          
          .footer-social-item {
            width: 100%;
            height: 100%;
            min-width: 4rem;
            min-height: 4rem;
          }
          
          .footer-social-icon {
            font-size: 1.5rem;
          }
          
          .footer-social-name {
            font-size: 0.875rem;
          }
          
          .footer-bar {
            font-size: 0.75rem;
            padding: 0.75rem 1.5rem;
            margin-bottom: 1.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .footer-section {
            padding-top: 1.5rem;
            padding-bottom: 5rem;
            min-height: auto;
            margin-top: 7rem;
          }
          
          .footer-content {
            transform: none;
          }
          
          .footer-title {
            font-size: 1.875rem;
            margin-bottom: 0.75rem;
            line-height: 1.2;
          }
          
          .footer-description {
            font-size: 0.75rem;
            margin-bottom: 1.25rem;
            line-height: 1.4;
          }
          
          .footer-input {
            font-size: 0.75rem;
            padding: 0.625rem 0.875rem;
          }
          
          .footer-button {
            font-size: 0.625rem;
            padding: 0.625rem 1rem;
            min-width: 80px;
          }
          
          .footer-nav-button {
            font-size: 0.75rem;
            padding: 0.375rem 0.5rem;
            margin-bottom: 0.375rem;
          }
          
          .footer-social-title {
            font-size: 0.75rem;
            margin-bottom: 0.5rem;
          }
          
          .footer-social-item {
            width: 100%;
            height: 100%;
            min-width: 3rem;
            min-height: 3rem;
          }
          
          .footer-social-icon {
            font-size: 1.25rem;
          }
          
          .footer-social-name {
            font-size: 0.75rem;
          }
          
          .footer-social-item-container {
            display: grid;
            grid-template-columns: repeat(3, minmax(4rem, 1fr));
            gap: 0.2rem;
            -webkit-overflow-scrolling: touch;
          }
          
          .footer-bar {
            font-size: 0.625rem;
            padding: 0.625rem 1.25rem;
            margin-bottom: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .footer-section {
            padding-top: 5rem;
            padding-bottom: 6rem;
            min-height: auto;
            margin-top: 7rem;
          }
          
          .footer-content {
            transform: none;
          }
          
          .footer-title {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            line-height: 1.2;
          }
          
          .footer-description {
            font-size: 0.625rem;
            margin-bottom: 1rem;
            line-height: 1.4;
          }
          
          .footer-input {
            font-size: 0.625rem;
            padding: 0.5rem 0.75rem;
          }
          
          .footer-button {
            font-size: 0.5rem;
            padding: 0.5rem 0.75rem;
            min-width: 60px;
          }
          
          .footer-nav-button {
            font-size: 0.625rem;
            padding: 0.25rem 0.375rem;
            margin-bottom: 0.25rem;
          }
          
          .footer-social-title {
            font-size: 0.625rem;
            margin-bottom: 0.375rem;
          }
          
          .footer-social-item {
            width: 100%;
            height: 100%;
            min-width: 2.5rem;
            min-height: 2.5rem;
          }
          
          .footer-social-icon {
            font-size: 1rem;
          }
          
          .footer-social-name {
            font-size: 0.625rem;
          }
          
          .footer-social-item-container {
            display: grid;
            grid-template-columns: repeat(3, minmax(4rem, 1fr));
            gap: 0.2rem;
            -webkit-overflow-scrolling: touch;
          }
          
          .footer-bar {
            font-size: 0.5rem;
            padding: 0.5rem 1rem;
            margin-bottom: 0.75rem;
          }
        }
        
        @media (max-width: 360px) {
          .footer-section {
            padding-top: 0.75rem;
            padding-bottom: 8.5rem;
            min-height: auto;
            margin-top: 7rem;
          }
          
          .footer-content {
            transform: none;
          }
          
          .footer-title {
            font-size: 1.25rem;
            margin-bottom: 0.375rem;
            line-height: 1.2;
          }
          
          .footer-description {
            font-size: 0.5rem;
            margin-bottom: 0.75rem;
            line-height: 1.4;
          }
          
          .footer-input {
            font-size: 0.5rem;
            padding: 0.375rem 0.625rem;
          }
          
          .footer-button {
            font-size: 0.375rem;
            padding: 0.375rem 0.5rem;
            min-width: 50px;
          }
          
          .footer-nav-button {
            font-size: 0.5rem;
            padding: 0.125rem 0.25rem;
            margin-bottom: 0.125rem;
          }
          
          .footer-social-title {
            font-size: 0.5rem;
            margin-bottom: 0.25rem;
          }
          
          .footer-social-item {
            width: 100%;
            height: 100%;
            min-width: 2rem;
            min-height: 2rem;
          }
          
          .footer-social-icon {
            font-size: 0.875rem;
          }
          
          .footer-social-name {
            font-size: 0.5rem;
          }
          
          .footer-social-item-container {
            display: grid;
            grid-template-columns: repeat(3, minmax(4rem, 1fr));
            gap: 0.2rem;
            -webkit-overflow-scrolling: touch;
          }
          
          .footer-bar {
            font-size: 0.375rem;
            padding: 0.375rem 0.75rem;
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </section>
  )
}