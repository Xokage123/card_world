import { FC, ChangeEvent } from 'react';

import FormControlLabel from '@mui/material/FormControlLabel';
import CheckboxMaterial from '@mui/material/Checkbox';

import { Props } from './types'

import { sx_label, sx_checkbox } from './sx';

export const Checkbox: FC<Props> = (props) => {
  const { label, checked, handleChecked } = props

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked

    handleChecked(newValue)
  }

  return (
    <FormControlLabel
      sx={sx_label}
      control={
        <CheckboxMaterial
          sx={sx_checkbox}
          checked={checked}
          onChange={onChange}
          defaultChecked
        />
      }
      label={label}
    />
  );
}
