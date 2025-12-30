import { Post } from './post.model';

export interface User {
  username: string;
  password: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  bio?: string;
  pfpUrl?: string;
  followers?: number;
  following?: number;
  posts?: Post[];
  stories?: string[];
  hasActiveStory?: boolean;
  createdAt?: Date;
  city?: string;
  iban?: string;
  paymentMethods?: string[];
  commercialPaper?: string;
  commercialRegistryNumber?: string;
  accountType?: 'business' | 'personal';
  products?: {
    name: string;
    price: string;
    categories: string;
    discounts: string;
  }[];
  workHours?: {
    day: string;
    available: boolean;
    flexible: boolean;
    openHours: string;
    closeHours: string;
  }[];
}
