import { Theme } from "const/theme";

import { NotificationName } from "reacoil/atoms/modal/const";

export interface NotificationProps {
  name: NotificationName;
  theme?: Theme;
  title: string;
  text: string;
  successCallback: () => void;
  cancelCallback?: () => void;
  textButtons?: {
    cancel?: string;
    apply?: string;
  }
}