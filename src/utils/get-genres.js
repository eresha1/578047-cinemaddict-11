const getTotalArrayGenre = (genresWatched) => {
  let totalArrayGenre = [];
  for (let i = 0; i < genresWatched.length; i++) {
    totalArrayGenre = totalArrayGenre.concat(genresWatched[i]);
  }
  return totalArrayGenre;
};

const getQuantityElemntsGenres = (totalArr, genre) => {
  return totalArr.reduce((accumulator, element) => {
    if (element === genre) {
      accumulator++;
    }
    return accumulator;
  }, 0);
};

export const getObjectElementsGenres = (arrGenre, genresWatched) => {
  let add = {};
  for (let i = 0; i < arrGenre.length; i++) {
    add[arrGenre[i]] = getQuantityElemntsGenres(getTotalArrayGenre(genresWatched), arrGenre[i]);
  }
  return add;
};

export const getTopGenre = (param) => {
  let max = 0;
  let maxKey = ``;
  for (let key in param) {
    if (param[key] > max) {
      max = param[key];
      maxKey = key;
    }
  }
  return maxKey;
};
