import * as Yup from 'yup';

import { emailSchema, requiredSchema } from 'const/schema';

import {FIELDS} from 'ui/components/input/types'

export const schema = Yup.object().shape({
  [FIELDS.email]: emailSchema,
  [FIELDS.secret_key]: requiredSchema
})