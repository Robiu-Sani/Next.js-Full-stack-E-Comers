import { ObjectId } from "mongoose";

export interface ISearchValue {
  user: ObjectId;
  searchValue: {
    search: string;
    count: number;
  }[];
  isDeleted: boolean;
}
