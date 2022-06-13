import { FC } from 'react';
import uuid from 'react-uuid';
import cn from 'classnames';

import { H3, H4 } from 'ui/components/title';

import { TournamentToursProps } from './type';

import styles from './tournament-tours.module.scss';
import { PlayerStatus } from 'reacoil/atoms/tournament/types';

export const TournamentTours: FC<TournamentToursProps> = (props) => {
  const { tours } = props;

  return (
    <ul className={cn('flex flex-row flex-aligh_center', styles.container)}>
      {tours.map((tour, index) => {
        return (
          <li className={styles.tourContainer} key={uuid()}>
            <H3 className={styles.tourTitle}>Тур № {index + 1}</H3>

            <ul className={styles.tourList}>
              {tour.map((pair, index) => {
                return (
                  <li className={styles.pairContainer} key={uuid()}>
                    <H4 className={styles.pairTitle}>Пара № {index + 1}</H4>

                    <ul className={styles.pairList}>
                      {pair.map((player) => {
                        const { points, name, status } = player;

                        return (
                          <li
                            className={cn(styles.player, {
                              'theme-background--success':
                                status === PlayerStatus.winner,
                              'theme-background--error':
                                status === PlayerStatus.loser,
                              'theme-background--information':
                                status === PlayerStatus.draw,
                            })}>
                            <span className={styles.playerName}>{name}</span>
                            <span className={styles.playerPoints}>
                              {points}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};
