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

  const forbiddenLinks: string[]  = [
    LINKS.registration,
    '/404',
    '/500'
  ]

  useEffect(() => {
    if (statusAuth) {
      if (router.pathname === LINKS.home) {
        router.push({
          pathname: LINKS.news
        })
      }
    } else if (!forbiddenLinks.includes(router.pathname)) {
      router.push({
        pathname: LINKS.auth
      })
    }
  }, [statusAuth])

  if (router.pathname === LINKS.home) return null

  return (
    <authContext.Provider value={statusAuth}>
      {children}
    </authContext.Provider>
  )
}