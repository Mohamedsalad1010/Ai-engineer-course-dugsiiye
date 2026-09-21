import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  movie_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  date: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    movie_id: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    comment: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ movie_id: 1 });
ReviewSchema.index({ user_id: 1 });

export default mongoose.models.Review ||
  mongoose.model<IReview>("Review", ReviewSchema);