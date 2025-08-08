import { ISubCategory } from "@/interface/sub-category.interace";
import { Schema, models, model } from "mongoose";

const SubCategorySchema: Schema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const SubCategory =
  models.SubCategory || model<ISubCategory>("SubCategory", SubCategorySchema);

export default SubCategory;
