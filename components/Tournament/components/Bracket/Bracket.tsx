import { FC, useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useRecoilState, useRecoilValue } from "recoil";
import cn from 'classnames';

import {
  selector_players,
  selector_selectedIndex,
  selector_statusTournament
} from 'reacoil/atoms/tournament';

import { H3 } from 'ui/components/title/title';

import { Players } from './components/Players';

import { statusTournament } from './const';

import styles from './bracket.module.scss';

const Bracket: FC = () => {
  const players = useRecoilValue(selector_players);
  const [selectedIndex, setSelectedIndex] = useRecoilState(selector_selectedIndex);
  const statusTournamentKey = useRecoilValue(selector_statusTournament);

  const onSelect = (index: number) => {
    setSelectedIndex(index)
  }

  const tabs = useMemo(() => [
    {
      name: 'Участники турнира',
      content: <Players />
    },
    {
      name: 'Прошлые туры',
      content: (
        <h2>Прошлые туры</h2>
      )
    },
    {
      name: 'Текущий тур',
      content: (
        <h2>Текущий тур</h2>
      )
    },
  ], [players])

  return (
    <section className='full-width'>
      <div className={styles.titleContainer}>
        <H3>Турнирная Информация</H3>
        {
          statusTournamentKey && (
            <span className={cn(`theme-text--${statusTournament[statusTournamentKey].theme}`, styles.titleStatus)}>
              {statusTournament[statusTournamentKey].text}
            </span>
          )
        }
      </div>

      <Tabs
        onSelect={onSelect}
        selectedIndex={selectedIndex}
      >
        <TabList>
          {
            tabs.map(tab => {
              const { name } = tab

              return (
                <Tab key={name}>{name}</Tab>
              )
            })
          }
        </TabList>

        {
          tabs.map(tab => {
            const { content, name } = tab

            return (
              <TabPanel key={name}>{content}</TabPanel>
            )
          })
        }
      </Tabs>
    </section>
  );
}

export default Bracket;
