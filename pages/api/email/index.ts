// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import config from 'config'

import { METHODS } from 'api/const'
import { Response } from 'api/types'

import { Nullable } from 'types/global'
import { MailOptions } from 'nodemailer/lib/sendmail-transport'

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

      const user: string = config.get('mail_login')
      const pass: string = config.get('mail_password')

      const transportConfig = {
        host:'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user,
          pass,
        } 
      }

      const transporter = nodemailer.createTransport(transportConfig);

      const mailOptions: MailOptions = {
        from: '"Проверка почты" <maxartem0419@gmail.com>',
        to: 'maxartem0419@gmail.com',
        subject: "Подтверждение регистрация на CardWorld",
        text: `Use the following 5 digit code to confirm your email address \n${emailCode.toString()}`,
      };

      const info = await transporter.sendMail(mailOptions);

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
