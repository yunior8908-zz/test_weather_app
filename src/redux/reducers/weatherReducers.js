import { FETCH_WEATHER_DAYS, SET_SELECTED_WEATHER_DAY, SET_WEATHER_DAYS } from '../actionsText';

const initialState = {
  weatherDays: [],
  loading: false,
  selected: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_DAYS:
      return { ...state, loading: true };
    case SET_WEATHER_DAYS:
      return { ...state, loading: false, weatherDays: action.list };
    case SET_SELECTED_WEATHER_DAY:
      return { ...state, selected: action.selected };
    default:
      return state;
  }
};
