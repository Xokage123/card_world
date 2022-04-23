import { useRouter } from "next/router"
import { createContext, FC, ReactNode, useEffect } from "react"
import { useRecoilValue } from 'recoil'

import { atom_statusAuth } from 'reacoil/atoms/auth'

import { LINKS } from "const/links"

interface Props {
  children: ReactNode
}

export const authContext = createContext(false)

export const AuthProvider: FC<Props> = (props) => {
  const { children } = props

  const router = useRouter()

  const statusAuth = useRecoilValue(atom_statusAuth)

  useEffect(() => {
    if (statusAuth) {
      if (router.pathname === LINKS.home) {
        router.push({
          pathname: LINKS.news
        })
      }
    } else {
      router.push({
        pathname: LINKS.auth
      })
    }
  }, [router, statusAuth])

  return (
    <authContext.Provider value={statusAuth}>
      {children}
    </authContext.Provider>
  )
}