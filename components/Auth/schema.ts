import * as Yup from 'yup';

import { emailSchema, passwordSchema } from 'const/schema';

import { FIELDS } from 'ui/components/input/types'

export const schema = Yup.object().shape({
  [FIELDS.email]: emailSchema,
  [FIELDS.password]: passwordSchema
})