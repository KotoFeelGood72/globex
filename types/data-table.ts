import { ColumnDef as TanstackColumnDef } from "@tanstack/react-table";

export type ColumnDef<T> = TanstackColumnDef<T>;

export interface Company {
  id: string;
  name: string;
  status: "active" | "inactive";
  transactionsCount: number;
  balance: number;
}

export interface Partner {
  id: string;
  name: string;
  email: string;
  companiesCount: number;
  status: "active" | "inactive";
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  type: "incoming" | "outgoing";
  companyName?: string;
  partnerName?: string;
  description: string;
}

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
