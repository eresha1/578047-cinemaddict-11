import {createProfileRatingTemplate} from './components/profile-rating.js';
import {createMainNavigationTemplate} from './components/main-navigation.js';
import {creatSortTemplate} from './components/sort.js';
import {createTemplateContent} from './components/films.js';
// import {creatFilmCardTemplate} from './components/films.js';
// import {creatFilmCardTemplate} from './components/film-card.js';
import {creatFooterStatisticsTemplate} from './components/footer-statistics.js';
import {creatFilmDetailsCardTemplate} from './components/film-details.js';
import {render} from './components/utils.js';
import {generateCards} from "./mock/film.js";
// import {generateComment, generateComments} from './mock/comment.js';

import {generateFilters} from "./mock/filters.js";

const cards = generateCards(20);
console.log(cards)

const filters = generateFilters(cards);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(headerElement, createProfileRatingTemplate());
render(mainElement, createMainNavigationTemplate(filters));
render(mainElement, creatSortTemplate());
render(mainElement, createTemplateContent());
render(footerStatisticsElement, creatFooterStatisticsTemplate());
// render(document.body, creatFilmDetailsCardTemplate(cards[0]));

