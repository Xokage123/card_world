import { Nullable } from "types/global"

export interface Response<T> {
  data: Nullable<T>,
  error: Nullable<string>
}

export interface Codes {
  [k: string]: number | number[]
}

export interface JWTData {
  userId: string
}