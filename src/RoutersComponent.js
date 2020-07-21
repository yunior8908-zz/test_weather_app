import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import ParentSize from '@vx/responsive/lib/components/ParentSize';
import WeatherHomeDaysComponent from './components/WeatherHomeDaysComponent';
import weatherSelectedDayComponent from './components/WeatherSelectedDayComponent';
import GraphicsComponent from './components/GraphicsComponent';

function RoutersComponent({ weatherDays }) {
  return (
    <BrowserRouter>
      <Route path="/" component={WeatherHomeDaysComponent} />
      {weatherDays.map((weatherDay, index) => {
        return (
          <Route
            key={index.toString()}
            exact
            path={`/${moment(weatherDay.day).format('ddd').toLowerCase()}`}
            component={weatherSelectedDayComponent}
          />
        );
      })}
      <ParentSize>{({ width }) => <GraphicsComponent width={width} height={400} />}</ParentSize>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    weatherDays: state.WeatherReducers.weatherDays
  };
};

export default connect(mapStateToProps)(RoutersComponent);
