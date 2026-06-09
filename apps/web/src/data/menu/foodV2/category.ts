export type CategoriesName =
  | "SNACKS & APPETIZERS"
  | "SALADS"
  | "SUSHI"
  | "CAVIAR & OYSTERS"
  | "MAIN COURSES"
  | "DESSERTS";

export type FoodCategory = {
  id: CategoriesName;
  name: string;
  sortOrder: number;
};

export const foodCategories: Record<CategoriesName, FoodCategory> = {
  "SNACKS & APPETIZERS": {
    id: "SNACKS & APPETIZERS",
    name: "SNACKS & APPETIZERS",
    sortOrder: 0,
  },
  SALADS: {
    id: "SALADS",
    name: "SALADS",
    sortOrder: 1,
  },
  SUSHI: {
    id: "SUSHI",
    name: "SUSHI",
    sortOrder: 2,
  },
  "CAVIAR & OYSTERS": {
    id: "CAVIAR & OYSTERS",
    name: "CAVIAR & OYSTERS",
    sortOrder: 2,
  },
  "MAIN COURSES": {
    id: "MAIN COURSES",
    name: "MAIN COURSES",
    sortOrder: 3,
  },
  DESSERTS: {
    id: "DESSERTS",
    name: "DESSERTS",
    sortOrder: 4,
  },
};
