import React, { useRef, useState } from 'react';

const VIDEO_PREVIEW = 'https://plus.unsplash.com/premium_photo-1731439886498-d09d6472dfb3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const VIDEO_SRC = 'https://videos.pexels.com/video-files/4909470/4909470-hd_1920_1080_25fps.mp4';

const ORIGINAL_BTN_TOP = '1.8%';
const ORIGINAL_BTN_LEFT = '88%';

const Video: React.FC = () => {
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
      videoRef.current?.play();
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowPreview(true);
    setBtnScale(1);
    animateBtnTo(ORIGINAL_BTN_TOP, ORIGINAL_BTN_LEFT);
  };

  return (
    <div
      ref={containerRef}
      className="video-container relative overflow-hidden rounded-[1.5rem] rounded-r-[0.5rem] h-[66vh] w-[70vw] left-[18vw]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Play/Pause Button Overlay */}
      <div
        id="video-crsr"
        className="bg-[#F47CA8] w-[8.4vw] h-[8.4vw] rounded-full flex justify-center items-center absolute z-[999] cursor-pointer shadow-lg transition-transform duration-200"
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
        <i className={`ri-${isPlaying ? 'pause-mini-fill' : 'play-mini-fill'} text-[2vw] text-[#B7D4FF]`}></i>
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
        className={`w-full h-full object-cover transition-opacity duration-500 ${showPreview ? 'opacity-0' : 'opacity-100'}`}
        onEnded={handleVideoEnded}
        onClick={handlePlayPause}
        style={{ pointerEvents: 'auto' }}
      />
    </div>
  );
};

export default Video;
