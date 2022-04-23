import { FC } from 'react';

import Typography from '@mui/material/Typography';

import { MainContainer } from 'components/MainContainer';

import { themeMaterial } from 'const/styles';

import styles from './header.module.scss';

export const Header: FC = () => {
  const { palette } = themeMaterial

  return (
    <header
      className={styles.header}
      style={{
        backgroundColor: palette.grey[300]
      }}>
      <MainContainer classes={styles.container}>
        <Typography
          variant='h3'
          sx={{
            color: palette.secondary.main
          }}
        >
          Card World
        </Typography>
      </MainContainer>
    </header>
  );
}
