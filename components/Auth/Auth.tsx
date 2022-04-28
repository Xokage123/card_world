import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { Formik, Field, Form, FormikProps, FieldProps } from 'formik';

import { Typography, Button } from '@mui/material';

import { schema } from './schema';

import { FIELDS, IField, Values } from './types';

import { FieldElement } from 'ui/components/Input'

import styles from './auth.module.scss';
import { LINKS } from 'const/links';

export const AuthContent: FC = () => {
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

  const handleSubmit = (values: Values) => {
    router.push({
      pathname: LINKS.news
    })
  }

  const handleRegistration = () => {
    router.push({
      pathname: LINKS.registration
    })
  }

  const handleResetPassword = () => {
    // router.push({
    //   pathname: LINKS.reset_password,
    // })
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
              <Typography variant='h4' className={styles.title}>Авторизация</Typography>

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
                <Button disabled className={styles.button} variant="outlined" onClick={handleRegistration}>Регистрация</Button>
                <Button disabled className={styles.button} variant="text" onClick={handleResetPassword}>Забыли пароль?</Button>
                <Button className={styles.button} disabled={!props.isValid} type="submit" variant="contained">Вход</Button>
              </div>
            </Form>
          )
        }
      </Formik>
    </div>
  );
}
