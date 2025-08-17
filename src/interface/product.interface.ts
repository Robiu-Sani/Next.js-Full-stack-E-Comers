import { ObjectId } from "mongoose";

export interface IProduct {
  name: string;
  images: string[];

  priceVariants: {
    regularPrice: number;
    salePrice?: number;
    quantity: number;
    sku?: string;
  }[];
  quentity: number;
  quickOverview: string[];

  specifications: {
    key: string;
    value: string;
  }[];

  details: string;

  questionsAndAnswers: ObjectId[];
  reviews: ObjectId[];

  totalReviewCount: number;
  averageRating?: number;

  category: ObjectId;
  subCategory: ObjectId;
  coupon: {
    name: string;
    Type: "parcent" | "offer" | "freeDelevery";
    totalOffer: number;
  }[];
  tags?: string[];
  brand?: string;
  isFeatured?: boolean;
  isDeleted: boolean;

  hasOffer: boolean;
  offerEndDate?: Date;
  offerPercentage?: number;
  generalPrice: {
    currentPrice: number;
    prevPrice: number;
    discountPercentage: number;
  };
}
