export const getTopRatedMovies = (films) => {
  return films.slice().sort(function (a, b) {
    return b.rating - a.rating;
  });
};

export const getMostCommentedMovies = (films) => {
  return films.slice().sort(function (a, b) {
    return b.commentsCount - a.commentsCount;
  });
};
