import React, { memo } from 'react';
import moment from 'moment';
import {
  makeStyles,
  CardContent,
  CardActionArea,
  Divider,
  CardActions,
  Card,
  CardHeader,
  Typography
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import ImgWeatherContent from './ImgWeatherContent';
import { UNITS_SYMBOL } from '../config';

const useStyles = makeStyles({
  cardRoot: {
    height: 180,
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    fontSize: 14,
    fontWeight: 600
  },
  cardContent: {
    flex: 1,
    padding: 0
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center'
  },
  maxTemp: {
    fontWeight: 600
  }
});

function CardWeatherDayComponent({ weatherDay, selected, onSelectCard }) {
  const classes = useStyles();
  const mainData = weatherDay.weather[0];

  return (
    <Card
      key={weatherDay.day}
      raised={selected?.day === weatherDay.day}
      square
      className={classes.cardRoot}
      component={NavLink}
      onClick={() => onSelectCard(weatherDay)}
      to={moment(weatherDay.day).format('ddd').toLowerCase()}
    >
      <CardHeader
        titleTypographyProps={{ align: 'center', className: classes.cardHeader }}
        title={moment(weatherDay.day).format('ddd')}
      />
      <CardContent className={classes.cardContent}>
        <ImgWeatherContent weather={mainData.weather} />
      </CardContent>
      <CardActionArea>
        <Divider />
        <CardActions className={classes.cardActions}>
          <Typography className={classes.maxTemp}>{`${Math.ceil(mainData?.main?.tempMax)}${UNITS_SYMBOL}`}</Typography>
          <Typography>{`${Math.ceil(mainData?.main?.tempMin)}${UNITS_SYMBOL}`}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default memo(CardWeatherDayComponent);
