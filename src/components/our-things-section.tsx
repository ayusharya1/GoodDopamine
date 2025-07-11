import { useEffect, useRef, useMemo, useState } from "react"
import { useInView, useAnimation } from "framer-motion"
import img1 from "../../public/images/Ridan1.png";
import img2 from "../../public/images/Ridan2.png";
import img3 from "../../public/images/Ridan3.png";
import img4 from "../../public/images/Ridan4.png";
import img5 from "../../public/images/Ridan5.png";
import img6 from "../../public/images/Ridan6.png";
import img7 from "../../public/images/Ridan7.png";
import img8 from "../../public/images/Ridan1-left.png";
import img9 from "../../public/images/Ridan2-right.png";
// const hexImages = [
//   "https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/67297fccf3babf933f27eaf3_hex_room_20.webp",
//   "https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/67297fcc8458fe142f15388a_hex_room_14.webp",
//   "https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/67297fcc704e62c8fd08e130_hex_room_22.webp",
//   "https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/67297fcc704e62c8fd08e12c_hex_room_17.webp",
//   "https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/67297fcbec4cf962ce6be4a6_hex_room_19.webp",
//   "https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/67297fcbe54722aaeb6349bb_hex_room_12.webp",
//   "https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/67297fcbe000ef9fec53986f_hex_room_18.webp",
//   "https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/67297fcbbce0b1362a45c672_hex_room_5.webp",
//   "https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/67297fcb12491d1325270b5f_hex_room_8.webp"
// ]
const septImages=[img1,img2,img3,img4,img5,img6,img7];



