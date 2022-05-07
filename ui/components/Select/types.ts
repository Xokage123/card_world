export interface Props {
  label: string;
  isValid?: boolean;
  disabled?: boolean;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export interface Option {
  value: string;
  label: string;
}
