// const filterNames = [`All movies`, `Watchlist`, `History`, `Favorites`];
import {FilterType} from '../const.js';

// const getFilterCount = (name, cards) => {
//   switch (name) {
//     case `Favorites`:
//       return cards.filter((card) => card.isFavorite).length;
//     case `History`:
//       return cards.filter((card) => card.isWatched).length;
//     case `Watchlist`:
//       return cards.filter((card) => card.isAtWatchlist).length;
//     default: return 0;
//   }
// };

// const generateFilters = (cards) => {
//   return filterNames.map((it) => {
//     return {
//       name: it,
//       count: getFilterCount(it, cards)
//     };
//   });
// };

// export {generateFilters};

const getWatchlistFilms = (films) => {
  return films.filter((film) => film.isWatchlist);
};

const getHistoryFilms = (films) => {
  return films.filter((film) => film.isWatched);
};

const getFavoriteFilms = (films) => {
  return films.filter((film) => film.isFavorite);
};

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
    case FilterType.HISTORY:
      return getHistoryFilms(films);
    case FilterType.FAVORITES:
      return getFavoriteFilms(films);
  }
  return films;
};
