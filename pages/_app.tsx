import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil'

import { ThemeProvider } from '@mui/material/styles';

import { Layout } from 'components/Layout'
import { MainContainer } from 'components/MainContainer';

import { themeMaterial } from 'const/styles';
import { linksWithoutLayout } from 'const/links';

import { AuthProvider } from 'context/auth.provider';

import 'styles/globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const [isShowLayout, setIsShowLayout] = useState<boolean>(false)

  useEffect(() => {
    setIsShowLayout(!linksWithoutLayout.find(link => link === router.pathname))
  }, [router.pathname])

  const renderContent = useCallback(() => {
    return isShowLayout ? (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    ) : (
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
    )
  }, [Component, isShowLayout, pageProps])

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={themeMaterial}>
          <AuthProvider>
            {renderContent()}
          </AuthProvider>
        </ThemeProvider>
      </RecoilRoot>
    </>
  )
}

export default MyApp
