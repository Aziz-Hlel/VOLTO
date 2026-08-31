export const Tier = {
  SILVER: "SILVER",
  GOLD: "GOLD",
  PLATINUM: "PLATINUM",
  DIAMOND: "DIAMOND",
} as const;

export type Tier = keyof typeof Tier;
