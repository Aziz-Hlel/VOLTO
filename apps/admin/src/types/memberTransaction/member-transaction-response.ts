import type { Roles } from "../enums/Roles";

export type memeberTransactionRespose = {
  id: string;
  amount: number;
  note: string | null;
  performedBy: {
    id: string;
    firstName: string;
    lastName: string;
    role: Roles;
  };

  createdAt: string;
};
