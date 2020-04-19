import {MONTH_NAMES} from './const.js';

// const getRandomDate = () => {
//   const targetDate = new Date();
//   const sign = Math.random() > 0.5 ? 1 : -1;
//   const diffValue = sign * getRandomIntegerNumber(0, 8);

//   targetDate.setDate(targetDate.getDate() + diffValue);

//   return targetDate;
// };

const getTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

// const getFormatHourMinutes = (date) => {
//   const hours = getTimeFormat(date.getHours() % 12);
//   const minutes = getTimeFormat(date.getMinutes());

//   return `${hours}:${minutes}`;
// };

const getFormatCommentDate = () => {
  const date = new Date();
  const days = getTimeFormat(date.getDate());
  const months = getTimeFormat(date.getMonth());
  const years = getTimeFormat(date.getFullYear());
  const hours = getTimeFormat(date.getHours());
  const minutes = getTimeFormat(date.getMinutes());

  return `${years}/${months}/${days} ${hours}:${minutes}`;
};

const getFormatDate = () => {
  const date = new Date();
  return {
    day: getTimeFormat(date.getDate()),
    month: MONTH_NAMES[date.getMonth()],
    year: getTimeFormat(date.getFullYear()),
    hour: getTimeFormat(date.getHours()),
    minute: getTimeFormat(date.getMinutes()),
  };
};

export {getFormatDate, getFormatCommentDate};
