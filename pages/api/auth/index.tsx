// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'

import User from 'backend/models/User'

import { Values as AuthValues } from 'components/Auth/types'

import { JWTData, Response } from 'api/types'
import { METHODS } from 'api/const'
import { getInitialResponseData, checkMethodRequest, returnAxiosError } from 'helpers/api'

export interface Data {
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
    const bodyRequest: AuthValues = request.body

    const { email, password } = bodyRequest

    const user = await User.findOne({
      email
    })

    if (!user) {
      responseData.error = 'Пользователь не найден'

      return response.status(200).json(responseData)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      responseData.error = 'Вы ввели неверный пароль, попробуйте еще раз!'

      return response.status(200).json(responseData)
    }

    const jwt_data: JWTData = {
      userId: user.id
    }

    const token = jwt.sign(
      jwt_data,
      config.get('jwtSecret'),
      {
        expiresIn: '7d'
      }
    )

    responseData.data = {
      token
    }

    return response.status(200).json(responseData)


  } catch (error) {
    return returnAxiosError({
      error,
      response,
      data: responseData
    })
  }
}

export default handler
