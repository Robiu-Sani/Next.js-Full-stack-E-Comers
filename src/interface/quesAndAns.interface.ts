import { ObjectId } from "mongoose";

export interface IQuestionAndAnswer {
  product: ObjectId;
  question: {
    user: ObjectId;
    question: string;
  };
  answer: {
    user: ObjectId;
    answer: string;
  };
}
