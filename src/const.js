const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const ShowingCardsCount = {
  ON_START: 5,
  BY_BUTTON: 5,
  EXTRA_MOVIE_CARD: 2
};

const CardCount = {
  ALL: 22,
  TOP_RATED: 2,
  MOST_COMMENTED: 2
};

const STATISTIC_FILTERS = [`All time`, `Today`, `Week`, `Month`, `Year`];

export {MONTH_NAMES, ShowingCardsCount, CardCount, STATISTIC_FILTERS};

export const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

// export const filterNames = [`All movies`, `Watchlist`, `History`, `Favorites`];
