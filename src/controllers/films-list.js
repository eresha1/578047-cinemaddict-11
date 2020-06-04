import FilmsListComponent from '../components/films-list.js';
import FilmsComponent from '../components/films.js';
import FilmCardComponent from '../components/film-card.js';
import ShowMoreButtonComponent from '../components/button-show.js';
import NoFilmsComponent from '../components/no-films.js';
import FilmsContainerComponent from '../components/films-container.js';
import SortingComponent, {SortType} from "../components/sorting.js";

import FilmController from './film.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {ShowingCardsCount} from '../const.js';

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
      sortedFilms = shownFilms.sort((a, b) => b.dateRelease.getTime() - a.dateRelease.getTime());
      break;
    case SortType.RATING:
      sortedFilms = shownFilms.sort((a, b) => b.rating - a.rating);
      break;
    case SortType.COMMENTS:
      sortedFilms = shownFilms.sort((a, b) => b.commentsCount - a.commentsCount);
      break;
  }
  return sortedFilms.slice(from, to);
};

export default class FilmsListController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

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
    this._onFilterChange = this._onFilterChange.bind(this);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._showMoreButtonClickHandler = this._showMoreButtonClickHandler.bind(this);

    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const filmsContainer = this._container;
    const films = this._filmsModel.getFilms();
    render(filmsContainer, this._sortingComponent, RenderPosition.BEFOREEND);

    if (films.length === 0) {
      render(filmsContainer, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(filmsContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent.getElement(), this._filmsListComponent, RenderPosition.BEFOREEND);

    this._renderListCard(films.slice(0, this._showingCardsCount));

    const listTopRatedComponent = this._listTopRatedComponent;
    const filmsTopContainer = this._filmsTopContainerComponent;
    this._renderListExtra(films, listTopRatedComponent, filmsTopContainer, SortType.RATING);

    const listCommented = this._listCommentedComponent;
    const filmsCommentContainer = this._filmsCommentContainerComponent;
    this._renderListExtra(films, listCommented, filmsCommentContainer, SortType.COMMENTS);
  }

  _removeFilms() {
    this._showedFilmsControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmsControllers = [];

  }

  _renderListCard(films) {
    render(this._filmsListComponent.getElement(), this._filmsContainerComponent, RenderPosition.BEFOREEND);

    const newCards = renderFilms(films, this._filmsContainerComponent.getElement(), this._onDataChange, this._onViewChange);

    this._showedFilmsControllers = this._showedFilmsControllers.concat(newCards);

    this._showingCardsCount = this._showedFilmsControllers.length;
    this._renderShowMoreBtn();
  }

  _renderListExtra(films, listExtraComponent, containerExtraComponent, sortType) {
    render(this._filmsComponent.getElement(), listExtraComponent, RenderPosition.BEFOREEND);

    render(listExtraComponent.getElement(), containerExtraComponent, RenderPosition.BEFOREEND);

    const sortedFilmExtra = getSortedFilms(films, sortType, 0, ShowingCardsCount.EXTRA_MOVIE_CARD);

    const newFilmExtra = renderFilms(sortedFilmExtra, containerExtraComponent.getElement(), this._onDataChange, this._onViewChange);

    this._showedFilmsControllersExtra = [].concat(newFilmExtra);
  }

  _renderShowMoreBtn() {
    remove(this._showMoreButtonComponent);

    if (this._showingCardsCount >= this._filmsModel.getFilms().length) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._showMoreButtonClickHandler);
  }

  _showMoreButtonClickHandler() {
    const prevCardsCount = this._showingCardsCount;
    const films = this._filmsModel.getFilms();
    const filmsContainerElement = this._filmsContainerComponent.getElement();

    this._showingCardsCount += ShowingCardsCount.BY_BUTTON;

    const sortedFilmCards = getSortedFilms(films, this._sortingComponent.getSortType(), prevCardsCount, this._showingCardsCount);

    const moreFilms = renderFilms(sortedFilmCards, filmsContainerElement, this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(moreFilms);

    if (this._showingCardsCount >= films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderListCard(this._filmsModel.getFilms().slice(0, count));

    this._renderShowMoreBtn();
  }

  _onDataChange(oldData, newData) {
    const isSuccess = this._filmsModel.updateFilms(oldData.id, newData);
    if (isSuccess) {
      this._showedFilmsControllers.find((elem) => elem._filmCardComponent._card === oldData).render(newData);
      // console.log(oldData)
      // console.log(newData)
    }
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateFilms(ShowingCardsCount.ON_START);
  }

  _onSortTypeChange(sortType) {
    this._showingCardsCount = ShowingCardsCount.ON_START;

    const sortedCards = getSortedFilms(this._filmsModel.getFilms(), sortType, 0, this._showingCardsCount);

    this._removeFilms();
    this._renderListCard(sortedCards);

    this._renderShowMoreBtn();
  }
}

