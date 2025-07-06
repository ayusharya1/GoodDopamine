import React, { useMemo } from 'react';
import { useTheme } from './theme-provider';
import { Navigation } from './Navigation';
import { FooterSection } from './footer-section';
import img1 from "../../public/images/img3.png"
const NUM_STARS = 32;

// List of images from public/images
const publicImages = [
'/images/logo.png',
  '/images/Ridan3.png',
  '/images/Ridan5.png',
  '/images/Ridan7.png',
  '/images/Ridan6.png',
  '/images/Ridan1-left.png',
  '/images/Ridan1.png',
  '/images/Ridan4.png',
  '/images/Ridan2-right.png',
  '/images/Ridan2.png',
  '/images/logo.svg',
  '/images/img3.png',
  '/images/contact.png',
  '/images/threads.png',
  '/images/discord.png',
  '/images/twitter.png',
  '/images/instagram.png',
  '/images/youtube.png',
  '/images/person3.avif',
  '/images/person.png',
  '/images/dj.png',
  '/images/person2.avif',
  '/images/person1.avif',
  '/images/673cf60777490761ff95e2e7_matt_avatar.avif',
  '/images/computer.png',
  '/images/console.png',
  
  '/images/cloud.png',
  '/images/3d-heart.png',
  '/images/3d-brain.png',
  
];

// List of images/videos from src/assets
import cubeGif from '../assets/cube.gif';
import landscapePng from '../assets/landscape.png';
import portalPng from '../assets/portal.png';
import cubebgWebm from '../assets/cubebg.webm';
import cubiMp4 from '../assets/cubi.mp4';
import reactSvg from '../assets/react.svg';

const assetImages = [
  { src: cubebgWebm, type: 'video' }
  
];

const MediaAssets: React.FC = () => {
    const { theme } = useTheme();
    // Generate random stars for dark mode
    const stars = useMemo(() => Array.from({ length: NUM_STARS }, (_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 70;
        const size = 2 + Math.random() * 5;
        const color = '#C8CCFB';
        const opacity = 0.6 + Math.random() * 0.4;
        const duration = 2 + Math.random() * 2;
        const delay = Math.random() * 2;
        return { left, top, size, color, opacity, duration, delay };
    }), [theme]);

    return (
      <div
        className={`min-h-screen w-full relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-b from-[#4952b0] via-[#181a3a] to-[#23244a]' : ''}`}
        style={{
          background: theme === 'dark'
            ? undefined
            : 'linear-gradient(135deg, #57B5FF 0%, #74BDFF 30%, #8DC4FF 55%, #9DC7FD 100%)',
        }}
      >
        {/* Radial overlay for depth, only in dark mode */}
        {theme === 'dark' && (
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-blue-400 opacity-30 pointer-events-none z-10" />
        )}
        {/* Stars overlay for dark theme */}
        {theme === 'dark' && (
          <div className="pointer-events-none absolute inset-0 z-20">
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
        <Navigation/>
        {/* Main content */}
        <div
          className={`group relative flex flex-col mt-16 items-center justify-center min-h-[50vh] w-[80vw] place-self-center rounded-3xl relative z-10 overflow-hidden logbook-main-content ${theme === 'dark' ? 'text-[#C8CCFB]' : ''}`}
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'background-size 0.5s cubic-bezier(0.4,0,0.2,1)',
            // backgroundColor: theme === 'dark' ? '#0F0E16' : '#0066FD',
          }}
        >
          <h1 className={`text-[80px] font-normal  text-center absolute bottom-[10%] ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#185B8C]'}`} style={{fontFamily: 'Roobert, sans-serif'}}>Assets</h1>
          {/* <p className="text-lg mt-6 text-[#185B8C] text-center" style={{fontFamily: 'Roobert, sans-serif'}}>Stuff our lawyers told us to tell you.</p> */}
        </div>
        {/* --- LOG GRID SECTION START --- */}
        <div
          className={`relative z-10 w-full px-8 pt-8 rounded-t-[6.5rem] rounded-b-[2.5rem] mt-[2rem] pb-20 ${theme === 'dark' ? 'text-[#C8CCFB]' : ''}`}
          style={{
            position: 'relative',
            backgroundColor: theme === 'dark' ? '#0F0E16' : '#B7D4FF',
            backgroundImage: 'url("https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_day.png")',
            backgroundSize: '200px',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            opacity: 1,
            backgroundBlendMode: 'normal',
          }}
        >
          {/* Responsive: adjust padding, border radius, and grid for mobile/tablet */}
          <style>{`
            @media (max-width: 1024px) {
              .logbook-grid-section {
                padding-left: 0.5rem !important;
                padding-right: 0.5rem !important;
                border-top-left-radius: 2rem !important;
                border-top-right-radius: 2rem !important;
                border-bottom-left-radius: 2rem !important;
                border-bottom-right-radius: 2rem !important;
                margin-top: 1rem !important;
              }
              .logbook-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                gap: 1.5rem !important;
              }
            }
            @media (max-width: 640px) {
              .logbook-grid-section {
                padding-left: 0.25rem !important;
                padding-right: 0.25rem !important;
                border-radius: 1rem !important;
                margin-top: 0.5rem !important;
              }
              .logbook-grid {
                grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
                gap: 1rem !important;
              }
              .logbook-card-img {
                width: 100% !important;
                height: 180px !important;
              }
            }
          `}</style>
          {/* Logs Heading and Filter Bar */}
          <div className="flex flex-col items-center w-full space-y-6 gap-[7rem]">
            {publicImages.map((src, idx) => (
              <img
                key={src + idx}
                src={src}
                alt={src.split('/').pop()}
                className="max-w-[320px] max-h-[320px] object-contain rounded shadow mx-auto"
                loading="lazy"
              />
            ))}
            {assetImages.map((asset, idx) =>
              asset.type === 'img' ? (
                <img
                  key={asset.src + idx}
                  src={asset.src}
                  alt={asset.src.split('/').pop()}
                  className="max-w-[420px] max-h-[420px] object-contain rounded shadow mx-auto"
                  loading="lazy"
                />
              ) : (
                <video
                  key={asset.src + idx}
                  src={asset.src}
                  className="max-w-[420px] max-h-[420px] object-contain rounded shadow mx-auto"
                  autoPlay
                  loop
                  muted
                />
              )
            )}
          </div>
        </div>
        {/* --- LOG GRID SECTION END --- */}
        <FooterSection theme={theme} />
      </div>
    );
};

export default MediaAssets;
