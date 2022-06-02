// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import config from 'config'

import User, { RoleUser, User as IUser} from 'backend/models/User'
import { Modes, Names } from 'backend/models/Games';

import { Response } from 'api/types'
import { METHODS, SUCCESS_TEXT } from 'api/const'
import { getInitialResponseData, checkMethodRequest, returnAxiosError } from 'helpers/api'
import { Nullable } from 'types/global';

export type Data = string

export interface Body {
  gameName: Names;
  status: RoleUser;
  secretKey: string;
  email: string;
  gameMode: Modes;
}

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Response<Data>>
) => {
  const responseData = getInitialResponseData<Data>()

  const availableMethods: string[] = [
    METHODS.POST,
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
    const { gameName, status, email, secretKey }: Body = request.body

    const user: Nullable<IUser> = await User.findOne({
      email
    })

    if (!user) {
      responseData.error = 'Пользователь не найден! Попробуйте еще раз'

      return response.status(200).json(responseData)
    }

    const isCheckKey = secretKey === config.get('secretKeyRole')

    if (!isCheckKey) {
      responseData.error = 'Вы ввели неверный ключ! Попробуйте еще раз!'

      return response.status(200).json(responseData)
    }

    const isCheckRole = user.role.find(role => role.game === gameName && role.status === status)

    if (!isCheckRole) {
      responseData.error = 'У вас нет нужных прав на этом аккаунте!'

      return response.status(200).json(responseData)
    }

    responseData.data = SUCCESS_TEXT

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
