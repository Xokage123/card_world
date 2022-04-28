// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'

import { METHODS } from 'api/const'
import { Response } from 'api/types'

import { Nullable } from 'types/global'

export interface FetchEmail {
  email: string
}

interface Data {
  code: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Response<Nullable<Data>>>
) => {
  const { method } = req

  if (method === METHODS.POST) {
    const { email }: FetchEmail = req.body

    try {
      const emailCode = Math.floor(Math.random() * 90_000) + 10_000;

      const transportConfig = {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_LOGIN,
          pass: process.env.EMAIL_PASSWORD,
        }
      }

      const transporter = nodemailer.createTransport(transportConfig);

      const mailOptions = {
        from: process.env.EMAIL_LOGIN,
        to: 'maxartem0419@gmail.com',
        subject: "Подтверждение регистрация на CardWorld",
        text: "Use the following 5 digit code to confirm your email address \n" + emailCode.toString()
      };

      const info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);

      const salt = bcrypt.genSaltSync(20)

      const hashCode = bcrypt.hashSync(String(emailCode), salt)

      const response: Response<Nullable<Data>> = {
        data: {
          code: hashCode
        },
        error: ''
      }

      return res.status(200).json(response)
    } catch (error: any) {
      const responseError: Response<Nullable<Data>> = {
        data: null,
        error: error.message
      }

      return res.status(404).json(responseError)
    }
  }
}

export default handler
