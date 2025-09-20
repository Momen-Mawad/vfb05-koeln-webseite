// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

// Interface to define the User document structure
export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  role?: string;
  teamId?: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please provide an email."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      select: false, // Prevents the password from being sent in queries by default
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt timestamps

// Prevent model overwrite in Next.js hot-reloading environments
export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
