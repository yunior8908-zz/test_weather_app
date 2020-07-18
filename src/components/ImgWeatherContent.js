import React from 'react';
import { makeStyles } from '@material-ui/core';
import { IMG_BASE_URL } from '../config';

const useStyles = makeStyles({
  imgRoot: {
    width: '100%',
    height: '100%',
    background: props => `url(${props.urlImg}) no-repeat`
  }
});

function ImgWeatherContent({ weather }) {
  const urlImg = `${IMG_BASE_URL}/${weather[0].icon}@2x.png`;
  const classes = useStyles({ urlImg });
  return (
    <div
      className={classes.imgRoot}
      style={{
        backgroundPosition: 'center',
        backgroundSize: 'contain'
      }}
    />
  );
}

export default ImgWeatherContent;
