import FooterStatisticsComponent from './components/footer-statistics.js';
import MainNavigationComponent from './components/main-navigation.js';
import ProfileRatingComponent from './components/profile-rating.js';
import SortingComponent from './components/sorting.js';
import StatisticComponent from './components/statistic.js';
import FilmCardComponent from './components/film-card.js';
import FilmsListComponent from './components/films-list.js';
import FilmsComponent from './components/films.js';
import FilmDetailsComponent from './components/film-details.js';
import ShowMoreButtonComponent from './components/button-show.js';

import {generateFilters} from './utils/filters.js';
import {generateSorting} from './utils/sorting.js';
import {generateStatistics} from './utils/statistic.js';
import {render, RenderPosition} from './utils/render.js';
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

render(headerElement, new ProfileRatingComponent(userRank).getElement(), RenderPosition.BEFOREEND);

render(mainElement, new MainNavigationComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortingComponent(sort).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new StatisticComponent(stats).getElement(), RenderPosition.AFTERBEGIN);

const renderCard = (filmListElement, film) => {

  const escPressHandler = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      closeFilmDetails();
    }
  };

  const openFilmDetails = () => {
    document.body.classList.add(`hide-overflow`);
    render(document.body, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, escPressHandler);
  };

  const closeFilmDetails = () => {
    document.body.classList.remove(`hide-overflow`);
    document.body.removeChild(filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, escPressHandler);
  };

  const filmCardComponent = new FilmCardComponent(film);
  const posterElement = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const titleElement = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const commentsElement = filmCardComponent.getElement().querySelector(`.film-card__comments`);
  posterElement.addEventListener(`click`, () => openFilmDetails());
  titleElement.addEventListener(`click`, () => openFilmDetails());
  commentsElement.addEventListener(`click`, () => openFilmDetails());

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const closeButtonElement = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  closeButtonElement.addEventListener(`click`, () => closeFilmDetails());

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderListCard = (listComponent, films) => {
  const filmListElement = listComponent.getElement().querySelector(`.films-list__container`);

  let showingCardsCount = ShowingCardsCount.ON_START;
  films.slice(0, showingCardsCount)
    .forEach((card) => {
      renderCard(filmListElement, card);
    });

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(listComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevCardsCount = showingCardsCount;
    showingCardsCount = showingCardsCount + ShowingCardsCount.BY_BUTTON;

    films.slice(prevCardsCount, showingCardsCount)
      .forEach((card) => renderCard(filmListElement, card));

    if (showingCardsCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
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

render(mainElement, new FilmsComponent().getElement(), RenderPosition.BEFOREEND);

const filmsContainer = mainElement.querySelector(`.films`);

const listComponent = new FilmsListComponent();
render(filmsContainer, listComponent.getElement(), RenderPosition.BEFOREEND);
renderListCard(listComponent, cards);

const listTopRatedComponent = new FilmsListComponent(`--extra`, `Top rated`);
render(filmsContainer, listTopRatedComponent.getElement(), RenderPosition.BEFOREEND);

if (topRatedMovies.length > 0) {
  renderListExtra(listTopRatedComponent, topRatedMovies);
}

const listCommentedComponent = new FilmsListComponent(`--extra`, `Most commented`);
render(filmsContainer, listCommentedComponent.getElement(), RenderPosition.BEFOREEND);

if (mostCommentedMovies.length > 0) {
  renderListExtra(listCommentedComponent, mostCommentedMovies);
}

render(footerStatisticsElement, new FooterStatisticsComponent(moviesInside).getElement(), RenderPosition.BEFOREEND);

