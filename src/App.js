import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import RoutersComponent from './RoutersComponent';
import getWeatherDaysAction from './redux/actions/weatherActions';
import { useGeolocationContext } from './GeolocationContext';
import TopBarComponent from './components/TopBarComponent';

function App({ funcGetWeatherDays }) {
  const position = useGeolocationContext();

  useEffect(() => {
    if (Object.keys(position).length) {
      funcGetWeatherDays(position);
    }
  }, [position, funcGetWeatherDays]);

  return (
    <>
      <TopBarComponent />
      <Container maxWidth="md">
        <RoutersComponent />
      </Container>
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    funcGetWeatherDays: position => dispatch(getWeatherDaysAction(position))
  };
};

export default connect(null, mapDispatchToProps)(App);
