import React, { useMemo } from "react";
import { useTheme } from "./theme-provider";

const founders = [
  {
    name: "Jason Toff",
    role: "CEO",
    img: "/images/person2.avif",
    bg: "#D2E4FF"
  },
  // {
  //   name: "Nick Kruge",
  //   role: "Co-founder",
  //   img: "/images/person3.avif",
  //   bg: "#D2E4FF"
  // },
  // {
  //   name: "Bruno Oliveira",
  //   role: "Co-founder",
  //   img: "/images/person1.avif",
  //   bg: "#D2E4FF"
  // },
];

const team = [
  {
    name: "Matt Fogarty",
    role: "Content Lead",
    img: "/images/673cf60777490761ff95e2e7_matt_avatar.avif",
    bg: "#D2E4FF"
  },
  // {
  //   name: "Camy Decembly",
  //   role: "Content & Community",
  //   img: "/images/673cf60fce3b5afbfa587d9f_camy_avatar (1).avif",
  //   bg: "#D2E4FF"
  // },
  // {
  //   name: "Melissa Burd",
  //   role: "Content & Community",
  //   img: "/images/673cf6163542971e55441cc0_mel_avatar (1).avif",
  //   bg: "#D2E4FF"
  // },
];

export default function Teams() {
  const { theme } = useTheme();
  const numStars = 10;
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
    <div className="relative min-h-screen w-full flex flex-col justify-start items-start rounded-t-[5rem] z-10 py-10 overflow-hidden" >
      {/* Grid background: always present */}
      <div
        className="absolute inset-0 z-0 pointer-events-none rounded-t-[5rem]"
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
        <h1 className={"font-medium mb-8 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]') + " text-3xl sm:text-4xl md:text-6xl lg:text-7xl"}>Team</h1>
        <div className="flex flex-col gap-12 w-full">
          {/* Founders Section */}
          <div>
            <h2 className={"font-normal mb-4 pl-2 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]') + " text-xl sm:text-2xl md:text-3xl"}>Founders</h2>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 ml-0 sm:ml-[2rem] md:ml-[8rem] lg:ml-[20rem] items-center">
              {founders.map((f, i) => (
                <div key={f.name} className="rounded-3xl p-4 pb-2 flex flex-col items-center w-full sm:w-[320px] md:w-[380px] lg:w-[460px] shadow-lg mb-4 sm:mb-0" style={{ background: theme === 'dark' ? '#23244a' : f.bg, backgroundClip: 'padding-box', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)' }}>
                  <img src={f.img} alt={f.name} className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 object-contain mb-2 rounded-xl" />
                  <div className=" w-full  p-2">
                    <div className={"text-lg font-medium " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>{f.name}</div>
                    <div className={"text-sm " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>{f.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Team Section */}
          {/* <div>
            <h2 className={"font-normal mb-4 pl-2 " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]') + " text-xl sm:text-2xl md:text-3xl"}>Team</h2>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 ml-0 sm:ml-[2rem] md:ml-[8rem] lg:ml-[20rem] items-center">
              {team.map((t, i) => (
                <div key={t.name} className="rounded-3xl p-4 pb-2 flex flex-col items-center justify-center w-full sm:w-[180px] md:w-[220px] lg:w-[260px] shadow-lg mb-4 sm:mb-0" style={{ background: theme === 'dark' ? '#23244a' : t.bg, backgroundClip: 'padding-box', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)' }}>
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 object-contain mb-2 rounded-xl"
                    style={{
                      filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.10))',
                    }}
                  />
                  <div className=" w-full p-2">
                    <div className={"text-lg font-medium " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>{t.name}</div>
                    <div className={"text-sm " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}>{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
} 