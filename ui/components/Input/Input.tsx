import { ChangeEvent, FC } from 'react';

import { Box, Typography, TextField, SxProps } from '@mui/material';
import { red } from '@mui/material/colors';

import { InputProps, FieldProps, ErrorProps } from './types';

import styles from './input.module.scss';

const styleError: SxProps = {
  color: red[400]
}

const Error: FC<ErrorProps> = (props) => {
  const { text } = props

  return (
    <Typography variant='body2' className={styles.error} sx={styleError}>{text}</Typography>
  )
}

export const InputElement: FC<InputProps> = (props) => {
  const { type = 'text', value, onChange, placeholder, error, label, variant} = props

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    onChange(value)
  }

  const inputProps = {
    type,
    value,
    placeholder,
    onChange: handleChange
  }

  return (
    <Box>
      <TextField fullWidth variant={variant} label={label} inputProps={inputProps} />
      {error && <Error text={error} />}
    </Box>
  );
}

export const FieldElement: FC<FieldProps> = (props) => {
  const { field, meta: { touched, error }, type, placeholder, label, variant} = props

  const inputProps = {
    type,
    placeholder,
    ...field
  }

  return (
    <Box>
      <TextField fullWidth variant={variant} label={label} inputProps={inputProps} />
      {touched && error && <Error text={error} />}
    </Box>
  );
}

