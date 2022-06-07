import dynamic from 'next/dynamic'
import { FC, useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify'
import { useMount } from 'react-use'
import cn from 'classnames'
import { Formik, FormikProps } from 'formik';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil'

import { URL, LocalKeys } from 'api/const'

import { RoleUser } from 'backend/models/User'
import { Modes, Names } from 'backend/models/Games';

import { removeLocalStorageValue } from 'helpers/local_storage'

const Bracket = dynamic(() => import('./components/Bracket/bracket'))
const Information = dynamic(() => import('./components/Information/Information'))

import { Body } from 'pages/api/check_role_user'

import { Values } from './types'
import { schema } from './schema'

import { Select } from 'ui/components/select';
import { Form } from 'ui/components/form';
import { Checkbox } from 'ui/components/checkbox';
import { FIELDS, IField } from 'ui/components/input/types'
import { InputElement } from 'ui/components/input';

import { IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Nullable } from 'types/global';

import {
  selector_gamesOptions,
  selector_actualGame,
  selector_isRegularTournament,
  selector_modesOptions
} from 'reacoil/atoms/games';
import {
  selector_tournamentInformation,
  selector_isTournamentStart
} from 'reacoil/atoms/tournament';
import {
  TournamentInformation
} from 'reacoil/atoms/tournament/types';

import styles from './tournament.module.scss';
import { fetch_postCheckUserRole } from 'api/points';

export const Tournament: FC = () => {
  const [open, setOpen] = useState(true);
  const [isValidateUser, setIsValidateUser] = useState(false);
  const [price, setPrice] = useState('0')

  const [actualGame, setActualGame] = useRecoilState(selector_actualGame);
  const [information, setInformation] = useRecoilState(selector_tournamentInformation);

  const setIsTournamentStart = useSetRecoilState(selector_isTournamentStart);

  const [isRegularMode, setIsRegularMode] = useRecoilState(selector_isRegularTournament);

  const gamesOptions = useRecoilValue(selector_gamesOptions)
  const modesOptions = useRecoilValue(selector_modesOptions)

  const [isCheckTournament, setIsCheckTournament] = useState<boolean>(false)
  const [mode, setMode] = useState<Nullable<Modes>>(null)
  const [isShowFormCheckUser, setIsShowFormCheckUser] = useState<boolean>(false)
  const [isSaveTournament, setIsSaveTournament] = useState<boolean>(false)

  useMount(() => {
    if (isRegularMode) {
      setIsCheckTournament(true)
    }
  })

  useEffect(() => {
    const noInformation = !information && !isRegularMode

    if (noInformation) {
      setIsCheckTournament(false)
    }
  }, [information, isRegularMode])

  useEffect(() => {
    if (isRegularMode) {
      setActualGame(isRegularMode)
      setMode('regular')
      setIsCheckTournament(true)

      return;
    }

    if (information) {
      setActualGame(information.game)
      setMode(information.mode)
      setIsCheckTournament(true)

      return;
    }

    setMode(modesOptions.length ? modesOptions[0].value : null)
  }, [modesOptions, isRegularMode])
  useEffect(() => {
    if (mode) {
      setIsShowFormCheckUser(mode !== 'regular')
    }
  }, [mode])

  const initialValues = useMemo<Values>(() => {
    return {
      [FIELDS.email]: '',
      [FIELDS.secret_key]: ''
    }
  }, [isCheckTournament])

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

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeGame = (newValue: Names) => {
    setActualGame(newValue)
  }

  const handleChangeMode = (newValue: Modes) => {
    setMode(newValue)
  }

  const handleCheckUser = async (data: Body) => {
    fetch_postCheckUserRole({
      data,
      successCallback: () => {
        toast.success('Доступ для проведения турнира разрешен', {
          toastId: URL.check_role_user
        })

        const { gameName, gameMode, status, email } = data;

        const information: TournamentInformation = {
          email,
          status,
          game: gameName,
          mode: gameMode,
          price
        }

        setInformation(information)

        setIsCheckTournament(true)
      },
      errorCallback: (error) => {
        toast.error(error, {
          toastId: URL.check_role_user
        })

        removeLocalStorageValue(LocalKeys.user_information_tournament)
      }
    })
  }

  const handleSubmit = (values: Values) => {
    if (actualGame && mode) {
      const body: Body = {
        email: values.email,
        secretKey: values.secret_key,
        status: RoleUser.judge,
        gameName: actualGame,
        gameMode: mode,
      }

      handleCheckUser(body)
    }
  }

  const handleStartRegularTournament = () => {
    if (actualGame && mode) {
      setInformation({
        game: actualGame,
        mode,
        price
      })

      setIsTournamentStart(true)

      setIsRegularMode(actualGame)
    }
  }

  const getButtons = (props: FormikProps<Values>) => (
    <>
      <Button disabled={!props.isValid} type="submit" variant="contained">Проверить данные</Button>
      <Button disabled={!props.isValid || !isValidateUser} type="submit" variant="contained">Начать турнир</Button>
    </>
  )

  const getCheckboxes = () => (
    <Checkbox
      label='Сохранить результаты турнира'
      checked={isSaveTournament}
      handleChecked={handleCheckedSaveTournament}
    />
  )

  const getPriceInput = () => {
    const onChange = (newValue: string) => {
      setPrice(newValue)
    }

    return (
      <InputElement
        value={price}
        onChange={onChange}
        label='Цена в ₽'
        type='number'
        placeholder='Введите стоимость турнира'
        variant='outlined'
      />
    )
  }

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

  const isShowInformation = useMemo(() => !!(isCheckTournament && mode), [mode, isCheckTournament])

  return (
    <div className={styles.wrapper}>
      <section
        className={cn(styles.container)}
      >
        {
          isShowInformation ?
            (
              <div className={cn(styles.information, styles.container)}>
                <Information />
              </div>
            )
            :
            (
              <>
                {
                  open ? (
                    <div className={cn(styles.information, styles.container)}>
                      {iconCloseInformation}

                      {
                        (mode && actualGame) && (
                          <>
                            <Select
                              disabled={isCheckTournament}
                              label="Игра"
                              name="games"
                              options={gamesOptions}
                              value={actualGame}
                              onChange={handleChangeGame}
                            />
                            <Select
                              disabled={isCheckTournament}
                              label="Режим"
                              name="modes"
                              options={modesOptions}
                              value={mode}
                              onChange={handleChangeMode}
                            />
                          </>
                        )
                      }

                      {getPriceInput()}

                      {
                        isShowFormCheckUser ?
                          (
                            <Formik
                              onSubmit={handleSubmit}
                              initialValues={initialValues}
                              validationSchema={schema}
                              validateOnChange
                            >
                              {
                                (props: FormikProps<Values>) => (
                                  <Form
                                    disabled={isCheckTournament}
                                    fields={fields}
                                    title="Организатор"
                                    buttonsElement={getButtons(props)}
                                    checkboxesElement={getCheckboxes()}
                                  />
                                )
                              }
                            </Formik>
                          )
                          :
                          (
                            <Button variant="contained" onClick={handleStartRegularTournament}>Начать турнир</Button>
                          )
                      }
                    </div>
                  ) : iconOpenInformation
                }
              </>
            )
        }
      </section>
      {isCheckTournament && <Bracket />}
    </div>
  );
}
