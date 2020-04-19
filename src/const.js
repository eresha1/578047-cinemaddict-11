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

console.log(MONTH_NAMES[3])


const MinCount = {
  RATING: 0,
  HOURS: 1,
  MINUTES: 0,
  DESCRIPTION_COUNT: 1,
  COMMENTS: 1,
  GENRES: 1,
  WRITERS: 1,
  ACTORS: 3
};

const MaxCount = {
  RATING: 10,
  HOURS: 3,
  MINUTES: 59,
  DESCRIPTION_COUNT: 12,
  DESCRIPTION_LENGTH: 140,
  COMMENTS: 5,
  GENRES: 4,
  WRITERS: 4,
  ACTORS: 5,
};

const STATISTIC_FILTERS = [`All time`, `Today`, `Week`, `Month`, `Year`];

export {MONTH_NAMES, MinCount, MaxCount, STATISTIC_FILTERS};
