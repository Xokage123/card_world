import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { toast } from 'react-toastify';
import { Formik, FormikProps } from 'formik';
import { useSetRecoilState } from 'recoil'

import { Button } from '@mui/material';

import { setLocalStorageValue } from 'helpers/local_storage';

import { LINKS, startPageLink } from 'const/links';

import {
  atom_userInformation
} from 'reacoil/atoms/user';

import { LocalKeys, StatusAuth } from 'api/const';

import {
  fetch_postAuth,
  fetch_getUserInformation
} from 'api/points'

import { schema } from './schema';

import { Values } from './types';

import { FIELDS, IField } from 'ui/components/input/types'
import { Form } from 'ui/components/form'

import styles from './auth.module.scss';

export const AuthContent: FC = () => {
  const router = useRouter()

  const setUserInformation = useSetRecoilState(atom_userInformation);

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
    try {
      fetch_postAuth({
        data: values,
        successСallback: async (data) => {
          const { email } = values
          const { token } = data

          setLocalStorageValue(LocalKeys.user_token, token)

          fetch_getUserInformation({
            params: {
              email
            },
            successСallback: (data) => {
              toast.success('Вы успешно авторизировались!', {
                toastId: LINKS.auth
              })

              setLocalStorageValue(LocalKeys.status_auth, StatusAuth.token_auth)

              setUserInformation(data)

              router.push({
                pathname: startPageLink
              })
            }
          })
        }
      })
    } catch (error: any) {
      toast.error(error.message, {
        toastId: LINKS.auth
      })
    }
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

  const handleNoAuth = () => {
    setLocalStorageValue(LocalKeys.status_auth, StatusAuth.no_auth)

    router.push({
      pathname: startPageLink
    })
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
        <Button className={styles.button} variant="outlined" onClick={handleNoAuth}>Продолжить без авторизации</Button>

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
