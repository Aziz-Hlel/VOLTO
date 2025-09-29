export const Gender = {
  MALE: "M",
  FEMALE: "F",
} as const;

export type Gender = keyof typeof Gender;
