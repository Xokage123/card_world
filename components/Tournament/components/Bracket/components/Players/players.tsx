import { FC, useCallback, useMemo, useState } from 'react';
import uuid from 'react-uuid';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { Table } from 'ui/components/table';
import { Notification } from 'ui/components/notification';

import useModal from 'hooks/modal.hook';

import { AddPlayerModal } from './modals/add_player_modal';

import { TableCell, TableRow } from '@mui/material';

import handleShuffleArray from 'utils/shuffleArray';

import { H3 } from 'ui/components/title/title';
import ButtonDelete from 'ui/components/button/component/button-delete/button-delete';
import { Button } from 'ui/components/button';

import {
  selector_players,
  selector_selectedIndex,
  selector_statusTournament,
  selector_tourActual,
} from 'reacoil/atoms/tournament';
import { ModalName, NotificationName } from 'reacoil/atoms/modal/const';

import { generateTour } from 'reacoil/atoms/tournament/utils';

import styles from './players.module.scss';
import { Checkbox } from 'ui/components/checkbox';
import { Player, Status } from 'reacoil/atoms/tournament/type';
import { Theme } from 'const/theme';
import { MIN_PLAYERS } from '../../const';
import { Nullable } from 'types/global';

export const Players: FC = () => {
  const [players, setPlayers] = useRecoilState(selector_players);
  const [statusTournament, setStatusTournament] = useRecoilState(
    selector_statusTournament,
  );
  const [tour, setTour] = useRecoilState(selector_tourActual);
  const setSelectedIndex = useSetRecoilState(selector_selectedIndex);

  const [deletedPlayer, setDeletedPlayer] = useState<Nullable<Player>>(null)

  const { handleOpenModal } = useModal();

  const handleChangePayment = (id: string) => (newValue: boolean) => {
    setPlayers(
      players.map((player) => {
        if (player.id === id) {
          return {
            ...player,
            isPayment: newValue,
          };
        }

        return player;
      }),
    );
  };

  const headersTable = ['Игрок', 'Колличество очков', 'Место', 'Оплата'];

  const getNotification = useCallback((numberPlayers: number) => {
    const information = {
      text: `Вы действительно хотите начать турнир с ${numberPlayers} игроками?`,
      theme: Theme.information,
      isShowButtons: true,
      title: 'Начать турнир',
      callback: handleStartTournament(players),
    };

    if (numberPlayers === 0) {
      (information.text = `Вы не можете начать турнир, так как в турнирной сетке нет игроков. Добавьте минимум ${MIN_PLAYERS} игроков для проведения турнира`),
        (information.title = 'Не добавлены игроки'),
        (information.theme = Theme.error),
        (information.callback = () => {}),
        (information.isShowButtons = false);
    }

    if (numberPlayers > 0 && numberPlayers < MIN_PLAYERS) {
      (information.text = `Вы не можете начать турнир, так как в турнирной сетке должно быть минимум ${MIN_PLAYERS} игрока.`),
        (information.title = 'Количество игроков меньше обязательного'),
        (information.theme = Theme.error),
        (information.callback = () => {}),
        (information.isShowButtons = false);
    }

    return (
      <Notification
        theme={information.theme}
        isShowButtons={information.isShowButtons}
        title={information.title}
        text={information.text}
        name={NotificationName.start_tournament}
        successCallback={information.callback}
      />
    );
  }, []);

  const handleOpenDeletePlayerNotification = (id: string) => () => {
    const player = players.find((player) => player.id == id);

    if (player) {
      setDeletedPlayer(player);
      handleOpenModal(NotificationName.delete_player)();

    }
  };

  const handleDeletePlayer = (player: Player) => () => {
    const filterPlayers = players.filter(_player => _player.id !== player.id);

    setPlayers(filterPlayers)
  }

  const handleStartTournament = (players: Player[]) => () => {
    // setStatusTournament(Status.main);

    const numberPairs = Math.round(players.length / 2);

    const shufflePlayers = handleShuffleArray([...players]);

    const tour = generateTour({
      players: shufflePlayers,
      number: numberPairs
    })

    setTour(tour);

    setSelectedIndex(2);
  };

  return (
    <>
      <div className={styles.buttons}>
        {statusTournament === Status.preparation && (
          <>
            <Button
              onClick={handleOpenModal(ModalName.add_player)}
              color="info"
              variant="contained">
              Добавить участника
            </Button>
          </>
        )}

        <Button
          onClick={handleOpenModal(NotificationName.start_tournament, players.length < MIN_PLAYERS)}
          className={styles.button_start}
          variant="contained"
          disabled={!players.every(player => player.isPayment)}
          >
          Начать турнир
        </Button>

        {statusTournament === Status.main && (
          <Button color="warning" variant="contained">
            Завершить турнир
          </Button>
        )}
      </div>

      <H3>Участники турнира</H3>

      <Table headers={headersTable}>
        {players.map((player) => {
          const { id, nick, points, isPayment, name, place } = player;

          return (
            <TableRow
              key={uuid()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" component="th" scope="row">
                {name} ({nick})
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {points}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {place}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <Checkbox
                  handleChecked={handleChangePayment(id)}
                  checked={isPayment}
                />
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <ButtonDelete onClick={handleOpenDeletePlayerNotification(id)}>
                  Удалить игрока
                </ButtonDelete>
              </TableCell>
            </TableRow>
          );
        })}
      </Table>

      {getNotification(players.length)}

      {
        deletedPlayer && (
          <Notification
          textButtons={{
            apply: 'Удалить'
          }}
            theme={Theme.error}
            title='Удаление игрока'
            text={`Вы действительно хотите удалить игрока: ${deletedPlayer.name} (${deletedPlayer.nick})`}
            name={NotificationName.delete_player}
            successCallback={handleDeletePlayer(deletedPlayer)}
          />
        )
      }

      <AddPlayerModal />
    </>
  );
};
