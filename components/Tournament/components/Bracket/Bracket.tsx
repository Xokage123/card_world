import { FC, useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useRecoilState, useRecoilValue } from 'recoil';
import cn from 'classnames';

import {
  selector_players,
  selector_selectedIndex,
  selector_statusTournament,
  selector_tours,
} from 'reacoil/atoms/tournament';

import { H3 } from 'ui/components/title/title';

import { Players } from './components/players';
import { TournamentTours } from './components/tournament-tours';

import { statusTournament } from './const';

import styles from './bracket.module.scss';

const Bracket: FC = () => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(
    selector_selectedIndex,
  );

  const players = useRecoilValue(selector_players);
  const statusTournamentKey = useRecoilValue(selector_statusTournament);
  const tours = useRecoilValue(selector_tours);

  const onSelect = (index: number) => {
    setSelectedIndex(index);
  };

  const tabs = useMemo(
    () => [
      {
        name: 'Участники турнира',
        content: <Players />,
      },
      {
        name: 'Прошлые туры',
        content: <TournamentTours tours={tours} />,
      },
      {
        name: 'Текущий тур',
        content: <h2>Текущий тур</h2>,
      },
    ],
    [players],
  );

  return (
    <section className={cn('full-width', styles.wrapper)}>
      <div className={styles.titleContainer}>
        <H3>Турнирная Информация</H3>
        {statusTournamentKey && (
          <span
            className={cn(
              `theme-text--${statusTournament[statusTournamentKey].theme}`,
              styles.titleStatus,
            )}>
            {statusTournament[statusTournamentKey].text}
          </span>
        )}
      </div>

      <Tabs onSelect={onSelect} selectedIndex={selectedIndex}>
        <TabList>
          {tabs.map((tab) => {
            const { name } = tab;

            return <Tab key={name}>{name}</Tab>;
          })}
        </TabList>

        {tabs.map((tab) => {
          const { content, name } = tab;

          return <TabPanel key={name}>{content}</TabPanel>;
        })}
      </Tabs>
    </section>
  );
};

export default Bracket;
