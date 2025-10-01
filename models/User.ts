// models/User.ts
import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "@/models/model-types";

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  role: { type: string; enum: UserRole; default: UserRole.SPIELER };
  team?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: [true, "Please provide an email."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      select: false, // Do not return password by default
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.SPIELER,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
