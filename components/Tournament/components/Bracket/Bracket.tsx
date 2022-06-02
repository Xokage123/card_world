import { FC, useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useRecoilState, useRecoilValue } from "recoil";

import {
  selector_players,
  selector_selectedIndex
} from 'reacoil/atoms/tournament'

import { Typography } from '@mui/material';
import { H3 } from 'ui/components/title/title';

import { Players } from './components/Players';

import styles from './bracket.module.scss';

const Bracket: FC = () => {
  const players = useRecoilValue(selector_players);
  const [selectedIndex, setSelectedIndex] = useRecoilState(selector_selectedIndex);

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
      <H3>Турнирная Информация</H3>

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

export default Bracket
function select_selectedIndex(select_selectedIndex: any): [any, any] {
  throw new Error('Function not implemented.');
}

