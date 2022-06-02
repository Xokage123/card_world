import * as Yup from 'yup';

import { requiredSchema } from 'const/schema';

import { FIELDS } from 'ui/components/input/types'

export const schema = Yup.object().shape({
  [FIELDS.name]: requiredSchema,
  [FIELDS.nickname]: requiredSchema,
})