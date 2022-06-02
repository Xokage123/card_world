import { FC } from 'react';

import {
  Table as TableMaterial,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

import { Props } from './types';

import styles from './table.module.scss';

export const Table: FC<Props> = (props) => {
  const { headers, children } = props

  return (
    <TableContainer component={Paper}>
      <TableMaterial sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              headers.map(row => {
                return (
                  <TableCell align="center"   key={row}>{row}</TableCell>
                )
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
      </TableMaterial>
    </TableContainer>
  );
}
