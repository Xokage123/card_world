export interface Values {
  [FIELDS.email]: string;
  [FIELDS.password]: string;
}

export enum FIELDS {
  email = 'email',
  password = 'password'
}

export interface IField {
  title: string;
  name: FIELDS;
  type: 'text' | 'email' | 'password';
  placeholder: string
}