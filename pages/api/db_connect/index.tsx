// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import config from 'config'

import { Response } from 'api/types'
import { SUCCESS_TEXT } from 'api/const'

import { getInitialResponseData, returnAxiosError } from 'helpers/api'


type Data = string

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<Response<Data>>
) => {
  const responseData = getInitialResponseData<Data>()

  try {
    await mongoose.connect(config.get('mongoUri'))

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
