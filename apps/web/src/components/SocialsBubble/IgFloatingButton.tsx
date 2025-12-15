
const IgFloatingButton = ({ ...props }: React.HTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      href={"https://www.instagram.com/voltobahrain/"}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <div className="cursor-pointer  transition-colors duration-100 hover:brightness-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          aria-label="Instagram"
          role="img"
          viewBox="0 0 512 512"
          fill="#000000"
          className=" size-12 rounded-full"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <rect width="512" height="512" rx="15%" id="b"></rect>{" "}
            <use fill="url(#a)" xlinkHref="#b"></use> <use fill="url(#c)" xlinkHref="#b"></use>{" "}
            <radialGradient id="a" cx=".4" cy="1" r="1">
              {" "}
              <stop offset=".1" stopColor="#fd5"></stop>{" "}
              <stop offset=".5" stopColor="#ff543e"></stop>{" "}
              <stop offset="1" stopColor="#c837ab"></stop>{" "}
            </radialGradient>{" "}
            <linearGradient id="c" x2=".2" y2="1">
              {" "}
              <stop offset=".1" stopColor="#3771c8"></stop>{" "}
              <stop offset=".5" stopColor="#60f" stopOpacity="0"></stop>{" "}
            </linearGradient>{" "}
            <g fill="none" stroke="#ffffff" strokeWidth="30">
              {" "}
              <rect width="308" height="308" x="102" y="102" rx="81"></rect>{" "}
              <circle cx="256" cy="256" r="72"></circle>{" "}
              <circle cx="347" cy="165" r="6"></circle>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
    </a>
  );
};

export default IgFloatingButton;
