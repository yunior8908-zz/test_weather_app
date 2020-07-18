import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import WeatherReducers from './reducers/weatherReducers';

const reducers = combineReducers({
  WeatherReducers
});

const store = createStore(reducers, applyMiddleware(thunk));

export { reducers, store };
