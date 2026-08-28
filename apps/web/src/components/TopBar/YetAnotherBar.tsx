import { gsap } from "gsap";
import { ArrowUpRight as GoArrowUpRight } from "lucide-react";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AiFillAndroid } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import DownloadApp from "../DownloadApp/DownloadApp";

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
  overlayImage: string;
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
  logoAlt = "Logo",
  items,
  className = " ",
  ease = "power3.out",
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

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        // Create temporary clone to measure without affecting layout
        const clone = contentEl.cloneNode(true) as HTMLElement;
        clone.style.position = "absolute";
        clone.style.visibility = "hidden";
        clone.style.height = "auto";
        clone.style.pointerEvents = "none";

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
    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({
      paused: true,
      onStart: () => setIsAnimating(true),
      onComplete: () => setIsAnimating(false),
      onReverseComplete: () => setIsAnimating(false),
    });

    tl.to(navEl, {
      height: calculateHeight(),
      duration: 0.35, // Reduced from 0.4 to 0.25 for faster animation
      ease,
    });

    tl.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.0, // Reduced from 0.4 to 0.25 for faster animation
        ease,
        stagger: 0.0, // Reduced from 0.08 to 0.05 for faster stagger
      },
      "-=0.1",
    );

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

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [isOpen, createTimeline]);

  // Professional menu toggle handler
  const handleToggleClick = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      // e.preventDefault();
      // e.stopPropagation();

      if (isAnimating) return; // Prevent rapid clicking

      onMenuToggle(!isOpen);
    },
    [isOpen, onMenuToggle, isAnimating],
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        handleToggleClick(e);
      }
      if (e.key === "Escape" && isOpen) {
        onMenuToggle(false);
      }
    },
    [handleToggleClick, isOpen, onMenuToggle],
  );

  // Set card refs with proper cleanup
  const setCardRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      if (el) {
        cardsRef.current[i] = el;
      } else {
        delete cardsRef.current[i];
      }
    },
    [],
  );

  const getPlatform = () => {
    const ua = navigator.userAgent.toLowerCase();

    if (/iphone|ipad|ipod/.test(ua)) return "ios";
    if (/android/.test(ua)) return "android";
    if (/mac os/.test(ua)) return "macos";
    if (/windows|win32/.test(ua)) return "windows";

    return "unknown";
  };

  // Configuration - update with your actual app details
  const APP_CONFIG = {
    ios: {
      appStore: "https://apps.apple.com/app/id6753715978", // Replace with your App Store ID
      deepLink: "https://voltobahrain.online/mobile/",
    },
    android: {
      playStore: "https://play.google.com/store/apps/details?id=com.techno.volto", // Replace with your package name
      deepLink: "https://voltobahrain.online/mobile/",
    },
  };

  const [platform, setPlatform] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPlatform(getPlatform());
  }, []);

  const handleOpenApp = async () => {
    if (!platform || isLoading) return;

    setIsLoading(true);

    try {
      if (platform === "ios") {
        // Try to open the app via deep link
        const deepLinkUrl = APP_CONFIG.ios.deepLink + "home";

        // Set a timeout to redirect to App Store if app doesn't open
        const appNotInstalledTimer = setTimeout(() => {
          window.location.href = APP_CONFIG.ios.appStore;
        }, 2000);

        // Attempt to open the app
        window.location.href = deepLinkUrl;

        // Clear timer if navigation succeeds
        return () => clearTimeout(appNotInstalledTimer);
      } else if (platform === "android") {
        // Android handles this more gracefully with intent
        const deepLinkUrl = APP_CONFIG.android.deepLink + "home";

        // Try deep link first
        const androidTimer = setTimeout(() => {
          window.location.href = APP_CONFIG.android.playStore;
        }, 2000);

        window.location.href = deepLinkUrl;

        return () => clearTimeout(androidTimer);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDesktopRedirect = () => {
    setIsLoading(true);

    if (platform === "macos") {
      window.location.href = APP_CONFIG.ios.appStore;
    } else {
      // Windows, Linux, or unknown - redirect to Android Play Store (or your preference)
      window.location.href = APP_CONFIG.android.playStore;
    }
  };

  const isMobile = platform === "ios" || platform === "android";

  const [openDownloadAppDialog, setOpenDownloadAppDialog] = useState(false);

  return (
    <div
      className={`card-nav-container mx-auto mt-3 w-[90%] max-w-200 z-90 top-[1.2em] md:top-[2em]  ${className}`}
    >
      {openDownloadAppDialog && <DownloadApp closeDialog={() => setOpenDownloadAppDialog(false)} />}

      <nav
        ref={navRef}
        className={`card-nav ${isOpen ? "open" : ""} block  h-15 p-0 rounded-xl bg-white/75 shadow-md relative overflow-hidden will-change-[height]`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-15 flex bg-transparent  items-center mx-2 justify-between p-2 pl-[1.1rem] z-2">
          <div
            className={`hamburger-menu ${isOpen ? "open" : ""} group h-full flex flex-col items-center justify-center cursor-pointer gap-1.5 order-2 md:order-0 transition-opacity duration-200 ${isAnimating ? "pointer-events-none opacity-75" : ""}`}
            onClick={handleToggleClick}
            onKeyDown={handleKeyDown}
            role="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            tabIndex={0}
            style={{ color: menuColor || "#000" }}
          >
            <div
              className={`hamburger-line w-7.5 h-0.5 bg-current text-black transition-transform duration-300 ease-in-out origin-[50%_50%] ${
                isOpen ? "translate-y-1 rotate-45" : ""
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-7.5 h-0.5 bg-current text-black transition-transform duration-300 ease-in-out origin-[50%_50%] ${
                isOpen ? "-translate-y-1 -rotate-45" : ""
              } group-hover:opacity-75`}
            />
          </div>

          <Link
            className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-0"
            to={"/"}
          >
            <img src={logo} alt={logoAlt} className="logo h-24 md:h-26" />
            {/* <span className="text-3xl font-sans font-heading">VOLTO</span>    */}
          </Link>

          <button
            type="button"
            className="card-nav-cta-button hidden md:inline-flex md:justify-center md:items-center border-0 rounded-[calc(0.75rem-0.2rem)] px-4 h-full font-medium cursor-pointer transition-colors duration-300 bg-black/85 text-white hover:bg-black/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            aria-label="Get mobile app"
            onClick={() => setOpenDownloadAppDialog(true)}
          >
            Get App
          </button>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-15 bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-1 ${
            isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-3`}
          aria-hidden={!isOpen}
        >
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={`nav-card-${idx}`}
              className="nav-card select-none  relative flex flex-col gap-2 p-[8px_12px] text-white rounded-sm min-w-0 flex-[1_1_auto] h-auto min-h-10 md:h-full md:min-h-0 md:flex-[1_1_0%] md:p-[12px_16px]"
              ref={setCardRef(idx)}
            >
              {/* Background image */}
              <div
                className="absolute  bg-cover bg-center -z-10 inset-0"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              <div
                className="absolute bg-cover z-20 bg-center opacity-10 pointer-events-none inset-0"
                style={{ backgroundImage: `url(${item.overlayImage})` }}
              />

              <div className="absolute  bg-cover bg-black/25 -z-10 rounded-sm inset-0"></div>

              {item.label && (
                <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
                  {item.label}
                </div>
              )}
              {/* <div className=' w-full h-full absolute  bg-black'></div> */}
              <div className="nav-card-links mt-auto flex flex-col gap-0.5">
                {item.links?.map((lnk, i) => {
                  if (lnk.type === "a")
                    return (
                      <a
                        key={`link-${idx}-${i}`}
                        className="group nav-card-link inline-flex items-center gap-1.5 no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 focus:opacity-75 focus:outline-none text-[15px] md:text-[16px]"
                        href={lnk.href}
                        aria-label={lnk.ariaLabel}
                        onClick={handleToggleClick}
                        target={lnk.href.startsWith("http") ? "_blank" : undefined}
                        rel={lnk.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        <GoArrowUpRight
                          className="nav-card-link-icon shrink-0 group-hover:rotate-45 transition-all duration-500 ease-in-out"
                          aria-hidden="true"
                        />
                        {lnk.label}
                      </a>
                    );
                  if (lnk.type === "Link")
                    return (
                      <Link
                        key={`link-${idx}-${i}`}
                        className="group nav-card-link inline-flex items-center gap-1.5 no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 focus:opacity-75 focus:outline-none text-[15px] md:text-[16px]"
                        to={lnk.href}
                        onClick={handleToggleClick}
                        aria-label={lnk.ariaLabel}
                      >
                        <GoArrowUpRight
                          className="nav-card-link-icon shrink-0 group-hover:rotate-45 transition-all duration-500 ease-in-out"
                          aria-hidden="true"
                        />
                        {lnk.label}
                        {lnk.label === "Membership " ? (
                          <svg
                            className=" size-8 opacity-100"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 511.984 511.984"
                            xmlSpace="preserve"
                            fill="#000"
                          >
                            <path
                              fill="#ffc43e"
                              d="M511.984 255.992L473.188 197.791 477.688 127.996 414.987 96.981 383.988 34.296 314.193 38.795 255.992 0 197.806 38.795 127.996 34.296 96.997 96.981 34.31 127.996 38.81 197.791 0 255.992 38.81 314.178 34.31 383.988 96.997 414.987 127.996 477.674 197.806 473.174 255.992 511.984 314.193 473.174 383.988 477.674 415.003 414.987 477.688 383.988 473.188 314.178z"
                            />
                            <g fill="#fff">
                              <path d="M160.292 283.663L122.324 221.852 101.715 221.852 101.715 314.115 121.293 314.115 121.293 252.18 159.526 314.115 179.744 314.115 179.744 221.852 160.292 221.852z" />
                              <path d="M224.962 274.46L270.069 274.46 270.069 258.523 224.962 258.523 224.962 238.43 274.085 238.43 274.085 221.852 204.868 221.852 204.868 314.115 274.991 314.115 274.991 297.147 224.962 297.147z" />
                              <path d="M390.331 221.852L375.035 285.35 359.083 221.852 340.036 221.852 323.833 284.569 309.068 221.852 288.71 221.852 313.209 314.115 333.817 314.115 349.364 251.133 365.177 314.115 385.394 314.115 410.284 221.852z" />
                            </g>
                          </svg>
                        ) : null}
                      </Link>
                    );
                })}
              </div>
            </div>
          ))}
          <div className=" w-full grid grid-cols-2 justify-center items-center gap-2  text-white text-center text-md   md:hidden ">
            <a
              href="https://apps.apple.com/app/id6753715978"
              className="bg-black/85 rounded-md flex items-center  justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaApple className=" text-white h-8  " />
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.techno.volto"
              className="bg-black/85 rounded-md flex items-center  justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillAndroid className=" text-white h-8  " />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
