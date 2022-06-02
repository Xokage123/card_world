// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import User, { User as IUser, UserPublic } from 'backend/models/User'

import { Response } from 'api/types'
import { METHODS } from 'api/const'
import { getInitialResponseData, checkMethodRequest, returnAxiosError } from 'helpers/api'

export type Data = UserPublic

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Response<Data>>
) => {
  const responseData = getInitialResponseData<Data>()

  const { email } = request.query

  const availableMethods: string[] = [
    METHODS.GET,
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
    if (email) {
      const user: IUser = await new User({
        email
      })

      if (!user) {
        responseData.error = 'Не удалось найти пользователя'

        return response.status(200).json(responseData)
      }

      responseData.data = {
        email: user.email,
        initials: user.initials
      }

      return response.status(200).json(responseData)
    }
  } catch (error) {
    return returnAxiosError({
      error,
      response,
      data: responseData
    })
  }
}

export default handler
