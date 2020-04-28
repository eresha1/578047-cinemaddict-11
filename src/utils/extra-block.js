// export const getTopRatedMovies = (films) => {
//   return films.slice().sort(function (a, b) {
//     return b.rating - a.rating;
//   });
// };

// export const getMostCommentedMovies = (films) => {
//   return films.slice().sort(function (a, b) {
//     return b.commentsCount - a.commentsCount;
//   });
// };

export const getTopRatedMovies = (films) => films.slice().sort((a, b) => a.rating > b.rating ? -1 : 1);

export const getMostCommentedMovies = (films) => films.slice().sort((a, b) => a.commentsCount > b.commentsCount ? -1 : 1);
