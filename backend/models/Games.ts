import { Schema } from 'mongoose'

import getSchema from 'backend/helpers/getSchema';

export type Names = 'BerserkHeroes' | 'Keyforge'
export type Modes = 'rating' | 'regular' | 'draft' | 'sealed'

export interface Game {
  name: Names
  modes: Modes[]
}

export enum GamesName {
  BerserkHeroes = 'Берсерк.Герои',
  Keyforge = 'Keyforge' 
}

export enum GamesMode {
  rating = 'Рейтенговый турнир',
  regular = 'Обычный турнир',
  draft = 'Драфт',
  sealed = 'Силед'
}

const schema = new Schema<Game>({
  name: {
    type: String,
    required: true
  },
  modes: [
    {
      type: String,
      required: true
    }
  ]

})

export default getSchema('Games', schema)
