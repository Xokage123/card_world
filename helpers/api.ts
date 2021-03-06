import type { NextApiRequest, NextApiResponse } from 'next'

import { Response } from 'api/types'

import { Nullable } from "types/global"

import { AxiosError, AxiosPromise } from "axios"

export interface ResponseConfig<T> {
  code: number
  data: Response<T>
}

export const getInitialResponseData = <T>(): Response<T> => ({
  data: null,
  error: null
})

export const getAxiosError = (error: any) => {
  const errorLocale: AxiosError = error

  return errorLocale
}

interface ReturnAxiosErrorProps<T> {
  response: NextApiResponse<Response<T>>
  error: any,
  data: Response<T>
}

export const returnAxiosError = <T>(props: ReturnAxiosErrorProps<T>) => {
  const { error, data, response } = props
  const axiosError = getAxiosError(error)

  data.error = axiosError.message

  return response.status(400).json(data)
}

interface CkeckMethodRequestProps<T> {
  response: NextApiResponse<Response<T>>
  request: NextApiRequest
  availableMethods: string[]
}

const getMethodErrorConfig = <T>(): ResponseConfig<T> => {
  const responseData = getInitialResponseData<T>()

  return {
    code: 404,
    data: responseData
  }
}

export const checkMethodRequest = <T>(props: CkeckMethodRequestProps<T>): Nullable<ResponseConfig<T>> => {
  const { request, availableMethods } = props

  const isValidMethod = request.method && availableMethods.includes(request.method)

  if (isValidMethod) return null

  return getMethodErrorConfig<T>()
}