export function OurThingsSection({ id, theme }: { id?: string, theme?: 'light' | 'dark' }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const collageRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

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
  }), []);

  // Spread transforms for each image (tweak as needed for your layout)
  const spreadTransforms = [
    { x: 80, y: -70 },   // Room 1 (top right)
    { x: 71, y: 275 },   // Room 2 (mid right)
    { x: 138, y: 135 },    // Room 3 (bottom mid right)
    { x: 335, y: -230 },  // Room 4 (bottom mid left)
    { x: -9, y: 296 },   // Room 5 (top left)
    { x: 240, y: 48 },  // Room 6 (top far left)
    { x: -1, y: -80 },  // Room 7 (mid far left)
  ];

  return (
    <section
      id={id}
      ref={sectionRef}
      className="our-things-section relative rounded-t-[5rem] w-full min-h-screen py-16 flex flex-col items-center justify-center overflow-hidden"
      style={{ fontFamily: 'Roobert, sans-serif'}}
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* <h2
          className={"our-things-title text-5xl md:text-6xl mb-10 mt-8 px-4 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-blue-900')}
          style={{ letterSpacing: '-0.03em' }}
        >
          Fixing your Relationship with Tech
        </h2> */}
        <div className="grid grid-cols-3 lg:grid-cols-3 gap-0 w-full p-0 m-0" style={{marginRight: 0, marginLeft: 0, padding: 0}}>
          {/* Left big card: isometric hex collage */}
          <a href="https://www.ridan.ai/" 
          target="_blank"
            className={`main-card relative rounded-[2rem] border-[7px] border-[#053C66] group transition-all duration-300 overflow-hidden flex flex-col max-h-[800px] max-w-[800px] h-full shadow-2xl lg:col-span-2 p-0 m-0 ${theme === 'dark' ? '' : 'bg-[#8fd0ff]'} ${isDesktop ? 'hover:border-[5px] hover:border-[#F47CA8] group-hover:border-[5px] group-hover:border-[#F47CA8]' : ''} ${isDesktop && theme !== 'dark' ? 'hover:bg-[#F47CA8]' : ''}`} 
            style={{
              boxShadow: '0 8px 32px 0 rgba(37,99,235,0.10)', 
              width: '90%',
              height:'33rem' ,
              margin: 0, 
              padding: 0,
              background: theme === 'dark' ? 'linear-gradient(to bottom, #4952b0, #181a3a, #23244a)' : undefined
            }}
            onMouseEnter={isDesktop ? () => setIsHovered(true) : undefined}
            onMouseLeave={isDesktop ? () => { setIsHovered(false); setParallax({x:0,y:0}); } : undefined}
            onMouseMove={isDesktop ? e => {
              if (!collageRef.current) return;
              const rect = collageRef.current.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
              const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
              setParallax({ x: x * 30, y: y * 30 }); // max 30px movement
            } : undefined}
          >
            {/* Dotted border overlay on hover */}
            <div className={`pointer-events-none absolute inset-0 rounded-[2.5rem] border-[3px] border-[#053C66] opacity-0 transition-opacity duration-300 z-30 ${isDesktop ? 'group-hover:opacity-100' : ''}`} style={{boxSizing:'border-box'}} />
            {/* Sept collage isometric hex arrangement */}
            {/* <div className="absolute inset-0 w-full h-full">
              <img
                src="https://plus.unsplash.com/premium_photo-1681488340523-0f9fdef6f0c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8"
                alt="Collage Background"
                className="w-full h-full object-cover transition-transform duration-500"
                style={{ borderRadius: '2.5rem', transform: isHovered ? 'scale(1.12)' : 'scale(1)' }}
                    />
            </div> */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <div
                ref={collageRef}
                className={`isometric-hex-rooms relative w-[80%] h-[90%] mx-auto transition-transform duration-500 ${isDesktop && isHovered ? 'scale-90' : ''}`}
                style={{
                  height:'100%',
                  width:'100%',
                  position:'relative',
                  transform: `scale(${isDesktop && isHovered ? 0.8 : 1}) translate3d(${isDesktop && isHovered ? parallax.x : 0}px,${isDesktop && isHovered ? parallax.y : 0}px,0)`,
                  transition: 'transform 0.5s cubic-bezier(.22,1,.36,1)',
                }}
              >
                {/* Only show the first two images in a dynamic, angled, overlapping layout when not hovered */}
                <div
                  style={{
                    position: 'absolute',
                    left: isDesktop && isHovered ? undefined : '38%',
                    top: isDesktop && isHovered ? undefined : '50%',
                    right: isDesktop && isHovered ? '0%' : undefined,
                    
                    zIndex:2,
                    opacity: 1,
                    transition: 'transform 0.5s cubic-bezier(.22,1,.36,1), opacity 0.5s cubic-bezier(.22,1,.36,1)',
                    transform: isDesktop && isHovered
                      ? `translate(${spreadTransforms[0].x}px,${spreadTransforms[0].y}px) scale(1.1)`
                      : 'translate(-76%, -24%) rotate(-26deg) scale(2.9)',
                  }}
                >
                  <img 
                    src={isDesktop && isHovered ? septImages[0] : img8} 
                    alt="Room 1" 
                    style={{ 
                      width: isDesktop ? 180 : window.innerWidth <= 480 ? 80 : window.innerWidth <= 768 ? 110 : 140,
                      transition: 'width 0.3s',
                    }} 
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    left: isDesktop && isHovered ? undefined : '62%',
                    top: isDesktop && isHovered ? undefined : '50%',
                    right: isDesktop && isHovered ? '-1%' : undefined,
                    
                    
                    opacity: 1,
                    transition: 'transform 0.5s cubic-bezier(.22,1,.36,1), opacity 0.5s cubic-bezier(.22,1,.36,1)',
                    transform: isDesktop && isHovered
                      ? `translate(${spreadTransforms[1].x}px,${spreadTransforms[1].y}px) scale(1.1)`
                      : 'translate(-15%, -70%) rotate(20deg) scale(3)',
                  }}
                >
                  <img 
                    src={isDesktop && isHovered ? septImages[1] : img9} 
                    alt="Room 2" 
                    style={{ 
                      width: isDesktop ? 180 : window.innerWidth <= 480 ? 80 : window.innerWidth <= 768 ? 110 : 140,
                      transition: 'width 0.3s',
                    }} 
                  />
                </div>
                {/* All other images are hidden unless hovered */}
                {spreadTransforms.slice(2).map((tr, idx) => (
                  <div key={idx} style={{
                    position: 'absolute',
                    ...([2,3,4,5,6].map(i => idx+2 === i ? {
                      bottom: idx+2 === 2 || idx+2 === 3 ? '0%' : undefined,
                      right: idx+2 === 2 ? '30%' : idx+2 === 3 ? '58%' : undefined,
                      top: idx+2 === 4 ? '-10%' : idx+2 === 5 ? '-46%' : idx+2 === 6 ? '3%' : undefined,
                      left: idx+2 === 4 ? '35%' : idx+2 === 5 ? '-4%' : idx+2 === 6 ? '0%' : undefined,
                      zIndex: idx+2 + 1,
                    } : null).reduce((a, b) => ({...a, ...b}), {})),
                    transition: 'transform 0.5s cubic-bezier(.22,1,.36,1), opacity 0.5s cubic-bezier(.22,1,.36,1)',
                    transform: isDesktop && isHovered ? `translate(${tr.x}px,${tr.y}px) scale(${[0.9,1,0.95,0.68,1][idx]})` : 'none',
                    opacity: isDesktop && isHovered ? 1 : 0,
                  }}>
                    <img src={septImages[idx+2]} alt={`Room ${idx+3}`} className="hex-image rounded-2xl" style={{objectFit:'cover', width: [220,200,220,300,280][idx]}} />
                  </div>
                ))}
              </div>
            </div>
            {/* Apple award badge */}
            <div className={`apple-badge absolute top-6 left-6 ${isDesktop ? 'group-hover:text-[#9D2F55] group-hover:bg-[#FFEBF2]' : ''} z-10 flex items-center px-6 py-2 border-2 border-[#ffe066] rounded-full shadow font-medium text-base ${theme === 'dark' ? 'bg-[#CBCFFF]/90 text-[#07002f]' : 'bg-white/90 text-blue-900'}`} style={{backdropFilter:'blur(6px)'}}>
              👮🏻‍♂ OS for digital self-control
            </div>
            {/* Floating overlay for Rooms */}
            <div className={`floating-overlay absolute bottom-6 left-6 z-10 rounded-2xl shadow-xl px-10 ${isDesktop ? 'group-hover:bg-[#FFEBF2]' : ''} py-8 max-w-[420px] ${theme === 'dark' ? 'bg-[#CBCFFF]/90' : 'bg-white/90'}`} style={{backdropFilter:'blur(6px)'}}>
              <h3 className={`text-5xl ${isDesktop ? 'group-hover:text-[#9D2F55]' : ''} font-medium mb-2 ${theme === 'dark' ? 'text-[#07002f]' : 'text-[#054D85]'}`}>Ridan</h3>
              <p className={`text-base ${isDesktop ? 'group-hover:text-[#9D2F55]' : ''} ${theme === 'dark' ? 'text-[#07002f]' : 'text-[#054D85]'}`}>Stop Scrolling <span> </span> . Start Doing.</p>
            </div>     {/* Floating badge (top right) */}
            <div className={`floating-badge absolute top-5 right-5 w-20 h-20 ${isDesktop ? 'group-hover:bg-[#FFEBF2]' : ''} rounded-3xl flex items-center justify-center z-20 border-2 border-blue-200 shadow-md transition-colors duration-300 ${theme === 'dark' ? 'bg-[#CBCFFF]/95' : 'bg-white/95'}`}>
              <span className={`block w-2 h-2 rounded-full transition-all duration-200 ${isDesktop ? 'group-hover:opacity-0 group-hover:scale-[1.8]' : ''} ${theme === 'dark' ? 'bg-[#07002f]' : 'bg-blue-400'}`}></span>
              <svg className={`absolute transition-all duration-200 opacity-0 ${isDesktop ? 'group-hover:opacity-100' : ''}`} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 20L20 8M12 8h8v8" stroke="#9D2F55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>
          {/* Right column cards */}
          <div className="right-cards-container flex flex-col gap-3 h-full p-0 m-0" style={{marginLeft: '-4rem'}}>
            {/* Top right card: A Bunch of Things (fixed size, wider) */}
            <a
            href="https://api.whatsapp.com/send/?phone=8249069736&text=Hi%2C+I+am+a+researcher.+I+want+to+partner+with+Ridan.&type=phone_number&app_absent=0"
            target="_blank"
            className={`right-card right-card-top relative rounded-[2rem] border-[6px] border-[#053C66] group transition-all duration-300 overflow-hidden shadow-2xl flex flex-col items-stretch justify-end p-0 m-0`}
            style={{
                boxShadow: '0 8px 32px 0 rgba(37,99,235,0.10)',
                minHeight: 340,
                height: '250px',
                width: '500px',
                aspectRatio: '2.2/1',
                background: '#e6f0fa',
                position: 'relative',
                overflow: 'hidden',
              }}>
              {/* Background image (cover, fill card) */}
              <div style={{width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 1}} >
                <img src="https://plus.unsplash.com/premium_photo-1682124758854-e6e372888b85?q=80&w=1994&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A Bunch of Things" className={`transition-opacity duration-500 ${isDesktop ? 'group-hover:opacity-0' : ''}`} style={{objectFit:'cover',objectPosition:'center',zIndex:1, width: '100%', height: '100%'}}/>
                {/* Overlays for four cards, shown side by side on hover */}
                <div className={`absolute inset-0 flex items-start justify-center transition-opacity duration-500 opacity-0 ${isDesktop ? 'group-hover:opacity-100 group-hover:bg-[#F47CA8]' : ''} pt-4`} style={{zIndex: 2}}>
                  <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    <div className={`rounded-xl flex flex-col items-center justify-center text-center px-2 transition-opacity duration-2000 ease-out opacity-0 ${isDesktop ? 'group-hover:opacity-100' : ''} ${theme === 'dark' ? '' : 'bg-[#95D4FF]'}`} style={theme === 'dark' ? {width: 220, height: 140, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)', background: '#BBBDE7', transitionDelay: '0ms'} : {width: 220, height: 140, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)', transitionDelay: '0ms'}}>
                      <span className={`${theme === 'dark' ? 'text-[#07002f]' : 'text-[#07002f]'} text-3xl font-semibold w-full`} style={{fontFamily: 'Roobert, sans-serif'}}>Wharton</span>
                      <span className={`${theme === 'dark' ? 'text-[#07002f]' : 'text-[#07002f]'} text-md mt-2 w-full`} style={{fontFamily: 'Roobert, sans-serif'}}>University of Pennsylvania</span>
                    </div>
                    <div className={`rounded-xl flex flex-col items-center justify-center text-center px-2 transition-opacity duration-2000 ease-out opacity-0 ${isDesktop ? 'group-hover:opacity-100' : ''} ${theme === 'dark' ? '' : 'bg-[#95D4FF]'}`} style={theme === 'dark' ? {width: 220, height: 140, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)', background: '#BBBDE7', transitionDelay: '500ms'} : {width: 220, height: 140, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)', transitionDelay: '500ms'}}>
                      <span className={`${theme === 'dark' ? 'text-[#07002f]' : 'text-[#07002f]'} text-3xl font-semibold w-full`} style={{fontFamily: 'Roobert, sans-serif'}}>IITJ</span>
                      <span className={`${theme === 'dark' ? 'text-[#07002f]' : 'text-[#07002f]'} text-md mt-2 w-full`} style={{fontFamily: 'Roobert, sans-serif'}}>Indian Institute of Technology Jodhpur</span>
                    </div>
                    <div className={`rounded-xl flex flex-col items-center justify-center text-center transition-opacity duration-2000 ease-out opacity-0 ${isDesktop ? 'group-hover:opacity-100' : ''} ${theme === 'dark' ? '' : 'bg-[#95D4FF]'}`} style={theme === 'dark' ? {width: 220, height: 140, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)', background: '#BBBDE7', transitionDelay: '1000ms'} : {width: 220, height: 140, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)', transitionDelay: '1000ms'}}>
                      <span className={`${theme === 'dark' ? 'text-[#07002f]' : 'text-[#07002f]'} text-3xl font-semibold w-full`} style={{fontFamily: 'Roobert, sans-serif'}}>CMU</span>
                      <span className={`${theme === 'dark' ? 'text-[#07002f]' : 'text-[#07002f]'} text-md mt-2 w-full`} style={{fontFamily: 'Roobert, sans-serif'}}>Carnegie Mellon University</span>
                    </div>
                    <div className={`rounded-xl flex flex-col items-center justify-center text-center transition-opacity duration-2000 ease-out opacity-0 ${isDesktop ? 'group-hover:opacity-100' : ''} ${theme === 'dark' ? '' : 'bg-[#95D4FF]'}`} style={theme === 'dark' ? {width:220, height: 140, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)', background: '#BBBDE7', transitionDelay: '1500ms'} : {width:220, height: 140, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)', transitionDelay: '1500ms'}}>
                      <span className={`${theme === 'dark' ? 'text-[#07002f]' : 'text-[#07002f]'} text-3xl font-semibold w-full`} style={{fontFamily: 'Roobert, sans-serif'}}>ISB</span>
                      <span className={`${theme === 'dark' ? 'text-[#07002f]' : 'text-[#07002f]'} text-md mt-2 w-full`} style={{fontFamily: 'Roobert, sans-serif'}}>Indian School of Business</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className={`floating-badge absolute top-2 right-2 w-20 h-20 ${isDesktop ? 'group-hover:bg-[#FFEBF2]' : ''} rounded-3xl flex items-center justify-center z-20 border-2 border-blue-200 shadow-md transition-colors duration-300 ${theme === 'dark' ? 'bg-[#CBCFFF]/95' : 'bg-white/95'}`}>
                <span className={`block w-2 h-2 rounded-full transition-all duration-200 ${isDesktop ? 'group-hover:opacity-0 group-hover:scale-50' : ''} ${theme === 'dark' ? 'bg-[#07002f]' : 'bg-blue-400'}`}></span>
                <svg className={`absolute transition-all duration-200 opacity-0 ${isDesktop ? 'group-hover:opacity-100' : ''}`} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 20L20 8M12 8h8v8" stroke="#9D2F55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {/* Floating overlay for text (smaller, horizontally stretched) */}
              <div className={`right-card-overlay absolute left-[38%] top-[72%] -translate-x-1/2 -translate-y-1/2 z-30 ${isDesktop ? 'group-hover:bg-[#FEEBF2] group-hover:opacity-0' : ''} transition-colors duration-300 rounded-2xl shadow-2xl py-6 max-w-[380px] min-w-[350px] min-h-[20px] border border-blue-100 flex flex-col items-start pl-[1.2rem] ${theme === 'dark' ? 'bg-[#CBCFFF]/90' : 'bg-white/90'} transition-opacity`} style={{backdropFilter:'blur(8px)'}}>
                <h3 className={`text-lg md:text-3xl font-medium ${isDesktop ? 'group-hover:text-[#9D2F55]' : ''} transition-colors duration-300 mb-1 text-left ${theme === 'dark' ? 'text-[#07002f]' : 'text-[#054D85]'}`} style={{fontFamily:'Roobert, sans-serif', fontWeight: 500}}>Ridan for Research</h3>
                <p className={`text-sm font-normal ${isDesktop ? 'group-hover:text-[#9D2F55]' : ''} transition-colors duration-300 text-left ${theme === 'dark' ? 'text-[#07002f]' : 'text-[#054D85]'}`} style={{fontFamily:'Roobert, sans-serif'}}>A standalone track where we partner with top researchers in the world to study and solve the attention crisis at its core.</p>
              </div>
            </a>
            {/* Bottom right card: Worlds (fixed size, wider) */}
            <div className="right-card relative rounded-[2rem] border-[6px] border-[#053C66] group bg-white overflow-hidden flex-1 shadow-2xl flex flex-col items-stretch justify-end p-0 m-0" style={{boxShadow:'0 8px 32px 0 rgba(37,99,235,0.10)',
         height: '200px',
         width: '500px', aspectRatio: '2.9/1', background: '#e6f0fa', position: 'relative', overflow: 'hidden'}}>
              
              <div style={{width: '100%', height: '100%', position: 'absolute', inset: 0}}>
                <img src={'https://plus.unsplash.com/premium_photo-1682124772474-fe01d6647543?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="Worlds" className={`transition-transform duration-500 ${isDesktop ? 'group-hover:scale-[1.18]' : ''}`} style={{objectFit:'cover',zIndex:1, width: '100%', height: '100%'}}/>
              </div>
              
              <div className={`right-card-overlay absolute left-[32%] top-[66%] -translate-x-1/2 -translate-y-1/2 z-30 rounded-2xl shadow-2xl px-8 pl-[1rem] py-4 max-w-[380px] min-w-[280px] min-h-[40px] border border-blue-100 flex flex-col items-start ${theme === 'dark' ? 'bg-[#CBCFFF]/90' : 'bg-white/90'}`} style={{backdropFilter:'blur(8px)'}}>
                <h3 className={`text-lg md:text-3xl font-bold mb-1 text-center ${theme === 'dark' ? 'text-[#07002f]' : 'text-[#054D85]'}`} style={{fontFamily:'Roobert, sans-serif', fontWeight: 500}}>Cognitive Tests</h3>
                <p className={`text-sm font-normal text-center ${theme === 'dark' ? 'text-[#07002f]' : 'text-[#054D85]'}`} style={{fontFamily:'Roobert, sans-serif'}}>Comming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .our-things-section {
            padding: 2rem 1rem;
            min-height: auto;
          }
          
          .our-things-title {
            font-size: 3.5rem;
            margin-bottom: 2.5rem;
            text-align: center;
          }
          
          .grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
          }
          
          .main-card {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            height: 500px !important;
            max-height: 500px !important;
          }
          
          .right-cards-container {
            flex-direction: column;
            gap: 1.5rem;
            margin-top: 0;
            width: 100%;
            align-items: center;
            margin-left: 0 !important;
          }
          
          .right-card {
            width: 100% !important;
            height: 250px !important;
            margin: 0 auto !important;
          }
          
          .right-card-top {
            height: 250px !important;
          }
          
          .hex-grid {
            width: 85% !important;
            height: 95% !important;
          }
          
          .floating-overlay {
            max-width: 420px !important;
            padding: 1.5rem !important;
            bottom: 1.5rem !important;
            left: 1.5rem !important;
          }
          
          .floating-overlay h3 {
            font-size: 2rem !important;
          }
          
          .floating-overlay p {
            font-size: 1rem !important;
          }
          
          .apple-badge {
            padding: 0.75rem 1.25rem !important;
            font-size: 1rem !important;
            top: 1.5rem !important;
            left: 1.5rem !important;
          }
          
          .floating-badge {
            width: 3.5rem !important;
            height: 3.5rem !important;
            top: 1.5rem !important;
            right: 1.5rem !important;
          }
          
          .right-card-overlay {
            width: auto !important;
            max-width: 98vw !important;
            min-width: 0 !important;
            padding: 1rem 1rem 3rem 1rem !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            top: 75% !important;
            word-break: break-word !important;
            white-space: normal !important;
            overflow-wrap: anywhere !important;
          }
          
          .right-card-overlay h3 {
            font-size: 1.25rem !important;
          }
          
          .right-card-overlay p {
            font-size: 0.875rem !important;
          }
          
          .right-card-top .right-card-overlay,
          .right-card:last-child .right-card-overlay {
            top: 65% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            margin-bottom: 0 !important;
          }
        }
        
        @media (max-width: 768px) {
          .our-things-section {
            padding: 1.5rem 1rem;
            min-height: auto;
          }
          
          .our-things-title {
            font-size: 2.75rem;
            margin-bottom: 2rem;
            text-align: center;
            line-height: 1.1;
            font-weight: 600;
          }
          
          .grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          
          .main-card {
            width: 100% !important;
            max-width: 100% !important;
            height: 380px !important;
            max-height: 380px !important;
            margin: 0 auto !important;
            border-radius: 1.75rem !important;
            border-width: 5px !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
          }
          
          .hex-grid {
            width: 75% !important;
            height: 90% !important;
          }
          
          .hex-image {
            width: 100px !important;
            height: 60px !important;
            border-radius: 1rem !important;
          }
          
          .floating-overlay {
            max-width: 220px !important;
            padding: 1rem !important;
            bottom: 1rem !important;
            left: 1rem !important;
            border-radius: 1.25rem !important;
            backdrop-filter: blur(12px) !important;
          }
          
          .floating-overlay h3 {
            font-size: 1.5rem !important;
            margin-bottom: 0.5rem !important;
            font-weight: 700 !important;
          }
          
          .floating-overlay p {
            font-size: 0.875rem !important;
            line-height: 1.4 !important;
            opacity: 0.9 !important;
          }
          
          .apple-badge {
            top: 1rem !important;
            left: 1rem !important;
            padding: 0.75rem 1rem !important;
            font-size: 0.875rem !important;
            border-radius: 2rem !important;
            font-weight: 600 !important;
          }
          
          .floating-badge {
            top: 1rem !important;
            right: 1rem !important;
            width: 3rem !important;
            height: 3rem !important;
            border-radius: 1rem !important;
          }
          
          .right-cards-container {
            flex-direction: column;
            gap: 1.5rem;
            width: 100%;
            align-items: center;
            margin-left: 0 !important;
          }
          
          .right-card {
            width: 100% !important;
            height: 200px !important;
            margin: 0 auto !important;
            border-radius: 1.5rem !important;
            border-width: 4px !important;
            box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important;
          }
          
          .right-card-top {
            height: 200px !important;
          }
          
          .right-card-overlay {
            width: auto !important;
            max-width: 98vw !important;
            min-width: 0 !important;
            padding: 0.75rem 0.75rem 2.5rem 0.75rem !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            top: 70% !important;
            border-radius: 1rem !important;
            backdrop-filter: blur(12px) !important;
            word-break: break-word !important;
            white-space: normal !important;
            overflow-wrap: anywhere !important;
          }
          
          .right-card-overlay h3 {
            font-size: 1.125rem !important;
            margin-bottom: 0.375rem !important;
            font-weight: 700 !important;
          }
          
          .right-card-overlay p {
            font-size: 0.75rem !important;
            line-height: 1.3 !important;
            opacity: 0.9 !important;
          }
        }
        
        @media (max-width: 480px) {
          .our-things-section {
            padding: 1rem 0.75rem;
          }
          
          .our-things-title {
            font-size: 2.25rem;
            margin-bottom: 1.5rem;
            text-align: center;
            line-height: 1.1;
            font-weight: 600;
          }
          
          .grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 1rem !important;
          }
          
          .main-card {
            width: 100% !important;
            max-width: 100% !important;
            height: 320px !important;
            max-height: 320px !important;
            margin: 0 auto !important;
            border-radius: 1.5rem !important;
            border-width: 4px !important;
            box-shadow: 0 15px 25px rgba(0,0,0,0.1) !important;
          }
          
          .hex-grid {
            width: 80% !important;
            height: 85% !important;
          }
          
          .hex-image {
            width: 70px !important;
            height: 45px !important;
            border-radius: 0.75rem !important;
          }
          
          .floating-overlay {
            max-width: 180px !important;
            padding: 0.75rem !important;
            bottom: 0.75rem !important;
            left: 0.75rem !important;
            border-radius: 1rem !important;
            backdrop-filter: blur(10px) !important;
          }
          
          .floating-overlay h3 {
            font-size: 1.25rem !important;
            margin-bottom: 0.375rem !important;
            font-weight: 700 !important;
          }
          
          .floating-overlay p {
            font-size: 0.75rem !important;
            line-height: 1.3 !important;
            opacity: 0.9 !important;
          }
          
          .apple-badge {
            top: 0.75rem !important;
            left: 0.75rem !important;
            padding: 0.5rem 0.75rem !important;
            font-size: 0.75rem !important;
            border-radius: 1.5rem !important;
            font-weight: 600 !important;
          }
          
          .floating-badge {
            top: 0.75rem !important;
            right: 0.75rem !important;
            width: 2.5rem !important;
            height: 2.5rem !important;
            border-radius: 0.75rem !important;
          }
          
          .right-cards-container {
            flex-direction: column;
            gap: 1rem;
            width: 100%;
            align-items: center;
            margin-left: 0 !important;
          }
          
          .right-card {
            width: 100% !important;
            height: 160px !important;
            margin: 0 auto !important;
            border-radius: 1.25rem !important;
            border-width: 3px !important;
            box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important;
          }
          
          .right-card-top {
            height: 160px !important;
          }
          
          .right-card-overlay {
            width: 68vw !important;
            max-width: 98vw !important;
            min-width: 0 !important;
            padding: 0.5rem 0.5rem 1.5rem 0.5rem !important;
            margin-bottom:2rem !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            top: 70% !important;
            border-radius: 0.75rem !important;
            backdrop-filter: blur(10px) !important;
            word-break: break-word !important;
            white-space: normal !important;
            overflow-wrap: anywhere !important;
          }
          
          .right-card-overlay h3 {
            font-size: 1rem !important;
            margin-bottom: 0.25rem !important;
            font-weight: 700 !important;
          }
          
          .right-card-overlay p {
            font-size: 0.625rem !important;
            line-height: 1.2 !important;
            opacity: 0.9 !important;
          }
        }
        
        @media (max-width: 360px) {
          .our-things-section {
            padding: 0.75rem 0.5rem;
          }
          
          .our-things-title {
            font-size: 1.875rem;
            margin-bottom: 1.25rem;
            text-align: center;
            line-height: 1.1;
            font-weight: 600;
          }
          
          .grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.875rem !important;
          }
          
          .main-card {
            width: 100% !important;
            max-width: 100% !important;
            height: 280px !important;
            max-height: 280px !important;
            margin: 0 auto !important;
            border-radius: 1.25rem !important;
            border-width: 3px !important;
            box-shadow: 0 12px 20px rgba(0,0,0,0.1) !important;
          }
          
          .hex-grid {
            width: 85% !important;
            height: 80% !important;
          }
          
          .hex-image {
            width: 60px !important;
            height: 40px !important;
            border-radius: 0.5rem !important;
          }
          
          .floating-overlay {
            max-width: 150px !important;
            padding: 0.625rem !important;
            bottom: 0.625rem !important;
            left: 0.625rem !important;
            border-radius: 0.875rem !important;
            backdrop-filter: blur(8px) !important;
          }
          
          .floating-overlay h3 {
            font-size: 1.125rem !important;
            margin-bottom: 0.25rem !important;
            font-weight: 700 !important;
          }
          
          .floating-overlay p {
            font-size: 0.625rem !important;
            line-height: 1.2 !important;
            opacity: 0.9 !important;
          }
          
          .apple-badge {
            top: 0.625rem !important;
            left: 0.625rem !important;
            padding: 0.375rem 0.625rem !important;
            font-size: 0.625rem !important;
            border-radius: 1.25rem !important;
            font-weight: 600 !important;
          }
          
          .floating-badge {
            top: 0.625rem !important;
            right: 0.625rem !important;
            width: 2.25rem !important;
            height: 2.25rem !important;
            border-radius: 0.625rem !important;
          }
          
          .right-cards-container {
            flex-direction: column;
            gap: 0.875rem;
            width: 100%;
            align-items: center;
            margin-left: 0 !important;
          }
          
          .right-card {
            width: 100% !important;
            height: 140px !important;
            margin: 0 auto !important;
            border-radius: 1rem !important;
            border-width: 2px !important;
            box-shadow: 0 8px 15px rgba(0,0,0,0.08) !important;
          }
          
          .right-card-top {
            height: 140px !important;
          }
          
          .right-card-overlay {
            max-width: 230px !important;
            padding: 0.375rem !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            top: 70% !important;
            border-radius: 0.625rem !important;
            backdrop-filter: blur(8px) !important;
            margin-bottom :1rem !important;
          }
          
          .right-card-overlay h3 {
            font-size: 0.875rem !important;
            margin-bottom: 0.125rem !important;
            font-weight: 700 !important;
          }
          
          .right-card-overlay p {
            font-size: 0.5rem !important;
            line-height: 1.1 !important;
            opacity: 0.9 !important;
          }
        }
        @media (min-width: 1025px) {
          .right-card:last-child .right-card-overlay {
            margin-bottom: 1rem !important;
          }
        }
        @media (max-width: 1024px) {
          .right-card:last-child .right-card-overlay {
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            margin-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  )
} 