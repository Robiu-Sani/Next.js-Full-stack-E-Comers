import { IProduct } from "@/interface/product.interface";
import { Schema, models, model } from "mongoose";

const ProductSchema: Schema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    images: [{ type: String, required: true }],

    priceVariants: [
      {
        regularPrice: { type: Number },
        salePrice: { type: Number },
        quentity: { type: Number },
        sku: { type: String },
      },
    ],

    quickOverview: [{ type: String }],

    specifications: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],

    details: { type: String, required: true },

    questionsAndAnswers: [
      {
        type: Schema.Types.ObjectId,
        ref: "QuestionAnswer",
      },
    ],

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    totalReviewCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },

    coupon: [
      {
        name: { type: String, required: true },
        Type: {
          type: String,
          enum: ["parcent", "offer", "freeDelevery"],
          required: true,
        },
        totalOffer: { type: Number, required: true },
      },
    ],

    tags: [{ type: String }],
    brand: { type: String },
    isFeatured: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },

    hasOffer: { type: Boolean, default: false },
    offerEndDate: { type: Date },
    offerPercentage: { type: Number },

    generalPrice: {
      currentPrice: { type: Number, required: true },
      prevPrice: { type: Number, required: true },
      discountPercentage: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model<IProduct>("Product", ProductSchema);

export default Product;
