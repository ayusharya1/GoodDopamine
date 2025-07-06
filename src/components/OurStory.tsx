import  { useMemo } from "react";
import { useTheme } from "./theme-provider";
import Video from "./Video";



export default function OurStory() {
  const { theme } = useTheme();
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
  const gridImage = theme === 'dark'
    ? 'url("https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_night.png")'
    : 'url("https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_day.png")';
  const gridBgColor = theme === 'dark' ? '#0F0E16' : '#B7D4FF';
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-start items-start z-10 py-10 overflow-hidden" >
      {/* Grid background: always present */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
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
        <h1 className={"text-7xl font-medium mb-10 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>Our Story</h1>
       <Video/>
      </div>
    </div>
  );
}
