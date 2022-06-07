import { AxiosResponse, AxiosRequestConfig } from 'axios';

import { UserPublic } from 'backend/models/User';
import { Game } from 'backend/models/Games';

import { instance, auth_instance } from './';

import { METHODS, URL } from 'api/const';
import { Response, Config, Props } from 'api/types';

import { checkCallbacks } from 'helpers/api'

import { Data as DataAuth } from 'pages/api/auth';

const getMainFetch = <R>(configProps: Config) => async <D>(props: Props<D, R>) => {
  const { url, method = METHODS.GET, auth } = configProps
  const { data, params } = props

  const config: AxiosRequestConfig = {
    url,
    method,
    data,
    params
  }

  const mainInstance = auth ? auth_instance : instance;

  const response: AxiosResponse<Response<R>> = await mainInstance(config)

  checkCallbacks(response, props)

  return response.data
}

export const fetch_postAuth = getMainFetch<DataAuth>({
  method: METHODS.POST,
  url: URL.auth,
  auth: true,
})

export const fetch_getUserInformation = getMainFetch<UserPublic>({
  url: URL.user,
})


export const fetch_postCodeOnEmail = getMainFetch<string>({
  method: METHODS.POST,
  url: URL.email,
})

export const fetch_postCheckUserRole = getMainFetch<string>({
  method: METHODS.POST,
  url: URL.check_role_user,
})

export const fetch_getGames = getMainFetch<Game[]>({
  url: URL.games,
})

export const fetch_connectMongoDB = getMainFetch<string>({
  url: URL.db_connect,
})

