import { FC, useEffect, ReactNode, useCallback } from "react";
import { toast } from 'react-toastify';
import { useSetRecoilState } from "recoil";

import { URL } from 'api/const';
import { fetch_getGames } from 'api/points';

import {
  atom_games,
  selector_actualGame
} from 'reacoil/atoms/games';

interface Props {
  children: ReactNode
}

const StartProvider: FC<Props> = (props) => {
  const { children } = props

  const setGames = useSetRecoilState(atom_games)
  const setActualGame = useSetRecoilState(selector_actualGame)

  const fetchGetGames = useCallback(() => {
    fetch_getGames<{}>({
      successCallback: (data) => {
        setGames(data)
        setActualGame(data[0].name)
      },
      errorCallback: (error) => {
        toast.error(error, {
          toastId: URL.games
        })
      }
    })
  }, [setActualGame, setGames])

  useEffect(() => {
    fetchGetGames()
  }, [fetchGetGames])

  return (
    <>
      {children}
    </>
  )
}

export default StartProvider
