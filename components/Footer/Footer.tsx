import { FC } from 'react';

import { MainContainer } from 'components/MainContainer';

import { themeMaterial } from 'const/styles';

import styles from './footer.module.scss';

export const Footer: FC = () => {
  const { palette } = themeMaterial

  return (
    <footer
      className={styles.footer}
      style={{
        backgroundColor: palette.grey[300]
      }}
    >
      <MainContainer>
        <h2>Это подвал</h2>
      </MainContainer>
    </footer>
  );
}
