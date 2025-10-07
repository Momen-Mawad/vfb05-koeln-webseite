// lib/data.ts
import "server-only"; // This ensures this code only ever runs on the server
import dbConnect from "./dbConnect";
import Team from "@/models/Team";
import User from "@/models/User"; // Import User to ensure model is registered

// Function to fetch all teams for the public listing page
export async function fetchPublicTeams() {
  try {
    await dbConnect();
    const teams = await Team.find({})
      .sort({ name: 1 })
      .populate("trainer", "name")
      .lean();
    // .lean() returns plain JavaScript objects instead of Mongoose documents for better performance
    return teams;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch teams.");
  }
}

// Function to fetch a single team by its slug for the detail page
export async function fetchTeamBySlug(slug: string) {
  try {
    await dbConnect();
    const team = await Team.findOne({ slug: slug })
      .populate("trainer", "name")
      .populate("spieler", "name")
      .lean();

    return team;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch team.");
  }
}
