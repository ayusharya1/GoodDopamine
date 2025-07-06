import  { useMemo } from "react";
import { useTheme } from "./theme-provider";

const mentions = [
  {
    img: "/images/673c030a4e3b890efff94ee2_videoThumb-1.png",
    badge: { text: "apple.com/...", color: "#fff", icon: "🍏" },
    title: "Rooms at the top: How this ADA-winning team built a title that defies description",
    description: "",
  },
  {
    img: "/images/670ee15e1448fa56e5e8020d_media_thumb-fast2.avif",
    badge: { text: "techcrunch.com/...", color: "#fff", icon: "📰" },
    title: "Google puts $1M into 3D app Rooms after more than 1 million rooms created",
    description: "",
  },
  {
    img: "/images/things-logo-night.png",
    badge: { text: "apple.com/...", color: "#fff", icon: "🍏" },
    title: "Apple features Rooms as App of the Day in over 100 countries",
    description: "This nostalgic digital toy is a block-based blast.",
  },
  {
    img: "/images/672c30a5570aa9df5cc658a3_media_thumb-techcrunch3.avif",
    badge: { text: "theverge.com/...", color: "#fff", icon: "📰" },
    title: "The Verge: Rooms is a delightful escape",
    description: "",
  },
  {
    img: "/images/673cf60fce3b5afbfa587d9f_camy_avatar (1).avif",
    badge: { text: "techcrunch.com/...", color: "#fff", icon: "📰" },
    title: "Rooms, a 3D design app and 'cozy game,' gets a major update as users jump to 250K",
    description: "",
  },
  {
    img: "/images/66f221d374a203843f2a719e_media_thumb-verge.avif",
    badge: { text: "fastcompany.com/...", color: "#fff", icon: "📰" },
    title: "Fast Company: One of the most addictive apps of the year just got better",
    description: "",
  },
];

export default function MentionSection() {
  const { theme } = useTheme();
  const numStars = 45;
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
        className="absolute inset-0 z-0 pointer-events-none rounded-b-[7rem]"
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
        <h1 className={"font-medium mb-8 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]') + " text-3xl sm:text-4xl md:text-6xl lg:text-7xl"}>Mentions</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 ml-0 sm:ml-[1.5rem]">
          {/* First row */}
          {mentions.slice(0, 3).map((m, i) => (
            <div
              key={i}
              className="bg-[#D2E4FF] rounded-[2rem]  border border-[#bcd2f7] shadow-lg flex flex-col overflow-hidden relative"
              style={{ minHeight: 320 }}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 flex items-center bg-[#D2E4FF] rounded-full px-4 py-2 shadow text-[#2563eb] font-medium text-sm z-10">
                <span className="mr-2">{m.badge.icon}</span>
                {m.badge.text}
              </div>
              {/* Image */}
              <img
                src={m.img}
                alt={m.title}
                className="w-full h-[180px] object-cover rounded-t-[2rem]"
                style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
              />
              {/* Title/Description */}
              <div className="p-6 flex flex-col flex-1">
                <div className="text-lg font-medium text-[#2563eb] mb-2">{m.title}</div>
                {m.description && (
                  <div className="text-base text-[#2563eb] opacity-80">{m.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
          {/* Second row */}
          {mentions.slice(3, 6).map((m, i) => (
            <div
              key={i}
              className="bg-[#D2E4FF] rounded-[2rem] border border-[#bcd2f7] shadow-lg flex flex-col overflow-hidden relative"
              style={{ minHeight: 320 }}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 flex items-center bg-[#D2E4FF] rounded-full px-4 py-2 shadow text-[#2563eb] font-medium text-sm z-10">
                <span className="mr-2">{m.badge.icon}</span>
                {m.badge.text}
              </div>
              {/* Image */}
              <img
                src={m.img}
                alt={m.title}
                className="w-full h-[180px] object-cover rounded-t-[2rem]"
                style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
              />
              {/* Title/Description */}
              <div className="p-6 flex flex-col flex-1">
                <div className="text-lg font-medium text-[#054D85] mb-2">{m.title}</div>
                {m.description && (
                  <div className="text-base text-[#054D85] opacity-80">{m.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
