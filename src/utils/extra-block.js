export const getTopRatedMovies = (films) => {
  const arr = films.slice().sort(function (a, b) {
    if (a.rating > b.rating) {
      return -1;
    }
    if (a.rating < b.rating) {
      return 1;
    }
    return 0;
  });
  return arr;
};

export const getMostCommentedMovies = (films) => {
  const arr = films.slice().sort(function (a, b) {
    if (a.commentsCount > b.commentsCount) {
      return -1;
    }
    if (a.commentsCount < b.commentsCount) {
      return 1;
    }
    return 0;
  });
  return arr;
};
