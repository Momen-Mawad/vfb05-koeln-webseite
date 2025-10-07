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
  // Admins
  {
    email: "dev@vfb05.de",
    name: "Momen Dev",
    password: "password123",
    role: UserRole.VERWALTUNG,
  },
  {
    email: "admin@vfb05.de",
    name: "Torsten Diener",
    password: "password123",
    role: UserRole.VERWALTUNG,
  },
  // Trainer
  {
    email: "detlef.kilburg@vfb05.de",
    name: "Detlef Kilburg",
    password: "password123",
    role: UserRole.TRAINER,
  },
  // Spieler (Players)
  {
    email: "momen.mawad@vfb05.de",
    name: "Momen Mawad",
    password: "password123",
    role: UserRole.SPIELER,
  },
  {
    email: "denis.buddel@vfb05.de",
    name: "Denis Buddel",
    password: "password123",
    role: UserRole.SPIELER,
  },
  {
    email: "fynn.händler@vfb05.de",
    name: "Fynn Händler",
    password: "password123",
    role: UserRole.SPIELER,
  },
  {
    email: "justin.diener@vfb05.de",
    name: "Justin Diener",
    password: "password123",
    role: UserRole.SPIELER,
  },
  {
    email: "mario.hölz@vfb05.de",
    name: "Mario Hölz",
    password: "password123",
    role: UserRole.SPIELER,
  },
  {
    email: "patrick.roofer@vfb05.de",
    name: "Patrick Roofer",
    password: "password123",
    role: UserRole.SPIELER,
  },
  {
    email: "rene.aras@vfb05.de",
    name: "Rene Aras",
    password: "password123",
    role: UserRole.SPIELER,
  },
  {
    email: "thomas.blum@vfb05.de",
    name: "Thomas Blum",
    password: "password123",
    role: UserRole.SPIELER,
  },
];

const teamsToSeed = [
  {
    name: "Herren 1. Mannschaft",
    slug: "herren-1",
    liga: "Kreisliga C",
    sortOrder: 1,
    image:
      "https://res.cloudinary.com/dzwfv7qng/image/upload/v1759617797/test_vrfikq.png",
  },
  {
    name: "Herren 2. Mannschaft",
    slug: "herren-2",
    liga: "Kreisliga D",
    sortOrder: 2,
  },
  {
    name: "Alte Herren",
    slug: "alte-herren",
    liga: "",
    sortOrder: 3,
  },
  {
    name: "A-Junioren U19",
    slug: "u19-junioren",
    liga: "",
    sortOrder: 4,
  },
  {
    name: "B-Junioren U17",
    slug: "u17-junioren",
    liga: "",
    sortOrder: 5,
  },
  {
    name: "C-Junioren U15",
    slug: "u15-junioren",
    liga: "",
    sortOrder: 6,
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
