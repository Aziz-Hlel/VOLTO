const wines = [
  {
    title: 'Riscos Malbec',
    price: '$25.00',
    desc: 'Full, Redcurrant, Spice, Chile',
    image: 'img/wine/1.jpg',
  },
  {
    title: 'Dom Perignon',
    price: '$30.00',
    desc: 'Stylish, Premium, Iconic, Champagne',
    image: 'img/wine/2.jpg',
  },
  {
    title: 'Amarone Classico',
    price: '$20.00',
    desc: 'Intense, Rich, Spice, Italy',
    image: 'img/wine/3.jpg',
  },
  {
    title: 'Valle Berta Gavi',
    price: '$45.00',
    desc: 'Clean, Soft, Honeysuckle, Italy',
    image: 'img/wine/4.jpg',
  },
]

export default function WineBanner() {
  return (
    <section className="bg-white">
      <div className="grid md:grid-cols-2">
        {/* Left Image */}
        <div className="w-full h-full">
          <img
            src="img/banner3.jpg"
            alt="Wine Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="flex items-center py-[80px] px-8 md:px-16">
          <div className="w-full">
            {/* Section Header */}
            <div className="mb-14">
              <div className="text-[#C19D60] text-sm tracking-[3px] uppercase mb-2">
                Candóre Wine Bar
              </div>
              <h2 className="text-4xl font-serif text-[#1b1b1b]">Wine Bar Menu</h2>
            </div>

            {/* Wine Menu Items */}
            <div className="space-y-10">
              {wines.map((wine, index) => (
                <div key={index} className="flex gap-5 items-start">
                  {/* Wine Image */}
                  <div className="w-[100px] h-[80px] overflow-hidden rounded shrink-0">
                    <a href={wine.image} title={wine.title}>
                      <img
                        src={wine.image}
                        alt={wine.title}
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-1 mb-1">
                      <span className="text-lg font-semibold text-[#1b1b1b]">
                        {wine.title}
                      </span>
                      <span className="text-[#C19D60] font-medium">{wine.price}</span>
                    </div>
                    <p className="italic text-sm text-[#777]">{wine.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
