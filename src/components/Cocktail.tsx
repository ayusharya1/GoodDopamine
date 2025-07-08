import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


// Register GSAP plugin
if (typeof window !== 'undefined' && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const unsplashImages = [
  // 'https://plus.unsplash.com/premium_photo-1682689573723-21b223d6874a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 'https://plus.unsplash.com/premium_photo-1681126366686-d1aeeeb76481?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  // 'https://plus.unsplash.com/premium_photo-1700482758020-6332a298ad09?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1682785300986-c3cdb1ac784b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1682124680071-1cb26719c541?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1682124802983-594778066eb5?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1633876841461-772d2b0b0e39?q=80&w=831&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const initialClipPaths = [
  'polygon(5% 2%, 98% 0%, 100% 98%, 0% 100%)',
  'polygon(0% 0%, 100% 5%, 95% 100%, 5% 95%)',
  'polygon(10% 0%, 90% 10%, 100% 90%, 0% 100%)',
  'polygon(0% 10%, 100% 0%, 90% 100%, 10% 90%)',
];

const targetClipPaths = [
  'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
  'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  'polygon(0% 0%, 100% 10%, 90% 100%, 10% 90%)',
  'polygon(5% 5%, 95% 0%, 100% 95%, 0% 100%)',
];

const cardWidths = ['35vw', '35vw', '28vw', '35vw'];
const cardHeights = ['40vh', '50vh', '75vh', '75vh'];
const cardPositions = [
  { top: '0', left: '10vw' },         // Card 1: top left
  { top: '68vh', right: '8vw' },    // Card 2: further down, right
  { bottom: '95vh', left: '10vw' }, // Card 3: bottom left
  { bottom: '0vh', right: '15vw' },   // Card 4: bottom right
];

const Cocktail = () => {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      gsap.to(ref, {
        clipPath: targetClipPaths[idx],
        scrollTrigger: {
          trigger: ref,
          start: 'center center',
          end: 'center center+=300',
          scrub: true,
        },
        ease: 'power1.inOut',
      });
    });
  }, []);

  return (
    <section id="cocktails" className="relative min-h-screen w-full bg-transparent ">
      <div
        className="relative w-full flex flex-col items-center lg:block"
        style={{ minHeight: '300vh', height: '320vh' }}
      >
        {unsplashImages.map((img, idx) => (
          <div
            key={idx}
            ref={el => { if (el) cardRefs.current[idx] = el; }}
            className={
              `cocktail-card rounded-2xl shadow-2xl bg-white overflow-hidden absolute
              hidden lg:block
              ` +
              // Responsive: show as flex column on mobile/tablet
              `lg:absolute lg:rounded-2xl lg:shadow-2xl lg:bg-white lg:overflow-hidden `
            }
            style={{
              width: cardWidths[idx],
              height: cardHeights[idx],
              ...cardPositions[idx],
              clipPath: initialClipPaths[idx],
              transition: 'clip-path 0.8s',
            }}
          >
            <img
              src={img}
              alt={`Card ${idx + 1}`}
              className="w-full h-full object-cover"
              style={{ clipPath: 'inherit' }}
            />
          </div>
        ))}
        {/* Responsive cards for mobile/tablet */}
        <div className="w-full flex flex-col gap-12 items-center lg:hidden pt-8 pb-16">
          {unsplashImages.map((img, idx) => (
            <div
              key={idx}
              className="rounded-xl shadow-lg bg-white overflow-hidden w-[95vw] h-[85vh] max-w-none flex-shrink-0"
              style={{ minHeight: '400px', maxHeight: 'none' }}
            >
              <img
                src={img}
                alt={`Card ${idx + 1}`}
                className="w-full h-full object-cover"
                style={{}} // No clipPath for mobile
              />
            </div>
          ))}
        </div>
      </div>
     
    </section>
  );
};

export default Cocktail;