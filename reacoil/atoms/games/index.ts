import { Game, GamesName } from "backend/models/Games";
import { atom, selector, DefaultValue } from "recoil";

import { Option } from "ui/components/Select/types";

const atom_games = atom<Game[]>({
  key: 'atom_games',
  default: []
})

const atom_game = atom<string>({
  key: 'atom_game',
  default: ''
})

const selector_gamesOptions = selector<Option[]>({
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

const selector_actualGame = selector<string>({
  key: 'selector_actualGame',
  get: ({ get }) => {
    const gameName = get(atom_game)

    return gameName
  },
  set: ({ set }, newValue) => {
    return set(
      atom_game,
      newValue instanceof DefaultValue ? '' : newValue
    )
  }
})

export {
  atom_games,
  selector_gamesOptions,
  selector_actualGame
}