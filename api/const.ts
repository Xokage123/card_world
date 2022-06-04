import { Codes } from "./types"

export const BASE_API_URL = 'http://localhost:3000/api'

export const SUCCESS_TEXT = 'Success'
export const ERROR_TEXT = 'Unsuccess'

export const errorsText = {
  method: 'This method is not supported'
}

export enum LocalKeys {
  user_token = 'user_token',
  user_information_tournament = 'user_information_tournament',
  is_regular_tournament = 'is_regular_tournament',
  tournament_players = 'tournament_players',
  status_auth = 'status_auth',
  isTournamentStar = 'isTournamentStar',
  tournament_status = 'tournament_status'
}

export enum StatusAuth {
  no_auth = 'no_auth',
  token_auth = 'token_auth'
}

export const URL = {
  user: '/user',
  games: '/games',
  email: '/email',
  auth: '/auth',
  db_connect: '/db_connect',
  check_role_user: '/check_role_user',
  tournament: '/tournament',
}

export enum METHODS {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE'
}

export const successCodes: Codes = {
  POST: [200, 201],
  GET: 200,
  DELETE: 200
}
