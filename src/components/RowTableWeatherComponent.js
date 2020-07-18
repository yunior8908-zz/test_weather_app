import React from 'react';
import moment from 'moment';
import { TableCell, makeStyles } from '@material-ui/core';
import ImgWeatherContent from './ImgWeatherContent';
import StyleRowComponent from './table/StyleRowComponent';

const useStyles = makeStyles({
  cellIcon: {
    height: 0,
    width: 0,
    padding: 0
  }
});

function RowTableWeatherComponent({ row }) {
  const classes = useStyles();

  return (
    <StyleRowComponent>
      <TableCell align="center">{moment(row.dt_txt).format('hh:mm:ss a')}</TableCell>
      <TableCell align="center">{row.main.temp_max}</TableCell>
      <TableCell align="center">{row.main.temp_min}</TableCell>
      <TableCell align="center">{row.weather[0].description}</TableCell>
      <TableCell align="center" className={classes.cellIcon}>
        <ImgWeatherContent weather={row.weather} />
      </TableCell>
    </StyleRowComponent>
  );
}

export default RowTableWeatherComponent;
