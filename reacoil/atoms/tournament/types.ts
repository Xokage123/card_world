import { Modes, Names } from 'backend/models/Games';
import { RoleUser } from 'backend/models/User';

import { Theme } from 'const/theme';

export interface Player {
  id: string;
  name: string;
  nick: string;
  key?: string;
  points: number;
  rating?: number;
  place: number;
  isPayment: boolean;
}

export interface TournamentInformation {
  game: Names;
  mode: Modes;
  price: string;
  email?: string;
  secretKey?: string;
  status?: RoleUser;
}

export enum Status {
  preparation = 'preparation',
  main = 'main',
  completed = 'completed ',
}

export type StatusTournament = {
  [k in Status]: {
    text: string;
    theme: Theme;
  };
};

export interface TourPlayer {
  name: string;
  nameLink?: string;
  points: 0 | 1 | 2 | 3;
  status?: PlayerStatus;
}

export type Pair = TourPlayer[];

export type Tour = Pair[];

export enum PlayerStatus {
  winner = 'winner',
  loser = 'loser',
  draw = 'draw',
}

export interface TournamentToursProps {
  data: Tour[];
}
