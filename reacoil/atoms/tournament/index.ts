import { LocalKeys } from "api/const";
import { getLocalStorageArray, getLocalStorageValue, setLocalStorageValue } from "helpers/local_storage";
import { atom, selector, DefaultValue } from "recoil";
import { Nullable } from "types/global";

import { Player, TournamentInformation } from "./types";

const atom_players = atom<Player[]>({
  key: 'atom_players',
  default: getLocalStorageArray(LocalKeys.tournament_players)
})
const selector_players = selector<Player[]>({
  key: 'selector_players',
  get: ({ get }) => {
    const players = get(atom_players)

    return players
  },
  set: ({ set }, newValue) => {
    setLocalStorageValue(LocalKeys.tournament_players, newValue)

    const defaultValue = getLocalStorageArray<Player>(LocalKeys.tournament_players)

    set(
      atom_players,
      newValue instanceof DefaultValue ? defaultValue : newValue
    )
  }
})

const atom_selectedIndex = atom<number>({
  key: 'atom_selectedIndex',
  default: 0
})
const selector_selectedIndex = selector<number>({
  key: 'selector_selectedIndex',
  get: ({ get }) => {
    const selectedIndex = get(atom_selectedIndex)

    return selectedIndex
  },
  set: ({ set }, newValue) => {
    set(
      atom_selectedIndex,
      newValue instanceof DefaultValue ? 0 : newValue
    )
  }
})


const atom_tournamentInformation = atom<Nullable<TournamentInformation>>({
  key: 'atom_tournamentInformation',
  default: getLocalStorageValue(LocalKeys.user_information_tournament)
})
const selector_tournamentInformation = selector<Nullable<TournamentInformation>>({
  key: 'selector_tournamentInformation',
  get: ({ get }) => {
    const gameInformation = get(atom_tournamentInformation)

    return gameInformation
  },
  set: ({
    set
  }, newValue) => {
    setLocalStorageValue(LocalKeys.user_information_tournament, newValue)

    set(
      atom_tournamentInformation,
      newValue instanceof DefaultValue ? null : newValue
    )
  }
})

export {
  selector_players,
  selector_selectedIndex,
  selector_tournamentInformation
}
