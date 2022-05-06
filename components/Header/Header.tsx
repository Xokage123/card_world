import { FC } from 'react';

import Typography from '@mui/material/Typography';

import { MainContainer } from 'components/MainContainer';
import { Navigate } from 'components/Navigate';

import { themeMaterial } from 'const/styles';

import styles from './header.module.scss';

export const Header: FC = () => {
  const { palette } = themeMaterial

  return (
    <header
      className={styles.header}
    >
      <Navigate />
    </header>
  );
}
