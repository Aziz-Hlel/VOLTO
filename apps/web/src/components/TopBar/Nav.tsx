import { useEffect, useState, useCallback, useRef } from "react";
import CardNav, { type CardNavItem, type CardNavProps } from "./YetAnotherBar";

const NavBar619 = () => {
  const [navState, setNavState] = useState({
    isOpen: false,
    lastScrollY: 0,
    isVisible: true,
  });

  const url = "https://voltobahrain.online/";
  const APP_SCHEME = `${url}/mobile/home`;
  const APP_STORE_URL = "https://apps.apple.com/app/id6753715978";
  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.techno.volto";
  const LANDING_PAGE_URL = "https://voltobahrain.online";

  const openAppOrRedirect = (storeUrl: string) => {
    const now = Date.now();
    window.location.href = APP_SCHEME;

    // If app isn't installed, fallback after 1.2s
    setTimeout(() => {
      if (Date.now() - now < 1500) {
        window.location.href = storeUrl;
      }
    }, 1200);
  };

  const handleClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const platform = navigator.platform || "";
    console.log("userAgent = ", userAgent);
    console.log("platform = ", platform);

    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    const isMac = platform.includes("Mac") && !isIOS;

    if (isAndroid) {
      openAppOrRedirect(PLAY_STORE_URL);
    } else if (isIOS || isMac) {
      // macOS users often use iPhones/iPads too, so send them to iOS store
      openAppOrRedirect(APP_STORE_URL);
    } else {
      // Windows/Linux desktops
      window.open(LANDING_PAGE_URL, "_blank");
    }
  };

  const navRef = useRef<HTMLDivElement | null>(null);

  const isDesktop = window.innerWidth >= 1024;

  const navBarItems: CardNavItem[] = [
    {
      label: "",
      bgColor: "#1b1a2f",
      textColor: "#F8F8F8",
      image: isDesktop ? "/img/navbar2/ysar.jpg" : "/img/navbar2/fou9.jpg",
      overlayImage: "/img/navbar2/filler/top.png",
      links: [
        { label: "Home", href: "/", ariaLabel: "Home", type: "Link" },
        { label: "Menu", href: "/menu", ariaLabel: "Menu", type: "Link" },
      ],
    },
    {
      label: "",
      bgColor: "#14122a",
      textColor: "#F8F8F8",
      image: isDesktop ? "img/navbar2/mid.jpg" : "/img/navbar2/wost.jpg",
      overlayImage: "/img/navbar2/filler/middle.png",
      links: [
        { label: "About", href: "/about", ariaLabel: "About", type: "Link" },
        // { label: "Gallery", href: "/gallery", ariaLabel: "Gallery", type: "Link" },
        { label: "Events", href: "/events", ariaLabel: "Events", type: "Link" },
      ],
    },
    {
      label: "",
      bgColor: "#0f0e22",
      textColor: "#F8F8F8",
      image: isDesktop ? "img/navbar2/ymin.jpg" : "/img/navbar2/louta.jpg",
      overlayImage: "/img/navbar2/filler/bottom.png",
      links: [
        // {
        //   label: "Instagram",
        //   href: "https://www.instagram.com/voltobahrain/?hl=en",
        //   ariaLabel: "Instagram",
        //   type: "a",
        // },
        { label: "Book A Table", href: "/reservation", ariaLabel: "Book A Table", type: "Link" },
        { label: "Contact Us", href: "/contact", ariaLabel: "Contact Us", type: "Link" },

        // { label: "Whatsapp", href: "https://wa.me/+97334588466", ariaLabel: "Whatsapp", type: "a" },
      ],
    },
  ];

  // 👇 Gestion du scroll
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    setNavState((prev) => {
      const isScrollingDown = currentScrollY > prev.lastScrollY;
      const isVisible = !isScrollingDown || currentScrollY < 10;

      // ✅ Ferme le menu dès qu'on scroll
      return {
        ...prev,
        lastScrollY: currentScrollY,
        isVisible,
        isOpen: false, // <<< fermeture du menu
      };
    });
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 50);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  // ✅ Fermer le menu si clic à l’extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setNavState((prev) => ({ ...prev, isOpen: false }));
      }
    };

    if (navState.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navState.isOpen]);

  const handleMenuToggle = (isOpen: boolean) => {
    setNavState((prev) => ({ ...prev, isOpen }));
  };

  const navProps: CardNavProps = {
    logo: "/logo_black.png",
    items: navBarItems,
    isOpen: navState.isOpen,
    onMenuToggle: handleMenuToggle,
  };

  const navClasses = `
    fixed top-0 left-0 right-0 z-[99] w-full
    transition-all duration-500 ease-in-out
    ${navState.isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
    bg-transparent
  `;

  return (
    <nav className={navClasses} ref={navRef}>
      <CardNav {...navProps} />
    </nav>
  );
};

export default NavBar619;
