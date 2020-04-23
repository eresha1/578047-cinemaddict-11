const filterNames = [`All movies`, `Watchlist`, `History`, `Favorites`];

const getFilterCount = (name, cards) => {
  switch (name) {
    case `Favorites`:
      return cards.filter((card) => card.isFavorite).length;
    case `History`:
      return cards.filter((card) => card.isWatched).length;
    case `Watchlist`:
      return cards.filter((card) => card.isAtWatchlist).length;
    default: return 0;
  }
};

const generateFilters = (cards) => {
  return filterNames.map((it) => {
    return {
      name: it,
      count: getFilterCount(it, cards)
    };
  });
};

export {generateFilters};
