import { ISearchValue } from "@/interface/searchdata.interface";
import { Schema, model, models } from "mongoose";

const SearchValueSchema: Schema = new Schema<ISearchValue>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // ✅ Reference to User collection
      required: true,
    },
    searchValue: [
      {
        search: { type: String, required: true },
        count: { type: Number, default: 1 },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in dev
const SearchValue =
  models.SearchValue || model<ISearchValue>("SearchValue", SearchValueSchema);

export default SearchValue;
