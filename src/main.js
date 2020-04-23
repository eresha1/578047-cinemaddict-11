import {creatFilmDetailsCardTemplate} from './components/film-details.js';
import {creatFooterStatisticsTemplate} from './components/footer-statistics.js';
import {createMainNavigationTemplate} from './components/main-navigation.js';
import {createProfileRatingTemplate} from './components/profile-rating.js';
import {creatSortTemplate} from './components/sort.js';
import {createStatisticTemplate} from './components/statistic.js';
import {createTemplateContent} from './components/films.js';
import {generateFilters} from "./mock/filters.js";
import {generateSort} from "./mock/sort.js";
import {generateStatistics} from "./mock/statistic.js";
import {render} from './utils/render.js';
import {showMoreCards, cards} from './components/films-list.js';

const filters = generateFilters(cards);
const moviesInside = cards.length;
const sort = generateSort();
const stats = generateStatistics(cards);
const userRank = stats.rank;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(headerElement, createProfileRatingTemplate(userRank));
render(mainElement, createMainNavigationTemplate(filters));
render(mainElement, creatSortTemplate(sort));
render(mainElement, createTemplateContent());

const mainNavigation = mainElement.querySelector(`.main-navigation`);
render(mainNavigation, createStatisticTemplate(stats), `afterEnd`);


const firstilmsListContainer = mainElement.querySelector(`.films-list__container`);
const loadMoreButton = mainElement.querySelector(`.films-list__show-more`);

const loadMoreButtonClickHandler = () => {
  showMoreCards(firstilmsListContainer, loadMoreButton);
};

loadMoreButton.addEventListener(`click`, loadMoreButtonClickHandler);

render(footerStatisticsElement, creatFooterStatisticsTemplate(moviesInside));
render(document.body, creatFilmDetailsCardTemplate(cards[0]));

