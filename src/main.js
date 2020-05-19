import FooterStatisticsComponent from './components/footer-statistics.js';
// import FilterComponent from './components/filter.js';

import FilterController from "./controllers/filter.js";
import ProfileRatingComponent from './components/profile-rating.js';
import StatisticComponent from './components/statistic.js';
// import FilmsComponent from './components/films.js';
import FilmsListController from './controllers/films-list.js';

import FilmsModel from "./models/films.js";

// import {generateFilters} from './utils/filters.js';
import {generateStatistics} from './utils/statistic.js';
import {render, RenderPosition} from './utils/render.js';
import {CardCount} from './utils/../const.js';

import {generateCards} from './mock/film.js';

const cards = generateCards(CardCount.ALL);
const filmsModel = new FilmsModel();
filmsModel.setFilms(cards);
// const filters = generateFilters(cards);
const filmsInside = cards.length;
const stats = generateStatistics(cards);
const userRank = stats.rank;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(headerElement, new ProfileRatingComponent(userRank), RenderPosition.BEFOREEND);
// render(mainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);
const filterController = new FilterController(mainElement, filmsModel);
filterController.render();
// render(mainElement, new SortingComponent(), RenderPosition.BEFOREEND);
render(mainElement, new StatisticComponent(stats), RenderPosition.AFTERBEGIN);


// const filmsComponent = new FilmsComponent();
// render(mainElement, filmsComponent, RenderPosition.BEFOREEND);

const filmsListController = new FilmsListController(mainElement, filmsModel);

filmsListController.render(cards);

render(footerStatisticsElement, new FooterStatisticsComponent(filmsInside), RenderPosition.BEFOREEND);

