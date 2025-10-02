import { useEffect, useState } from "react";

export default function NavbarWithScrollTop() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      {showTopBtn && (
        <div
          className="fixed bottom-6 right-6 w-[50px] h-[50px] rounded-full bg-[#C19D60] flex items-center justify-center cursor-pointer z-50 shadow-md"
          onClick={scrollToTop}
        >
          <svg className="w-[30px] h-[30px] text-white" viewBox="-1 -1 102 102">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            />
          </svg>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-[1140px] mx-auto px-4 flex justify-between items-center py-4">
          {/* Logo */}
          <a href="index.html" className="flex items-center gap-2">
            <img src="img/logo.png" alt="Logo" className="h-10" />
          </a>

          {/* Menu (Simplified example; replace with dynamic mapping if needed) */}
          <ul className="hidden lg:flex gap-8 text-sm font-semibold text-[#1b1b1b]">
            <li className="relative group">
              <a href="#" className="hover:text-[#C19D60] flex items-center gap-1">
                Home <i className="ti-angle-down"></i>
              </a>
              {/* Dropdown */}
              <ul className="absolute left-0 top-full mt-2 bg-white shadow-md rounded p-2 hidden group-hover:block z-50 w-[200px]">
                {[...Array(7)].map((_, i) => (
                  <li key={i}>
                    <a href={`index${i + 1}.html`} className="block px-4 py-2 hover:text-[#C19D60]">
                      Home Layout 0{i + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a href="about.html">About</a>
            </li>
            <li>
              <a href="wine.html">Wine</a>
            </li>
            <li>
              <a href="contact.html">Contact</a>
            </li>
          </ul>

          {/* Cart Button */}
          <div className="relative cursor-pointer">
            <span className="ti-shopping-cart text-2xl"></span>
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#C19D60] text-white text-xs flex items-center justify-center rounded-full">
              2
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
