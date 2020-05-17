import moment from "moment";

export const getFormatCommentDate = () => {
  const date = new Date();
  return moment(date).format(`YYYY/MM/DD HH:mm`);
};

export const convertHours = (duration) => Math.floor(duration / 60);
export const convertMinutes = (duration) => duration % 60;

export const getFormatDuration = (duration) => {
  return moment.utc(moment.duration(duration, `minutes`).asMilliseconds()).format(`H[h] mm[m]`);
};

export const getFormatReleaseDate = (dateRelease) => {
  return moment(dateRelease).format(`YYYY`);
};

export const getFullFormatReleaseDate = (dateRelease) => {
  return moment(dateRelease).format(`D MMMM YYYY`);
};
