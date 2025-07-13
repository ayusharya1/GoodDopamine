import Cocktail from './Cocktail';
import cubeVideoMp4 from '../assets/cubeV.mp4';
import cubeGif from '../assets/cube.gif';
import cubeVideoWebm from '../assets/cubebg.webm'
import cubeVideoHevc from '../assets/cubebg.mov'
import { useEffect, useRef, useState } from 'react';

export default function AIsection(props: { theme?: 'light' | 'dark' }) {
  const theme = props.theme || 'light';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  
  // Define background and text color for dark mode
  // const darkBg = 'bg-gradient-to-b from-[#4952b0] via-[#181a3a] to-[#23244a]';
  const darkBg='bg-[#DFDFF2]';
  const lightBg = 'bg-[#DFDFF2]';
  const mainTextColor = theme === 'dark' ? '#1E3A8A' : '#1E3A8A';

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Force video to load and play
      video.load();
      
      // Handle video errors
      const handleError = (e: Event) => {
        console.warn('Video playback error:', e);
        setVideoError(true);
        // Try to reload the video
        video.load();
      };

      // Handle video load
      const handleLoadedData = () => {
        setVideoError(false);
        video.play().catch((error) => {
          console.warn('Auto-play failed:', error);
          // For Safari, we might need to handle this differently
        });
      };

      video.addEventListener('error', handleError);
      video.addEventListener('loadeddata', handleLoadedData);

      return () => {
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  return (
    <div
      className={`pt-16 sm:pt-[8rem] md:pt-[18rem] pb-8 sm:pb-[4rem] md:pb-[8rem] relative ${theme === 'dark' ? darkBg : lightBg} rounded-t-[2rem] aiSection w-full `}
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '510vh',
        backgroundImage: 'url("https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_day.png")',
        backgroundSize: '200px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        opacity: 1,
        backgroundBlendMode: 'normal',
      }}
    >
      {/* Background Text Behind Cube */}
      <div
        className="AIsection-bgtext absolute top-0 left-0 w-full flex flex-col sm:flex-row justify-between items-start px-2 sm:px-[2vw] pt-4 sm:pt-[2vw] z-10 select-none pointer-events-none"
        style={{fontFamily: 'Impact, Roobert, Arial Black, sans-serif', letterSpacing: '0.06em', color: mainTextColor, opacity: 1}}
      >
        <div className="flex flex-col px-1 sm:px-[1vw] pt-2 sm:pt-[2vw]">
          <span className="font-extrabold text-[clamp(3.2rem,16vw,11rem)] sm:text-[clamp(4rem,18vw,11rem)] md:text-[clamp(5rem,20vw,11rem)] lg:text-[clamp(5rem,18vw,11rem)] lg:tracking-widest">AI</span>
          <span className="font-mono font-normal mt-1 text-[clamp(1.6rem,6vw,3rem)] sm:text-[clamp(2rem,8vw,3rem)] md:text-[clamp(2.4rem,10vw,3rem)] lg:text-[clamp(1.2rem,4vw,3rem)]" style={{fontWeight: 400, letterSpacing: '-0.05em', color: mainTextColor}}>Built to serve your long-term goals</span>
        </div>
        {/* <div className="font-mono font-normal text-[14px] mt-4 text-[#1E3A8A] text-center" style={{fontWeight: 400, fontSize: 14, marginTop: 8, letterSpacing: 0}}>
          ANCIENT RITES TO<br />CHANNEL, DIVIDE AND FORM
        </div> */}
        <div className="flex flex-col px-1 sm:px-2 items-center sm:items-end mt-4 sm:mt-[2rem] md:mt-[12rem] font-extrabold leading-none w-full" style={{fontFamily: 'Impact, Roobert, Arial Black, sans-serif', letterSpacing: '-0.01em', color: mainTextColor, opacity: 1}}>
          <span className="font-extrabold text-[clamp(2.5rem,14vw,6rem)] sm:text-[clamp(2.8rem,16vw,8rem)] md:text-[clamp(3rem,18vw,9rem)] lg:text-[clamp(2.5rem,12vw,11rem)] text-center sm:text-right w-full max-w-full break-words mt-[8rem] sm:mt-0">ALIGNMENT</span>
        </div>
      </div>

      {/* Sticky Centered Cube Video */}
      <div className="AIsection-video sticky top-1/2  -translate-y-1/2 flex justify-center items-center z-40 pointer-events-none w-full max-w-[98vw] sm:max-w-[90vw] md:max-w-[600px] mx-auto mt-[7rem] mb-20 sm:mb-24 md:mb-32 lg:mb-0">
        {!videoError ? (
          <video
  ref={videoRef}
  muted
  playsInline
  autoPlay
  loop
  webkit-playsinline="true"
  x5-playsinline="true"
  x5-video-player-type="h5"
  x5-video-player-fullscreen="false"
  className="w-full h-auto max-h-[70vh] object-contain"
  style={{
    background: 'transparent',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }}
>
  <source src={cubeVideoHevc} type='video/mp4; codecs="hvc1"' />
  <source src={cubeVideoWebm} type="video/webm" />
  <source src={cubeVideoMp4} type="video/mp4" />
</video>

        ) : (
          <img
            src={cubeGif}
            alt="Cube Animation"
            className="w-full h-auto max-h-[40vh] sm:max-h-[60vh] md:max-h-[70vh] object-contain"
            style={{ 
              background: 'transparent',
              backgroundColor: 'transparent',
              backgroundImage: 'none',
              border: 'none',
              outline: 'none',
              boxShadow: 'none'
            }}
          />
        )}
      </div>

      {/* Bottom Right PILLAR Text */}
      <div
        className="AIsection-pillartxt flex flex-col items-end px-2 sm:px-[2vw] pb-4 sm:pb-[2vw] z-10 select-none pointer-events-none -mt-8 sm:-mt-[4rem] md:-mt-[10rem] lg:-mt-[22rem]"
        style={{fontFamily: 'Impact, Roobert, Arial Black, sans-serif', letterSpacing: '-0.01em', color: mainTextColor, opacity: 1}}
      >
        <span className="font-extrabold text-[clamp(3.2rem,16vw,11rem)] sm:text-[clamp(4rem,18vw,11rem)] md:text-[clamp(5rem,20vw,11rem)] lg:text-[clamp(2.5rem,12vw,11rem)]">ENGINE</span>
        <span className="font-mono font-normal mt-1 text-[clamp(1.6rem,6vw,3rem)] sm:text-[clamp(2rem,8vw,3rem)] md:text-[clamp(2.4rem,10vw,3rem)] lg:text-[clamp(1.2rem,4vw,3rem)]" style={{fontFamily: 'monospace', fontWeight: 400, color: mainTextColor}}>Not Your Impulses</span>
      </div>

      {/* Section Content */}
      <Cocktail />
    </div>
  );
}