import { useMemo } from "react"


export function AboutSection({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setMousePosition({
  //       x: (e.clientX / window.innerWidth) * 2 - 1,
  //       y: (e.clientY / window.innerHeight) * 2 - 1,
  //     })
  //   }

  //   window.addEventListener("mousemove", handleMouseMove)
  //   return () => window.removeEventListener("mousemove", handleMouseMove)
  // }, [])


  // Generate random stars for dark mode
  const numStars = 7;
  const stars = useMemo(() => Array.from({ length: numStars }, (_) => {
    const left = Math.random() * 100;
    const top = Math.random() * 70;
    const size = 2 + Math.random() * 5;
    const color = Math.random() > 0.5 ? '#fff' : '#A9CAF5';
    const opacity = 0.6 + Math.random() * 0.4;
    const duration = 2 + Math.random() * 2;
    const delay = Math.random() * 2;
    return { left, top, size, color, opacity, duration, delay };
  }), [theme]);

  return (
    <section
      className="about-section relative rounded-t-[5rem] w-full min-h-screen py-16 flex flex-col items-center justify-center overflow-hidden"
      style={{ fontFamily: 'Roobert, sans-serif', background: '#dbeafe' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={theme === 'dark'
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
            }
        }
      />
      
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
      
      {/* 3D objects on the sides */}
      <div className="absolute left-0 top-[55%] z-10 brain-image" style={{pointerEvents: 'none'}}>
        <img
          src="/images/3d-brain.png"
          alt="3D Brain"
          style={{
            width: 160,
            height: 'auto',
            filter: 'drop-shadow(0 8px 32px #b4e0ff88)',
            marginLeft: 48,
            scale: 1.5,
          }}
        />
      </div>
      <div className="absolute right-0 top-[60%] z-10 heart-image" style={{pointerEvents: 'none'}}>
        <img 
          src="/images/3d-heart.png" 
          alt="3D Heart" 
          style={{
            width: 120, 
            height: 'auto', 
            filter: 'drop-shadow(0 4px 24px #b4e0ff88)',
            marginRight: '70px',
            scale: 2,
          }} 
        />
      </div>
      
      {/* Main content with improved arrangement */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center px-6 min-h-[60vh] about-content">
        <p
          className={`about-text text-center text-2xl md:text-3xl lg:px-[2rem] lg:text-5xl font-normal leading-tight ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]'}`}
          style={{ letterSpacing: '-0.03em', lineHeight: 1.2 ,fontFamily:'Roobert'}}
        >
          We make the software 
          <span className="inline-block align-middle mx-2" style={{fontSize: '1.2em'}}>
            <span role="img" aria-label="Globe">💻</span>
          </span>
          we wish someone built for us 
          <span className="inline-block align-middle mx-2" style={{fontSize: '1.2em'}}>
            <span role="img" aria-label="DNA">🧬</span>
          </span>
           and trynna save 
          <span className="inline-block align-middle mx-2" style={{fontSize: '1.2em'}}>
            <span role="img" aria-label="Spark">⚡</span>
          </span>
           dreams while
          we're at it
        </p>
        
        {/* Enhanced button */}
        <div className="flex justify-center mt-10 about-button-container">
          <button
            className={`about-button px-5 py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-3 transition-all duration-300 group ${theme === 'dark' ? 'bg-[#CACEFE] text-[#030303]' : 'bg-[#0a5485] text-white'}`}
            style={{ fontFamily: 'Roobert' }}
          >
            Learn more about us
            <span className="relative ml-2" style={{ width: '1em', display: 'inline-block' }}>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-300 group-hover:opacity-0 opacity-100 w-full flex justify-center">
                <span className={`inline-block w-[4px] h-[4px] rounded-full ${theme === 'dark' ? 'bg-[#030303]' : 'bg-white'}`}></span>
              </span>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-300 group-hover:opacity-100 opacity-0 w-full flex justify-center">
                <span className="text-black text-xl">→</span>
              </span>
            </span>
          </button>
        </div>
      </div>
      
      {/* Responsive styles with enhanced beauty */}
      <style>{`
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }
        
        @media (max-width: 1024px) {
          .about-section {
            min-height: 60vh;
            padding: 2rem 0;
          }
          
          .about-content {
            min-height: 50vh;
            padding: 0 2rem;
          }
          
          .about-text {
            font-size: 2.5rem !important;
            line-height: 1.3 !important;
            margin-bottom: 2rem;
          }
          
          .about-button {
            padding: 1rem 2rem !important;
            font-size: 1.125rem !important;
            border-radius: 3rem !important;
          }
          
          .brain-image {
            top: 50% !important;
            left: 0 !important;
          }
          
          .brain-image img {
            width: 120px !important;
            margin-left: 2rem !important;
            scale: 1 !important;
          }
          
          .heart-image {
            top: 55% !important;
            right: 0 !important;
          }
          
          .heart-image img {
            width: 90px !important;
            margin-right: 2rem !important;
            scale: 1.3 !important;
          }
        }
        
        @media (max-width: 768px) {
          .about-section {
            min-height: 50vh;
            padding: 1.5rem 0;
          }
          
          .about-content {
            min-height: 40vh;
            padding: 0 1.5rem;
          }
          
          .about-text {
            font-size: 1.75rem !important;
            line-height: 1.4 !important;
            margin-bottom: 1.5rem;
            font-weight: 500 !important;
          }
          
          .about-text span[style*="fontSize"] {
            font-size: 1.5em !important;
          }
          
          .about-button {
            padding: 0.875rem 1.75rem !important;
            font-size: 1rem !important;
            border-radius: 2.5rem !important;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
          }
          
          .brain-image {
            top: 45% !important;
            left: 0 !important;
          }
          
          .brain-image img {
            width: 100px !important;
            margin-left: 1rem !important;
            scale: 0.9 !important;
          }
          
          .heart-image {
            top: 50% !important;
            right: 0 !important;
          }
          
          .heart-image img {
            width: 75px !important;
            margin-right: 1rem !important;
            scale: 1.1 !important;
          }
        }
        
        @media (max-width: 480px) {
          .about-section {
            min-height: 40vh;
            padding: 1rem 0;
          }
          
          .about-content {
            min-height: 30vh;
            padding: 0 1rem;
          }
          
          .about-text {
            font-size: 1.25rem !important;
            line-height: 1.5 !important;
            margin-bottom: 1.25rem;
            font-weight: 500 !important;
            letter-spacing: -0.02em !important;
          }
          
          .about-text span[style*="fontSize"] {
            font-size: 1.3em !important;
          }
          
          .about-button {
            padding: 0.75rem 1.5rem !important;
            font-size: 0.875rem !important;
            border-radius: 2rem !important;
            box-shadow: 0 6px 20px rgba(0,0,0,0.12) !important;
          }
          
          .brain-image {
            top: 40% !important;
            left: 0 !important;
          }
          
          .brain-image img {
            width: 80px !important;
            margin-left: 0.5rem !important;
            scale: 0.8 !important;
          }
          
          .heart-image {
            top: 45% !important;
            right: 0 !important;
          }
          
          .heart-image img {
            width: 60px !important;
            margin-right: 0.5rem !important;
            scale: 1 !important;
          }
        }
        
        @media (max-width: 360px) {
          .about-section {
            min-height: 35vh;
            padding: 0.75rem 0;
          }
          
          .about-content {
            min-height: 25vh;
            padding: 0 0.75rem;
          }
          
          .about-text {
            font-size: 1rem !important;
            line-height: 1.6 !important;
            margin-bottom: 1rem;
            font-weight: 500 !important;
            letter-spacing: -0.01em !important;
          }
          
          .about-text span[style*="fontSize"] {
            font-size: 1.2em !important;
          }
          
          .about-button {
            padding: 0.625rem 1.25rem !important;
            font-size: 0.75rem !important;
            border-radius: 1.75rem !important;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1) !important;
          }
          
          .brain-image {
            top: 35% !important;
            left: 0 !important;
          }
          
          .brain-image img {
            width: 65px !important;
            margin-left: 0.25rem !important;
            scale: 0.7 !important;
          }
          
          .heart-image {
            top: 40% !important;
            right: 0 !important;
          }
          
          .heart-image img {
            width: 50px !important;
            margin-right: 0.25rem !important;
            scale: 0.9 !important;
          }
        }
        
        .about-button:hover {
          background: #F177A4 !important;
          color: #030303 !important;
        }
      `}</style>
    </section>
  )
} 