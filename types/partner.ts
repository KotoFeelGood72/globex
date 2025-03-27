export type PartnerStatus = 'active' | 'pending' | 'blocked';

export interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: PartnerStatus;
  commissionRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePartnerDTO {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: PartnerStatus;
  commissionRate: number;
}

export interface UpdatePartnerDTO extends Partial<CreatePartnerDTO> {}
