import mongoose from "mongoose";

export interface ITeam extends mongoose.Document {
  name: string;
  slug: string;
  liga: string;
  trainer: mongoose.Types.ObjectId;
  spieler: mongoose.Types.ObjectId[];
}

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a team name."],
    },
    slug: {
      type: String,
      required: [true, "Please provide a URL slug."],
      unique: true,
    },
    liga: {
      type: String,
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
    spieler: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Team ||
  mongoose.model<ITeam>("Team", TeamSchema);
