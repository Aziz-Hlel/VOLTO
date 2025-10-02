const MeetOurChefs = () => {
  const chefs = [
    {
      name: "Raphael Moss",
      role: "Executive Head Chef",
      img: "/img/team/chef1.jpg",
    },
    {
      name: "Martha Martin",
      role: "Executive Chef",
      img: "/img/team/chef2.jpg",
    },
    {
      name: "Robert Dan",
      role: "Group Head Chef",
      img: "/img/team/chef3.jpg",
    },
  ];

  return (
    <section className="py-[120px] bg-[#1b1b1b] text-white  ">
      <div className="max-w-[1140px] mx-auto ">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="text-[#C19D60] tracking-[3px] uppercase text-xs mb-2">Our Experts</div>
          <h2 className="text-4xl font-serif text-white">Meet Our Chefs</h2>

          <span className="relative mt-5 inline-block text-[20px] text-[#C19D60]">
            <i className="flaticon-chef" />
          </span>
        </div>

        {/* Carousel structure */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 px-8">
          {chefs.map((chef, i) => (
            <div
              key={i}
              className="bg-transparent text-[#1b1b1b] rounded shadow-lg overflow-hidden group transition"
            >
              <div className="relative">
                <img src={chef.img} alt={chef.name} className="w-full object-cover" />
              </div>
              <div className="p-6 w-2/3 bg-transparent hidden ">
                <h3 className="text-xl font-semibold mb-1">
                  {chef.name}
                  <span className="block text-sm text-[#C19D60] font-normal">{chef.role}</span>
                </h3>
                <p className="text-sm text-gray-600 my-4 leading-relaxed">
                  Nulla quis efficitur lacus sulvinar suere ausue in eduis euro vesatien arcuman
                  ontese auctor ac aleuam aretra.
                </p>
                <div className="flex gap-4 mt-4">
                  <a href="#" className="text-[#1b1b1b] hover:text-[#C19D60]">
                    <i className="ti-linkedin" />
                  </a>
                  <a href="#" className="text-[#1b1b1b] hover:text-[#C19D60]">
                    <i className="ti-facebook" />
                  </a>
                  <a href="#" className="text-[#1b1b1b] hover:text-[#C19D60]">
                    <i className="ti-twitter" />
                  </a>
                  <a href="#" className="text-[#1b1b1b] hover:text-[#C19D60]">
                    <i className="ti-instagram" />
                  </a>
                </div>
              </div>
              {/* Optional name overlay box */}
              <div className=" w-full flex justify-center group-hover:hidden transition-all duration-300">
                <div className="text-center bg-[#C19D60] text-black py-3 w-10/12 -translate-y-10 ">
                  <h3 className="text-base">
                    {chef.name}
                    <span className="block text-sm font-light text-gray-700">{chef.role}</span>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurChefs;
