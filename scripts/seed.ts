import * as dotenv from "dotenv";
dotenv.config(); // dotenv.config() should be at the very top

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { UserRole } from "@/models/model-types";

const usersToSeed = [
  {
    email: "admin@vfb05.de",
    password: "password123",
    name: "Torsten Verwaltung",
    role: UserRole.VERWALTUNG,
  },
  {
    email: "trainer@vfb05.de",
    password: "password123",
    name: "Dietmar Trainer",
    role: UserRole.TRAINER,
  },
  {
    email: "spieler@vfb05.de",
    password: "password123",
    name: "Thomas Blum",
    role: UserRole.SPIELER,
  },
];

const seedUsers = async () => {
  await dbConnect();

  try {
    // 1. Find which users already exist
    const existingUsers = await User.find({
      email: { $in: usersToSeed.map((u) => u.email) },
    });
    const existingEmails = existingUsers.map((u) => u.email);

    // 2. Filter out users that already exist
    const newUsersToCreate = usersToSeed.filter(
      (u) => !existingEmails.includes(u.email)
    );

    if (newUsersToCreate.length === 0) {
      console.log("🌱 All test users already exist in the database.");
      return;
    }

    // 3. Hash passwords for the new users
    const usersWithHashedPasswords = await Promise.all(
      newUsersToCreate.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // 4. Insert the new users into the database
    await User.insertMany(usersWithHashedPasswords);

    console.log(
      `✅ Successfully created ${newUsersToCreate.length} new test user(s).`
    );
    if (existingEmails.length > 0) {
      console.log(
        `ℹ️ Skipped ${existingEmails.length} user(s) that already existed.`
      );
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database.");
  }
};

seedUsers();
