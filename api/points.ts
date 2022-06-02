import { AxiosResponse, AxiosRequestConfig } from 'axios';

import { Data as DataAuth } from 'pages/api/auth';

import { UserPublic } from 'backend/models/User'

import instance from './'
import { METHODS, URL} from 'api/const';
import { Response, PointProps } from 'api/types';

import { checkCallbacks } from 'helpers/api'

export const fetch_postAuth = async <T>(props: PointProps<T, DataAuth>) => {
  const { data, params } = props
  const config: AxiosRequestConfig = {
    url: URL.auth,
    method: METHODS.POST,
    data,
    params
  }

  const response: AxiosResponse<Response<DataAuth>> = await instance(config)

  checkCallbacks(response, props)

  return response.data
}

export const fetch_getUserInformation = async <T>(props: PointProps<T, UserPublic>) => {
  const { data, params } = props

  const config: AxiosRequestConfig = {
    url: URL.user,
    method: METHODS.GET,
    data,
    params
  }

  const response: AxiosResponse<Response<UserPublic>> = await instance(config)

  checkCallbacks(response, props)

  return response.data
}
