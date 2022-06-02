import { useRouter } from "next/router"
import { createContext, FC, ReactNode, useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  atom_userInformation
} from 'reacoil/atoms/user'

import { UserPublic } from 'backend/models/User'

import { LINKS, startPageLink } from "const/links"

import { Nullable } from "types/global"
import { getLocalStorageValue } from "helpers/local_storage"
import { LocalKeys } from "api/const"

interface Props {
  children: ReactNode
}

export const authContext = createContext<Nullable<UserPublic>>(null)

export const AuthProvider: FC<Props> = (props) => {
  const { children } = props

  const router = useRouter()

  const userInformation = useRecoilValue(atom_userInformation)

  const forbiddenLinks: string[]  = [
    LINKS.registration,
    '/404',
    '/500'
  ]

  useEffect(() => {
    if (userInformation) {
      if (router.pathname === LINKS.home) {
        router.push({
          pathname: startPageLink
        })
      }
    } else if (!forbiddenLinks.includes(router.pathname)) {
      if (!getLocalStorageValue(LocalKeys.status_auth)) {
        router.push({
          pathname: LINKS.auth
        })
      }
    }
  }, [userInformation])

  if (router.pathname === LINKS.home) return null

  return (
    <authContext.Provider value={userInformation}>
      {children}
    </authContext.Provider>
  )
}
