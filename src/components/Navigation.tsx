import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "./theme-provider"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [showStars, setShowStars] = useState(theme === 'dark')

  // Handle theme toggle with star animation
  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    toggleTheme()
    
    // Show stars only when switching to dark mode
    if (newTheme === 'dark') {
      setShowStars(true)
    } else {
      setShowStars(false)
    }
  }

  // Update showStars when theme changes
  useEffect(() => {
    setShowStars(theme === 'dark')
  }, [theme])

  return (
    <>
      {/* Top left menu button */}
      {!isMenuOpen && (
        <nav className="fixed top-4 sm:top-6 left-4 sm:left-6 z-50 font-sans">
          {/* <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-1 sm:gap-2 bg-blue-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-blue-800 transition-colors shadow text-sm sm:text-base nav-menu-main-btn ml-[7px]"
            style={{ fontFamily: 'Roobert' }}
          >
            <span className="text-lg sm:text-xl">☰</span>
            <span className="hidden sm:inline">Menu</span>
          </button> */}
          <button
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center gap-1 sm:gap-2 bg-blue-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-blue-800 transition-all duration-300 ease-in-out shadow text-sm sm:text-base lg:relative lg:right-[1.5%]"
                style={{ fontFamily: 'Roobert' }}
              >
                <span className="text-lg sm:text-xl">☰</span>
                <span className="hidden sm:inline">Menu</span>
              </button>
        </nav>
      )}
      {/* Top right theme/counter */}
      <div className={`fixed top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-2 sm:gap-4 `}>
        <div
          className={`flex items-center justify-center rounded-full shadow-md border border-blue-200 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#393a6b]' : 'bg-gradient-to-br from-[#7ecbff] to-[#b4e0ff]'}`}
          style={{height: 'clamp(40px, 6vh, 48px)', minWidth: 'clamp(100px, 7vw, 220px)'}}
        >
          <button
            aria-label="Toggle theme"
            onClick={handleThemeToggle}
            className={`flex items-center justify-center rounded-full focus:outline-none transition-colors duration-500 relative overflow-hidden theme-toggle-btn ${theme === 'dark' ? 'bg-[#393a6b]' : 'bg-gradient-to-br from-[#7ecbff] to-[#b4e0ff]'}`}
            style={{
              width: 'clamp(70px, 10vw, 90px)',
              height: 'clamp(32px, 5vh, 40px)',
              boxShadow: theme === 'dark' ? '0 2px 8px #23244a80 inset' : '0 2px 8px #b6e0ff80 inset',
              transition: 'background-color 0.5s 0.3s, color 0.5s 0.3s',
            }}
          >
            {/* Moon icon (night) */}
            <span
              className={`theme-toggle-icon transition-al duration-700 ease-in-out absolute left-3 top-1/2 -translate-y-1/2 z-10
                ${theme === 'dark' ? 'opacity-100 translate-x-0 delay-200 scale-100' : 'opacity-0 -translate-x-6 delay-0 scale-75'}`}
              style={{ pointerEvents: 'none' }}
            >
              🌙
              {/* Glowing stars inside toggle for dark mode, now inside the moon span for synchronized transition */}
              {showStars && theme === 'dark' && (
                <>
                  <div 
                    className="absolute  text-yellow-300 text-[7px] theme-toggle-star transition-all duration-700 ease-in-out opacity-100 scale-100 delay-200"
                    style={{
                      top: '-2px',
                      left: '30px',
                      filter: 'drop-shadow(0 0 4px #fbbf24)',
                      zIndex: 5,
                    }}
                  >⭐</div>
                  <div 
                    className="absolute text-yellow-300 text-[5px] theme-toggle-star transition-all duration-700 ease-in-out opacity-100 scale-100 delay-300"
                    style={{
                      top: '15px',
                      left: '28px',
                      filter: 'drop-shadow(0 0 4px #fbbf24)',
                      zIndex: 5,
                    }}
                  >⭐</div>
                  <div 
                    className="absolute  text-yellow-300 text-[5px] theme-toggle-star transition-all duration-700 ease-in-out opacity-100 scale-100 delay-400"
                    style={{
                      top: '6px',
                      left: '52px',
                      filter: 'drop-shadow(0 0 4px #fbbf24)',
                      zIndex: 5,
                    }}
                  >⭐</div>
                </>
              )}
            </span>
            {/* Cloud/sun icons (day) */}
            <span
              className={`theme-toggle-icon transition-all duration-700 ease-in-out flex items-center gap-1.5 relative z-10
                ${theme === 'dark' ? 'opacity-0 translate-x-6 delay-0 scale-75' : 'opacity-100 translate-x-0 delay-200 scale-100'}`}
              style={{ pointerEvents: 'none' }}
            >
              ☁️<span className="ml-[-8px] sm:ml-[-10px] mt-1 sm:mt-2">☁️</span>☀️
            </span>
          </button>
          {/* <div className={`flex items-center gap-1 sm:gap-2 rounded-full ml-1 sm:ml-2 pr-2 sm:pr-4 pl-2 sm:pl-4 h-[clamp(32px, 5vh, 40px)] transition-colors duration-300 ${theme === 'dark' ? 'bg-[#4d4e8a]' : 'bg-[#e0edfd]'}`} style={{marginRight: 'clamp(2px, 0.5vw, 4px)'}}>
            <span className="text-[#0a2540] text-sm sm:text-base font-medium">0 / 6</span>
            <span className="text-base sm:text-lg">⌄</span>
          </div> */}
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setIsMenuOpen(false)} />
          <div className={`fixed top-0 left-0 h-full w-full sm:w-[500px] md:w-[680px] max-w-full z-50 shadow-2xl rounded-tr-3xl rounded-br-3xl flex flex-col transition-transform transition-opacity duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} ${theme === 'dark' ? 'bg-[#CBCFFF]' : 'bg-[#d3e5fa]'}`} style={{ borderTopRightRadius: '2.5rem', borderBottomRightRadius: '2.5rem' }}>
            <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 pt-6 sm:pt-8">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="
                  flex items-center gap-1 sm:gap-2
                  bg-blue-900 text-white px-4 sm:px-6 py-2 mt-[-1.4rem] sm:py-3
                  rounded-full font-medium hover:bg-blue-800 transition-all duration-300 ease-in-out shadow
                  text-sm sm:text-base
                  lg:relative lg:right-[1.5%]
                "
                style={{ fontFamily: 'Roobert' }}
              >
                <span className="text-lg sm:text-xl">✕</span>
                <span className="hidden sm:inline">Close</span>
              </button>
              <img 
                src="/images/logo2.png" 
                alt="Logo" 
                className="select-none ml-8 sm:ml-16 md:ml-20 mt-[-1.4rem]" 
                style={{width: '80px', height: 'auto'}}
              />
            </div>
            <div className="px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8 overflow-hidden overflow-y-auto flex-1 scrollbar-hide">
              <div className={`${theme === 'dark' ? 'bg-[#07002F]' : 'bg-[#0a5485]'} rounded-2xl p-3 sm:p-4 md:p-6 max-w-xl w-full mb-6 sm:mb-8 shadow-lg`}>
              <div className="space-y-3 sm:space-y-4 w-full sm:w-[60%] md:w-[50%]">
                  {['Home', 'About', 'Logbook', 'Contact'].map((item) => (
                    <div key={item} className="relative w-full">
                      <Link
                        to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                        className={`${theme === 'dark' ? 'bg-[#CBCFFF]' : 'bg-[#cbe2fa]'} nav-menu-btn rounded-xl px-4 sm:px-6 py-3 sm:py-4 flex items-center text-blue-900 text-base sm:text-lg font-medium shadow-sm transition-all duration-200 w-full`}
                        style={{ textDecoration: 'none' }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mr-2 sm:mr-3 text-xl sm:text-2xl">•</span> {item}
                      </Link>
                      {/* Hover description text */}
                      <span className={`nav-menu-desc absolute top-1/2 left-full ml-4 -translate-y-1/2 px-2 py-1 rounded text-xs sm:text-sm font-mono bg-transparent text-[#fff] whitespace-nowrap pointer-events-none transition-opacity duration-200 ${item === 'Home' ? 'nav-menu-desc-home' : item === 'About' ? 'nav-menu-desc-about' : item === 'Logbook' ? 'nav-menu-desc-logbook' : 'nav-menu-desc-contact'}`}
                        style={{opacity: 0}}>
                        {item === 'Home' && '> step 0, where it all began'}
                        {item === 'About' && '> who we are'}
                        {item === 'Logbook' && '> our journey'}
                        {item === 'Contact' && '> say hello'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-blue-900 text-lg sm:text-xl font-medium mb-2">Our Products</div>
              <div className={`${theme === 'dark' ? 'bg-[#07002F]' : 'bg-[#0a5485]'} rounded-2xl p-3 sm:p-4 md:p-6 max-w-xl w-full mb-6 sm:mb-8 shadow-lg`}>
                <div className="space-y-3 sm:space-y-4 w-full sm:w-[60%] md:w-[50%]">
                  {[
                    { label: 'Ridan', url: 'https://www.ridan.ai/' },
                    { label: 'Ridan For Research', url: 'https://api.whatsapp.com/send/?phone=8249069736&text=Hi%2C+I+am+a+researcher.+I+want+to+partner+with+Ridan.&type=phone_number&app_absent=0' }
                  ].map(({ label, url }) => (
                    <a
                      href={url}
                      target="_blank"
                      key={label}
                      className={`${theme === 'dark' ? 'bg-[#CBCFFF]' : 'bg-[#cbe2fa]'} our-product-btn group rounded-xl px-4 sm:px-6 py-3 sm:py-4 flex items-center text-blue-900 text-base sm:text-lg font-medium shadow-sm hover:bg-[#F68CA7]`}
                    >
                      <span className="mr-2 sm:mr-3 text-xl sm:text-2xl">•</span>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="text-blue-900 text-lg sm:text-xl font-medium mb-3 sm:mb-4">Follow us</div>
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                {[
                  { icon: () => <span className='text-xl sm:text-2xl'>🕹️</span>, name: 'Discord' },
                  { icon: () => <span className='text-xl sm:text-2xl'>🎵</span>, name: 'Tiktok' },
                  { icon: () => <span className='text-xl sm:text-2xl'>📸</span>, name: 'Instagram' },
                  { icon: () => <span className='text-xl sm:text-2xl'>𝕏</span>, name: 'X/Twitter' },
                  { icon: () => <span className='text-xl sm:text-2xl'>▶️</span>, name: 'Youtube' },
                  { icon: () => <span className='text-xl sm:text-2xl'>#</span>, name: 'Threads' },
                ].map((social, idx) => (
                  <div key={idx} className={`${theme === 'dark' ? 'bg-[#CBCFFF]' : 'bg-[#cbe2fa]'} rounded-xl flex flex-col items-center justify-center px-3 sm:px-4 py-2 sm:py-3 w-20 sm:w-28 shadow-sm`}>
                    <social.icon />
                    <span className="text-xs mt-1 text-blue-900">{social.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <style>{`
        .nav-menu-btn:hover {
          background: #F68CA7 !important;
          color: #1a1a1a !important;
          position: relative;
        }
        .nav-menu-btn:hover span:first-child {
          display: none;
        }
        .nav-menu-btn:hover::before {
          content: '→';
          display: inline-block;
          margin-right: 0.75rem;
          font-size: 1.25rem;
          color: #1a1a1a;
          font-weight: bold;
          position: relative;
          top: 1px;
        }
        /* Show description on hover */
        .nav-menu-btn:hover + .nav-menu-desc {
          opacity: 1 !important;
          background: transparent;
          color: #fff;
        }
        @media (max-width: 1024px) {
          .nav-menu-main-btn {
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
            font-size: 1rem !important;
            border-radius: 1.5rem !important;
          }
          .nav-menu-btn {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            font-size: 1rem !important;
            border-radius: 1.2rem !important;
          }
        }
        @media (max-width: 640px) {
          .nav-menu-main-btn {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
            font-size: 0.9rem !important;
            border-radius: 1rem !important;
          }
          .nav-menu-btn {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
            font-size: 0.9rem !important;
            border-radius: 0.8rem !important;
          }
        }
        @media (max-width: 450px) {
          .nav-menu-main-btn {
  
            font-size: 0.8rem !important;
            
          }
          .nav-menu-btn {
            
            font-size: 0.8rem !important;
            border-radius: 0.6rem !important;
          }
        }
        @media (max-width: 360px) {
          .nav-menu-main-btn {
           
            font-size: 0.7rem !important;
            border-radius: 0.5rem !important;
          }
          .nav-menu-btn {
            padding-left: 0.15rem !important;
            padding-right: 0.15rem !important;
            font-size: 0.7rem !important;
            border-radius: 0.4rem !important;
          }
        }
        body, html {
          transition: background-color 0.5s, color 0.5s;
          transition-delay: 1.35s;
        }
        
        /* Hide scrollbar but keep scrolling functionality */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Safari and Chrome */
        }
        .our-product-btn:hover span:first-child {
          display: none;
        }
        .our-product-btn:hover::before {
          content: '→';
          display: inline-block;
          margin-right: 0.75rem;
          font-size: 1.25rem;
          color: #1a1a1a;
          font-weight: bold;
          position: relative;
          top: 1px;
        }
        .theme-toggle-btn {
          transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .theme-toggle-icon {
          transition: opacity 0.7s, transform 0.7s;
        }
        .theme-toggle-star {
          transition: opacity 0.7s, transform 0.7s;
        }
        .theme-toggle-icon.delay-200 {
          transition-delay: 0.2s;
        }
        .theme-toggle-icon.delay-0 {
          transition-delay: 0s;
        }
        .theme-toggle-star.delay-300 {
          transition-delay: 0.3s;
        }
        .theme-toggle-star.delay-400 {
          transition-delay: 0.4s;
        }
        .theme-toggle-star.delay-500 {
          transition-delay: 0.5s;
        }
      `}</style>
    </>
  )
} 