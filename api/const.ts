import { Codes } from "./types"

export const BASE_API_URL = 'http://localhost:3000/api'

export const URL = {
  user: '/user',
  email: '/email',
  auth: '/auth',
  db_connect: '/db_connect'
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