import { ReactNode } from "react";

export interface ButtonProps {
  onClick?: () => void;
  className?: string;
  variant?: "text" | "contained" | "outlined";
  children: ReactNode;
  color?: "inherit" | "info" | "primary" | "secondary" | "success" | "error" | "warning";
}