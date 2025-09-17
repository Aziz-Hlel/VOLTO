import React, { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight as GoArrowUpRight } from 'lucide-react';
import { FaApple } from 'react-icons/fa';
import { AiFillAndroid } from 'react-icons/ai';
import { Link } from 'react-router-dom';


type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
  type: "Link" | "a";
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  image: string;
  links: CardNavLink[];
};

type ScrollState = {
  scrollY: number;
  isScrollingDown: boolean;
  isVisible: boolean;
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  // Controlled component props
  isOpen: boolean;
  onMenuToggle: (isOpen: boolean) => void;
  scrollState?: ScrollState;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = ' ',
  ease = 'power3.out',
  menuColor,
  buttonBgColor,
  buttonTextColor,
  isOpen,
  onMenuToggle,
}) => {
  // Local state for animation only
  const [isAnimating, setIsAnimating] = React.useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Professional height calculation with proper DOM measurement
  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 260; // Keep original desktop height

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        // Create temporary clone to measure without affecting layout
        const clone = contentEl.cloneNode(true) as HTMLElement;
        clone.style.position = 'absolute';
        clone.style.visibility = 'hidden';
        clone.style.height = 'auto';
        clone.style.pointerEvents = 'none';
        
        document.body.appendChild(clone);
        const height = Math.max(140, 60 + clone.scrollHeight + 16 - 60); // Reduced mobile height by 60px
        document.body.removeChild(clone);
        
        return height;
      }
    }
    return 260; // Keep original desktop height
  }, []);

  // Create timeline with proper cleanup
  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;

    // Kill existing timeline
    if (tlRef.current) {
      tlRef.current.kill();
    }

    // Set initial states
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ 
      paused: true,
      onStart: () => setIsAnimating(true),
      onComplete: () => setIsAnimating(false),
      onReverseComplete: () => setIsAnimating(false)
    });

    tl.to(navEl, {
      height: calculateHeight(),
      duration: 0.35, // Reduced from 0.4 to 0.25 for faster animation
      ease
    });

    tl.to(cardsRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 0.0, // Reduced from 0.4 to 0.25 for faster animation
      ease, 
      stagger: 0.0 // Reduced from 0.08 to 0.05 for faster stagger
    }, '-=0.1');

    return tl;
  }, [ease, calculateHeight]);

  // Initialize timeline
  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [createTimeline]);

  // Handle controlled menu state changes
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl || isAnimating) return;

    if (isOpen) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [isOpen, isAnimating]);

  // Handle resize with proper debouncing
  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (!tlRef.current) return;

        const newTl = createTimeline();
        if (newTl) {
          if (isOpen) {
            newTl.progress(1);
          }
          tlRef.current = newTl;
        }
      }, 150); // Debounce resize events
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [isOpen, createTimeline]);

  // Professional menu toggle handler
  const handleToggleClick = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    // e.preventDefault();
    // e.stopPropagation();
    
    if (isAnimating) return; // Prevent rapid clicking
    
    onMenuToggle(!isOpen);
  }, [isOpen, onMenuToggle, isAnimating]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleToggleClick(e);
    }
    if (e.key === 'Escape' && isOpen) {
      onMenuToggle(false);
    }
  }, [handleToggleClick, isOpen, onMenuToggle]);

  // Set card refs with proper cleanup
  const setCardRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    if (el) {
      cardsRef.current[i] = el;
    } else {
      delete cardsRef.current[i];
    }
  }, []);

  return (
    <div className={`card-nav-container mx-auto mt-3 w-[90%] max-w-[800px] z-[90] top-[1.2em] md:top-[2em]  ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isOpen ? 'open' : ''} block  h-[60px] p-0 rounded-xl bg-white/75 shadow-md relative overflow-hidden will-change-[height]`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex bg-transparent  items-center mx-2 justify-between p-2 pl-[1.1rem] z-[2]">
          <div
            className={`hamburger-menu ${isOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none transition-opacity duration-200 ${isAnimating ? 'pointer-events-none opacity-75' : ''}`}
            onClick={handleToggleClick}
            onKeyDown={handleKeyDown}
            role="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            tabIndex={0}
            style={{ color: menuColor || '#000' }}
          >
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current text-black transition-transform duration-300 ease-in-out [transform-origin:50%_50%] ${
                isOpen ? 'translate-y-[4px] rotate-45' : ''
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current text-black transition-transform duration-300 ease-in-out [transform-origin:50%_50%] ${
                isOpen ? '-translate-y-[4px] -rotate-45' : ''
              } group-hover:opacity-75`}
            />
          </div>

          <Link className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none" 
          to={'/'}
                    >
            <img src={logo} alt={logoAlt} className="logo h-32" />
            {/* <span className="text-3xl font-sans font-heading">VOLTO</span>    */}
          </Link>

          <button
            type="button"
            className="card-nav-cta-button hidden md:inline-flex md:justify-center md:items-center border-0 rounded-[calc(0.75rem-0.2rem)] px-4 h-full font-medium cursor-pointer transition-colors duration-300 bg-black/85 text-white hover:bg-black/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            aria-label="Get mobile app"
          >
            Get App
          </button>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isOpen}
        >
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={`nav-card-${idx}`}
              className="nav-card select-none  relative flex flex-col gap-2 p-[8px_12px] text-white rounded-sm min-w-0 flex-[1_1_auto] h-auto min-h-[40px] md:h-full md:min-h-0 md:flex-[1_1_0%] md:p-[12px_16px]"
              ref={setCardRef(idx)}
              
              style={{ backgroundImage: `url(${item.image})`,backgroundSize: 'cover' }}
            >
                <div className="absolute inset-0 bg-black/25 -z-10 rounded-sm" ></div>

              {item.label && (
                <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
                  {item.label}
                </div>
              )}
              {/* <div className=' w-full h-full absolute  bg-black'></div> */}
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => 
             {  if(lnk.type==="a") return   <a
                    key={`link-${idx}-${i}`}
                    className="group nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 focus:opacity-75 focus:outline-none text-[15px] md:text-[16px]"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                      onClick={handleToggleClick}
                    target={lnk.href.startsWith('http') ? '_blank' : undefined}
                    rel={lnk.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <GoArrowUpRight className="nav-card-link-icon shrink-0 group-hover:rotate-45 transition-all duration-500 ease-in-out" aria-hidden="true" />
                    {lnk.label}
                  </a>
                if(lnk.type==="Link") return  <Link
                                    key={`link-${idx}-${i}`}
                    className="group nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 focus:opacity-75 focus:outline-none text-[15px] md:text-[16px]"
                    to={lnk.href}
                     onClick={handleToggleClick}
                    aria-label={lnk.ariaLabel}
                  >
                    <GoArrowUpRight className="nav-card-link-icon shrink-0 group-hover:rotate-45 transition-all duration-500 ease-in-out" aria-hidden="true" />
                    {lnk.label}

                </Link>
                }
                )}
              </div>
            </div>
          ))}
          <div className=' w-full flex justify-center items-center gap-2  text-white text-md  bg-black/85 rounded-md md:hidden '>
            Get App 
            <FaApple className=' text-white h-8  ' />
            <AiFillAndroid className=' text-white h-8  ' />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CardNav;