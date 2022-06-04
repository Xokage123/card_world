import { NotificationName } from "reacoil/atoms/modal/const";

export interface NotificationProps {
  name: NotificationName;
  theme?: NotificationTheme;
  title: string;
  text: string;
  successCallback: () => void;
  cancelCallback?: () => void;
  textButtons?: {
    cancel?: string;
    apply?: string;
  }
}

export enum NotificationTheme {
  information = 'information'
}