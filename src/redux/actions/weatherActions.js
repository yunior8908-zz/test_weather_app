import moment from 'moment';
import axiosIntance from '../../axiosIntance';
import { FETCH_WEATHER_DAYS, SET_WEATHER_DAYS, SET_SELECTED_WEATHER_DAY } from '../actionsText';

const fetchWeatherDays = () => ({
  type: FETCH_WEATHER_DAYS
});

const setWeatherDays = list => ({
  type: SET_WEATHER_DAYS,
  list
});

const getWeatherDaysAction = position => async dispatch => {
  dispatch(fetchWeatherDays());
  const response = await axiosIntance.get('forecast', {
    params: {
      ...position
    }
  });

  const result = Array.from(
    new Set(response.data.list.map(weather => moment(weather.dt_txt).format('YYYY-MM-DD')))
  ).map(day => {
    return {
      day,
      weather: response.data.list
        .filter(weather => moment(weather.dt_txt).format('YYYY-MM-DD') === day)
        .map(a => ({ ...a, main: { ...a.main, tempMin: a.main.temp_min, tempMax: a.main.temp_max } }))
        .sort((a, b) => a.dt - b.dt)
    };
  });

  dispatch(setWeatherDays(result));
};

export const SelectWeatherDayAction = weatherDay => dispatch => {
  dispatch({
    type: SET_SELECTED_WEATHER_DAY,
    selected: weatherDay
  });
};

export default getWeatherDaysAction;
