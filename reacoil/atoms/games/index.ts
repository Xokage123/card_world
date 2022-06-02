import { atom, selector, DefaultValue } from "recoil";

import { Game, GamesName, Names, GamesMode, Modes } from "backend/models/Games";

import { LocalKeys } from 'api/const'

import { Nullable } from "types/global";

import { Option } from "ui/components/select/types";

import { getLocalStorageValue, setLocalStorageValue } from "helpers/local_storage";

const atom_games = atom<Game[]>({
  key: 'atom_games',
  default: []
})
const atom_game = atom<Nullable<Names>>({
  key: 'atom_game',
  default: null
})
const atom_isRegularTournament = atom<Nullable<Names>>({
  key: 'atom_isRegularTournament',
  default: getLocalStorageValue(LocalKeys.is_regular_tournament)
})

const selector_isRegularTournament = selector<Nullable<Names>>({
  key: 'selector_isRegularTournament',
  get: ({ get }) => {
    const isRegularTournament = get(atom_isRegularTournament)

    return isRegularTournament
  },
  set: ({
    set
  }, newValue) => {
    setLocalStorageValue(LocalKeys.is_regular_tournament, newValue)

    set(
      atom_isRegularTournament,
      newValue instanceof DefaultValue ? null : newValue
    )
  }
})
const selector_gamesOptions = selector<Option<Names>[]>({
  key: 'optionGames',
  get: ({ get }) => {
    const games = get(atom_games)

    return games.map((game) => {
      const { name } = game

      return {
        label: GamesName[name],
        value: name
      }
    })
  },
})
const selector_modesOptions = selector<Option<Modes>[]>({
  key: 'selector_modesOptions',
  get: ({ get }) => {
    const actualGameName = get(selector_actualGame)

    const modes = get(atom_games).find(game => game.name === actualGameName)?.modes

    if (!modes) return []

    return modes.map(mode => ({
      value: mode,
      label: GamesMode[mode]
    }))
  }
})
const selector_actualGame = selector<Nullable<Names>>({
  key: 'selector_actualGame',
  get: ({ get }) => {
    const gameName = get(atom_game)

    return gameName
  },
  set: ({ set }, newValue) => {
    return set(
      atom_game,
      newValue instanceof DefaultValue ? null : newValue
    )
  }
})

export {
  atom_games,
  selector_gamesOptions,
  selector_actualGame,
  selector_modesOptions,
  selector_isRegularTournament
}
