import { Schema, model, models, Model } from 'mongoose'

const getSchema = <T>(name: string, schema: Schema<T>): Model<T> => {
  return  models?.[name] ? model(name) : model(name, schema);
}

export default getSchema
