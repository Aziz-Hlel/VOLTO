export type Allergies = "V" | "G" | "D" | "E" | "N" | "S" | "SO" | "SS";

export const ALLERGY_MAP: Record<Allergies, string> = {
  V: "Vegetarian",
  G: "Gluten",
  D: "Dairy",
  E: "Eggs",
  N: "Nuts",
  S: "Fish and Shellfish",
  SO: "Soy",
  SS: "Sesame",
};
