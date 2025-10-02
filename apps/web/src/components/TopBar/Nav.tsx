import { useEffect, useState, useCallback } from "react";
import CardNav, { type CardNavItem, type CardNavProps } from "./YetAnotherBar";

const NavBar619 = () => {
  // Centralized navigation state
  const [navState, setNavState] = useState({
    isOpen: false,
    scrollY: 0,
    lastScrollY: 0,
    isScrollingDown: false,
    isVisible: true,
  });

  const navBarItems: CardNavItem[] = [
    {
      label: "",
      bgColor: "#1b1a2f",
      textColor: "#F8F8F8",
      image: "/img/navbar/home.jpeg",
      links: [
        { label: "Home", href: "/", ariaLabel: "Home", type: "Link" },
        { label: "About", href: "/about", ariaLabel: "About", type: "Link" },
      ],
    },
    {
      label: "",
      bgColor: "#14122a",
      textColor: "#F8F8F8",
      image: "/img/navbar/menu.jpg",
      links: [
        { label: "Menu", href: "/menu", ariaLabel: "Menu", type: "Link" },
        { label: "Gallery", href: "/gallery", ariaLabel: "Gallery", type: "Link" },
        { label: "Events", href: "/events", ariaLabel: "Events", type: "Link" },
      ],
    },
    {
      label: "",
      bgColor: "#0f0e22",
      textColor: "#F8F8F8",
      image: "/img/navbar/contact2.jpeg",
      links: [
        {
          label: "Instagram",
          href: "https://www.instagram.com/voltobahrain/?hl=en",
          ariaLabel: "Instagram",
          type: "a",
        },
        { label: "Whatsapp", href: "https://wa.me/+97334588466", ariaLabel: "Whatsapp", type: "a" },
        { label: "Book A Table", href: "/contact", ariaLabel: "Book A Table", type: "Link" },
      ],
    },
  ];

  // Professional scroll handler with proper throttling
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 100;

    setNavState((prev) => {
      const isScrollingDown =
        currentScrollY > prev.lastScrollY && currentScrollY >= scrollThreshold;
      const shouldHide = isScrollingDown && currentScrollY >= scrollThreshold;

      return {
        ...prev,
        scrollY: currentScrollY,
        lastScrollY: currentScrollY,
        isScrollingDown,
        isVisible: !shouldHide,
        // Auto-close menu when scrolling down
        isOpen: shouldHide ? false : prev.isOpen,
      };
    });
  }, []);

  // Debounced scroll handler for performance
  useEffect(() => {
    let rafId: number;
    let timeoutId: NodeJS.Timeout;

    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        rafId = requestAnimationFrame(handleScroll);
      }, 10);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  // Handle menu toggle from child component
  const handleMenuToggle = useCallback((isOpen: boolean) => {
    setNavState((prev) => ({ ...prev, isOpen }));
  }, []);

  // Professional navbar classes with smooth transitions
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getNavbarClasses = () => {
    const baseClasses =
      "fixed -m-1 top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-in-out";
    const visibilityClasses = navState.isVisible ? "translate-y-0" : "-translate-y-full";

    return `${baseClasses} ${visibilityClasses}`;
  };

  const navProps: CardNavProps = {
    logo: "/logo_black.png",
    items: navBarItems,
    isOpen: navState.isOpen,
    onMenuToggle: handleMenuToggle,
    // Pass scroll state for any scroll-dependent behavior
    scrollState: {
      scrollY: navState.scrollY,
      isScrollingDown: navState.isScrollingDown,
      isVisible: navState.isVisible,
    },
  };

  return (
    <nav
      className={
        "fixed -m-1 top-0 left-0 right-0 z-[99] w-full transition-transform  bg-transparent duration-300 ease-in-out"
      }
    >
      <CardNav {...navProps} />
    </nav>
  );
};

export default NavBar619;
