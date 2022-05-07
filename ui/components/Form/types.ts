import { ReactNode } from 'react'
import { FIELDS, IField } from 'ui/components/Input/types'

export interface Props {
  fields: IField[];
  title: string;
  buttonsElement: JSX.Element;
  children?: ReactNode
  disabled?: boolean
}
