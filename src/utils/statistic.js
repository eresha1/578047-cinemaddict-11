import {getUsersRank} from "./common.js";
import {getObjectElementsGenres, getTopGenre} from "./get-genres.js";
import {GENRES} from '../mock/film.js';


const generateStatistics = (films) => {
  const totalWatchedMovies = films.filter((film) => film.isWatched);
  const totalDuration = totalWatchedMovies.map((film) => film.duration).reduce((a, b) => a + b);
  const arrGenre = totalWatchedMovies.map((film) => film.genres);
  const topGenre = getTopGenre(getObjectElementsGenres(GENRES, arrGenre));
  return {
    rank: getUsersRank(totalWatchedMovies),
    totalMovies: totalWatchedMovies.length,
    totalDuration,
    topGenre
  };
};

export {generateStatistics};
