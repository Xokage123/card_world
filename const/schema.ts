import * as Yup from 'yup';

const textRequired = 'Данное поле является обазательным'

const textEmail = 'Вы ввели некорректную почту'

const passwordSchema = Yup.string().required(textRequired)

const emailSchema = Yup.string().email(textEmail).required(textRequired)

const requiredSchema = Yup.string().required(textRequired)

export {
  passwordSchema,
  emailSchema,
  requiredSchema
}