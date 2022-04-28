import * as Yup from 'yup';

const textRequired = 'Данное поле является обазательным'
const textEmail = 'Вы ввели некорректную почту'

export const passwordSchema = Yup.string().required(textRequired)

export const emailSchema = Yup.string().email(textEmail).required(textRequired)