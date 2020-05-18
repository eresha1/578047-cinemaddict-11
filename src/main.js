import FooterStatisticsComponent from './components/footer-statistics.js';
import MainNavigationComponent from './components/main-navigation.js';
import ProfileRatingComponent from './components/profile-rating.js';
import StatisticComponent from './components/statistic.js';
// import FilmsComponent from './components/films.js';
import FilmsListController from './controllers/films-list.js';

import MoviesModel from "./models/movies.js";

import {generateFilters} from './utils/filters.js';
import {generateStatistics} from './utils/statistic.js';
import {render, RenderPosition} from './utils/render.js';
import {CardCount} from './utils/../const.js';

import {generateCards} from './mock/film.js';

const cards = generateCards(CardCount.ALL);
const moviesModel = new MoviesModel();
moviesModel.setMovies(cards);
const filters = generateFilters(cards);
const moviesInside = cards.length;
const stats = generateStatistics(cards);
const userRank = stats.rank;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(headerElement, new ProfileRatingComponent(userRank), RenderPosition.BEFOREEND);
render(mainElement, new MainNavigationComponent(filters), RenderPosition.BEFOREEND);
// render(mainElement, new SortingComponent(), RenderPosition.BEFOREEND);
render(mainElement, new StatisticComponent(stats), RenderPosition.AFTERBEGIN);


// const filmsComponent = new FilmsComponent();
// render(mainElement, filmsComponent, RenderPosition.BEFOREEND);

const filmsListController = new FilmsListController(mainElement, moviesModel);

filmsListController.render(cards);

render(footerStatisticsElement, new FooterStatisticsComponent(moviesInside), RenderPosition.BEFOREEND);

