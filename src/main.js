import FooterStatisticsComponent from './components/footer-statistics.js';
import MainNavigationComponent from './components/main-navigation.js';
import ProfileRatingComponent from './components/profile-rating.js';
import SortingComponent from './components/sorting.js';
import StatisticComponent from './components/statistic.js';
import FilmsComponent from './components/films.js';
import FilmsListController from './controllers/films-list.js';

import {generateFilters} from './utils/filters.js';
import {generateSorting} from './utils/sorting.js';
import {generateStatistics} from './utils/statistic.js';
import {render, RenderPosition} from './utils/render.js';
import {CardCount} from './const.js';

import {generateCards} from './mock/film.js';

const cards = generateCards(CardCount.ALL);
const filters = generateFilters(cards);
const moviesInside = cards.length;
const sort = generateSorting();
const stats = generateStatistics(cards);
const userRank = stats.rank;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(headerElement, new ProfileRatingComponent(userRank), RenderPosition.BEFOREEND);
render(mainElement, new MainNavigationComponent(filters), RenderPosition.BEFOREEND);
render(mainElement, new SortingComponent(sort), RenderPosition.BEFOREEND);
render(mainElement, new StatisticComponent(stats), RenderPosition.AFTERBEGIN);

render(mainElement, new FilmsComponent(), RenderPosition.BEFOREEND);

const filmsContainer = mainElement.querySelector(`.films`);

const filmsListController = new FilmsListController(filmsContainer);
filmsListController.render(cards);
render(footerStatisticsElement, new FooterStatisticsComponent(moviesInside), RenderPosition.BEFOREEND);

