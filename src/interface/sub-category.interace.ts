import { ObjectId } from "mongoose";

export interface ISubCategory {
  category: ObjectId;
  name: string;
  note?: string;
  isDeleted: boolean;
}
