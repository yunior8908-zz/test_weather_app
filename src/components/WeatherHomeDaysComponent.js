import React, { useEffect } from 'react';
import moment from 'moment';
import { makeStyles, CircularProgress, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SelectWeatherDayAction } from '../redux/actions/weatherActions';
import CardWeatherDayComponent from './CardWeatherDayComponent';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    justifyContent: 'space-between',
    gridTemplateColumns: 'repeat(auto-fit, 118px)',
    gridGap: 10
  }
});

function WeatherHomeDaysComponent({ weatherDays, loading, funcSelectWeatherDay, selected }) {
  const { pathname } = useLocation();
  const classes = useStyles();

  useEffect(() => {
    if (pathname !== '/' && !selected) {
      const splitPathname = pathname.split('/');
      funcSelectWeatherDay(
        weatherDays.find(el => moment(el.day).format('ddd').toLowerCase() === splitPathname[1]) || null
      );
    }
  }, [pathname, selected, weatherDays, funcSelectWeatherDay]);

  return (
    <Box marginBottom={2} marginTop={2}>
      <div className={classes.root}>
        {loading ? (
          <CircularProgress />
        ) : (
          weatherDays.map(weatherDay => {
            return (
              <CardWeatherDayComponent
                key={weatherDay.day}
                weatherDay={weatherDay}
                selected={selected}
                onSelectCard={funcSelectWeatherDay}
              />
            );
          })
        )}
      </div>
    </Box>
  );
}

const mapStateToProps = state => {
  return {
    weatherDays: state.WeatherReducers.weatherDays,
    loading: state.WeatherReducers.loading,
    selected: state.WeatherReducers.selected
  };
};

const mapDispatchToProps = dispatch => ({
  funcSelectWeatherDay: weatherDay => dispatch(SelectWeatherDayAction(weatherDay))
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherHomeDaysComponent);
