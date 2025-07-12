import React, { useMemo } from 'react';
import { useTheme } from '../components/theme-provider';
import { Navigation } from '../components/Navigation';
import { FooterSection } from '../components/footer-section';

const NUM_STARS = 12;



const Privacy: React.FC = () => {
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
          className={`privacy-hero group relative flex flex-col mt-16 items-center justify-center min-h-[50vh] w-[80vw] place-self-center rounded-3xl relative z-10 overflow-hidden logbook-main-content ${theme === 'dark' ? 'text-[#C8CCFB]' : ''}`}
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'background-size 0.5s cubic-bezier(0.4,0,0.2,1)',
            // backgroundColor: theme === 'dark' ? '#0F0E16' : '#0066FD',
          }}
        >
          <h1
            className={`text-[80px] font-normal text-center ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#185B8C]'}`}
            style={{
              fontFamily: 'Roobert, sans-serif',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              bottom: '43%',
              padding: '0 1rem',
              fontSize: 'clamp(2.5rem, 12vw, 5rem)',
              textAlign: 'center',
            }}
          >
            Privacy
          </h1>
          <p
            className={`text-lg ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#185B8C]'} text-center`}
            style={{
              fontFamily: 'Roobert, sans-serif',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              bottom: '7%',
              padding: '0 1rem',
              fontSize: 'clamp(1rem, 4vw, 1.25rem)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            You're not the product. <span className="block">But your behavior might help make the product better — for you and everyone else.</span>
          </p>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1 mt-[2rem]">
            <div className={`w-full max-w-3xl mx-auto flex flex-col gap-6 items-start text-left ${theme === 'dark' ? 'text-[#CBCFFF]' : ''}`}>
              {/* <p className={`text-lg pl-3 ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#185B8C]'}`} style={{fontFamily: 'Roobert, sans-serif'}}>You're not the product. But your behavior might help make the product better — for you and everyone else.</p> */}
              <p className={`text-base  pl-3 ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#185B8C]'}`} style={{fontFamily: 'Roobert, sans-serif'}}>We're building something big: a Behavioral AI that helps you act on what you truly want, not what distracts you.<br/>To do that, we study patterns. Quietly. Respectfully. And only the ones that matter.</p>
              <div className={`flex flex-col gap-4 text-left max-w-2xl items-start ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#185B8C]'}`}>
                <div className={`${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#185B8C]'}`}>
                  <span className="text-2xl mr-2">✨</span>
                  <span className="font-semibold ">What we do track</span>
                  <ul className="list-disc ml-8 mt-1 ">
                    <li>What you block (and when you try to sneak past it 👀)</li>
                    <li>How often you follow through or drift</li>
                    <li>Who you sent $1 to (we don't judge)</li>
                    <li>Anonymous trends that help us train smarter nudges</li>
                    <li>We don't want your secrets. Just your scroll stats.</li>
                  </ul>
                </div>
                <div>
                  <span className="text-2xl mr-2">🔒</span>
                  <span className="font-semibold ">What we never track</span>
                  <ul className="list-disc ml-8 mt-1 ">
                    <li>No messages, photos, or private files</li>
                    <li>No creepy camera or mic access</li>
                    <li>No selling your identity to weird ad companies<br/>(We're building Good Dopamine, not Bad Vibes Inc.)</li>
                  </ul>
                </div>
                <div>
                  <span className="text-2xl mr-2">💡</span>
                  <span className="font-semibold ">Why we track at all</span>
                  <ul className="list-disc ml-8 mt-1 ">
                    <li>Because we're training a cognitive alignment engine — AI that helps Future You win.</li>
                    <li>It learns from behavior patterns, personalizes nudges, detects early drift, and speaks up at the right time.</li>
                    <li>And yes — we might share anonymized, aggregate insights one day to support our mission.<br/>But your personal info?<br/>Never touched. Never sold. Never weird.</li>
                    <li>No, your name's not going into some evil attention-harvesting black hole.<br/>It's staying in your control.</li>
                  </ul>
                </div>
                <div>
                  <span className="text-2xl mr-2">🧘</span>
                  <span className="font-semibold ">You're in control</span>
                  <ul className="list-disc ml-8 mt-1 ">
                    <li>Want to delete your data? Pause tracking? Disappear entirely?<br/>Email <a href="mailto:gooddopamines@gmail.com" className="underline">gooddopamines@gmail.com</a></li>
                    <li>No drama. No "Are you sure?" guilt trips. Just freedom.</li>
                  </ul>
                </div>
              </div>
              <div className={`mt-8 text-base text-left w-full pl-3 ${theme === 'dark' ? 'text-[#CBCFFF]' : 'text-[#185B8C]'}`} style={{fontFamily: 'Roobert, sans-serif'}}>
                <strong>TL;DR</strong><br/>
                Your identity stays yours.<br/>
                Your behavior helps us help you (and maybe others too).<br/>
                We track signal, not secrets.<br/>
                We don't sell, overshare, or snoop your personally identifiable information. (uff.. what a long word.)<br/>
                <br/>
                We're building the future of aligned AI.<br/>
                You're part of it.<br/>
                <br/>
                Good vibes only. Good Dopamine always.<br/>
                <br/>
                Let's make tech feel good again.
              </div>
            </div>
          </div>
          {/* Log Cards Grid */}
          {/* Horizontal Timeline Cards */}
          <section
            className="space-y-4 px-[2rem] relative z-10 w-full rounded-t-[6.5rem] rounded-b-[6.5rem]"
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
           
          </section>
        </div>
        {/* --- LOG GRID SECTION END --- */}
        <FooterSection theme={theme} />
        
        {/* Responsive styles */}
        <style>{`
          @media (max-width: 768px) {
            .privacy-hero h1 {
              left: 50% !important;
              transform: translateX(-50%) !important;
              text-align: center !important;
              width: 100% !important;
              padding: 0 1rem !important;
            }
            
            .privacy-hero p {
              left: 50% !important;
              transform: translateX(-50%) !important;
              text-align: center !important;
              width: 90% !important;
              padding: 0 1rem !important;
              margin: 0 !important;
            }
          }
          
          @media (max-width: 480px) {
            .privacy-hero h1 {
              font-size: 5rem !important;
              padding: 0 0.75rem !important;
            }
            
            .privacy-hero p {
              font-size: 1rem !important;
              width: 95% !important;
              padding: 0 0.5rem !important;
            }
          }
          
          @media (max-width: 360px) {
            .privacy-hero h1 {
              font-size: 4.5rem !important;
              padding: 0 0.5rem !important;
            }
            
            .privacy-hero p {
              font-size: 0.875rem !important;
              width: 100% !important;
              padding: 0 0.25rem !important;
            }
          }
        `}</style>
      </div>
    );
};

export default Privacy;
