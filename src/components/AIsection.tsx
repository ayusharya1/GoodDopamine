import Cocktail from './Cocktail';
import cubeVideoWebm from '../assets/cubebg.webm';
// import cubeVideoMp4 from '../assets/cubi.mp4';

export default function AIsection(props: { theme?: 'light' | 'dark' }) {
  const theme = props.theme || 'light';
  // Define background and text color for dark mode
  // const darkBg = 'bg-gradient-to-b from-[#4952b0] via-[#181a3a] to-[#23244a]';
  const darkBg='bg-[#DFDFF2]';
  const lightBg = 'bg-[#DFDFF2]';
  const mainTextColor = theme === 'dark' ? '#1E3A8A' : '#1E3A8A';

  return (
    <div
      className={`pt-[30rem] pb-[12rem] relative ${theme === 'dark' ? darkBg : lightBg} rounded-t-[2rem] aiSection w-full min-h-[510vh] md:pt-[18rem] md:pb-[8rem] md:min-h-[300vh] sm:pt-[8rem] sm:pb-[4rem] sm:min-h-[120vh]`}
      style={{
        position: 'relative',
        minHeight: '510vh',
        width: '99vw',
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
        className="AIsection-bgtext absolute top-0 left-0 w-full flex justify-between items-start px-[2vw] pt-[2vw] z-10 select-none pointer-events-none text-[16vw] md:text-[10vw] sm:text-[6vw] font-extrabold leading-none"
        style={{fontFamily: 'Impact, Roobert, Arial Black, sans-serif', letterSpacing: '0.06em', color: mainTextColor, opacity: 1}}
      >
        <div className="flex flex-col px-[1vw] pt-[2vw]">
          <span className='lg:text-[18rem]'>AI</span>
          <span className="font-mono font-normal mt-1 text-[2vw] md:text-[1.5vw] sm:text-[3vw]" style={{fontWeight: 400, letterSpacing: '-0.05em', color: mainTextColor}}>Built to serve your long-term goals</span>
        </div>
        {/* <div className="font-mono font-normal text-[14px] mt-4 text-[#1E3A8A] text-center" style={{fontWeight: 400, fontSize: 14, marginTop: 8, letterSpacing: 0}}>
          ANCIENT RITES TO<br />CHANNEL, DIVIDE AND FORM
        </div> */}
        <div className="flex flex-col px-[2] items-end mt-[12rem] md:mt-[12rem] sm:mt-[2rem] font-extrabold leading-none text-[16vw] md:text-[10vw] sm:text-[6vw]" style={{fontFamily: 'Impact, Roobert, Arial Black, sans-serif', letterSpacing: '-0.01em', color: mainTextColor, opacity: 1}}>
          <span className='lg:text-[16rem]'>ALIGNMENT</span>
        </div>
      </div>

      {/* Sticky Centered Cube Video */}
      <div className="AIsection-video sticky top-1/2 -translate-y-1/2 flex justify-center items-center z-40 pointer-events-none w-full max-w-[600px] md:max-w-[90vw] sm:max-w-[98vw] mx-auto">
        <video
          muted
          playsInline
          preload="auto"
          autoPlay
          loop
          className="w-full h-auto max-h-[70vh] object-contain"
        >
          <source src={cubeVideoWebm} type="video/webm" />
          {/* <source src={cubeVideoMp4} type="video/mp4" /> */}
          
        </video>
      </div>

      {/* Bottom Right PILLAR Text */}
      <div
        className="AIsection-pillartxt flex flex-col items-end px-[2vw] pb-[2vw] z-10 select-none pointer-events-none -mt-[22rem] md:-mt-[10rem] sm:-mt-[4rem] text-[20vw] md:text-[7vw] sm:text-[6vw] font-extrabold leading-none"
        style={{fontFamily: 'Impact, Roobert, Arial Black, sans-serif', letterSpacing: '-0.01em', color: mainTextColor, opacity: 1}}
      >
        <span className='lg:text-[18rem]'>ENGINE</span>
        <span className="font-mono font-normal mt-1 text-[3vw] md:text-[2vw] sm:text-[4vw]" style={{fontFamily: 'monospace', fontWeight: 400, color: mainTextColor}}>Not Your Impulses</span>
      </div>

      {/* Section Content */}
      <Cocktail />
    </div>
  );
}