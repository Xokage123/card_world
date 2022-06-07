import { Nullable } from "types/global";

import { METHODS, URL } from "./const";

export interface Config {
  auth?: boolean;
  method?: METHODS;
  url: URL;
}

export interface Props<T, B> {
  data?: T;
  params?: {
    [k: string]: string | number
  };
  successCallback?: (data: B) => void;
  errorCallback?: (data: string) => void;
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
