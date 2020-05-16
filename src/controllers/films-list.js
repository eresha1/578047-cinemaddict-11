import FilmsListComponent from '../components/films-list.js';
import FilmsComponent from '../components/films.js';
import FilmCardComponent from '../components/film-card.js';
import ShowMoreButtonComponent from '../components/button-show.js';
import NoFilmsComponent from '../components/no-films.js';
import FilmsContainerComponent from '../components/films-container.js';
import SortingComponent, {SortType} from "../components/sorting.js";

import FilmController from '../controllers/film.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {ShowingCardsCount} from '../const.js';
// import {getTopRatedMovies, getMostCommentedMovies, getDatadMovies} from '../utils/sorting.js';

const renderFilms = (films, filmCardsContainer, onDataChange, onViewChange) => {
  return films.map((film) => {
    const filmController = new FilmController(filmCardsContainer, onDataChange, onViewChange);
    filmController.render(film);
    return filmController;
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const shownFilms = films.slice();

  switch (sortType) {
    case SortType.DEFAULT:
    default:
      sortedFilms = shownFilms;
      break;
    case SortType.DATE:
      // sortedFilms = getDatadMovies(shownFilms);
      sortedFilms = shownFilms.sort((a, b) => b.dateRelease.getTime() - a.dateRelease.getTime());
      break;
    case SortType.RATING:
      sortedFilms = shownFilms.sort((a, b) => b.rating - a.rating);
      // sortedFilms = getTopRatedMovies(shownFilms);
      break;
    case SortType.COMMENTS:
      sortedFilms = shownFilms.sort((a, b) => b.commentsCount - a.commentsCount);
      // sortedFilms = getMostCommentedMovies(shownFilms);
      break;
  }
  return sortedFilms.slice(from, to);
};

export default class FilmsListController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showedFilmsControllers = [];
    this._showedFilmsControllersExtra = [];
    this._showingCardsCount = ShowingCardsCount.ON_START;
    this._filmCardComponent = new FilmCardComponent();
    this._filmsComponent = new FilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._listTopRatedComponent = new FilmsListComponent(`--extra`, `Top rated`);
    this._filmsTopContainerComponent = new FilmsContainerComponent();
    this._listCommentedComponent = new FilmsListComponent(`--extra`, `Most commented`);
    this._filmsCommentContainerComponent = new FilmsContainerComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortingComponent = new SortingComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortTypeHandler = this._sortTypeHandler.bind(this);
    this._sortingComponent.setSortTypeChangeHandler(this._sortTypeHandler);
    this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);
  }

  render(films) {
    this._films = films;
    const filmsContainer = this._container;
    render(filmsContainer, this._sortingComponent, RenderPosition.BEFOREEND);

    if (this._films.length === 0) {
      render(filmsContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(filmsContainer, this._filmsComponent, RenderPosition.BEFOREEND);

    this._renderListCard();
    const listTopRatedComponent = this._listTopRatedComponent;
    const filmsTopContainer = this._filmsTopContainerComponent;
    this._renderListExtra(listTopRatedComponent, filmsTopContainer, SortType.RATING);

    const listCommented = this._listCommentedComponent;
    const filmsCommentContainer = this._filmsCommentContainerComponent;
    this._renderListExtra(listCommented, filmsCommentContainer, SortType.COMMENTS);
  }

  _renderListCard() {
    render(this._filmsComponent.getElement(), this._filmsListComponent, RenderPosition.BEFOREEND);

    render(this._filmsListComponent.getElement(), this._filmsContainerComponent, RenderPosition.BEFOREEND);
    const newCards = renderFilms(this._films.slice(0, this._showingCardsCount), this._filmsContainerComponent.getElement(), this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = [].concat(newCards);
    this._renderShowMoreBtn();
  }

  _renderListExtra(listExtraComponent, containerExtraComponent, sortType) {
    render(this._filmsComponent.getElement(), listExtraComponent, RenderPosition.BEFOREEND);

    render(listExtraComponent.getElement(), containerExtraComponent, RenderPosition.BEFOREEND);

    const sortedFilmExtra = getSortedFilms(this._films, sortType, 0, ShowingCardsCount.EXTRA_MOVIE_CARD);
    const newfilmExtra = renderFilms(sortedFilmExtra, containerExtraComponent.getElement(), this._onDataChange, this._onViewChange);

    this._showedFilmsControllersExtra = newfilmExtra;
  }

  _renderShowMoreBtn() {
    if (this._showingCardsCount >= this._films.length) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._showMoreButtonClickHandler);
  }

  _showMoreButtonClickHandler() {
    const prevCardsCount = this._showingCardsCount;
    const filmsContainerElement = this._filmsContainerComponent.getElement();

    this._showingCardsCount += ShowingCardsCount.BY_BUTTON;

    const sortedFilmCards = getSortedFilms(this._films, this._sortingComponent.getSortType(), prevCardsCount, this._showingCardsCount);

    const moreFilms = renderFilms(sortedFilmCards, filmsContainerElement, this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(moreFilms);

    if (this._showingCardsCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onDataChange(oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }
    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    this._showedFilmsControllers.find((film) => film._filmCardComponent._card === oldData).render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
  }

  _sortTypeHandler(sortType) {
    this._showingCardsCount = ShowingCardsCount.ON_START;

    const sortedCards = getSortedFilms(this._films, sortType, 0, this._showingCardsCount);

    const filmsContainerElement = this._filmsContainerComponent.getElement();

    filmsContainerElement.innerHTML = ``;

    const moreFilms = renderFilms(sortedCards, filmsContainerElement, this._onDataChange, this._onViewChange);

    this._showedFilmsControllers = moreFilms;

    this._renderShowMoreBtn();
  }
}
