import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { Formik, Field, Form, FormikProps, FieldProps } from 'formik';

import { Typography, Button } from '@mui/material';

import { schema } from './schema';

import { FIELDS, IField, Values } from './types';

import { FieldElement } from 'ui/components/Input'

import styles from './registration.module.scss';
import instance from 'api';
import { URL } from 'api/const';
import { FetchEmail } from 'pages/api/email';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const RegistrationContent: FC = () => {
  const router = useRouter()

  const initialValues = useMemo<Values>(() => ({
    email: '',
    password: ''
  }), [])

  const fields = useMemo<IField[]>(() => [
    {
      title: 'Почта',
      name: FIELDS.email,
      type: 'email',
      placeholder: 'Введите почту'
    },
    {
      title: 'Пароль',
      name: FIELDS.password,
      type: 'password',
      placeholder: 'Введите пароль'
    },
  ], [])

  const handleSubmit = async (values: Values) => {
    console.log(values)

    const { email, password } = values

    const data: FetchEmail = {
      email
    }

    toast.info('Проверяем почту', {
      toastId: URL.email
    })

    instance({
      url: URL.email,
      method: 'POST',
      data
    })
    .then((res) => {
      toast.success(`Мы отправили код на почту: ${email}`, {
        toastId: URL.email
      })
      console.log(res)
    })
    .catch((error: AxiosError<FetchEmail>) => {
      console.log(error)
    })
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className={styles.container}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={schema}
        validateOnChange
      >
        {
          (props: FormikProps<Values>) => (
            <Form className={styles.form}>
              <Typography variant='h4' className={styles.title}>Регистрация</Typography>

              {
                fields.map(field => {
                  const { name, placeholder, title, type } = field

                  return (
                    <div key={name} className={styles.inputContainer}>
                      <Field id={name} name={name} className={styles.inputField}>
                        {
                          (props: FieldProps<Values>) => <FieldElement variant="outlined" label={title} type={type} placeholder={placeholder} {...props} />
                        }
                      </Field>
                    </div>
                  )
                })
              }

              <div className={styles.buttons}>
                <Button className={styles.button} variant="outlined" onClick={handleBack}>Назад</Button>
                <Button className={styles.button} disabled={!props.isValid} type="submit" variant="contained">Регистрация</Button>
              </div>
            </Form>
          )
        }
      </Formik>
    </div>
  );
}
