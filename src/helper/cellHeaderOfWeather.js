import { UNITS_SYMBOL } from '../config';

const cellHeaderOfWeather = [
  {
    id: 'time',
    label: 'Hour',
    numeric: true
  },
  {
    id: 'tempMax',
    label: `${'Temp. Max ('}${UNITS_SYMBOL})`,
    numeric: true
  },
  {
    id: 'tempMin',
    label: `${'Temp. Min ('}${UNITS_SYMBOL})`,
    numeric: true
  },
  {
    id: 'description',
    label: 'Description',
    numeric: true
  },
  {
    id: 'icon',
    label: 'Icon',
    numeric: true
  }
];

export default cellHeaderOfWeather;
