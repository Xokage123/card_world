import { FC, useMemo, ChangeEvent } from 'react';
import uuid from 'react-uuid';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { Table } from 'ui/components/table';

import useModal from 'hooks/modal.hook';

import { AddPlayerModal } from './modals/add_player_modal'

import {
  TableCell,
  TableRow,
  Button,
  Checkbox
} from '@mui/material';

import {
  selector_players,
  selector_selectedIndex,
} from 'reacoil/atoms/tournament'
import {
  ModalName
} from 'reacoil/atoms/modal/const'

import styles from './players.module.scss';
import { H3 } from 'ui/components/title/title';

export const Players: FC = () => {
  const [players, setPlayers] = useRecoilState(selector_players)
  const setSelectedIndex = useSetRecoilState(selector_selectedIndex)

  const { handleOpenModal } = useModal()

  const handleChangePayment = (nick: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const newIsPayment = event.target.checked;

    setPlayers(players.map(player => {
      if (player.nick === nick) {
        return {
          ...player,
          isPayment: newIsPayment
        }
      }

      return player
    }))
  }

  const headersTable = useMemo(() => [
    'Игрок',
    'Колличество очков',
    'Место',
    'Оплата турнира'
  ], [])

  const handleDeletePlayer = (id: string) => () => {
    const newPlayer = players.filter(player => player.id !== id)

    setPlayers(newPlayer)
  }

  const handleStartTournament = () => {
    setSelectedIndex(2)
  }

  return (
    <>
      <div className={styles.buttons}>
        <Button onClick={handleOpenModal(ModalName.add_player)} variant="contained">Добавить участника</Button>
        <Button onClick={handleStartTournament} className={styles.button_start} variant="contained">Начать турнир</Button>
      </div>
      
      <H3>Участники турнира</H3>

      <Table headers={headersTable}>
        {players.map((player) => {
          const { id, nick, points, isPayment, name, place } = player

          return (
            <TableRow
              key={uuid()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">{name} ({nick})</TableCell>
              <TableCell align="center" component="th" scope="row">{points}</TableCell>
              <TableCell align="center" component="th" scope="row">{place}</TableCell>
              <TableCell align="center" component="th" scope="row">
                <Checkbox onChange={handleChangePayment(nick)} checked={isPayment} />
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <button onClick={handleDeletePlayer(id)}>Удалить</button>
              </TableCell>
            </TableRow>
          )
        })}
      </Table>

      <AddPlayerModal />
    </>
  );
}
