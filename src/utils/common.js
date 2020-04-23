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

export const getUsersRank = (films) => {
  const totalMoviesViewed = films.length;
  let userRank = ``;
  switch (true) {
    case (totalMoviesViewed === 0):
      userRank = ``;
      break;

    case (totalMoviesViewed >= 1 && totalMoviesViewed <= 10):
      userRank = `novice`;
      break;

    case (totalMoviesViewed >= 11 && totalMoviesViewed <= 20):
      userRank = `fan`;
      break;

    case (totalMoviesViewed >= 21):
      userRank = `movie buff`;
      break;
  }
  return userRank;
};

export const convertHours = (duration) => Math.floor(duration / 60);
export const convertMinutes = (duration) => duration % 60;

export const getFormatDuration = (duration) => {
  return `${convertHours(duration)}h ${convertMinutes(duration)}m`;
};

