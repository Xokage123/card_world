import { FC, useCallback, useMemo } from 'react';
import uuid from 'react-uuid';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { Table } from 'ui/components/table';
import { Notification } from 'ui/components/notification';

import useModal from 'hooks/modal.hook';

import { AddPlayerModal } from './modals/add_player_modal';

import { TableCell, TableRow } from '@mui/material';

import {
  selector_players,
  selector_selectedIndex,
  selector_statusTournament,
} from 'reacoil/atoms/tournament';
import { ModalName, NotificationName } from 'reacoil/atoms/modal/const';

import styles from './players.module.scss';
import { H3 } from 'ui/components/title/title';
import { Button } from 'ui/components/button';
import { Checkbox } from 'ui/components/checkbox';
import { Status } from 'reacoil/atoms/tournament/types';
import { Theme } from 'const/theme';
import { MIN_PLAYERS } from '../../const';

export const Players: FC = () => {
  const [players, setPlayers] = useRecoilState(selector_players);
  const [statusTournament, setStatusTournament] = useRecoilState(
    selector_statusTournament,
  );

  const setSelectedIndex = useSetRecoilState(selector_selectedIndex);

  const { handleOpenModal } = useModal();

  const handleChangePayment = (nick: string) => (newValue: boolean) => {
    setPlayers(
      players.map((player) => {
        if (player.nick === nick) {
          return {
            ...player,
            isPayment: newValue,
          };
        }

        return player;
      }),
    );
  };

  const headersTable = useMemo(
    () => ['Игрок', 'Колличество очков', 'Место', 'Оплата'],
    [],
  );

  const getNotification = useCallback((numberPlayers: number) => {
    const information = {
      text: `Вы действительно хотите начать турнир с ${numberPlayers} игроками?`,
      theme: Theme.information,
      isShowButtons: true,
      title: 'Начать турнир',
      callback: handleStartTournament,
    };

    if (numberPlayers === 0) {
      (information.text = `Вы не можете начать турнир, так как в турнирной сетке нет игроков. Добавьте минимум ${MIN_PLAYERS} игроков для проведения турнира`),
        (information.title = 'Не добавлены игроки'),
        (information.theme = Theme.error),
        (information.callback = () => {}),
        (information.isShowButtons = false);
    }

    if (numberPlayers > 0 && numberPlayers < MIN_PLAYERS) {
      (information.text = `Вы не можете начать турнир, так как в турнирной сетке  lj ${MIN_PLAYERS} игроков для проведения турнира`),
        (information.title = 'Не добавлены игроки'),
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

  const handleDeletePlayer = (id: string) => () => {
    const newPlayer = players.filter((player) => player.id !== id);

    setPlayers(newPlayer);
  };

  const handleStartTournament = () => {
    setStatusTournament(Status.main);

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
            <Button
              onClick={handleOpenModal(NotificationName.start_tournament)}
              className={styles.button_start}
              variant="contained">
              Начать турнир
            </Button>
          </>
        )}

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
                  handleChecked={handleChangePayment(nick)}
                  checked={isPayment}
                />
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <button onClick={handleDeletePlayer(id)}>Удалить</button>
              </TableCell>
            </TableRow>
          );
        })}
      </Table>

      <Notification
        theme={Theme.error}
        isShowButtons={false}
        title="Начать турнир"
        text={`Вы действительно хотите начать турнир с ${players.length} игроками?`}
        name={NotificationName.start_tournament}
        successCallback={handleStartTournament}
      />

      <AddPlayerModal />
    </>
  );
};
