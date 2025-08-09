import { ICategory } from "@/interface/category.interface";
import { Schema, models, model } from "mongoose";

const CategorySchema: Schema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "https://i.postimg.cc/9MFs16kQ/category.jpg",
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

// Prevent model overwrite upon hot reloads in dev
const Category =
  models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
