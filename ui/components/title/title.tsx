import { FC } from "react";
import cn from 'classnames';

import { Title } from "./type";

import styles from './title.module.scss'

export const H3: FC<Title> = (props) => {
  const { children, className } = props

  return (
    <h3 className={cn(styles.title, styles.title_3, className)}>{children}</h3>
  )
}

export const H4: FC<Title> = (props) => {
  const { children, className } = props

  return (
    <h4 className={cn(styles.title, styles.title_4, className)}>{children}</h4>
  )
}

export const H5: FC<Title> = (props) => {
  const { children, className } = props

  return (
    <h5 className={cn(styles.title, styles.title_5, className)}>{children}</h5>
  )
}