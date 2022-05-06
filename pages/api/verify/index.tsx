// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import config from 'config'

import User from 'backend/models/User'

import { Values as AuthValues } from 'components/Auth/types'

import { JWTData, Response } from 'api/types'
import { ERROR_TEXT, METHODS, SUCCESS_TEXT } from 'api/const'
import { getInitialResponseData, checkMethodRequest, returnAxiosError } from 'helpers/api'

export type Data = string

interface Body {
  token: string
}

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Response<Data>>
) => {
  const responseData = getInitialResponseData<Data>()

  const availableMethods: string[] = [
    METHODS.POST
  ]

  const methodErrorConfig = checkMethodRequest<Data>({
    request,
    response,
    availableMethods
  })

  if (methodErrorConfig) {
    const { code, data } = methodErrorConfig

    return response.status(code).json(data)
  }

  try {
    const bodyRequest: Body = request.body

    const { token } = bodyRequest

    const secret: string = config.get('jwtSecret')

    const jwtData = jwt.verify(token, secret) as JWTData

    const { userId } = jwtData

    const user = await User.findById(userId)

    if (!user) {
      responseData.error = ERROR_TEXT

      return response.status(404).json(responseData)
    }

    responseData.data = SUCCESS_TEXT

    return response.status(201).json(responseData)

  } catch (error) {
    return returnAxiosError({
      error,
      response,
      data: responseData
    })
  }
}

export default handler
