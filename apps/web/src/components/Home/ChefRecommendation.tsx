import { ChefHat } from "lucide-react";
import ChefRecommendationItem from "../ChefRecommendationItem/ChefRecommendationItem";
import { Hamburger, Salad, Martini } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export type cheffListProps = {
  img: string;
  category: string;
  name: string;
  description: string;
  icon: any;
};

const ChefRecommendation = () => {
  const cheffList: cheffListProps[] = [
    {
      img: "img/chef/hamburger.jpg",
      category: "Food",
      name: "Rusty’s Burger",
      description: "Smoked pulled beef ribs, bbq sauce...",
      icon: Hamburger,
    },
    {
      img: "img/chef/salad.jpg",
      category: "Salad",
      name: "Waldorf Salad",
      description: "Lettuce, celery, apple, grape, walnut...",
      icon: Salad,
    },
    {
      img: "img/chef/wine.jpg",
      category: "Wine",
      name: "Corvo Dal 1824",
      description: "Dessert Wine, Bordeaux, Graves...",
      icon: Martini,
    },
  ];
  return (
    <>
      <section className="bg-[#f2eee8] py-24 min-h-screen  lg:px-20 xl:px-40">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col justify-center items-center gap-6 ">
          <div className="text-center mb-8 relative">
            <div className="absolute w-full text-center text-4xl opacity-10 top-0 ">Menu</div>
            <div className="text-[12px] uppercase tracking-[3px] text-[#C19D60] mb-2">
              Should to Try
            </div>
            <div className="text-6xl text-[#1b1b1b] leading-none font-serif font-extralight">
              Chef Recommends
            </div>
            <span className="relative mt-4 inline-block text-[20px] before:content-[''] before:absolute before:w-[60px] before:h-[1px] before:bg-[#1b1b1b] before:top-1/2 before:left-[-80px] before:opacity-10 after:content-[''] after:absolute after:w-[60px] after:h-[1px] after:bg-[#1b1b1b] after:top-1/2 after:right-[-80px] after:opacity-10">
              <i className="flaticon-chef text-[#C19D60]" />
              <ChefHat className="text-[#C19D60] w-10 h-10" />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {cheffList.map((item) => (
              <ChefRecommendationItem props={item} />
            ))}
          </div>

          <Link to={"/menu"}>
            <Button className=" w-36 h-16 bg-[#C19D60] hover:bg-[#bd8f40] hover:cursor-pointer ">
              {" "}
              See Menu
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default ChefRecommendation;
