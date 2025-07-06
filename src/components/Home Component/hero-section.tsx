import { useEffect, useState, useRef } from "react"
// import ThreeDText from "../ui/3d-text" // Uncomment if you have this component

interface HeroSectionProps {
  theme: 'light' | 'dark';
}

export function HeroSection({ theme }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollBtn, setShowScrollBtn] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    setIsLoaded(true)

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setShowScrollBtn(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={heroRef}
      className={`min-h-screen relative overflow-hidden flex items-center justify-center ${theme === 'dark' ? 'bg-gradient-to-b from-[#4952b0] via-[#181a3a] to-[#23244a]' : 'bg-gradient-to-b from-[#5BB6FF] to-[#8EC5FF]'}`}
      data-scroll-section
    >
      {/* Realistic Floating Clouds */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Cloud Image */}
        <img 
          src="/images/cloud.png" 
          alt="Cloud" 
          className="mobile-cloud-top-left"
          style={{
            position: 'absolute', 
            bottom: '50%', 
            left: '10%', 
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 10}px)`,
            filter: theme === 'dark' ? 'drop-shadow(0 0 40px #ffe9b1)' : '',
            transition: 'transform 0.2s cubic-bezier(.4,2,.6,1), filter 0.3s',
            height: 'clamp(80px, 15vw, 160px)',
            width: 'clamp(225px, 30vw, 450px)',
            maxWidth: 'clamp(225px, 30vw, 450px)',
          }} 
        />
        {/* Top Right Cloud Image */}
        <img 
          src="/images/cloud.png" 
          alt="Cloud" 
          className="mobile-cloud-top-right"
          style={{
            position: 'absolute', 
            top: '35%', 
            right: '1%', 
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * 8}px)`,
            filter: theme === 'dark' ? 'drop-shadow(0 0 40px #ffe9b1)' : '',
            transition: 'transform 0.2s cubic-bezier(.4,2,.6,1), filter 0.3s',
            height: 'clamp(170px, 25vw, 340px)',
            width: 'clamp(225px, 30vw, 450px)',
            maxWidth: 'clamp(225px, 30vw, 450px)',
          }} 
        />
        {/* Bottom Left Cloud Image */}
        <img 
          src="/images/cloud.png" 
          alt="Cloud" 
          className="mobile-cloud-bottom-left"
          style={{
            position: 'absolute', 
            bottom: '10%', 
            left: '3%', 
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * -10}px)`,
            filter: theme === 'dark' ? 'drop-shadow(0 0 40px #ffe9b1)' : '',
            transition: 'transform 0.2s cubic-bezier(.4,2,.6,1), filter 0.3s',
            height: 'clamp(100px, 15vw, 200px)',
            width: 'clamp(225px, 30vw, 450px)',
            maxWidth: 'clamp(225px, 30vw, 450px)',
          }} 
        />
      </div>

      {/* Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-blue-400 opacity-30"></div>

      {/* Night mode stars overlay */}
      {theme === 'dark' && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Render 8 static stars with fixed positions and sizes */}
          {[
            { left: '10%', top: '12%', size: 8, opacity: 0.9 },
            { left: '25%', top: '30%', size: 6, opacity: 0.8 },
            { left: '40%', top: '18%', size: 7, opacity: 0.85 },
            { left: '60%', top: '10%', size: 5, opacity: 0.7 },
            { left: '75%', top: '22%', size: 8, opacity: 0.9 },
            { left: '85%', top: '35%', size: 6, opacity: 0.8 },
            { left: '55%', top: '40%', size: 7, opacity: 0.85 },
            { left: '20%', top: '45%', size: 5, opacity: 0.7 },
          ].map((star, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                height: `${star.size}px`,
                background: '#ffe9b1',
                borderRadius: '50%',
                opacity: star.opacity,
                filter: 'blur(0.5px)',
              }}
            />
          ))}
        </div>
      )}

      <div className="text-center z-10 relative mt-[3rem]" data-scroll data-scroll-speed="0.2">
        <div
          className={`transition-all flex flex-col items-center relative justify-center duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 "}`}
        >
          <h1
            className={
              `text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-light mt-5 leading-tight ` +
              (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#064D85]')
            }
          >
            <span className="inline-block animate-fade-in-up absolute left-[25%] sm:left-[30%] md:left-[35%]" style={{ animationDelay: "0.2s" }}>
              Hello!
            </span>
            <br />
            <span className="inline-block animate-fade-in-up absolute left-[40%] sm:left-[45%] md:left-[50%]" style={{ animationDelay: "0.4s" }}>
              We are
            </span>
          </h1>

          {/* Enhanced Things Logo with Real Image */}
          <div
            className="things-logo-container relative flex items-center justify-center"
            data-scroll
            data-scroll-speed="0.1"
            style={{
              transform: `rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
            }}
          >
            <div className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto px-4 relative">
              <img
                src="/images/logo.png"
                alt="Things Logo"
                width={1200}
                height={480}
                style={{ width: "100%", height: "auto", display: "block", marginTop:'-1rem'}}
                className="things-logo relative z-10 drop-shadow-xl"
              />
              <p
                className={
                  `absolute inset-0 flex flex-col items-center justify-center text-center text-md sm:text-sm md:text-lg lg:text-lg max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-xl mx-auto leading-relaxed font-medium animate-fade-in-up ` +
                  (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-blue-800')
                }
                style={{ 
                  animationDelay: "0.8s", 
                  zIndex: 20, 
                  marginTop: 'clamp(15rem, 25vw, 25.5rem)',
                  width: 'clamp(15rem, 90vw, 55rem)',
                  marginRight: 'clamp(-2rem, -5vw, -7rem)'
                }}
              >
                In a world where everyone — people, businesses, and governments
                <br className="hidden sm:block" />
                — is trying to keep you hooked, we're here to set you free.
                <br className="hidden md:block" />
               F*ck bad dopamines: scrolls, shorts, misaligned AI.
                {/* <span className="text-pink-600 font-bold">weird {">"} normal</span>. */}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* {showScrollBtn && (
        <button
          className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 w-16 h-16 sm:w-24 sm:h-24 bg-blue-900 rounded-xl sm:rounded-2xl flex flex-col items-center justify-end shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer z-20 group hover:bg-[#ff5fa2]"
          onClick={() => {
            const el = document.getElementById('our-things-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Scroll to next section"
        >
          <div className="flex-1 flex items-center justify-center w-full">
            
            <svg className="w-6 h-6 sm:w-10 sm:h-10 text-white transition-transform duration-300 group-hover:translate-y-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <span className="mb-2 sm:mb-4 text-white font-medium text-sm sm:text-lg">Scroll</span>
        </button>
      )} */}

      <style>{`
        .cloud-simple {
          position: absolute;
          pointer-events: none;
        }
        .cloud-puff {
          position: absolute;
          border-radius: 50%;
          box-shadow: 0 8px 32px 0 rgba(0,0,0,0.10), 0 0 32px 8px #e0e7ef44;
          transition: background 0.3s;
        }

        .things-logo-container {
          perspective: 1000px;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
        }

        .things-logo {
          animation: logoFloat 6s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .things-logo:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 25px 50px rgba(236, 72, 153, 0.4)) !important;
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          50% { transform: translateY(-10px) rotateZ(1deg); }
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }

        .bg-blue-350 {
          background-color: #7dd3fc;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        @media (max-width: 768px) {
          .things-logo {
            max-width: 340px;
          }
          
          /* Scale down clouds on mobile */
          .realistic-cloud {
            transform: scale(0.6);
          }
          
          /* Mobile cloud positioning */
          .mobile-cloud-top-left {
            bottom: 60% !important;
            left: 5% !important;
            height: clamp(60px, 12vw, 120px) !important;
            width: clamp(150px, 25vw, 300px) !important;
            max-width: clamp(150px, 25vw, 300px) !important;
          }
          
          .mobile-cloud-top-right {
            top: 25% !important;
            right: 2% !important;
            height: clamp(120px, 18vw, 240px) !important;
            width: clamp(150px, 25vw, 300px) !important;
            max-width: clamp(150px, 25vw, 300px) !important;
          }
          
          .mobile-cloud-bottom-left {
            bottom: 15% !important;
            left: 2% !important;
            height: clamp(80px, 12vw, 160px) !important;
            width: clamp(150px, 25vw, 300px) !important;
            max-width: clamp(150px, 25vw, 300px) !important;
          }
        }

        @media (max-width: 480px) {
          .things-logo {
            max-width: 260px;
          }
          
          .realistic-cloud {
            transform: scale(0.4);
          }
          
          /* Small mobile cloud positioning */
          .mobile-cloud-top-left {
            bottom: 65% !important;
            left: 3% !important;
            height: clamp(50px, 10vw, 100px) !important;
            width: clamp(120px, 20vw, 240px) !important;
            max-width: clamp(120px, 20vw, 240px) !important;
          }
          
          .mobile-cloud-top-right {
            top: 20% !important;
            right: 1% !important;
            height: clamp(100px, 15vw, 200px) !important;
            width: clamp(120px, 20vw, 240px) !important;
            max-width: clamp(120px, 20vw, 240px) !important;
          }
          
          .mobile-cloud-bottom-left {
            bottom: 20% !important;
            left: 1% !important;
            height: clamp(70px, 10vw, 140px) !important;
            width: clamp(120px, 20vw, 240px) !important;
            max-width: clamp(120px, 20vw, 240px) !important;
          }
        }

        @media (max-width: 360px) {
          .things-logo {
            max-width: 200px;
          }
          
          /* Extra small mobile cloud positioning */
          .mobile-cloud-top-left {
            bottom: 70% !important;
            left: 2% !important;
            height: clamp(40px, 8vw, 80px) !important;
            width: clamp(100px, 18vw, 200px) !important;
            max-width: clamp(100px, 18vw, 200px) !important;
          }
          
          .mobile-cloud-top-right {
            top: 15% !important;
            right: 0% !important;
            height: clamp(80px, 12vw, 160px) !important;
            width: clamp(100px, 18vw, 200px) !important;
            max-width: clamp(100px, 18vw, 200px) !important;
          }
          
          .mobile-cloud-bottom-left {
            bottom: 25% !important;
            left: 0% !important;
            height: clamp(60px, 8vw, 120px) !important;
            width: clamp(100px, 18vw, 200px) !important;
            max-width: clamp(100px, 18vw, 200px) !important;
          }
        }

        @media (max-width: 640px) {
          .things-logo {
            max-width: 320px;
          }
        }
      `}</style>
    </section>
  )
} 