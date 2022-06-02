import { Modes, Names } from "backend/models/Games";
import { RoleUser } from "backend/models/User";

export interface Player {
  id: string;
  name: string;
  nick: string;
  key?: string;
  points: number;
  rating?: number;
  place: number;
  isPayment: boolean
}

export interface TournamentInformation {
  game: Names;
  mode: Modes;
  price: string;
  email?: string;
  secretKey?: string;
  status?: RoleUser;
}
