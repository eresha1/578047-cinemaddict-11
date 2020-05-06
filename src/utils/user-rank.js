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
