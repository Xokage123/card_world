import { AxiosResponse } from 'axios';
import { FC, useEffect, ReactNode, useCallback } from "react"
import { useSetRecoilState } from "recoil";

import instance from 'api';
import { URL } from 'api/const';
import { Response } from 'api/types';

import { Game } from 'backend/models/Games';

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
    instance({
      url: URL.games
    })
      .then((response: AxiosResponse<Response<Game[]>>) => {
        const { data } = response.data

        if (data) {
          setGames(data)
          setActualGame(data[0].name)
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