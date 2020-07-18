import moment from 'moment';

export const getDayDateLikeATitle = date => {
  return moment(date).format('dddd');
};

/** delete this import when added other export const */
export const a = 'a';
