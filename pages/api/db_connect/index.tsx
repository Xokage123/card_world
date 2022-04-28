// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import config from 'config'

import { Response } from 'api/types'


const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Response<string>>
) => {
  try {
    const isConnect = await mongoose.connect(config.get('mongoUri'))

    return res.status(200).json({
      data: 'good',
      error: null
    })
  } catch (error) {
    return res.status(200).json({
      data: null,
      error: 'Не удалось подключится к базе данных. Обратитесь к разработчикам!'
    })
  }
}

export default handler
