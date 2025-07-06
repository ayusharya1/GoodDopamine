import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import AnimatedCard from '../AnimatedCard';

import AIsection from '../AIsection';
import { OurThingsSection } from '../our-things-section';

// Placeholder images (replace with actual images if available)
const towerImg = 'https://images.unsplash.com/photo-1586011978320-228b9817faf1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Use a similar grayscale/transparent image
const avatarImg = 'https://randomuser.me/api/portraits/men/32.jpg'; // Replace with actual avatar if available



const CardTheme = ({ id, theme }: { id?: string, theme?: 'light' | 'dark' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const totalCards = 3;

  // Scroll to card by index with proper positioning
  const scrollToCard = (idx: number) => {
    if (scrollRef.current) {
      const cardWidth = 1300; // Width of each card
      const gap = 64; // Gap between cards (gap-16 = 4rem = 64px)
      // Calculate scroll position to center the card
      const scrollPosition = idx * (cardWidth + gap);
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
      setCurrentIdx(idx);
    }
  };

  const handleLeft = () => {
    if (currentIdx > 0) {
      scrollToCard(currentIdx - 1);
    }
  };
  const handleRight = () => {
    if (currentIdx < totalCards - 1) {
      scrollToCard(currentIdx + 1);
    }
  };

  // Initialize scroll position on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, []);

  // Handle scroll events to update current index
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 1000;
      const gap = 64;
      const newIdx = Math.round(scrollLeft / (cardWidth + gap));
      if (newIdx !== currentIdx && newIdx >= 0 && newIdx < totalCards) {
        setCurrentIdx(newIdx);
      }
    }
  };

  // Generate random stars for dark mode (copied from log-book-section)
  const numStars = 32;
  const stars = useMemo(() => Array.from({ length: numStars }, (_, i) => {
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
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center rounded-t-[6rem] py-12 md:py-8 sm:py-4 relative"
      style={{
        background: theme === 'dark'
          ? '#0F0E16'
          : 'linear-gradient(to bottom right, #e0e7ff, #c7d2fe)',
        fontFamily: 'Roobert, sans-serif',
      }}
    >
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
      {/* Grid Background */}
      <div
        className="absolute rounded-t-[6rem] inset-0 z-0 pointer-events-none"
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

      {/* Section Title */}
      <h2
        className={
          `our-things-title  capitalize text-left w-[90%] mx-auto mt-10 px-2  sm:px-4 relative z-20 ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-blue-900'} text-[clamp(2.2rem,6vw,4.6rem)] md:text-[3.5rem] sm:text-[1.6rem] font-normal leading-[1.15]`
        }
        style={{
          fontFamily: 'Roobert, sans-serif',
          letterSpacing: '-0.04em',
        }}
      >
        Fixing your Relationship <br /> with Tech
      </h2>

      <OurThingsSection theme={theme}/>
      
      <div className="w-[100vw] lg:px-0 sm:px-4">
        <AIsection theme={theme}/>
      </div>
    </div>
  );
};

export default CardTheme;

/* Add this CSS to the file or global styles */
/* Hide scrollbar for all browsers */
/* .hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } */
