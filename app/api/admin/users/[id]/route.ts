// app/api/admin/users/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { UserRole } from "@/models/model-types";

// GET a single user by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // Match the expected Promise type
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== UserRole.VERWALTUNG) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await dbConnect();
  try {
    const { id } = await context.params; // Await the params to get the ID
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// PUT (update) a single user by ID
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // Match the expected Promise type
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== UserRole.VERWALTUNG) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await dbConnect();
  try {
    const { id } = await context.params; // Await the params
    const { name, role } = await request.json();

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, role },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// DELETE a single user by ID
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // Match the expected Promise type
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== UserRole.VERWALTUNG) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await dbConnect();
  try {
    const { id } = await context.params; // Await the params
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
