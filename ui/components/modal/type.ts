import { ModalName } from 'reacoil/atoms/modal/const'

export interface Props {
  title?: string;
  name: ModalName;
  children: JSX.Element
}
