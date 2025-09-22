import type { Role } from "./Roles";
import type { Tier } from "./Tier";


export type User = {
    id: string;
    username: string;
    email: string;
    role: Role;
    gender: "M" | "F";
    tier: Tier;
};