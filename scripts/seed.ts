import * as dotenv from 'dotenv'
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";

dotenv.config();

const seedUser = async () => {
  await dbConnect();

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: "test@vfb05.de" });
    if (existingUser) {
      console.log("Test user already exists.");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Create the new user
    const newUser = new User({
      email: "test@vfb05.de",
      password: hashedPassword,
      name: "Max Mustermann", // Example name
      role: "player", // Example role
    });

    await newUser.save();
    console.log("✅ Test user created successfully!");
  } catch (error) {
    console.error("Error seeding user:", error);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log("Disconnected from database.");
  }
};

seedUser();
