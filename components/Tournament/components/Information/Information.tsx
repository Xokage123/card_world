import { FC } from 'react';
import { useRecoilState } from 'recoil';

import { GamesMode, GamesName } from 'backend/models/Games'

import { Typography, Button } from '@mui/material';

import { H3 } from 'ui/components/title/title';

import {
  selector_isRegularTournament
} from 'reacoil/atoms/games';
import { selector_tournamentInformation } from 'reacoil/atoms/tournament';

import styles from './information.module.scss';

const Information: FC = (props) => {
  const [information, setInformation] = useRecoilState(selector_tournamentInformation)
  const [isRegularMode, setIsRegularMode] = useRecoilState(selector_isRegularTournament)

  const handleStartNewTournament = () => {
    setInformation(null)
    setIsRegularMode(null)
  }

  if (!information) return null

  const { email, game, mode, price } = information

  return (
    <div className={styles.container}>
      <H3>Информация о турнире</H3>

      {
        !isRegularMode && (
          <>
            <Typography variant='body1'>Организатор турнира: {email}</Typography>
          </>
        )
      }

      <Typography variant='body1'>Игра: {GamesName[game]}</Typography>
      <Typography variant='body1'>Режим: {GamesMode[mode]}</Typography>
      <Typography variant='body1'>Цена турнира: {price} ₽</Typography>

      <div>
        <Button onClick={handleStartNewTournament} variant="contained">Начать новый турнир</Button>
      </div>
    </div>
  );
}

export default Information
