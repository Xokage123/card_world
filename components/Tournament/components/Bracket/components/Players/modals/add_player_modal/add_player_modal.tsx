import { FC, useMemo, useState } from 'react';
import uuid from 'react-uuid';
import { useRecoilState, useRecoilValue } from 'recoil';

import { selector_players } from 'reacoil/atoms/tournament';

import { Modal } from 'ui/components/modal';

import { ModalName } from 'reacoil/atoms/modal/const'

import styles from './add_player_modal.module.scss';
import { Formik, FormikProps } from 'formik';
import { Values } from './type';
import { Form } from 'ui/components/form';
import { Button } from '@mui/material';
import { FIELDS, IField } from 'ui/components/input/types';
import { schema } from './shema';
import { Checkbox } from 'ui/components/checkbox';
import { selector_isRegularTournament } from 'reacoil/atoms/games';
import { Player } from 'reacoil/atoms/tournament/types';
import useModal from 'hooks/modal.hook';

export const AddPlayerModal: FC = (props) => {

  const [players, setPlayers] = useRecoilState(selector_players)

  const { handleCloseModal } = useModal()

  const isRegular = useRecoilValue(selector_isRegularTournament)

  const [isPayment, setIsPayment] = useState(false)

  const initialValues = useMemo<Values>(() => {
    return {
      [FIELDS.name]: '',
      [FIELDS.nickname]: ''
    }
  }, [])

  const fields = useMemo<IField[]>(() => {
    const fieldsLocale: IField[] = [
      {
        title: 'Имя игрока',
        name: FIELDS.name,
        type: 'text',
        placeholder: 'Введите имя игрока',
        required: true,
      },
      {
        title: 'Никнейм игрока',
        name: FIELDS.nickname,
        type: 'text',
        placeholder: 'Введите ник игрока',
        required: true,
      },
    ]

    const fieldKey: IField = {
      title: 'Уникальный номер',
      name: FIELDS.name,
      type: 'text',
      placeholder: 'Введите уникальный номер игрока',
      required: true,
    }

    return isRegular ? [...fieldsLocale] : [...fieldsLocale, fieldKey]
  }, [])

  const handleSubmit = async (values: Values) => {
    console.log(values)

    const { name, nickname } = values

    const newPlayer: Player = {
      id: uuid(),
      name,
      nick: nickname,
      points: 0,
      place: 0,
      isPayment
    }

    setPlayers([
      ...players,
      newPlayer
    ])

    handleCloseModal(ModalName.add_player)()
  }

  const handleToggleIsPayment = (newValue: boolean) => {
    setIsPayment(newValue)
  }

  const getButtons = (props: FormikProps<Values>) => (
    <Button disabled={!props.isValid} type="submit" variant="contained">Добавить игрока</Button>
  )

  const getCheckboxes = () => (
    <>
      <Checkbox
        label='Оплатил заранее'
        checked={isPayment}
        handleChecked={handleToggleIsPayment}
      />
    </>
  )

  return (
    <Modal name={ModalName.add_player}>
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
              title="Добавление нового игрока"
              buttonsElement={getButtons(props)}
              checkboxesElement={getCheckboxes()}
            />
          )
        }
      </Formik>
    </Modal>
  );
}
