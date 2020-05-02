import FooterStatisticsComponent from './components/footer-statistics.js';
import MainNavigationComponent from './components/main-navigation.js';
import NoFilmsComponent from './components/no-films.js';
import ProfileRatingComponent from './components/profile-rating.js';
import SortingComponent from './components/sorting.js';
import StatisticComponent from './components/statistic.js';
import FilmCardComponent from './components/film-card.js';
import FilmsListComponent from './components/films-list.js';
import FilmsComponent from './components/films.js';
import FilmDetailsComponent from './components/film-details.js';
import ShowMoreButtonComponent from './components/button-show.js';
// import FilmsController from './controllers/films.js';

import {generateFilters} from './utils/filters.js';
import {generateSorting} from './utils/sorting.js';
import {generateStatistics} from './utils/statistic.js';
import {render, RenderPosition, remove} from './utils/render.js';
import {CardCount, ShowingCardsCount} from './utils/../const.js';

import {generateCards} from './mock/film.js';
import {getTopRatedMovies} from './utils/extra-block.js';
import {getMostCommentedMovies} from './utils/extra-block.js';

const cards = generateCards(CardCount.ALL);
const filters = generateFilters(cards);
const moviesInside = cards.length;
const sort = generateSorting();
const stats = generateStatistics(cards);
const userRank = stats.rank;
const mostCommentedMovies = getMostCommentedMovies(cards);
const topRatedMovies = getTopRatedMovies(cards);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(headerElement, new ProfileRatingComponent(userRank), RenderPosition.BEFOREEND);
render(mainElement, new MainNavigationComponent(filters), RenderPosition.BEFOREEND);
render(mainElement, new SortingComponent(sort), RenderPosition.BEFOREEND);
render(mainElement, new StatisticComponent(stats), RenderPosition.AFTERBEGIN);


const renderCard = (filmListElement, film) => {

  const escPressHandler = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      closeFilmDetails();
    }
  };

  const openFilmDetails = () => {
    document.body.classList.add(`hide-overflow`);
    render(document.body, filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, escPressHandler);
  };
  const cardOpenFilmDetailsHandler = () => openFilmDetails();

  const closeFilmDetails = () => {
    document.body.classList.remove(`hide-overflow`);
    document.body.removeChild(filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, escPressHandler);
  };

  const closeFilmDetailsHandler = () => closeFilmDetails();

  const filmCardComponent = new FilmCardComponent(film);
  filmCardComponent.setOpenFilmDetailsHandler(cardOpenFilmDetailsHandler);

  const filmDetailsComponent = new FilmDetailsComponent(film);
  filmDetailsComponent.setCloseFilmDetailsHandler(closeFilmDetailsHandler);

  render(filmListElement, filmCardComponent, RenderPosition.BEFOREEND);
};

const renderListCard = (listComponent, films) => {

  const filmListElement = listComponent.getElement().querySelector(`.films-list__container`);

  let showingCardsCount = ShowingCardsCount.ON_START;
  films.slice(0, showingCardsCount)
    .forEach((card) => {
      renderCard(filmListElement, card);
    });

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(listComponent.getElement(), showMoreButtonComponent, RenderPosition.BEFOREEND);
  showMoreButtonComponent.setClickHandler(() => {
    const prevCardsCount = showingCardsCount;
    showingCardsCount = showingCardsCount + ShowingCardsCount.BY_BUTTON;

    films.slice(prevCardsCount, showingCardsCount)
      .forEach((card) => renderCard(filmListElement, card));

    if (showingCardsCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  });
};

const renderListExtra = (listExtraComponent, films) => {
  const cardListExtraElement = listExtraComponent.getElement().querySelector(`.films-list__container`);
  let showingCardsCount = ShowingCardsCount.EXTRA_MOVIE_CARD;
  films.slice(0, showingCardsCount)
    .forEach((card) => {
      renderCard(cardListExtraElement, card);
    });
};


render(mainElement, new FilmsComponent(), RenderPosition.BEFOREEND);
const filmsContainer = mainElement.querySelector(`.films`);


const renderFilmsContent = () => {
  if (cards.length === 0) {
    render(filmsContainer, new NoFilmsComponent(), RenderPosition.BEFOREEND);
    return;
  }
  const listComponent = new FilmsListComponent();
  render(filmsContainer, listComponent, RenderPosition.BEFOREEND);
  renderListCard(listComponent, cards);

  const listTopRatedComponent = new FilmsListComponent(`--extra`, `Top rated`);
  render(filmsContainer, listTopRatedComponent, RenderPosition.BEFOREEND);

  if (topRatedMovies.length > 0) {
    renderListExtra(listTopRatedComponent, topRatedMovies);
  }

  const listCommentedComponent = new FilmsListComponent(`--extra`, `Most commented`);
  render(filmsContainer, listCommentedComponent, RenderPosition.BEFOREEND);

  if (mostCommentedMovies.length > 0) {
    renderListExtra(listCommentedComponent, mostCommentedMovies);
  }
};

renderFilmsContent();

render(footerStatisticsElement, new FooterStatisticsComponent(moviesInside), RenderPosition.BEFOREEND);

