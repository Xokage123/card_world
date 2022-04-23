
import { FC } from 'react';

import { Props } from './types';

import { Header } from 'components/Header'
import { Footer } from 'components/Footer'
import { MainContainer } from 'components/MainContainer';

import styles from './layout.module.scss';

export const Layout: FC<Props> = (props) => {
  const { children } = props

  return (
    <>
      <Header />
      <main className={styles.main}>
        <MainContainer>
          {children}
        </MainContainer>
      </main>
      <Footer />
    </>
  );
}
