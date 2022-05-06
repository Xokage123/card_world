import { FC, ChangeEvent } from 'react';

import FormControlLabel from '@mui/material/FormControlLabel';
import CheckboxMaterial from '@mui/material/Checkbox';

import {Props} from './types'

import styles from './checkbox.module.scss';

export const Checkbox: FC<Props> = (props) => {
  const { label, checked, handleChecked } = props

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked

    handleChecked(newValue)
  }

  return (
    <FormControlLabel control={<CheckboxMaterial checked={checked} onChange={onChange} defaultChecked />} label={label} />
  );
}
