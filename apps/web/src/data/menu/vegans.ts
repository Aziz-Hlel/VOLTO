import type { Category, SubCategory } from "@/types/Item2";

export const veganAppetizersSubCategory: SubCategory = {
  id: "12",
  title: "Vegan Appetizers",
  items: [
    {
      id: "28",
      title: "Aranchini",
      price: "0.000 BD",
      description: "Vegan rice balls with plant-based ingredients",
      image: "img/menu/mains/3.jpg",
      category: "Vegan",
      subCategory: "Appetizers",
    },
    {
      id: "29",
      title: "Edemamme",
      price: "0.000 BD",
      description: "Steamed soybeans with sea salt",
      image: "img/menu/mains/1.jpg",
      category: "Vegan",
      subCategory: "Appetizers",
    },
    {
      id: "30",
      title: "Crispy Corn Tortilla with Vegan Cheese",
      price: "0.000 BD",
      description: "Golden corn tortilla topped with dairy-free cheese",
      image: "img/menu/mains/4.jpg",
      category: "Vegan",
      subCategory: "Appetizers",
    },
  ],
};

export const veganSushiSubCategory: SubCategory = {
  id: "13",
  title: "Vegan Sushi",
  items: [
    {
      id: "31",
      title: "Vegan California",
      price: "0.000 BD",
      description: "Plant-based sushi roll with avocado and cucumber",
      image: "img/menu/mains/2.jpg",
      category: "Vegan",
      subCategory: "Sushi",
    },
    {
      id: "32",
      title: "Vegan Tempura",
      price: "0.000 BD",
      description: "Crispy battered vegetables sushi roll",
      image: "img/menu/mains/1.jpg",
      category: "Vegan",
      subCategory: "Sushi",
    },
  ],
};

export const veganMainCourseSubCategory: SubCategory = {
  id: "14",
  title: "Vegan Main Course",
  items: [
    {
      id: "33",
      title: "Eggplant with Zucchini Lasagna",
      price: "0.000 BD",
      description: "Layered eggplant, zucchini and vegan cheese",
      image: "img/menu/mains/3.jpg",
      category: "Vegan",
      subCategory: "Main Course",
    },
    {
      id: "34",
      title: "Vegan Risotto with Fresh Herbs",
      price: "0.000 BD",
      description: "Creamy plant-based risotto with aromatic herbs",
      image: "img/menu/mains/4.jpg",
      category: "Vegan",
      subCategory: "Main Course",
    },
    {
      id: "35",
      title: "Vegetable Pasta",
      price: "0.000 BD",
      description: "Seasonal vegetables with vegan pasta",
      image: "img/menu/mains/2.jpg",
      category: "Vegan",
      subCategory: "Main Course",
    },
  ],
};

// Main category
export const vegansCategory: Category = {
  id: "vegans",
  title: "Volto Green Table",
  subCategory: [veganAppetizersSubCategory, veganSushiSubCategory, veganMainCourseSubCategory],
};
