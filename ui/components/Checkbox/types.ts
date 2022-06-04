export interface Props {
  label?: string
  checked: boolean
  handleChecked: (newValue: boolean) => void
}