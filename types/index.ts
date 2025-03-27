export interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  companiesCount: number;
  createdAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  targetAmount: number;
  targetCurrency: string;
  rate: number;
  status: "pending" | "completed" | "failed";
  type: "incoming" | "outgoing";
  createdAt: string;
  companyName?: string;
}
