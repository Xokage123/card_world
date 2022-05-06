import React, { FC } from 'react';
import { Field, Form as FormFormik, FieldProps } from 'formik';

import { Typography } from '@mui/material';

import { FieldElement } from 'ui/components/Input'

import { Props } from './types'

import styles from './form.module.scss';

export const Form: FC<Props> = (props) => {
  const { fields, title, buttonsElement, children } = props

  return (
    <FormFormik className={styles.form}>
      <Typography variant='h4' className={styles.title}>{title}</Typography>

      {children}

      {
        fields.map(field => {
          const { name, placeholder, title, type } = field

          return (
            <div key={name} className={styles.inputContainer}>
              <Field id={name} name={name} className={styles.inputField}>
                {
                  (props: FieldProps) => <FieldElement variant="outlined" label={title} type={type} placeholder={placeholder} {...props} />
                }
              </Field>
            </div>
          )
        })
      }

      <div className={styles.buttons}>
        {buttonsElement}
      </div>
    </FormFormik>
  );
}
