import React, { memo } from 'react';
import { TableContainer, Table, TableBody } from '@material-ui/core';
import TableHeadComponent from './TableHeadComponent';
import cellHeaderOfWeather from '../../helper/cellHeaderOfWeather';

function TableComponent({ data, render }) {
  return (
    <TableContainer>
      <Table>
        <TableHeadComponent cellHeader={cellHeaderOfWeather} />
        <TableBody>{data && data.map((row, index) => render(row, index))}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default memo(TableComponent);
