import { Schema, model, models } from 'mongoose'

export enum RoleUser {
  user = 'user',
  admin = 'admin',
  judge = 'judge'
}

export enum Game {
  Keyforge = 'Keyforge',
  Berserk = 'Berserk',
  BerserkHeroes = 'BerserkHeroes',
}

export interface Role {
  status: RoleUser
  game: Game
}

export interface User {
  email: string
  password: string
  initials: {
    name: string,
    surname: string,
    patronymic?: string
  }
  role: Role[]
}

const name = 'User'

let UserSchema: any;

const schema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  initials: {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    patronymic: {
      type: String,
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: [{
    game: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    }
  }]
})

UserSchema = models?.[name] ? model(name) : model(name, schema);

export default UserSchema