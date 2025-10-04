// app/api/admin/teams/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import Team from "@/models/Team";
import User from "@/models/User";
import { UserRole } from "@/models/model-types";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== UserRole.VERWALTUNG) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await dbConnect();
  try {
    const { id } = await context.params;
    const team = await Team.findById(id)
      .populate("trainer", "name")
      .populate("spieler", "name email");
    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }
    return NextResponse.json(team, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== UserRole.VERWALTUNG) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await dbConnect();
  try {
    const { id } = await context.params;
    const { name, liga, trainer } = await request.json();
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      { name, liga, trainer: trainer === "none" ? null : trainer },
      { new: true }
    );

    if (!updatedTeam) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }
    return NextResponse.json(updatedTeam, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== UserRole.VERWALTUNG) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await dbConnect();
  try {
    const { id } = await context.params;
    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Team deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== UserRole.VERWALTUNG) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await dbConnect();

  try {
    const { id: teamId } = await context.params;
    const { action, playerId } = await request.json();

    if (!action || !playerId) {
      return NextResponse.json(
        { error: "Action and playerId are required" },
        { status: 400 }
      );
    }

    let updatedTeam;

    switch (action) {
      case "add_player":
        // Add player to team's roster and update the player's document
        updatedTeam = await Team.findByIdAndUpdate(
          teamId,
          { $addToSet: { spieler: playerId } }, // $addToSet prevents duplicates
          { new: true }
        );
        await User.findByIdAndUpdate(playerId, { team: teamId });
        break;
      case "remove_player":
        // Remove player from team's roster and clear the player's team field
        updatedTeam = await Team.findByIdAndUpdate(
          teamId,
          { $pull: { spieler: playerId } },
          { new: true }
        );
        await User.findByIdAndUpdate(playerId, { $unset: { team: "" } });
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (!updatedTeam) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // Repopulate the response to include player names
    const populatedTeam = await Team.findById(updatedTeam._id)
      .populate("spieler", "name email")
      .populate("spieler", "name email");

    return NextResponse.json(populatedTeam, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
