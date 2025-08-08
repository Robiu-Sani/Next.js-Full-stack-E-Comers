import { ObjectId } from "mongoose";

export interface IUserList {
  user: ObjectId;
  product: ObjectId[];
  listType: "add-cart" | "wish-list";
  isDeleted: boolean;
  createdAt: Date;
}
