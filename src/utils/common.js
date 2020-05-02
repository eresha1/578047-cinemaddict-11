const getTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const getFormatCommentDate = () => {
  const date = new Date();
  const days = getTimeFormat(date.getDate());
  const months = getTimeFormat(date.getMonth());
  const years = getTimeFormat(date.getFullYear());
  const hours = getTimeFormat(date.getHours());
  const minutes = getTimeFormat(date.getMinutes());

  return `${years}/${months}/${days} ${hours}:${minutes}`;
};

export const convertHours = (duration) => Math.floor(duration / 60);
export const convertMinutes = (duration) => duration % 60;

export const getFormatDuration = (duration) => {
  return `${convertHours(duration)}h ${convertMinutes(duration)}m`;
};

