import {
  getRandomIntegerNumber,
  getRandomArrayItem
} from '../random.js';

import {getFormatCommentDate} from '../utils';

const COMMENTS_EMODJIES = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const COMMENTS_AUTORS = [
  `Lilly Sanchez`,
  `Leah Rodriguez`,
  `Uthman Alexander`,
  `Delilah Long`,
  `Seamus Hall`,
  `Quirino Gonzalez`,
  `Penn Robinson`,
  `Giselle Watson`,
  `Soren Phillips`,
  `Ibraheem Gonzales`,
  `Arabella Rogers`,
  `Royal Jackson`,
  `Xander Baker`
];

const COMMENTS_TEXTS = [
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `Interesting setting and a good cast`
];


const generateComment = () => {
  return {
    text: getRandomArrayItem(COMMENTS_TEXTS),
    author: getRandomArrayItem(COMMENTS_AUTORS),
    emodjies: getRandomArrayItem(COMMENTS_EMODJIES),
    date: getFormatCommentDate()
  };
};

const generateComments = (count) => {
  return new Array(count).fill(``).map(generateComment);
};

// const generateComments = (countComments) => {
//   const arrayComments = [];
//   for (let i = 0; i < countComments; i++) {
//     arrayComments.push(generateComment());
//   }
//   return arrayComments;
// };

// const generateComments = (count) => {
//   return new Array(count)
//     .fill(``)
//     .map(generateComment);
// };


export {generateComment, generateComments, COMMENTS_EMODJIES};
