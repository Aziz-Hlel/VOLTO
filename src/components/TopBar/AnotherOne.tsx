import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Note: In a real project, you'd install framer-motion with: npm install framer-motion
// For this demo, we'll simulate the motion effects with CSS transitions


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrollingDown, setIsScrollingDown] = useState(false);

    const menuItems2 = [
        { name: "Home", path: "/" },
        { name: "Menu", path: "/menu" },
        { name: "About", path: "/about" },
        { name: "Gallery", path: "/gallery" },
        { name: "Events", path: "/events" },
        { name: "Contact", path: "/contact" },
    ]

    // Professional scroll handling with throttling
    useEffect(() => {
        let ticking = false;

        const updateScrollPosition = () => {
            const currentScrollY = window.scrollY;

            setScrollY(currentScrollY);

            // Determine scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsScrollingDown(true);
            } else {
                setIsScrollingDown(false);
            }

            setLastScrollY(currentScrollY);
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Dynamic navbar styling based on scroll position
    const getNavbarClasses = () => {
        const baseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out";

        // Hide/show based on scroll direction (mobile and desktop)
        const visibilityClasses = isScrollingDown && scrollY > 100 ? "-translate-y-full" : "translate-y-0";

        // Background styling - different for mobile vs desktop
        let backgroundClasses;
        if (scrollY === 0) {
            // At top: transparent on mobile, semi-transparent on desktop
            backgroundClasses = "bg-transparent  md:backdrop-blur-xs md:border-b md:border-gray-200";
        } else {
            // Scrolled: black/dark on mobile, white on desktop
            backgroundClasses = "bg-black/90 md:bg-white/90 backdrop-blur-md border-b border-gray-200/20 md:border-gray-200";
        }

        return `${baseClasses} ${visibilityClasses} ${backgroundClasses}`;
    };


    const mediaItems = [
        {
            media: "Facebook",
            icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className=' w-full h-full' viewBox="0 0 48 48">
                <linearGradient id="awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1" x1="6.228" x2="42.077" y1="4.896" y2="43.432" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0d61a9"></stop><stop offset="1" stop-color="#16528c"></stop></linearGradient><path fill="url(#awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1)" d="M42,40c0,1.105-0.895,2-2,2H8c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h32	c1.105,0,2,0.895,2,2V40z"></path><path d="M25,38V27h-4v-6h4v-2.138c0-5.042,2.666-7.818,7.505-7.818c1.995,0,3.077,0.14,3.598,0.208	l0.858,0.111L37,12.224L37,17h-3.635C32.237,17,32,18.378,32,19.535V21h4.723l-0.928,6H32v11H25z" opacity=".05"></path><path d="M25.5,37.5v-11h-4v-5h4v-2.638c0-4.788,2.422-7.318,7.005-7.318c1.971,0,3.03,0.138,3.54,0.204	l0.436,0.057l0.02,0.442V16.5h-3.135c-1.623,0-1.865,1.901-1.865,3.035V21.5h4.64l-0.773,5H31.5v11H25.5z" opacity=".07"></path><path fill="#fff" d="M33.365,16H36v-3.754c-0.492-0.064-1.531-0.203-3.495-0.203c-4.101,0-6.505,2.08-6.505,6.819V22h-4v4	h4v11h5V26h3.938l0.618-4H31v-2.465C31,17.661,31.612,16,33.365,16z"></path>
            </svg>,
            href: "#",
        },

        {
            media: "Instagram",
            icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className=' w-full h-full' viewBox="0 0 48 48">
                <radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"></stop><stop offset=".328" stop-color="#ff543f"></stop><stop offset=".348" stop-color="#fc5245"></stop><stop offset=".504" stop-color="#e64771"></stop><stop offset=".643" stop-color="#d53e91"></stop><stop offset=".761" stop-color="#cc39a4"></stop><stop offset=".841" stop-color="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"></stop><stop offset=".999" stop-color="#4168c9" stop-opacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
            </svg>,
            href: "#",
        },
        {
            media: "TikTok",
            icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className=' w-full h-full' viewBox="0 0 48 48">
                <linearGradient id="dYJkfAQNfP2dCzgdw4ruIa_fdfLpA6fsXN2_gr1" x1="23.672" x2="23.672" y1="6.365" y2="42.252" gradientTransform="translate(.305 -.206)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4c4c4c"></stop><stop offset="1" stop-color="#343434"></stop></linearGradient><path fill="url(#dYJkfAQNfP2dCzgdw4ruIa_fdfLpA6fsXN2_gr1)" d="M40.004,41.969L8.031,42c-1.099,0.001-1.999-0.897-2-1.996L6,8.031	c-0.001-1.099,0.897-1.999,1.996-2L39.969,6c1.099-0.001,1.999,0.897,2,1.996L42,39.969C42.001,41.068,41.103,41.968,40.004,41.969z"></path><path fill="#ec407a" fill-rule="evenodd" d="M29.208,20.607c1.576,1.126,3.507,1.788,5.592,1.788v-4.011	c-0.395,0-0.788-0.041-1.174-0.123v3.157c-2.085,0-4.015-0.663-5.592-1.788v8.184c0,4.094-3.321,7.413-7.417,7.413	c-1.528,0-2.949-0.462-4.129-1.254c1.347,1.376,3.225,2.23,5.303,2.23c4.096,0,7.417-3.319,7.417-7.413V20.607L29.208,20.607z M30.657,16.561c-0.805-0.879-1.334-2.016-1.449-3.273v-0.516h-1.113C28.375,14.369,29.331,15.734,30.657,16.561L30.657,16.561z M19.079,30.832c-0.45-0.59-0.693-1.311-0.692-2.053c0-1.873,1.519-3.391,3.393-3.391c0.349,0,0.696,0.053,1.029,0.159v-4.1	c-0.389-0.053-0.781-0.076-1.174-0.068v3.191c-0.333-0.106-0.68-0.159-1.03-0.159c-1.874,0-3.393,1.518-3.393,3.391	C17.213,29.127,17.972,30.274,19.079,30.832z" clip-rule="evenodd"></path><path fill="#fff" fill-rule="evenodd" d="M28.034,19.63c1.576,1.126,3.507,1.788,5.592,1.788v-3.157	c-1.164-0.248-2.194-0.856-2.969-1.701c-1.326-0.827-2.281-2.191-2.561-3.788h-2.923V28.79c-0.007,1.867-1.523,3.379-3.393,3.379	c-1.102,0-2.081-0.525-2.701-1.338c-1.107-0.558-1.866-1.705-1.866-3.029c0-1.873,1.519-3.391,3.393-3.391	c0.359,0,0.705,0.056,1.03,0.159v-3.19c-4.024,0.083-7.26,3.369-7.26,7.411c0,2.018,0.806,3.847,2.114,5.183	c1.18,0.792,2.601,1.254,4.129,1.254c4.096,0,7.417-3.319,7.417-7.413L28.034,19.63L28.034,19.63z" clip-rule="evenodd"></path><path fill="#81d4fa" fill-rule="evenodd" d="M33.626,18.262v-0.854c-1.05,0.002-2.078-0.292-2.969-0.848	C31.445,17.423,32.483,18.018,33.626,18.262z M28.095,12.772c-0.027-0.153-0.047-0.306-0.061-0.461v-0.516h-4.036v16.019	c-0.006,1.867-1.523,3.379-3.393,3.379c-0.549,0-1.067-0.13-1.526-0.362c0.62,0.813,1.599,1.338,2.701,1.338	c1.87,0,3.386-1.512,3.393-3.379V12.772H28.095z M21.635,21.38v-0.909c-0.337-0.046-0.677-0.069-1.018-0.069	c-4.097,0-7.417,3.319-7.417,7.413c0,2.567,1.305,4.829,3.288,6.159c-1.308-1.336-2.114-3.165-2.114-5.183	C14.374,24.749,17.611,21.463,21.635,21.38z" clip-rule="evenodd"></path>
            </svg>,
            href: "#",
        },

    ];


    return (
        <>
            {/* Navbar */}
            <nav className={getNavbarClasses()}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0">
                            <span className={`text-xl font-bold transition-colors duration-300`}>
                                <img src="/logo.png" alt="" className=' w-20' />
                            </span>
                        </Link>

                        {/* Desktop Menu (hidden on mobile) */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {menuItems2.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.path}
                                        className={`hover:text-opacity-80 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className={`relative inline-flex items-center justify-center p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/20 transition-all duration-200`}
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {/* Hamburger icon */}
                                <div className="w-6 h-6 relative">
                                    <span
                                        className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-0'
                                            }`}
                                    />
                                    <span
                                        className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out translate-y-2 ${isOpen ? 'opacity-0' : 'opacity-100'
                                            }`}
                                    />
                                    <span
                                        className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out translate-y-4 ${isOpen ? '-rotate-45 -translate-y-2.5' : 'translate-y-0'
                                            }`}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                    onClick={toggleMenu}
                />

                {/* Menu panel */}
                <div
                    className={`absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 transform transition-all duration-300 ease-out ${isOpen
                        ? 'translate-y-0 opacity-100 scale-100'
                        : '-translate-y-4 opacity-0 scale-95'
                        }`}
                >
                    <div className="px-6 py-6">
                        <div className="space-y-1">
                            {menuItems2.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className={`block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] ${isOpen ? 'animate-fade-in-up' : ''
                                        }`}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        animationFillMode: 'both'
                                    }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className=' flex justify-between mx-auto w-1/2 p-4 '>

                        {mediaItems.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center h-10 font-medium transition-colors duration-200 hover:bg-gray-200"
                            >
                           
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>



            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
      `}</style>
        </>
    );
};

export default Navbar;