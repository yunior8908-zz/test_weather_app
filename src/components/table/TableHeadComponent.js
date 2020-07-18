import React from 'react';
import { TableHead, TableRow, TableCell, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    '& th': {
      fontWeight: 600
    }
  }
});

function TableHeadComponent({ cellHeader }) {
  const classes = useStyles();
  return (
    <TableHead className={classes.root}>
      <TableRow>
        {cellHeader.map(cell => (
          <TableCell key={cell.id} component="th" align={cell?.numeric ? 'center' : ''}>
            {cell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
export default TableHeadComponent;
