// models/model-types.ts
import { Types } from "mongoose";

export enum UserRole {
  SPIELER = "Spieler",
  TRAINER = "Trainer",
  VERWALTUNG = "Verwaltung",
}

type PopulatedUser = {
  _id: Types.ObjectId;
  name: string;
};

export type PopulatedTeam = {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  liga?: string;
  image?: string;
  trainer?: PopulatedUser;
  spieler: PopulatedUser[];
};
