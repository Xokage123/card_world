import { ReactNode } from 'react'
import { IField } from 'ui/components/input/types'

export interface Props {
  fields: IField[];
  title: string;
  buttonsElement: JSX.Element;
  checkboxesElement?: JSX.Element;
  children?: ReactNode
  disabled?: boolean
}
