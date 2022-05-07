import { FC } from 'react';
import { useRecoilState } from 'recoil';

import { Typography, Button } from '@mui/material';

import {
  atom_gameInformation
} from 'reacoil/atoms/games';

import styles from './information.module.scss';

const Information: FC = () => {
  const [information, setInformation] = useRecoilState(atom_gameInformation)

  const handleStartNewTournament = () => {
    setInformation(null)
  }

  return (
    <>
      {
        information && (
          <div className={styles.container}>
            <Typography variant='h5'>Информация о турнире</Typography>
            <Typography variant='body1'>Организатор турнира: {information.email}</Typography>
            <Typography variant='body1'>Игра: {information.gameName}</Typography>
            <div>
              <Button onClick={handleStartNewTournament} variant="contained">Начать новый турнир</Button>
            </div>
          </div>
        )
      }
    </>
  );
}

export default Information
