import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <nav className="  w-full sticky top-0  dark:bg-transparent z-50  bg-black/25 ">
      {/* <div className="max-w-screen-xl flex flex-wrap items-center  justify-between mx-auto p-4">
                <Link
                    to="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="/logo.png"
                        className="lg:h-42 "
                        alt="Flowbite Logo"
                    />
                </Link>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                                to={"/menu"}
                                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                                aria-current="page"
                            >
                                Menu
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/events"
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Events
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/gallery"
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Contact
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Reservation
                            </a>
                        </li>
                    </ul>
                </div>
            </div> */}

      <div className="m-4 flex group  w-fit max-w-7xl absolute  ">
        <div className=" group-hover:bg-black/25  transition-all duration-1000 h-24 group-hover:w-2xl group-hover:h-24 flex gap-2 border ">
          <Link to="/">
            <img
              src="/logo.png"
              className="lg:h-24 z-50 bg-black/25 group-hover:bg-transparent "
              alt="Flowbite Logo"
            />
          </Link>
          <div
            className="transition-all gap-2 duration-1000 group-hover:w-full  flex items-center justify-center  text-white w-0  bg-transparent  overflow-hidden rounded-2xl 
                  "
          >
            <Link to="/menu">
              <div>Menu</div>
            </Link>
            <Link to="/events">
              <div>Events</div>
            </Link>
            <Link to="/gallery">
              <div>Gallery</div>
            </Link>
            <Link to="/about">
              <div>About</div>
            </Link>
            <Link to="/contact">
              <div>Contact</div>
            </Link>
            <Link to="/reservation">
              <div>Reservation</div>
            </Link>
            {/* <div className="flex items-center justify-start h-24 w-full max-w-6xl bg-black relative">
                     
                     <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center text-zinc-400 text-sm font-semibold bg-zinc-950 rounded-full backdrop-blur-sm px-5 py-1 overflow-hidden border border-zinc-700">
                     <button className="hover:text-zinc-100 transition duration-700 px-4 py-1.5 rounded-full relative group isolate">
                     <div className="absolute -bottom-5 left-1/2 -translate-x-1/2  duration-700 w-8 h-6 blur-[12px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition -z-10"></div>
                     <div className="absolute -top-5 left-1/2 -translate-x-1/2  duration-700 w-8 h-6 blur-[12px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition -z-10"></div>
                     <span className="z-10 relative">Home</span>
                            </button>
                            <button className="hover:text-zinc-100 transition px-4 py-1.5 duration-700 rounded-full relative group isolate">
                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2  duration-700 w-8 h-6 blur-[12px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition -z-10"></div>
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2  duration-700 w-8 h-6 blur-[12px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition -z-10"></div>
                                <span className="z-10 relative">Products</span>
                            </button>
                            <button className="hover:text-zinc-100 transition px-4 py-1.5 duration-700 rounded-full relative group isolate">
                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2  duration-700 w-8 h-6 blur-[12px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition -z-10"></div>
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2  duration-700 w-8 h-6 blur-[12px] bg-zinc-700 opacity-0 group-hover:opacity-100 transition -z-10"></div>
                                <span className="z-10 relative">Inquire</span>
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                       
                            <button className="text-zinc-100 rounded-full px-5 py-1.5 bg-zinc-950 font-medium flex items-center transition border border-zinc-700 relative overflow-hidden group">
                                Sign Up
                                <svg
                                    className="inline-block ml-2 group-hover:translate-x-2 transition duration-1000"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M13.3 17.275q-.3-.3-.288-.725t.313-.725L16.15 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.15L13.325 8.175q-.3-.3-.313-.725t.288-.725q.3-.3.725-.288t.725.313l4.15 4.15q.15.15.213.325t.063.375q0 .2-.063.375t-.213.325l-4.15 4.15q-.3.3-.725.313t-.725-.288Z"
                                    />
                                </svg>
                                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-3 bg-zinc-100 blur-[18px] group-hover:scale-[3] opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                            </button>
                        </div>
                    </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
