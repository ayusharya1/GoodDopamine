import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

const logs = [
  {
    featured: true,
    image: "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?q=80&w=1109&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Good dopamine",
    logId: "Log 007",
    date: "2024.11.29",
    bg: "bg-[#e3f0ff]",
    text: "text-[#054D85]",
    tag: "Featured Log",
  },
  {
    featured: false,
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Good blog",
    logId: "Log 006",
    date: "2024.11.19",
    bg: "bg-[#e3f0ff]",
    text: "text-[#054D85]",
    tag: null,
  },
  {
    featured: false,
    image: "https://images.unsplash.com/photo-1520880912170-1efcca683f13?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: 'Nice blog',
    logId: "Log 005",
    date: "2024.02.09",
    bg: "bg-[#e3f0ff]",
    text: "text-[#054D85]",
    tag: null,
  },
];

export default function LogBookSection({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  // Generate random stars for dark mode
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
    <section
      className="log-book-section relative w-full min-h-[70vh] py-16 px-4 flex flex-col items-center justify-center rounded-b-[7rem]"
      style={theme === 'dark'
        ? {
            fontFamily: 'Roobert, sans-serif',
            backgroundColor: '#0F0E16',
            backgroundImage: 'url(https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_day.png)',
            backgroundSize: '200px',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            opacity: 1,
            backgroundBlendMode: 'normal',
          }
        : {
            fontFamily: 'Roobert, sans-serif',
            backgroundColor: '#B7D4FF',
            backgroundImage: 'url(https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_day.png)',
            backgroundSize: '200px',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
          }
      }
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
      <div className="log-header w-full max-w-7xl mx-auto flex items-center justify-between mb-8">
        <h2
          className={"log-title text-5xl md:text-6xl tracking-tight " + (theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#054D85]')}
        >
          Log Book
        </h2>
        <button className="log-button bg-[#e3f0ff] text-[#054D85] px-8 py-4 rounded-2xl text-lg font-medium shadow-md border border-[#b7d4ff] hover:bg-[#F2689B] hover:text-black transition-all duration-200 group">
          View all logs
          <span className="inline-block ml-3 align-middle w-2 h-2 bg-[#054D85] rounded-full transition-all duration-200 group-hover:opacity-0 group-hover:scale-50"></span>
          <span className="inline-block ml-1 align-middle text-2xl place-self-center transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5">→</span>
        </button>
      </div>
      <div className="log-cards w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {logs.map((log, idx) => (
          <Link
          to={'/logbook'}
            key={idx}
            className={`log-card relative flex flex-col rounded-3xl ${idx === 0 ? 'border-[0.8rem] border-[#e3f0ff] hover:border-[#F2689B]' : 'border-none !border-0 p-2'} shadow-xl overflow-hidden ${log.bg} ${idx !== 0 ? 'hover:bg-[#FEEAF1] p-3' : ''} transition-all duration-300 ${idx === 0 ? 'lg:w-[75%]' : 'lg:w-[30%]'} w-full group`}
            style={{ maxHeight: 450 }}
          >
            {/* Featured Tag */}
            {log.featured && (
              <div className="featured-tag absolute top-6 left-6 z-20">
                <span className="px-7 py-3 rounded-full text-lg font-medium shadow border border-[#b7d4ff] transition-colors duration-300 bg-white text-[#054D85] group-hover:bg-[#FFEBF2] group-hover:text-[#9D2F55]">
                  {log.tag}
                </span>
              </div>
            )}
            {/* Card Image and Overlay for Featured Card */}
            {idx === 0 ? (
              <>
                {/* Background Image */}
                <img
                  src={log.image}
                  alt={log.title}
                  className="featured-image absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-110"
                  style={{ borderRadius: 24 }}
                />
                {/* Top right dot */}
                <div className="top-dot absolute top-4 right-4 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center z-10 border-2 border-[#e3f0ff]">
                  <svg width="24" height="24" fill="none" stroke="#8a3a5a" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10"/></svg>
                </div>
                {/* Overlay for heading/content */}
                <div className="featured-overlay absolute left-8 bottom-8 bg-[#e3f0ff] bg-opacity-90 rounded-2xl px-8 py-6 shadow-lg min-w-[220px] max-w-[80%] z-20">
                  <div className={`featured-title text-3xl md:text-4xl font-medium ${log.text} mb-2`}>{log.title}</div>
                  <div className="featured-meta text-base text-[#7ca6d6] font-medium mt-2">
                    {log.logId}  /  {log.date}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Card Image for non-featured cards */}
                <div className="card-image relative w-full flex-shrink-0">
                  <img
                    src={log.image}
                    alt={log.title}
                    className="object-cover w-full h-[95%] rounded-t-2xl rounded-b-3xl transition-transform duration-500 group-hover:scale-[1.05]"
                    style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
                  />
                  {/* Top right dot */}
                  <div className="top-dot absolute top-4 right-4 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center z-10 border-2 border-[#e3f0ff]">
                    <svg width="24" height="24" fill="none" stroke="#8a3a5a" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10"/></svg>
                  </div>
                </div>
                <div className={`card-content flex flex-col flex-1 justify-end p-2 transition-colors duration-300 group-hover:text-[#9D2F55] ${idx !== 0 ? 'group-hover:text-[#9D2F55]' : log.text}`}>
                  <div className={`card-title text-xl font-medium mb-2 ${log.text} ${idx !== 0 ? 'group-hover:text-[#9D2F55]' : ''}`}>{log.title}</div>
                  <div className={`card-meta text-base font-medium mt-2 ${idx !== 0 ? 'group-hover:text-[#9D2F55]' : 'text-[#7ca6d6]'}`}>{log.logId}  /  {log.date}</div>
                </div>
              </>
            )}
          </Link>
        ))}
      </div>
      
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .log-book-section {
            min-height: 60vh;
            padding: 2rem 1rem 4rem 1rem;
            border-bottom-left-radius: 4rem !important;
            border-bottom-right-radius: 4rem !important;
          }
          
          .log-header {
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;
            text-align: center;
            margin-bottom: 2rem;
          }
          
          .log-title {
            font-size: 3.5rem !important;
            margin-bottom: 0;
          }
          
          .log-button {
            padding: 0.875rem 1.75rem !important;
            font-size: 1rem !important;
          }
          
          .log-cards {
            flex-direction: column;
            gap: 2rem;
            margin-bottom: 2rem;
          }
          
          .log-card {
            width: 100% !important;
            max-height: 400px !important;
            border-radius: 1.5rem !important;
            min-height: 350px !important;
          }
          
          .log-card:first-child {
            width: 100% !important;
            height: 400px !important;
            min-height: 400px !important;
            max-height: 400px !important;
          }
          
          .log-card:not(:first-child) {
            height: 380px !important;
            min-height: 380px !important;
            max-height: 380px !important;
            padding: 1rem !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          .log-card:not(:first-child) .card-image {
            height: 75% !important;
            min-height: 75% !important;
            flex-shrink: 0 !important;
          }
          
          .log-card:not(:first-child) .card-content {
            height: 25% !important;
            min-height: 25% !important;
            padding: 0.75rem 0 0 0 !important;
            justify-content: flex-start !important;
            flex-shrink: 0 !important;
          }
          
          .featured-tag {
            top: 1.5rem !important;
            left: 1.5rem !important;
          }
          
          .featured-tag span {
            padding: 0.75rem 1.25rem !important;
            font-size: 1rem !important;
            border-radius: 2rem !important;
          }
          
          .top-dot {
            top: 1.5rem !important;
            right: 1.5rem !important;
            width: 3rem !important;
            height: 3rem !important;
          }
          
          .top-dot svg {
            width: 1.5rem !important;
            height: 1.5rem !important;
          }
          
          .featured-overlay {
            left: 1.5rem !important;
            bottom: 1.5rem !important;
            padding: 1.5rem !important;
            min-width: 250px !important;
            max-width: 80% !important;
            border-radius: 1.25rem !important;
          }
          
          .featured-title {
            font-size: 2rem !important;
            margin-bottom: 0.75rem !important;
            line-height: 1.2 !important;
          }
          
          .featured-meta {
            font-size: 1rem !important;
          }
          
          .card-title {
            font-size: 1.25rem !important;
            line-height: 1.3 !important;
            margin-bottom: 0.5rem !important;
          }
          
          .card-meta {
            font-size: 1rem !important;
          }
        }
        
        @media (max-width: 768px) {
          .log-book-section {
            min-height: 50vh;
            padding: 1.5rem 1rem 3.5rem 1rem;
            border-bottom-left-radius: 2.5rem !important;
            border-bottom-right-radius: 2.5rem !important;
          }
          
          .log-header {
            gap: 1.25rem;
            margin-bottom: 1.5rem;
          }
          
          .log-title {
            font-size: 2.75rem !important;
          }
          
          .log-button {
            padding: 0.75rem 1.5rem !important;
            font-size: 0.875rem !important;
          }
          
          .log-cards {
            gap: 1.5rem;
            margin-bottom: 1.5rem;
          }
          
          .log-card {
            max-height: 350px !important;
            border-radius: 1.25rem !important;
            min-height: 300px !important;
          }
          
          .log-card:first-child {
            width: 100% !important;
            height: 350px !important;
            min-height: 350px !important;
            max-height: 350px !important;
          }
          
          .log-card:not(:first-child) {
            height: 340px !important;
            min-height: 340px !important;
            max-height: 340px !important;
            padding: 0.75rem !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          .log-card:not(:first-child) .card-image {
            height: 70% !important;
            min-height: 70% !important;
            flex-shrink: 0 !important;
          }
          
          .log-card:not(:first-child) .card-content {
            height: 30% !important;
            min-height: 30% !important;
            padding: 0.5rem 0 0 0 !important;
            justify-content: flex-start !important;
            flex-shrink: 0 !important;
          }
          
          .featured-tag {
            top: 1.25rem !important;
            left: 1.25rem !important;
          }
          
          .featured-tag span {
            padding: 0.5rem 1rem !important;
            font-size: 0.875rem !important;
            border-radius: 1.5rem !important;
          }
          
          .top-dot {
            top: 1.25rem !important;
            right: 1.25rem !important;
            width: 2.5rem !important;
            height: 2.5rem !important;
          }
          
          .top-dot svg {
            width: 1.25rem !important;
            height: 1.25rem !important;
          }
          
          .featured-overlay {
            left: 1.25rem !important;
            bottom: 1.25rem !important;
            padding: 1.25rem !important;
            min-width: 200px !important;
            max-width: 85% !important;
            border-radius: 1rem !important;
          }
          
          .featured-title {
            font-size: 1.75rem !important;
            margin-bottom: 0.5rem !important;
            line-height: 1.2 !important;
          }
          
          .featured-meta {
            font-size: 0.875rem !important;
          }
          
          .card-title {
            font-size: 1.125rem !important;
            line-height: 1.3 !important;
            margin-bottom: 0.375rem !important;
          }
          
          .card-meta {
            font-size: 0.875rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .log-book-section {
            min-height: 45vh;
            padding: 1rem 0.75rem 3rem 0.75rem;
            border-bottom-left-radius: 1.5rem !important;
            border-bottom-right-radius: 1.5rem !important;
          }
          
          .log-header {
            gap: 1rem;
            margin-bottom: 1.25rem;
          }
          
          .log-title {
            font-size: 2.25rem !important;
          }
          
          .log-button {
            padding: 0.625rem 1.25rem !important;
            font-size: 0.75rem !important;
          }
          
          .log-cards {
            gap: 1.25rem;
            margin-bottom: 1.25rem;
          }
          
          .log-card {
            max-height: 300px !important;
            border-radius: 1rem !important;
            min-height: 250px !important;
          }
          
          .log-card:first-child {
            width: 100% !important;
            height: 300px !important;
            min-height: 300px !important;
            max-height: 300px !important;
          }
          
          .log-card:not(:first-child) {
            height: 280px !important;
            min-height: 280px !important;
            max-height: 280px !important;
            padding: 0.5rem !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          .log-card:not(:first-child) .card-image {
            height: 65% !important;
            min-height: 65% !important;
            flex-shrink: 0 !important;
          }
          
          .log-card:not(:first-child) .card-content {
            height: 35% !important;
            min-height: 35% !important;
            padding: 0.375rem 0 0 0 !important;
            justify-content: flex-start !important;
            flex-shrink: 0 !important;
          }
          
          .featured-tag {
            top: 1rem !important;
            left: 1rem !important;
          }
          
          .featured-tag span {
            padding: 0.375rem 0.75rem !important;
            font-size: 0.75rem !important;
            border-radius: 1.25rem !important;
          }
          
          .top-dot {
            top: 1rem !important;
            right: 1rem !important;
            width: 2rem !important;
            height: 2rem !important;
          }
          
          .top-dot svg {
            width: 1rem !important;
            height: 1rem !important;
          }
          
          .featured-overlay {
            left: 1rem !important;
            bottom: 1rem !important;
            padding: 1rem !important;
            min-width: 180px !important;
            max-width: 90% !important;
            border-radius: 0.875rem !important;
          }
          
          .featured-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.375rem !important;
            line-height: 1.2 !important;
          }
          
          .featured-meta {
            font-size: 0.75rem !important;
          }
          
          .card-title {
            font-size: 1rem !important;
            line-height: 1.3 !important;
            margin-bottom: 0.25rem !important;
          }
          
          .card-meta {
            font-size: 0.75rem !important;
          }
        }
        
        @media (max-width: 360px) {
          .log-book-section {
            min-height: 40vh;
            padding: 0.75rem 0.5rem 2.5rem 0.5rem;
            border-bottom-left-radius: 1rem !important;
            border-bottom-right-radius: 1rem !important;
          }
          
          .log-header {
            gap: 0.875rem;
            margin-bottom: 1rem;
          }
          
          .log-title {
            font-size: 1.875rem !important;
          }
          
          .log-button {
            padding: 0.5rem 1rem !important;
            font-size: 0.625rem !important;
          }
          
          .log-cards {
            gap: 1rem;
            margin-bottom: 1rem;
          }
          
          .log-card {
            max-height: 250px !important;
            border-radius: 0.875rem !important;
            min-height: 200px !important;
          }
          
          .log-card:first-child {
            width: 100% !important;
            height: 250px !important;
            min-height: 250px !important;
            max-height: 250px !important;
          }
          
          .log-card:not(:first-child) {
            height: 240px !important;
            min-height: 240px !important;
            max-height: 240px !important;
            padding: 0.375rem !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          .log-card:not(:first-child) .card-image {
            height: 60% !important;
            min-height: 60% !important;
            flex-shrink: 0 !important;
          }
          
          .log-card:not(:first-child) .card-content {
            height: 40% !important;
            min-height: 40% !important;
            padding: 0.25rem 0 0 0 !important;
            justify-content: flex-start !important;
            flex-shrink: 0 !important;
          }
          
          .featured-tag {
            top: 0.75rem !important;
            left: 0.75rem !important;
          }
          
          .featured-tag span {
            padding: 0.25rem 0.5rem !important;
            font-size: 0.625rem !important;
            border-radius: 1rem !important;
          }
          
          .top-dot {
            top: 0.75rem !important;
            right: 0.75rem !important;
            width: 1.75rem !important;
            height: 1.75rem !important;
          }
          
          .top-dot svg {
            width: 0.875rem !important;
            height: 0.875rem !important;
          }
          
          .featured-overlay {
            left: 0.75rem !important;
            bottom: 0.75rem !important;
            padding: 0.75rem !important;
            min-width: 150px !important;
            max-width: 95% !important;
            border-radius: 0.75rem !important;
          }
          
          .featured-title {
            font-size: 1.25rem !important;
            margin-bottom: 0.25rem !important;
            line-height: 1.2 !important;
          }
          
          .featured-meta {
            font-size: 0.625rem !important;
          }
          
          .card-title {
            font-size: 0.875rem !important;
            line-height: 1.3 !important;
            margin-bottom: 0.125rem !important;
          }
          
          .card-meta {
            font-size: 0.625rem !important;
          }
        }
      `}</style>
    </section>
  );
} 