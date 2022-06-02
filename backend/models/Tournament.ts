import { Schema } from 'mongoose'

import getSchema from 'backend/helpers/getSchema';

export interface Tournament {

}

const schema = new Schema<Tournament>({})

export default getSchema('Tournament', schema)
