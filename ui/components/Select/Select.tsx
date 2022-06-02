import { FC } from 'react';

import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select as MaterialSelect,
  SelectChangeEvent
} from '@mui/material';

import { Props } from './types'

import styles from './select.module.scss';

export const Select: FC<Props<string>> = (props) => {
  const {
    value,
    onChange,
    options,
    name,
    label,
    disabled
  } = props

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value

    onChange(value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={name}>{label}</InputLabel>
        <MaterialSelect
          disabled={disabled}
          labelId={name}
          value={value}
          label={label}
          onChange={handleChange}
        >
          {
            options.map(option => {
              const { value, label } = option

              return (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              )
            })
          }
        </MaterialSelect>
      </FormControl>
    </Box>
  );
}
