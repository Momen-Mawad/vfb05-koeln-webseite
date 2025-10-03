// app/api/admin/teams/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";
import User from "@/models/User";
import { UserRole } from "@/models/model-types";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== UserRole.VERWALTUNG) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await dbConnect();

  try {
    const teams = await Team.find({})
      .sort({ name: 1 })
      .populate("trainer", "name email")
      .populate("spieler", "name email");

    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== UserRole.VERWALTUNG) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await dbConnect();

  try {
    const { name, liga, slug, trainer } = await request.json();

    // Basic validation
    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required fields" },
        { status: 400 }
      );
    }

    // Check if a team with this slug already exists
    const existingTeam = await Team.findOne({ slug });
    if (existingTeam) {
      return NextResponse.json(
        { error: "A team with this slug already exists" },
        { status: 409 }
      );
    }

    const newTeam = new Team({
      name,
      liga,
      slug,
      trainer: trainer || null, // Assign trainer if provided
    });

    await newTeam.save();

    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
