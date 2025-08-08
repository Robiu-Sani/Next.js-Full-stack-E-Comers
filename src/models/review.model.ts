import { IReview } from "@/interface/review.interface";
import { Schema, model, models } from "mongoose";

const ReviewSchema: Schema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // ✅ Assuming a User model exists
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product", // ✅ Connect to Product model
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    isDeleted: { type: Boolean, default: false },
    replay: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User", // ✅ Replies also reference a user
          required: true,
        },
        replay: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Review = models.Review || model<IReview>("Review", ReviewSchema);

export default Review;
