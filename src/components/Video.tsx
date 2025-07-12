import React, { useRef, useState } from 'react';
import { useTheme } from './theme-provider';
import nature from "../assets/nature.mp4"

const VIDEO_PREVIEW = 'https://plus.unsplash.com/premium_photo-1731439886498-d09d6472dfb3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const VIDEO_SRC = nature;

const ORIGINAL_BTN_TOP = '1.8%';
const ORIGINAL_BTN_LEFT = '88%';

const TAP_THRESHOLD = 10; // px

const Video: React.FC = () => {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [btnPos, setBtnPos] = useState<{ top: string; left: string }>({
    top: ORIGINAL_BTN_TOP,
    left: ORIGINAL_BTN_LEFT,
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [btnScale, setBtnScale] = useState(1);
  const [isTouching, setIsTouching] = useState(false);
  const touchStartRef = useRef<{x: number, y: number} | null>(null);

  // Animate button position smoothly
  const animateBtnTo = (top: string, left: string) => {
    setBtnPos({ top, left });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isFollowing && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const btnSize = rect.width * 0.084; // 8.4vw relative to container width
      // Animate to cursor position, offset to center the button
      animateBtnTo(`${y - btnSize / 2}px`, `${x - btnSize / 2}px`);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsTouching(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      touchStartRef.current = { x, y };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      e.preventDefault(); // Prevent scrolling while following
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const btnSize = rect.width * 0.084; // 8.4vw relative to container width
      animateBtnTo(`${y - btnSize / 2}px`, `${x - btnSize / 2}px`);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsTouching(false);
    if (containerRef.current && touchStartRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.changedTouches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const dx = x - touchStartRef.current.x;
      const dy = y - touchStartRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < TAP_THRESHOLD) {
        handlePlayPause(); // treat as tap
      }
    }
    animateBtnTo(ORIGINAL_BTN_TOP, ORIGINAL_BTN_LEFT);
    touchStartRef.current = null;
  };

  const handleMouseEnter = () => {
    setIsFollowing(true);
  };

  const handleMouseLeave = () => {
    setIsFollowing(false);
    animateBtnTo(ORIGINAL_BTN_TOP, ORIGINAL_BTN_LEFT);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
      setBtnScale(1);
      setShowPreview(true);
    } else {
      setShowPreview(false);
      setIsPlaying(true);
      setBtnScale(0.6);
      videoRef.current?.play().catch((error) => {
        console.error('Video play failed:', error);
        setShowPreview(true);
        setIsPlaying(false);
        setBtnScale(1);
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="video-container relative overflow-hidden rounded-[1.5rem] h-[40vh] xs:h-[48vh] sm:h-[55vh] md:h-[66vh] w-full xs:w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[70vw] left-0 md:left-[4vw] lg:left-[18vw] max-w-full md:max-w-[900px] xl:max-w-none xl:w-[70vw]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Play/Pause Button Overlay */}
      <div
        id="video-crsr"
        className={`bg-[#F47CA8] w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-[8.4vw] md:h-[8.4vw] rounded-full flex justify-center items-center absolute z-[999] cursor-pointer shadow-lg transition-transform duration-200${isTouching ? ' pointer-events-none' : ''}`}
        style={{
          top: btnPos.top,
          left: btnPos.left,
          transform: `scale(${btnScale})`,
          transition: isFollowing
            ? 'none'
            : 'top 0.4s, left 0.4s, transform 0.3s cubic-bezier(0.23,1,0.32,1)',
        }}
        onClick={handlePlayPause}
      >
        <i className={`ri-${isPlaying ? 'pause-mini-fill' : 'play-mini-fill'} text-lg xs:text-xl sm:text-2xl md:text-[2vw] text-[#B7D4FF]`}></i>
      </div>
      {/* Preview Image */}
      <img
        src={VIDEO_PREVIEW}
        alt="Video Preview"
        className={`w-full h-full object-cover absolute top-0 left-0 z-10 transition-opacity duration-500 ${showPreview ? 'opacity-100' : 'opacity-0'}`}
        draggable={false}
        style={{ pointerEvents: 'none' }}
      />
      {/* Video */}
      <video
        ref={videoRef}
        loop
        src={VIDEO_SRC}
        className="w-full h-full object-cover transition-opacity duration-500 opacity-100"
        muted
        playsInline
        webkit-playsinline="true"
        style={{ 
          pointerEvents: 'auto',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden'
        }}
      />
      {isPlaying && !showPreview && (
        <div 
          className={`absolute top-4 left-1/2 capitalize z-[1000] text-xl font-medium bg-black/60 px-10 py-6 md:px-10 md:py-6 lg:px-6 lg:py-4 rounded-full shadow-lg select-none pointer-events-none ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-white'}`} 
          style={{
            fontFamily: 'Roobert',
            WebkitTransform: 'translateX(-50%) translateZ(0)',
            transform: 'translateX(-50%) translateZ(0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            WebkitUserSelect: 'none',
            userSelect: 'none',
            left: '50%',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          we will reveal when hit 10k downloads
        </div>
      )}
    </div>
  );
};

export default Video;
