import { ModalName, NotificationName } from "./const";

export type Modals =  {
  [key in ModalName | NotificationName]?: boolean
}