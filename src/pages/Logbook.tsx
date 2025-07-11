import React, { useMemo } from 'react';
import { useTheme } from '../components/theme-provider';
import { Navigation } from '../components/Navigation';
import { FooterSection } from '../components/footer-section';

const NUM_STARS = 32;

type BlogPost = {
  id: string;
  title: string;
  image?: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
};

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'From Creator to Team Member: My Journey with Rooms',
    image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Journey',
    excerpt: 'A personal reflection on joining the Rooms team and what I learned along the way.',
    date: '2024.11.19',
    readTime: '5 min read',
  },
  
];

const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`bg-white rounded-2xl ${className}`}>{children}</div>
);
const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={className}>{children}</div>
);
const Badge: React.FC<{ variant?: string; className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <span className={`inline-block px-2 py-1 border border-gray-300 rounded text-gray-700 bg-gray-50 ${className}`}>{children}</span>
);

const Logbook: React.FC = () => {
    const { theme } = useTheme();
    // Generate random stars for dark mode
    const stars = useMemo(() => Array.from({ length: NUM_STARS }, (_) => {
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
          className={`group flex flex-col mt-8 sm:mt-12 items-center justify-center min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] w-full sm:w-[96vw] md:w-[80vw] mx-auto rounded-2xl sm:rounded-3xl relative z-10 overflow-hidden ${theme === 'dark' ? 'text-[#C8CCFB]' : ''}`}
          style={{
            backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?q=80&w=1109&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'background-size 0.5s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Scalable background overlay for hover effect */}
          <div className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-105" style={{background: 'inherit', pointerEvents: 'none'}} />
          {/* Floating badge at top right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-8 w-16 h-16 sm:w-24 sm:h-24 bg-white/80 rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center z-20 border border-blue-200 transition-all duration-300 group-hover:bg-[#FEEAF1]">
            <span className="w-6 h-6 flex items-center justify-center">
              <span className="block bg-blue-400 rounded-full w-2 h-2 transition-all duration-300 group-hover:hidden" />
              <span className="hidden group-hover:block text-3xl sm:text-5xl text-[#9D2F55] transition-all duration-300">↗</span>
            </span>
          </div>
          {/* Making Rooms 3.0 card */}
          <div className="absolute left-4 bottom-4 sm:left-12 sm:bottom-12 bg-[#e3f0ff] rounded-xl sm:rounded-3xl px-4 py-3 sm:px-10 sm:py-6 shadow-xl flex flex-col items-start min-w-[200px] sm:min-w-[320px] transition-all duration-300 group-hover:bg-[#FEEAF1]">
            <div className="text-xl sm:text-3xl font-bold text-[#054D85] mb-2 transition-colors duration-300 group-hover:text-[#9D2F55]">Making Rooms 3.0</div>
            <div className="text-[#054D85] text-sm sm:text-md font-medium transition-colors duration-300 group-hover:text-[#9D2F55]">2024.11.29 &nbsp; / &nbsp; Log 007</div>
          </div>
        </div>
        {/* --- LOG GRID SECTION START --- */}
        <div
          className={`relative z-10 w-full px-2 sm:px-8 pt-8 rounded-t-2xl sm:rounded-t-[6.5rem] rounded-b-xl sm:rounded-b-[2.5rem] mt-4 sm:mt-[2rem] pb-10 sm:pb-20 ${theme === 'dark' ? 'text-[#C8CCFB]' : ''}`}
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
          {/* Logs Heading and Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1 mt-4 sm:mt-[2rem]">
            <h2 className="text-2xl sm:text-4xl md:text-[68px] font-bold text-[#2A4B7A] ml-2 sm:ml-[2rem] leading-none md:mb-0" style={{fontFamily: 'Roobert, sans-serif', color: theme === 'dark' ? '#C8CCFB' : '#2A4B7A'}}>Logs</h2>
          </div>
          {/* Log Cards Grid */}
          <section
            className="space-y-4 px-2 sm:px-[2rem] relative z-10 w-full rounded-t-2xl sm:rounded-t-[6.5rem] rounded-b-2xl sm:rounded-b-[6.5rem]"
            style={{
              backgroundColor: theme === 'dark' ? '#0F0E16' : '#B7D4FF',
              backgroundImage:
                'url("https://cdn.prod.website-files.com/66ea3a5528a044beafcf913e/671af6a311542774d2562292_Repeating%20Grid%20Image_day.png")',
              backgroundSize: '200px',
              backgroundPosition: 'center',
              backgroundRepeat: 'repeat',
              opacity: 1,
              backgroundBlendMode: 'normal',
            }}
          >
            <div className="relative">
              {/* Horizontal timeline line */}
              <div className="absolute top-20 left-0 right-0 h-0.5 bg-gray-300"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {blogPosts.map((post) => (
                  <div key={post.id} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                    <Card className="mt-28 shadow-md transition-transform duration-500 hover:scale-103 hover:shadow-2xl rounded-xl sm:rounded-[1.5rem] group ">
                      <CardContent className="p-3 sm:p-4 space-y-3 bg-[#D2E4FF] rounded-xl sm:rounded-[1.5rem] group-hover:bg-[#FFEBF2]">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-32 sm:h-42 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="space-y-2 ">
                          <Badge className="text-xs">
                            {post.category}
                          </Badge>
                          <h3 className="font-semibold text-gray-900 line-clamp-2 text-md group-hover:text-[#9D2F55]">{post.title}</h3>
                          <p className="text-gray-600 text-md line-clamp-2 group-hover:text-[#9D2F55]">{post.excerpt}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                          <span>{post.date}</span>
                          <span>{post.readTime}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        {/* --- LOG GRID SECTION END --- */}
        <FooterSection theme={theme} />
      </div>
    );
};

export default Logbook;
