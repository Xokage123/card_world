import { FC, useState, useMemo } from 'react';
import { toast } from 'react-toastify'
import cn from 'classnames'
import { Formik, FormikProps } from 'formik';
import { useRecoilState, useRecoilValue } from 'recoil'

import instance from 'api'
import { URL, METHODS, LocalKeys } from 'api/const'
import { Response } from 'api/types'

import { RoleUser } from 'backend/models/User'

import { Body } from 'pages/api/check_role_user'

import { Values } from './types'
import { schema } from './schema'

import { Select } from 'ui/components/Select';
import { Form } from 'ui/components/Form';
import { Checkbox } from 'ui/components/Checkbox';
import { FIELDS, IField } from 'ui/components/Input/types'

import { IconButton, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import {
  selector_gamesOptions,
  selector_actualGame
} from 'reacoil/atoms/games';

import styles from './tournament.module.scss';

const ISSERVER = typeof window === "undefined";

export const Tournament: FC = () => {
  const [open, setOpen] = useState<boolean>(true)

  const [actualGame, setActualGame] = useRecoilState(selector_actualGame)
  const gamesOptions = useRecoilValue(selector_gamesOptions)

  const [isCheckTournament, setIsCheckTournament] = useState<boolean>(() => {
    if (!ISSERVER) {
      const informationTournament = localStorage.getItem(LocalKeys.user_information_tournament)

      return !!informationTournament
    }

    return false
  })

  const initialValues = useMemo<Values>(() => ({
    [FIELDS.email]: '',
    [FIELDS.secret_key]: ''
  }), [])

  const fields = useMemo<IField[]>(() => [
    {
      title: 'Почта',
      name: FIELDS.email,
      type: 'email',
      placeholder: 'Введите почту организатора'
    },
    {
      title: 'Ваш ключ',
      name: FIELDS.secret_key,
      type: 'text',
      placeholder: 'Введите ключ'
    },
  ], [])

  const [isSaveTournament, setIsSaveTournament] = useState<boolean>(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeGame = (newValue: string) => {
    setActualGame(newValue)
  }

  const handleSubmit = async (values: Values) => {
    const body: Body = {
      email: values.email,
      secretKey: values.secret_key,
      status: RoleUser.judge,
      gameName: actualGame
    }

    try {
      const response = await instance({
        method: METHODS.POST,
        url: URL.check_role_user,
        data: body
      })

      const { data, error }: Response<string> = response.data

      if (data) {
        toast.success('Доступ для проведения турнира разрешен', {
          toastId: URL.check_role_user
        })

        if (ISSERVER) {
          localStorage.setItem(LocalKeys.user_information_tournament, JSON.stringify(body))
        }

        setIsCheckTournament(true)
      }

      if (error) {
        toast.error(error, {
          toastId: URL.check_role_user
        })
      }
    } catch (error) { }
  }

  const getButtons = (props: FormikProps<Values>) => (
    <Button disabled={!props.isValid} type="submit" variant="contained">Проверить данные</Button>
  )

  const iconCloseInformation = (
    <IconButton
      classes={{
        root: styles.button
      }}
      color="primary"
      aria-label="close"
      component="button"
      onClick={handleClose}
    >
      <ArrowBackIcon /> Закрыть информацию
    </IconButton>
  )

  const iconOpenInformation = (
    <IconButton
      classes={{
        root: styles.button
      }}
      color="primary"
      aria-label="open"
      component="button"
      onClick={handleOpen}
    >
      Открыть информацию <ArrowForwardIcon />
    </IconButton>
  )

  const handleCheckedSaveTournament = (newValue: boolean) => {
    setIsSaveTournament(newValue)
  }

  return (
    <div className={styles.wrapper}>
      <Box
        className={cn(styles.container)}
      >
        {
          open ? (
            <div className={cn(styles.information, styles.container)}>
              {iconCloseInformation}

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
                      title="Информация о турнире"
                      buttonsElement={getButtons(props)}
                    >
                      <Select
                        label="Игра"
                        name="games"
                        options={gamesOptions}
                        value={actualGame}
                        onChange={handleChangeGame}
                      />
                    </Form>
                  )
                }
              </Formik>

              <Checkbox
                label='Сохранить результаты турнира'
                checked={isSaveTournament}
                handleChecked={handleCheckedSaveTournament}
              />
            </div>
          ) : iconOpenInformation
        }
      </Box>
      <section className={cn(styles.bracket, styles.container, {
        'full-width': !open
      })}>
        Введите все данные для формирования турнирной сетки
      </section>
    </div>
  );
}
