import { FC } from 'react';

import { Navigate } from 'components/Navigate';

import styles from './header.module.scss';

export const Header: FC = () => {
  return (
    <header
      className={styles.header}
    >
      <Navigate />
    </header>
  );
}
