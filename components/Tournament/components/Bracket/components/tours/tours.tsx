import { FC, useState } from 'react';
import uuid from 'react-uuid';
import cn from 'classnames';

import { H3, H4 } from 'ui/components/title';
import { Modal } from 'ui/components/modal';
import { Button } from 'ui/components/button';
import { Notification } from 'ui/components/notification';

import { Pair, PlayerStatus } from 'reacoil/atoms/tournament/type';
import { ModalName, NotificationName } from 'reacoil/atoms/modal/const';

import { Theme } from 'const/theme';

import { Nullable } from 'types/global';

import useModal from 'hooks/modal.hook';

import { TournamentToursProps } from './type';

import styles from './tours.module.scss';

export const TournamentTours: FC<TournamentToursProps> = (props) => {
  const { tours, active = false } = props;

  const [pair, setPair] = useState<Nullable<Pair>>(null);

  const { handleOpenModal } = useModal();

  const handleSaveResultPair = () => {

  }

  const handleChangePairInformation = (pair: Pair) => () => {
    setPair(pair);

    handleOpenModal(ModalName.tournament_change_points)();
  }

  return (
    <>
      <ul className={cn('flex flex-row flex-aligh_center', styles.container)}>
        {tours.map((tour, index) => {
          return (
            <li className={styles.tourContainer} key={uuid()}>
              {!active && <H3 className={styles.tourTitle}>Тур № {index + 1}</H3>}
              <ul className={styles.tourList}>
                {tour.map((pair, index) => {
                  return (
                    <li className={styles.pairContainer} key={uuid()}>
                      <H4 className={styles.pairTitle}>Пара № {index + 1}</H4>

                      <ul className={styles.pairList}>
                        {pair.players.map((player) => {
                          const { id, points, name, nick, status } = player;

                          return (
                            <li
                              key={id}
                              className={cn(styles.item, {
                                'theme-background--success':
                                  status === PlayerStatus.winner,
                                'theme-background--error':
                                  status === PlayerStatus.loser,
                                'theme-background--information':
                                  status === PlayerStatus.draw,
                              })}>
                              <span className={styles.playerName}>{name} ({nick})</span>
                              <span className={styles.playerPoints}>
                                {points}
                              </span>
                            </li>
                          );
                        })}
                        {
                          active && (
                            <>
                              <li className={styles.item}>
                                <Button onClick={handleChangePairInformation(pair)} className='full-width'>Изменить результаты</Button>
                              </li>
                              <li className={styles.item}>
                                <Button onClick={handleOpenModal(NotificationName.tournament_save_points)} className='full-width' color='success'>Сохранить результаты</Button>
                              </li>
                            </>
                          )
                        }
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>

      {
        active && (
          <>
            <Modal name={ModalName.tournament_change_points}>
              <span>Изменить что то</span>
            </Modal>

            <Notification
              name={NotificationName.tournament_save_points}
              theme={Theme.success}
              title='Сохранение результата матча'
              text={`Вы действительно хотите сохранить данные результаты матча?`}
              successCallback={handleSaveResultPair}
              />
          </>
        )
      }
    </>
  );
};
