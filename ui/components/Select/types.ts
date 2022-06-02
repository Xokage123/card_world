export interface Props<T> {
  label: string;
  isValid?: boolean;
  disabled?: boolean;
  name: string;
  options: Option<T>[];
  value: string;
  onChange: (value: any) => void;
}

export interface Option<T> {
  value: T;
  label: string;
}
