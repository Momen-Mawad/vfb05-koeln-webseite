// lib/data.ts
import "server-only";
import dbConnect from "./dbConnect";
import Team from "@/models/Team";
import { PopulatedTeam } from "@/models/model-types";

// Function to fetch all teams for the public listing page
export async function fetchPublicTeams() {
  try {
    await dbConnect();
    const teams = await Team.find({})
      .sort({ sortOrder: 1 })
      .populate("trainer", "name")
      .lean();
    // .lean() returns plain JavaScript objects instead of Mongoose documents for better performance
    return teams;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
}

// Function to fetch a single team by its slug for the detail page
export async function fetchTeamBySlug(
  slug: string
): Promise<PopulatedTeam | null> {
  try {
    await dbConnect();
    const team = await Team.findOne({ slug })
      .populate("trainer", "name")
      .populate("spieler", "name")
      .lean();

    return team as PopulatedTeam | null;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
}
