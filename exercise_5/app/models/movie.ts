import mongoose, { Schema, Document } from "mongoose";

export interface IMovie extends Document {
  title: string;
  year: number;
  genre: string;
  rating: number;
  director: string;
  description: string;
}

const MovieSchema = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
      min: 1888,
    },

    genre: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    director: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// indexes
// MovieSchema.index({ genre: 1 });
// MovieSchema.index({ rating: -1 });
// MovieSchema.index({ year: -1 });
// MovieSchema.index({ title: 1 });

export default mongoose.models.Movie ||
  mongoose.model<IMovie>("Movie", MovieSchema);