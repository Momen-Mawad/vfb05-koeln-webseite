// scripts/seed.ts
import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Team from "@/models/Team";
import { UserRole } from "@/models/model-types";

const usersToSeed = [
  {
    email: "dev@vfb05.de",
    name: "Momen Dev",
    password: "password123",
    role: UserRole.VERWALTUNG,
  },
  {
    email: "admin@vfb05.de",
    name: "Torsten Verwaltung",
    password: "password123",
    role: UserRole.VERWALTUNG,
  },
  {
    email: "trainer@vfb05.de",
    name: "Dietmar Trainer",
    password: "password123",
    role: UserRole.TRAINER,
  },
  {
    email: "spieler@vfb05.de",
    name: "Thomas Blum",
    password: "password123",
    role: UserRole.SPIELER,
  },
];

// 2. Define the teams to be created
const teamsToSeed = [
  {
    name: "Herren 1. Mannschaft",
    slug: "herren-1",
    liga: "Kreisliga C",
    image: "/teams/herren-1.jpg",
  },
  {
    name: "Herren 2. Mannschaft",
    slug: "herren-2",
    liga: "Kreisliga D",
    image: "/teams/herren-2.jpg",
  },
  {
    name: "Alte Herren",
    slug: "alte-herren",
    liga: "",
    image: "/teams/alte-herren.jpg",
  },
  {
    name: "A-Junioren U19",
    slug: "u19-junioren",
    liga: "",
    image: "/teams/u19-junioren.jpg",
  },
  {
    name: "B-Junioren U17",
    slug: "u17-junioren",
    liga: "",
    image: "/teams/u17-junioren.jpg",
  },
  {
    name: "C-Junioren U15",
    slug: "u15-junioren",
    liga: "",
    image: "/teams/u15-junioren.jpg",
  },
];

const seedDatabase = async () => {
  await dbConnect();

  try {
    // --- SEED USERS ---
    const existingUsers = await User.find({
      email: { $in: usersToSeed.map((u) => u.email) },
    });
    const existingEmails = existingUsers.map((u) => u.email);
    const newUsersToCreate = usersToSeed.filter(
      (u) => !existingEmails.includes(u.email)
    );

    if (newUsersToCreate.length > 0) {
      const usersWithHashedPasswords = await Promise.all(
        newUsersToCreate.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return { ...user, password: hashedPassword };
        })
      );
      await User.insertMany(usersWithHashedPasswords);
      console.log(
        `✅ Successfully created ${newUsersToCreate.length} new user(s).`
      );
    } else {
      console.log("ℹ️ All test users already exist.");
    }

    // --- SEED TEAMS AND ASSIGN USERS ---
    console.log("\nSeeding teams...");

    // 3. Find the users we want to assign
    const trainer = await User.findOne({ email: "trainer@vfb05.de" });
    const spieler = await User.findOne({ email: "spieler@vfb05.de" });

    if (!trainer || !spieler) {
      throw new Error(
        "Could not find trainer or spieler to assign. Make sure users are seeded first."
      );
    }

    // Check for existing teams
    const existingTeams = await Team.find({
      slug: { $in: teamsToSeed.map((t) => t.slug) },
    });
    const existingSlugs = existingTeams.map((t) => t.slug);
    let newTeamsToCreate = teamsToSeed.filter(
      (t) => !existingSlugs.includes(t.slug)
    );

    if (newTeamsToCreate.length === 0) {
      console.log("ℹ️ All test teams already exist.");
      return;
    }

    // 4. Assign the users to the first team before creating it
    newTeamsToCreate = newTeamsToCreate.map((team) => {
      if (team.slug === "herren-1") {
        return {
          ...team,
          trainer: trainer._id,
          spieler: [spieler._id],
        };
      }
      return team;
    });

    // 5. Insert new teams
    await Team.insertMany(newTeamsToCreate);
    console.log(
      `✅ Successfully created ${newTeamsToCreate.length} new team(s).`
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database.");
  }
};

seedDatabase();
