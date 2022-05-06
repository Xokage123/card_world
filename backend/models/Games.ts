import { Schema, model, models } from 'mongoose'

export type Names = 'BerserkHeroes' | 'Keyforge'

export interface Game {
  name: Names
  modes: string[]
}

export enum GamesName {
  BerserkHeroes = 'Берсерк.Герои',
  Keyforge = 'Keyforge'
}

const name = 'Games'

let GamesSchema: any;

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

GamesSchema = models?.[name] ? model(name) : model(name, schema);

export default GamesSchema