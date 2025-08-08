import { IQuestionAndAnswer } from "@/interface/quesAndAns.interface";
import { Schema, model, models } from "mongoose";

const QuestionAnswerSchema: Schema = new Schema<IQuestionAndAnswer>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    question: {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
    },
    answer: {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Middleware to ensure question ends with "?"
QuestionAnswerSchema.pre<IQuestionAndAnswer>("save", function (next) {
  const q = this.question.question.trim();
  if (!q.endsWith("?")) {
    this.question.question = q + "?";
  }
  next();
});

// Prevent model overwrite on dev hot reload
const QuestionAnswer =
  models.QuestionAnswer ||
  model<IQuestionAndAnswer>("QuestionAnswer", QuestionAnswerSchema);

export default QuestionAnswer;
