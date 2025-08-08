import { ObjectId } from "mongoose";

export interface IManagement {
  name?: string;
  username?: string;
  email?: string;

  user: ObjectId;
  number?: string;
  dateOfBirth?: Date;
  branch: ObjectId;
  contacts?: {
    contactName: string;
    contact: string;
  }[];
  address?: {
    addressName: string;
    district: string;
    city: string;
    addressLine: string;
  }[];
  image?: string;
  orders?: ObjectId[];
  isDeleted: boolean;
  bio?: string;
  referralCode?: string;
  loyaltyPoints?: number;
}
