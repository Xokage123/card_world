import { FC } from 'react';
import cn from 'classnames'

import { Props } from './types'

import { CLASS_MAIN_CONTAINER } from 'const/styles'

import styles from './maincontainer.module.scss';

export const MainContainer: FC<Props> = (props) => {
  const { children, classes } = props
  return (
    <div className={cn(styles[CLASS_MAIN_CONTAINER], classes)}>
      {children}
    </div>
  );
}
