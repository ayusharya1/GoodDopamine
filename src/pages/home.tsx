
import { HeroSection } from '../components/Home Component/hero-section';

import LogBookSection from '../components/Home Component/log-book-section';
import { FooterSection } from '../components/footer-section';
import { Navigation } from '../components/Navigation';
import { useTheme } from '../components/theme-provider';
import { AboutSection } from '../components/Home Component/about-section';
import CardTheme from '../components/Home Component/CardTheme';

export default function Home() {
  const { theme } = useTheme();
  
  return (
    <div className='max-w-[100vw]'>
      <Navigation />
      <HeroSection theme={theme} />
      {/* <OurThingsSection id="our-things-section" theme={theme} /> */}
      <CardTheme id="our-things-section" theme={theme}/>
      <div className="-mt-[20rem]">
        <AboutSection theme={theme}/>
      </div>
      {/* <AnimatedCard/> */}
      <LogBookSection theme={theme} />
      <FooterSection theme={theme} />
      
    </div>
  );
} 