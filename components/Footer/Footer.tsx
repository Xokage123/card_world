import { FC } from 'react';

import { MainContainer } from 'components/MainContainer';

import { themeMaterial } from 'const/styles';

import styles from './footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <MainContainer>
      </MainContainer>
    </footer>
  );
}
