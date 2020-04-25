// import FilmDetailsComponent from './components/film-details.js';
import FooterStatisticsComponent from './components/footer-statistics.js';
import MainNavigationComponent from './components/main-navigation.js';
import ProfileRatingComponent from './components/profile-rating.js';
import SortingComponent from './components/sorting.js';
import StatisticComponent from './components/statistic.js';
import FilmsComponent from './components/films.js';

import {generateFilters} from "./mock/filters.js";
import {generateSort} from "./mock/sort.js";
import {generateStatistics} from "./mock/statistic.js";
import {render, RenderPosition} from "./utils/render.js";
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

render(headerElement, new ProfileRatingComponent(userRank).getElement(), RenderPosition.BEFOREEND);

render(mainElement, new MainNavigationComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortingComponent(sort).getElement(), RenderPosition.BEFOREEND);

render(mainElement, new StatisticComponent(stats).getElement(), RenderPosition.AFTERBEGIN);


const renderFilmCard = () => {};

const renderFilmsListContainer = () => {};


// render(mainElement, new FilmsComponent(), RenderPosition.BEFOREEND);
// const firstilmsListContainer = mainElement.querySelector(`.films-list__container`);
// const loadMoreButton = mainElement.querySelector(`.films-list__show-more`);

// const loadMoreButtonClickHandler = () => {
//   showMoreCards(firstilmsListContainer, loadMoreButton);
// };

// loadMoreButton.addEventListener(`click`, loadMoreButtonClickHandler);

render(footerStatisticsElement, new FooterStatisticsComponent(moviesInside).getElement(), RenderPosition.BEFOREEND);
// render(document.body, creatFilmDetailsCardTemplate(cards[0]));

