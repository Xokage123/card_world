import { ModalName, NotificationName} from 'reacoil/atoms/modal/const'

export interface Props {
  title?: string;
  isNotification?: boolean;
  name: ModalName | NotificationName;
  children: JSX.Element;
  classes?: {
    container?: string;
  }
}
