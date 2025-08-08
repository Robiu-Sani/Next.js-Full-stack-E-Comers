import { ObjectId } from "mongoose";

export interface IReview {
  user: ObjectId;
  product: ObjectId;
  review: string;
  image?: string;
  replay: {
    user: ObjectId;
    replay: string;
  }[];
  isDeleted: boolean;
}
