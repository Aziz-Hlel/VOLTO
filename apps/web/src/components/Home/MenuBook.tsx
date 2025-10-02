import { useState } from "react";
import startesItems from "@/data/menu/startesItems";
import saladItems from "@/data/menu/saladItems";
import dessertItems from "@/data/menu/dessertItems";
import wineItems from "@/data/menu/wineItems";
import mainsMenuItems from "@/data/menu/mainsMenu";

const tabs = [
  { id: "tab-1", label: "Starters" },
  { id: "tab-2", label: "Mains" },
  { id: "tab-3", label: "Salads" },
  { id: "tab-4", label: "Desserts" },
  { id: "tab-5", label: "Wine" },
];

const MenuBook = () => {
  const [activeTab, setActiveTab] = useState("tab-1");

  const handleTabClick = (tabId: string) => setActiveTab(tabId);

  return (
    <section className="relative py-[120px] bg-white min-h-screen">
      <div className="max-w-[1140px] mx-auto px-4">
        {/* Tabs */}
        <div className="mb-16 text-center">
          <ul className="inline-flex flex-wrap justify-center gap-6 text-lg font-noah uppercase">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`cursor-pointer pb-2 border-b-2 transition ${
                  activeTab === tab.id
                    ? "text-[#C19D60] border-[#C19D60]"
                    : "text-gray-400 border-transparent hover:text-[#C19D60]"
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div className="relative">
          {activeTab === "tab-1" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {startesItems.map((item, index) => (
                <MenuItem
                  key={index}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                />
              ))}
            </div>
          )}

          {activeTab === "tab-2" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {mainsMenuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                />
              ))}
            </div>
          )}

          {activeTab === "tab-3" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {saladItems.map((item, index) => (
                <MenuItem
                  key={index}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                />
              ))}
            </div>
          )}

          {activeTab === "tab-4" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {dessertItems.map((item, index) => (
                <MenuItem
                  key={index}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                />
              ))}
            </div>
          )}

          {activeTab === "tab-5" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {wineItems.map((item, index) => (
                <MenuItem
                  key={index}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const MenuItem = ({
  image,
  title,
  price,
  description: desc,
}: {
  image: string;
  title: string;
  price: number;
  description: string;
}) => (
  <div className="flex sm:flex-row items-start gap-4">
    <div className="shrink-0 w-24 h-24 overflow-hidden rounded-full">
      <a href={image} title={title}>
        <img src={image} alt={title} className="w-full h-full object-cover " />
      </a>
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center border-b border-dotted border-gray-300 pb-1 mb-1">
        <span className="text-lg font-semibold text-[#1b1b1b]">{title}</span>
        <span className="text-[#C19D60] font-medium">{price}</span>
      </div>
      <p className="italic text-sm text-[#777]">{desc}</p>
    </div>
  </div>
);

export default MenuBook;
