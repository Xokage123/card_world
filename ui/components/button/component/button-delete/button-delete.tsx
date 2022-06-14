import { FC } from "react";

import { Button } from "ui/components/button";

import { ButtonDeleteProps } from './type';

const ButtonDelete: FC<ButtonDeleteProps> = (props) => {
  const { children } = props;

  return (
    <Button color='error' {...props}>
      {children ? children : 'Удалить'}
    </Button>
  )
}

export default ButtonDelete