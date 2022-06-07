import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useMount } from 'react-use';
import { RecoilRoot } from 'recoil';

import { LocalKeys, StatusAuth } from 'api/const';
import { fetch_connectMongoDB } from 'api/points';

import { ThemeProvider } from '@mui/material/styles';

import { Layout } from 'components/Layout'
import { MainContainer } from 'components/MainContainer';

import { getLocalStorageValue } from 'helpers/local_storage';

import { themeMaterial } from 'const/styles';
import { linksWithoutLayout, startPageLink } from 'const/links';

import { AuthProvider } from 'context/auth.provider';
import StartProvider from 'context/start.provider';

import 'react-tabs/style/react-tabs.css';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/globals.scss'
import 'components/Error/error.sass';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  useMount(() => {
    fetch_connectMongoDB({})

    const authStatus = getLocalStorageValue<StatusAuth>(LocalKeys.status_auth)

    if (authStatus && authStatus === StatusAuth.no_auth) {
      router.push({
        pathname: startPageLink
      })
    }
  })

  const [isShowLayout, setIsShowLayout] = useState<boolean>(false)

  useEffect(() => {
    setIsShowLayout(!linksWithoutLayout.includes(router.pathname))
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
            <StartProvider>
              {renderContent()}
            </StartProvider>
          </AuthProvider>
        </ThemeProvider>
      </RecoilRoot>

      <ToastContainer
        position='top-right'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default MyApp
