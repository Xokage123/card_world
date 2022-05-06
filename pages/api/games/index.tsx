// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import Games, { Game } from 'backend/models/Games'

import { Response } from 'api/types'
import { METHODS } from 'api/const'
import { getInitialResponseData, checkMethodRequest, returnAxiosError } from 'helpers/api'

export type Data = Game[]

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Response<Data>>
) => {
  const responseData = getInitialResponseData<Data>()

  const availableMethods: string[] = [
    METHODS.GET,
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

    const games: Game[] = await Games.find()

    responseData.data = games

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
