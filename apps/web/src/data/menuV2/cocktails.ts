export type ICocktail = {
  src_original: string;
  src_webp: string;
  src_avif: string;
  alt: string;
  title: string;
  price: string;
  description: string;
  phrases?: string;
};

export const cocktails: ICocktail[] = [
  {
    src_original: "/img/menu/cocktailV2/jpeg/sour_burn.jpeg",
    src_webp: "/img/menu/cocktailV2/webp/sour_burn.webp",
    src_avif: "/img/menu/cocktailV2/avif/sour_burn.avif",
    alt: "Sour Burn cocktail",
    title: "Sour Burn",
    price: "16.000 BD",
    description:
      "Jack Daniel's No.7 | Double burn caramel syrup | Fresh lemon juice | Aquafaba | Red Wine Float",
    phrases: "Sweet and Sour | Caramel | Smoky",
  },
  {
    src_original: "/img/menu/cocktailV2/jpeg/tikki_blaze.jpeg",
    src_webp: "/img/menu/cocktailV2/webp/tikki_blaze.webp",
    src_avif: "/img/menu/cocktailV2/avif/tikki_blaze.avif",
    alt: "Tikki Blaze cocktail",
    title: "Tikki Blaze",
    price: "12.000 BD",
    description:
      "White Rum | Spiced Rum | Orange liqueur | Angostura Bitters | Peanut Butter Syrup | Demerara Syrup | Fresh Lemon Juice | Aquafaba | Sparkling Wine",
    phrases: "Strong and balanced | Creamy | Fizzy | Spiced",
  },
  {
    src_original: "/img/menu/cocktailV2/jpeg/amber_kiss.jpeg",
    src_webp: "/img/menu/cocktailV2/webp/amber_kiss.webp",
    src_avif: "/img/menu/cocktailV2/avif/amber_kiss.avif",
    alt: "Amber Kiss cocktail",
    title: "Amber Kiss",
    price: "8.000 BD",
    description: "Vodka | Homemade passion fruit syrup | Fresh Lemon Juice | Almond liqueur",
    phrases: "Refreshing | Exotic | Nutty",
  },
  {
    src_original: "/img/menu/cocktailV2/jpeg/rose_voltage.jpeg",
    src_webp: "/img/menu/cocktailV2/webp/rose_voltage.webp",
    src_avif: "/img/menu/cocktailV2/avif/rose_voltage.avif",
    alt: "Rose Voltage cocktail",
    title: "Rose Voltage",
    price: "8.000 BD",
    description: "Gin | Flower Petals Syrup | Fresh Lemon Juice | Aloe Vera Juice",
    phrases: "Refreshing | Sweet | Floral | Herbal",
  },
  {
    src_original: "/img/menu/cocktailV2/jpeg/red_stage.jpeg",
    src_webp: "/img/menu/cocktailV2/webp/red_stage.webp",
    src_avif: "/img/menu/cocktailV2/avif/red_stage.avif",
    alt: "Red Stage cocktail",
    title: "Red Stage",
    price: "8.000 BD",
    description:
      "Tequila infused with hibiscus | Agave Syrup | Fresh Lemon Juice | Chartreuse Liqueur",
    phrases: "Refreshing | Herbal | Earthy",
  },
  {
    src_original: "/img/menu/cocktailV2/jpeg/copper_rush.jpeg",
    src_webp: "/img/menu/cocktailV2/webp/copper_rush.webp",
    src_avif: "/img/menu/cocktailV2/avif/copper_rush.avif",
    alt: "Copper Rush cocktail",
    title: "Copper Rush",
    price: "8.000 BD",
    description: "Gin | Campari | Homemade Grape Syrup | Fresh Lemon Juice | Blood Orange Soda",
  },
  {
    src_original: "/img/menu/cocktailV2/jpeg/popcorn_martini.jpeg",
    src_webp: "/img/menu/cocktailV2/webp/popcorn_martini.webp",
    src_avif: "/img/menu/cocktailV2/avif/popcorn_martini.avif",
    alt: "Popcorn Martini cocktail",
    title: "Popcorn Martini",
    price: "8.000 BD",
    description: "Vodka | Popcorn syrup | coffee liqueur | freshly brewed Espresso",
  },
];
