import { Nullable } from "types/global"

export interface PointProps<T, B> {
  data?: T;
  successСallback?: (data: B) => void;
  errorСallback?: (data: string) => void;
  params?: {
    [k: string]: string | number
  };
}

export interface Response<T> {
  data: Nullable<T>;
  error: Nullable<string>;
}

export interface Codes {
  [k: string]: number | number[];
}

export interface JWTData {
  userId: string;
}
