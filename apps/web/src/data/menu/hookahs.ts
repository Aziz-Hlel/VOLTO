import type { Category, SubCategory } from "@/types/Item2";

const classicShishaSubCategory: SubCategory = {
  id: "9",
  title: "Classic Shisha",
  items: [
    {
      id: "15",
      title: "Grape Mint",
      price: "12.000 BD",
      description:
        "A refreshing fusion of juicy grape sweetness and cool mint, delivering a vibrant, crisp shisha experience that invigorates the senses.",
      image: "/img/hookaItem2.jpeg",
      category: "",
      subCategory: "Classic Shisha",
    },
    {
      id: "16",
      title: "Lemon Mint",
      price: "12.000 BD",
      description:
        "Zesty lemon bursts with a tangy edge, perfectly balanced by the soothing chill of mint for a bright, rejuvenating smoke.",
      image: "/img/hookaItem4.jpeg",
      category: "",
      subCategory: "Classic Shisha",
    },
    {
      id: "17",
      title: "Double Apple Nakhla",
      price: "12.000 BD",
      description:
        "A classic blend of sweet and tart apples, crafted by Nakhla for a rich, authentic shisha flavor with a smooth, traditional finish.",
      image: "/img/hookaItem1.jpeg",
      category: "",
      subCategory: "Classic Shisha",
    },
    {
      id: "18",
      title: "Double Apple Fakher",
      price: "12.000 BD",
      description:
        "Fakher's iconic mix of crisp green and sweet red apples, offering a bold, aromatic smoke with a luxurious, full-bodied taste.",
      image: "/img/hookaItem3.jpeg",
      category: "",
      subCategory: "Classic Shisha",
    },
    {
      id: "19",
      title: "Grape",
      price: "12.000 BD",
      description:
        "Luscious, ripe grape flavor that envelops the palate with its sweet, juicy essence, creating a rich and indulgent shisha session.",
      image: "/img/hookaItem2.jpeg",
      category: "",
      subCategory: "Classic Shisha",
    },
  ],
};

const berryShishaSubCategory: SubCategory = {
  id: "10",
  title: "Berry Shisha",
  items: [
    {
      id: "20",
      title: "Grape Berry",
      price: "12.000 BD",
      description:
        "A delightful medley of succulent grape and mixed berries, blending sweet and tart notes for a vibrant, fruity shisha adventure.",
      image: "/img/hookaItem1.jpeg",
      category: "",
      subCategory: "Berry Shisha",
    },
    {
      id: "21",
      title: "Blue Berry",
      price: "12.000 BD",
      description:
        "Plump, juicy blueberries burst with sweet-tart goodness, delivering a smooth, flavorful smoke that's both bold and refreshing.",
      image: "/img/hookaItem3.jpeg",
      category: "",
      subCategory: "Berry Shisha",
    },
    {
      id: "22",
      title: "Mint",
      price: "12.000 BD",
      description:
        "Pure, icy mint that refreshes with every puff, offering a clean, crisp shisha experience perfect for a cool, calming escape.",
      image: "/img/hookaItem4.jpeg",
      category: "",
      subCategory: "Berry Shisha",
    },
    {
      id: "23",
      title: "Grape Mint + Extra Mint",
      price: "12.000 BD",
      description:
        "An intensified blend of sweet grape and double mint freshness, creating a bold, cooling shisha with a sweet, fruity core.",
      image: "/img/hookaItem2.jpeg",
      category: "",
      subCategory: "Berry Shisha",
    },
    {
      id: "24",
      title: "Blueberry Mint",
      price: "12.000 BD",
      description:
        "Sweet blueberries meld with a frosty mint kick, crafting a harmonious, refreshing shisha that's both vibrant and soothing.",
      image: "/img/hookaItem1.jpeg",
      category: "",
      subCategory: "Berry Shisha",
    },
  ],
};

const appleShishaSubCategory: SubCategory = {
  id: "11",
  title: "Apple Shisha",
  items: [
    {
      id: "25",
      title: "Double Apple Fakher Mint",
      price: "12.000 BD",
      description:
        "Fakher's signature double apple infused with crisp mint, balancing sweet-tart apple notes with a refreshing, cool exhale.",
      image: "/img/hookaItem3.jpeg",
      category: "",
      subCategory: "Apple Shisha",
    },
    {
      id: "26",
      title: "Double Apple Nakhla Mint",
      price: "12.000 BD",
      description:
        "Nakhla's traditional double apple enhanced with a burst of mint, offering a timeless blend with a revitalizing, cool twist.",
      image: "/img/hookaItem4.jpeg",
      category: "",
      subCategory: "Apple Shisha",
    },
    {
      id: "27",
      title: "Double Apple Mix",
      price: "12.000 BD",
      description:
        "A masterful fusion of Nakhla and Fakher double apple blends, delivering a complex, sweet-tart apple profile with a smooth, luxurious finish.",
      image: "/img/hookaItem2.jpeg",
      category: "",
      subCategory: "Apple Shisha",
    },
  ],
};

// Main category
export const hookahsCategory: Category = {
  id: "hookahs",
  title: "Volto Hookah",
  subCategory: [classicShishaSubCategory, berryShishaSubCategory, appleShishaSubCategory],
};
