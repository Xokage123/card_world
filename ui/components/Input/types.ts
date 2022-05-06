import { OutlinedTextFieldProps } from "@mui/material";
import { FieldProps as FormikFieldProps } from "formik";

type InputType = 'text' | 'number' | 'email' | 'password';

export interface InputProps extends Omit<OutlinedTextFieldProps, 'onChange' | 'error'> {
  value: string;
  onChange: (newValue: string) => void;
  type: InputType;
  placeholder: string
  error?: string
  label: string
}

export interface FieldProps extends FormikFieldProps, OutlinedTextFieldProps {
  type: InputType
  placeholder: string
}

export interface ErrorProps {
  text: string
}

export enum FIELDS {
  email = 'email',
  password = 'password',
  secret_key = 'secret_key'
}

export interface IField {
  title: string;
  name: FIELDS;
  type: InputType;
  placeholder: string
}