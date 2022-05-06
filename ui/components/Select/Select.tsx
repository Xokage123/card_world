import { FC } from 'react';

import { Box, InputLabel, MenuItem, FormControl, Select as MaterialSelect, SelectChangeEvent, SxProps } from '@mui/material';
import { red } from '@mui/material/colors';

import { Props } from './types'

import styles from './select.module.scss';


export const Select: FC<Props> = (props) => {
  const { value, onChange, options, name, label} = props

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value

    onChange(value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={name}>{label}</InputLabel>
        <MaterialSelect
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
