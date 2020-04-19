import {
  getRandomIntegerNumber,
  getRandomArrayItem,
  generateRandomBoolean,
  getRandomQuantityElements,
  generateRandomDate
} from '../random.js';
import {MinCount, MaxCount} from '../const.js';
// import {getFormatDate} from './../utils.js';

import  {generateComment, generateComments} from '../mock/comment.js';
const FILMS = [
  {
    title: `Made for Each Other`,
    poster: `made-for-each-other.png`
  },
  {
    title: `Popeye Meets The Sailor`,
    poster: `popeye-meets-sinbad.png`
  },
  {
    title: `Sagebrush Trail`,
    poster: `sagebrush-trail.jpg`
  },
  {
    title: `Santa Claus Conquers The Martians`,
    poster: `santa-claus-conquers-the-martians.jpg`
  },
  {
    title: `The Dance of Life`,
    poster: `the-dance-of-life.jpg`
  },
  {
    title: `The Great Flamarion`,
    poster: `the-great-flamarion.jpg`
  },
  {
    title: `The Man with The Golden Arm`,
    poster: `the-man-with-the-golden-arm.jpg`
  },
];

const DESCRIPTION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const teamFilm = {
  ACTORS: [`Jason Statham`, `Bruce Willis`, `Johnny Depp`, `Keanu Reeves`, `Dwayne Johnson`, `Vin Diesel`, `Tom Cruise`, `Leonardo DiCaprio`],
  PRODUCER: [`Steven Spielberg`, `Peter Jackson`, `Martin Scorsese`, `Christopher Nolan`, `Steven Soderbergh`, `Ridley Scott`, `Quentin Tarantino`, `Michael Mann`, `James Cameron`],
  SCREENWRITERS: [`Quentin Tarantino`, `Nora Ephron`, `Charlie Kaufman`, `Francis Ford Coppola`, ` William Goldman`, `Woody Allen`, ` Ernest Lehman`]
};

const GENRES = [`Musical`, `Western`, `Cartoon`, `Mystery`, `Horror`, `Comedy`, `Fantasy`, `Drama`];

const COUNTRIES = [`China`, `Mali`, `United States`, `France`, `China`, `India`, `Nigeria`, `Mauritania`, `Montserrat`, `New Caledonia`, `Mexico`];

const AGE_RATINGS = [`0+`, `6+`, `12+`, `16+`, `18+`];

const getDuration = () => {
  return `${getRandomIntegerNumber(MinCount.HOURS, MaxCount.HOURS)}h
  ${getRandomIntegerNumber(MinCount.MINUTES, MaxCount.MINUTES)}m`;
};

const getShortDescription = (text) => {
  return text.length <= MaxCount.DESCRIPTION_LENGTH ? text :
    text.substring(0, MaxCount.DESCRIPTION_LENGTH).trim() + `...`;
};

const getRating = (max) => {
  return (Math.random() * max).toFixed(1);
};

const getCommentsCount = (min, max) => {
  return getRandomIntegerNumber(min, max);
};

const getGenres = () => {
  const items = [];
  const max = getRandomIntegerNumber(MinCount.GENRES, MaxCount.GENRES);
  for (let i = 0; i < max; i++) {
    items.push(getRandomArrayItem(GENRES));
  }
  return items;
};


// const today = getFormatDate();
// const randomDay = getRandomIntegerNumber(0, 31);
// const randomMonths = getRandomIntegerNumber(0, 12);
// console.log(randomDay)
// console.log(randomMonths)


const generateCard = () => {
  const filmTitlePoster = getRandomArrayItem(FILMS);
  const title = filmTitlePoster.title;
  const poster = filmTitlePoster.poster;
  const originalTitle = filmTitlePoster.title;
  const arrDescriptionFull = DESCRIPTION_TEXT.split(`. `);
  const descriptionFull = getRandomQuantityElements(arrDescriptionFull, MinCount.DESCRIPTION_COUNT, arrDescriptionFull.length, `. `);
  const genres = getGenres(GENRES);
  const commentsCount = getCommentsCount(MinCount.COMMENTS, MaxCount.COMMENTS);
  // const date = getFormatDate();
  // const randomYear = getRandomIntegerNumber(date.year - 100, date.year);

const dateRelease = generateRandomDate();

  return {
    title,
    originalTitle,
    rating: getRating(MaxCount.RATING),
    poster,
    ageRating: getRandomArrayItem(AGE_RATINGS),
    // yearRelease: randomYear,
    dateRelease,
    duration: getDuration(),
    genres,
    genreFirst: genres[0],
    description: descriptionFull + `.`,
    shortDescription: getShortDescription(descriptionFull),
    commentsCount,
    comments: generateComments(commentsCount),
    producer: getRandomArrayItem(teamFilm.PRODUCER),
    writers: getRandomQuantityElements(teamFilm.SCREENWRITERS, MinCount.WRITERS, MaxCount.WRITERS, `, `),
    actors: getRandomQuantityElements(teamFilm.ACTORS, MinCount.ACTORS, MaxCount.ACTORS, `, `),
    countries: getRandomArrayItem(COUNTRIES),
    isFavorite: generateRandomBoolean(),
    isAtWatchlist: generateRandomBoolean(),
    isWatched: generateRandomBoolean()
  };
};

const generateCards = (count) => {
  return new Array(count).fill(``).map(generateCard);
};

export {
  generateCard,
  generateCards
};
