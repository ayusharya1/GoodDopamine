import React, { useMemo } from "react";
import { useTheme } from "./theme-provider";

const socials = [
  { name: "Discord", img: "/images/discord.png" },
  { name: "Instagram", img: "/images/instagram.png" },
  { name: "X/Twitter", img: "/images/twitter.png" },
  { name: "Youtube", img: "/images/youtube.png" },
  { name: "Threads", img: "/images/threads.png" },
];

export default function CommunitySection() {
  const { theme } = useTheme();
  const numStars = 7;
  const stars = useMemo(() => Array.from({ length: numStars }, (_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 70;
    const size = 2 + Math.random() * 5;
    const color = Math.random() > 0.5 ? '#fff' : '#A9CAF5';
    const opacity = 0.6 + Math.random() * 0.4;
    const duration = 2 + Math.random() * 2;
    const delay = Math.random() * 2;
    return { left, top, size, color, opacity, duration, delay };
  }), []);
  const gridImage = theme === 'dark'
    ? 'url("https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_night.png")'
    : 'url("https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_day.png")';
  const gridBgColor = theme === 'dark' ? '#0F0E16' : '#B7D4FF';
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-start items-start  z-10 py-10 overflow-hidden" >
      {/* Grid background: always present */}
      <div
        className="absolute inset-0 z-0 pointer-events-none "
        style={{
          backgroundColor: gridBgColor,
          backgroundImage: gridImage,
          backgroundSize: '200px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          opacity: 1,
          backgroundBlendMode: 'normal',
        }}
      />
      {/* Night mode stars (only in dark mode) */}
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
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-16 px-12">
        <h1 className={"font-medium mb-8 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]') + " text-3xl sm:text-4xl md:text-6xl lg:text-7xl"}>Community</h1>
        <div className="w-full sm:w-[70vw] max-w-6xl bg-[#053C66] rounded-[2.5rem] border-[6px] border-[#054D85] flex flex-col sm:flex-row items-center justify-center px-2 sm:px-4 py-4 ml-0 sm:ml-8" style={{minHeight: 180}}>
          {socials.map((s, i) => (
            <div key={s.name} className="flex flex-col items-center justify-between bg-[#D2E4FF] rounded-[1.5rem] hover:bg-[#F177A4] border-2 border-[#054D85] relative w-full sm:min-w-[120px] sm:max-w-[200px] h-[120px] sm:h-[180px] mx-1 sm:mx-2 mb-2 sm:mb-0 group">
              {/* Dot/Arrow in top-right */}
              <div className="absolute top-3 right-3 w-3 h-3 bg-[#054D85] rounded-full group-hover:bg-transparent transition-all duration-300 ease-in-out flex items-center justify-center">
                <span className="block w-3 h-3 rounded-full transition-all duration-200 group-hover:opacity-0 group-hover:scale-[1.8] bg-[#054D85]"></span>
                <svg className="absolute transition-all duration-200 opacity-0 group-hover:opacity-100" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 20L20 8M12 8h8v8" stroke="#054D85" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {/* Icon */}
              <img src={s.img} alt={s.name} className="w-[100px] h-[100px] object-contain mt-8 mb-2" />
              {/* Name */}
              <div className="text-lg font-medium text-[#054D85] mb-4">{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
