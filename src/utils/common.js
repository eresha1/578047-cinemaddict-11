const getTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const getFormatCommentDate = () => {
  const date = new Date();
  const days = getTimeFormat(date.getDate());
  const months = getTimeFormat(date.getMonth());
  const years = getTimeFormat(date.getFullYear());
  const hours = getTimeFormat(date.getHours());
  const minutes = getTimeFormat(date.getMinutes());

  return `${years}/${months}/${days} ${hours}:${minutes}`;
};

export {getFormatCommentDate};
