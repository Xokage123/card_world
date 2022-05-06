import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Formik, FormikProps } from 'formik';
import { useSetRecoilState } from 'recoil'

import { Button } from '@mui/material';

import { LINKS } from 'const/links';

import { atom_statusAuth } from 'reacoil/atoms/auth'

import { Data as DataAuth } from 'pages/api/auth'

import instance from 'api';
import {  METHODS, LocalKeys } from 'api/const';
import { Response } from 'api/types';

import { schema } from './schema';

import { Values } from './types';

import { FIELDS, IField } from 'ui/components/Input/types'
import { Form } from 'ui/components/Form'

import styles from './auth.module.scss';

export const AuthContent: FC = () => {
  const router = useRouter()

  const setStatusAuth = useSetRecoilState(atom_statusAuth);

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
    instance({
      url: LINKS.auth,
      method: METHODS.POST,
      data: values
    })
      .then((response: AxiosResponse<Response<DataAuth>>) => {
        const { data, error } = response.data
        if (data) {
          const { token } = data

          toast.success('Вы успешно авторизировались!', {
            toastId: LINKS.auth
          })

          setStatusAuth(true)

          localStorage.setItem(LocalKeys.user_token, token)

          router.push({
            pathname: LINKS.news
          })
        }

        if (error) {
          toast.error(error, {
            toastId: LINKS.auth
          })
        }
      })
      .catch((error: AxiosError) => {
        toast.error(error.message, {
          toastId: LINKS.auth
        })
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

  const getButtons = (props: FormikProps<Values>) => (
    <>
      <Button disabled className={styles.button} variant="outlined" onClick={handleRegistration}>Регистрация</Button>
      <Button disabled className={styles.button} variant="text" onClick={handleResetPassword}>Забыли пароль?</Button>
      <Button className={styles.button} disabled={!props.isValid} type="submit" variant="contained">Вход</Button>
    </>
  )

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={schema}
          validateOnChange
        >
          {
            (props: FormikProps<Values>) => (
              <Form
                fields={fields}
                title="Аторизация"
                buttonsElement={getButtons(props)}
              />
            )
          }
        </Formik>
      </div>
    </div>
  );
}
