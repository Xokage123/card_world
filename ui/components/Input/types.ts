import { OutlinedTextFieldProps } from "@mui/material";
import { FieldProps as FormikFieldProps } from "formik";

type InputType = 'text' | 'number' | 'email' | 'password';

export interface InputProps extends Omit<OutlinedTextFieldProps, 'onChange' | 'error'> {
  value: string;
  onChange: (newValue: string) => void;
  type: InputType;
  placeholder: string
  error?: string
}

export interface FieldProps extends FormikFieldProps, OutlinedTextFieldProps {
  type: InputType
  placeholder: string
}

export interface ErrorProps {
  text: string
}