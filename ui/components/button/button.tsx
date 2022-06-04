import { FC } from 'react';
import cn from 'classnames';

import { Button as MaterialButton } from '@mui/material';

import { ButtonProps } from './type';

import styles from './button.module.scss';

export const Button: FC<ButtonProps> = (props) => {
  const {
    onClick,
    className,
    children,
    variant = 'contained',
    color = 'info',
  } = props;

  const classes = cn(styles.button, className)

  return (
    <MaterialButton
      className={classes}
      onClick={onClick}
      variant={variant}
      color={color}
    >
      {children}
    </MaterialButton>
  )
}