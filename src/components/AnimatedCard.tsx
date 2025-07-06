import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import portalImg from '../assets/portal.png';
import landscapeImg from '../assets/landscape.png';
import { useTheme } from './theme-provider';

// Register GSAP plugin
if (typeof window !== 'undefined' && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const AnimatedCard: React.FC = () => {
  const { theme } = useTheme();
  const mainRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card1ContentRef = useRef<HTMLDivElement>(null);
  const card2ContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current || !card1Ref.current || !card2Ref.current || !card1ContentRef.current || !card2ContentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'center center',
          end: '+=2000 center',
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
        },
      });

      // Card 1 expand
      tl.to(card1Ref.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: 0,
        ease: 'power1.inOut',
      })
      // Card 2 fade in
      .to(card2Ref.current, {
        opacity: 1,
        ease: 'power1.inOut',
        duration: 0.2,
      }, '+=0.01')
      // Card 2 expand
      .to(card2Ref.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: 0,
        ease: 'power1.inOut',
      }, '+=0.01');
      // Removed all content animation and initial state
    }, mainRef);
    return () => ctx.revert();
  }, []);

  // Larger initial card size with extra space from top
  const cardStyles = "masked-clip-path about-image absolute left-1/2 top-1/2 z-20 h-[70vh] w-[50vw] origin-center -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl md:w-[40vw] w-96";

  // Grid background logic from our-things-section
  const gridBgStyle = theme === 'dark'
    ? {
        backgroundColor: '#0F0E16',
        backgroundImage: 'url("https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_day.png")',
        backgroundSize: '200px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        opacity: 1,
        backgroundBlendMode: 'normal',
      }
    : {
        backgroundColor: '#B7D4FF',
        backgroundImage: 'url("https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_day.png")',
        backgroundSize: '200px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
      };

  return (
    <div className="h-dvh w-screen relative overflow-hidden rounded-t-[5rem]" id="clip" ref={mainRef}>
      {/* Grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none rounded-t-[5rem]" style={gridBgStyle} />
      {/* Card 1 */}
      <div
        ref={card1Ref}
        className={cardStyles}
      >
        {/* Card 1 Image */}
        <img
          src={portalImg}
          className="absolute left-0 top-0 w-full h-full object-cover"
          alt="Portal"
        />
        {/* Card 1 Content */}
        <div ref={card1ContentRef} className="absolute inset-0 flex flex-col items-stretch justify-end pointer-events-auto" style={{ opacity: 1, transform: 'none' }}>
          {/* Floating badge */}
          <div className="floating-badge absolute top-5 right-5 w-20 h-20 bg-white/95 rounded-3xl flex items-center justify-center z-20 border-2 border-blue-200 shadow-md transition-colors duration-300">
            <span className="block w-4 h-4 rounded-full bg-blue-400 transition-all duration-200"></span>
            <svg className="absolute transition-all duration-200 opacity-0 group-hover:opacity-100" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 20L20 8M12 8h8v8" stroke="#9D2F55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {/* Floating overlay for text */}
          <div className="right-card-overlay absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 z-30 bg-white/90 rounded-xl shadow-2xl px-8 py-2 max-w-[380px] min-w-[220px] min-h-[40px] border border-blue-100 flex flex-col items-center backdrop-blur-md">
            <h3 className="text-lg md:text-xl font-bold mb-1 text-center text-blue-900" style={{fontFamily:'Inter, sans-serif'}}>Ridan for Research</h3>
            <p className="text-sm font-normal text-center text-blue-700" style={{fontFamily:'Inter, sans-serif'}}>A standalone track where we partner with top researchers in the world to study and solve the attention crisis at its core.</p>
          </div>
        </div>
      </div>
      {/* Card 2 - Initially hidden */}
      <div
        ref={card2Ref}
        className={`${cardStyles} opacity-0`}
      >
        {/* Card 2 Image */}
        <img
          src={landscapeImg}
          className="absolute left-0 top-0 w-full h-full object-cover"
          alt="Landscape"
        />
        {/* Card 2 Content */}
        <div ref={card2ContentRef} className="absolute inset-0 flex flex-col items-stretch justify-end pointer-events-auto" style={{ opacity: 1, transform: 'none' }}>
          {/* Floating badge */}
          <div className="floating-badge absolute top-5 right-5 w-20 h-20 bg-white/95 rounded-3xl flex items-center justify-center z-20 border-2 border-blue-200 shadow-md transition-colors duration-300">
            <span className="block w-4 h-4 rounded-full bg-blue-400 transition-all duration-200"></span>
            <svg className="absolute transition-all duration-200 opacity-0 group-hover:opacity-100" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 20L20 8M12 8h8v8" stroke="#9D2F55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {/* Floating overlay for text */}
          <div className="right-card-overlay absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 z-30 bg-white/90 rounded-xl shadow-2xl px-8 py-2 max-w-[380px] min-w-[220px] min-h-[40px] border border-blue-100 flex flex-col items-center backdrop-blur-md">
            <h3 className="text-lg md:text-xl font-bold mb-1 text-center text-blue-900" style={{fontFamily:'Inter, sans-serif'}}>Ridan</h3>
            <p className="text-sm font-normal text-center text-blue-700" style={{fontFamily:'Inter, sans-serif'}}>Built to serve your long-term goals, not your impulses.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCard;
