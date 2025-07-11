import  { useMemo } from 'react';
import { Navigation } from '../components/Navigation';

import { useTheme } from '../components/theme-provider';
import { FooterSection } from '../components/footer-section';

import OurStory from '../components/OurStory';

import CommunitySection from '../components/CommunitySection';

export default function AboutUs() {
  const { theme } = useTheme();
  
  // Generate random stars for dark mode
  const numStars = 15;
  const stars = useMemo(() => Array.from({ length: numStars }, (_) => {
    const left = Math.random() * 100;
    const top = Math.random() * 70;
    const size = 2 + Math.random() * 5;
    const color = Math.random() > 0.5 ? '#fff' : '#A9CAF5';
    const opacity = 0.6 + Math.random() * 0.4;
    const duration = 2 + Math.random() * 2;
    const delay = Math.random() * 2;
    return { left, top, size, color, opacity, duration, delay };
  }), []);

  return (
    <div
      className={`min-h-screen w-full flex flex-col relative ${theme === 'dark' ? 'bg-gradient-to-b from-[#4952b0] via-[#181a3a] to-[#23244a]' : ''}`}
      style={{
        background: theme === 'dark'
          ? 'none'
          : 'linear-gradient(135deg, #57B5FF 0%, #74BDFF 30%, #8DC4FF 55%, #9DC7FD 100%)',
      }}
    >
      {/* Grid background for night mode */}
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
          {/* Glowing Stars */}
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
      <div className="flex-1 flex items-center justify-center relative z-10 px-2 sm:px-4 md:px-8 pt-28 md:pt-[5rem] lg:pt-0">
        <div
          className="flex w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 lg:px-12 gap-6 sm:gap-8 md:gap-12 items-center flex-col lg:flex-row"
          style={{ height: 'auto', minHeight: '100vh' }}
        >
          {/* Left: Pixel Art Images */}
          <div className="hidden lg:flex flex-col items-center justify-center w-full lg:w-1/2 relative min-h-[320px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-0 aboutus-mobile-images">
            <div className="flex gap-8 mb-2">
              <img src="/images/person.png" alt="Persons" className="w-auto" />
            </div>
            <div className="flex gap-8 mt-2">
              {/* Computer in front of left person */}
              <img
                src="/images/computer.png"
                alt="Computer"
                className="absolute"
                style={{
                  left: '17%',
                  top: '60%',
                  width: '210px',
                  zIndex: 3,
                }}
              />
              {/* Console in front of middle person */}
              <img
                src="/images/console.png"
                alt="Console"
                className="absolute"
                style={{
                  left: '40%',
                  top: '56%',
                  width: '210px',
                  zIndex: 3,
                }}
              />
              {/* DJ in front of right person */}
              <img
                src="/images/dj.png"
                alt="DJ"
                className="absolute"
                style={{
                  left: '69%',
                  top: '45%',
                  width: '210px',
                  zIndex: 3,
                }}
              />
            </div>
          </div>
          {/* Mobile/Tablet: Stacked images, no absolute positioning */}
          <div className="flex flex-col items-center justify-center w-full relative min-h-[220px] sm:min-h-[320px] md:min-h-[400px] lg:hidden gap-2">
            <img src="/images/person.png" alt="Persons" className="w-3/4 max-w-xs sm:max-w-sm md:max-w-md mx-auto z-10" />
          </div>
          {/* Right: Text */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center pl-0 lg:pl-[8rem] mt-8 lg:mt-0 text-center lg:text-left">
            <h1
              className={
                'font-semibold mb-6 sm:mb-8 leading-none ' +
                (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054d85]') +
                ' text-3xl sm:text-4xl md:text-5xl lg:text-[5rem]'
              }
            >
              About us
            </h1>
            <p
              className={
                'w-full max-w-2xl ' +
                (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054d85]') +
                ' text-base sm:text-lg md:text-xl mx-auto'
              }
            >
              Good Dopamine was born in April 2025 — to give you cheat codes for your brain. We're a dopamine factory disguised as a software studio, building behavioral AI tools that trick your brain into doing hard things — and actually enjoying it.
            </p>
          </div>
        </div>
      </div>
      
     
      <OurStory/>
      
      {/* AI today Misalligned */}
      <div
        className={`w-full flex flex-col items-center justify-center mt-20 mb-20 relative px-4 sm:px-8 md:px-16 lg:px-32 ${theme === 'dark' ? 'bg-gradient-to-b from-[#4952b0] via-[#181a3a] to-[#23244a]' : ''}`}
        style={{
          background:
            theme === 'dark'
              ? 'none'
              : 'linear-gradient(135deg, #57B5FF 0%, #74BDFF 30%, #8DC4FF 55%, #9DC7FD 100%)',
        }}
      >
        <img src="/images/cloud.png" alt="Cloud left" className="absolute left-0 top-1/3 w-32 sm:w-44 md:w-56 lg:w-72 opacity-90" />
        <img src="/images/cloud.png" alt="Cloud right" className="absolute right-0 top-10 w-32 sm:w-44 md:w-56 lg:w-72 opacity-90" />
        <img src="/images/cloud.png" alt="Cloud bottom right" className="absolute right-0 bottom-0 w-32 sm:w-44 md:w-56 lg:w-72 opacity-90" />
        <div className="max-w-3xl w-full z-20 flex flex-col items-start mx-auto">
          <h1 className={`font-semibold mt-12 mb-4 text-center ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]'} text-2xl sm:text-3xl md:text-4xl lg:text-5xl capitalize`}>Most AI today are misaligned.</h1>
          <p className={` mb-4 ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]'} text-base sm:text-lg md:text-xl`}>For example, social media algorithms are brilliant at understanding your short-term cravings — but they pull you away from your long-term goals.<br/>We're reversing that.</p>
          <p className={` mb-4 ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]'} text-base sm:text-lg md:text-xl`}>We are building a <span className='capitalize font-bold'>cognitive alignment engine</span>.<br/>AI that helps you act on what you truly want over time — not what distracts you in the moment.</p>
          <p className={`mb-4 ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]'} text-base sm:text-lg md:text-xl`}>You could call it a new kind of productivity.<br/>While OpenAI builds assistants to help you do more,<br/><span className='capitalize font-semibold'>we build aligned AI to help you do less — but better.</span><br/>By keeping the noise out and your mind clear.</p>
          <div className={`flex flex-col sm:flex-col gap-8 mt-8 w-full items-start ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]'}`}>
            <div className="flex-1 flex items-center justify-center gap-[1rem]">
              <div className="flex items-center ">
                <span className="text-xl mr-2">🟠</span>
                <span className="font-semibold text-base sm:text-lg md:text-xl">Used by -</span>
              </div>
              <div className="text-center text-base sm:text-lg md:text-xl">
                Students, creators, knowledge workers, and teams.
              </div>
            </div>
            <div className="flex-1 flex items-start justify-center gap-[1rem]">
              <div className="flex items-center justify-center">
                <span className="text-xl mr-2">⚪</span>
                <span className="font-semibold text-base sm:text-lg md:text-xl">Built by -</span>
              </div>
              <div className="text-base sm:text-lg md:text-xl">
                Researchers, designers, and builders who've lived this problem.<br/>
                We tried everything. Nothing worked. So we built our own.
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommunitySection/>
      <FooterSection theme={theme} />
    </div>
  );
} 