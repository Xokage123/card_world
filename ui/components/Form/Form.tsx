import React, { FC } from 'react';
import { Field, Form as FormFormik, FieldProps } from 'formik';

import { H3 } from 'ui/components/title';
import { FieldElement } from 'ui/components/input'

import { Props } from './types'

import styles from './form.module.scss';

export const Form: FC<Props> = (props) => {
  const { fields, title, buttonsElement, checkboxesElement, children, disabled } = props

  return (
    <FormFormik className={styles.form}>
      <H3 className={styles.title}>{title}</H3>

      {children}

      {
        fields.map(field => {
          const { name, placeholder, title, type } = field

          return (
            <div key={name} className={styles.inputContainer}>
              <Field id={name} name={name} className={styles.inputField}>
                {
                  (props: FieldProps) =>
                    <FieldElement
                      disabled={disabled}
                      variant="outlined"
                      label={title}
                      type={type}
                      placeholder={placeholder}
                      {...props}
                    />
                }
              </Field>
            </div>
          )
        })
      }

      <div className={styles.checkboxes}>
        {checkboxesElement}
      </div>

      <div className={styles.buttons}>
        {buttonsElement}
      </div>
    </FormFormik>
  );
}
