import FilmsListComponent from '../components/films-list.js';
import FilmsComponent from '../components/films.js';
import ShowMoreButtonComponent from '../components/button-show.js';
import NoFilmsComponent from '../components/no-films.js';
import FilmsContainerComponent from '../components/films-container.js';
import SortingComponent, {SortType} from "../components/sorting.js";

import FilmController from '../controllers/film.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {ShowingCardsCount, CardCount} from '../const.js';
import {getTopRatedMovies, getMostCommentedMovies, getDatadMovies} from '../utils/sorting.js';

const renderFilms = (films, filmCardsContainer) => {
  return films.map((film) => {
    const filmController = new FilmController(filmCardsContainer);
    filmController.render(film);
    return filmController;
  });
};

const getSortedFilms = (filmsList, sortType, from, to) => {
  let sortedFilms = [];
  const shownFilms = filmsList.slice();

  switch (sortType) {
    case SortType.DEFAULT:
    default:
      sortedFilms = shownFilms;
      break;
    case SortType.DATE:
      sortedFilms = getDatadMovies(shownFilms);
      // sortedFilms = shownFilms.sort((a, b) => b.release.getTime() - a.release.getTime());
      break;
    case SortType.RATING:
      // sortedFilms = shownFilms.sort((a, b) => b.rating - a.rating);

      sortedFilms = getTopRatedMovies(shownFilms);
      break;
    case SortType.COMMENTS:
    //   sortedFilms = shownFilms.sort((a, b) => b.comments.length - a.comments.length);
      sortedFilms = getMostCommentedMovies(shownFilms);
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class FilmsListController {
  constructor(container) {
    this._container = container;

    this._filmsComponent = new FilmsComponent();

    this._sortingComponent = new SortingComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._listTopRatedComponent = new FilmsListComponent(`--extra`, `Top rated`);
    this._listCommentedComponent = new FilmsListComponent(`--extra`, `Most commented`);
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._filmsTopContainerComponent = new FilmsContainerComponent();
    this._filmsCommentContainerComponent = new FilmsContainerComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._showingCardsCount = ShowingCardsCount.ON_START;
    this._showingCardsCountByButton = ShowingCardsCount.BY_BUTTON;
    this._showingCardsCountExtra = ShowingCardsCount.EXTRA_MOVIE_CARD;
    this._cardCountAll = CardCount.ALL;
    this._shownFilms = [];
    this._sortedCards = [];
    this._sortTypeHandler = this._sortTypeHandler.bind(this);

    this._sortingComponent.setSortTypeChangeHandler(this._sortTypeHandler);
  }

  render(films) {
    this._films = films;
    const filmsContainer = this._container;

    render(filmsContainer, this._sortingComponent, RenderPosition.BEFOREEND);

    if (films.length === 0) {
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
    const newCards = renderFilms(this._films.slice(0, this._showingCardsCount), this._filmsContainerComponent.getElement());
    this._shownFilms = [].concat(newCards);

    this._renderShowMoreBtn();
  }

  _renderListExtra(listExtraComponent, containerExtraComponent, sortType) {
    render(this._filmsComponent.getElement(), listExtraComponent, RenderPosition.BEFOREEND);

    render(listExtraComponent.getElement(), containerExtraComponent, RenderPosition.BEFOREEND);

    const sortedFilmCards = getSortedFilms(this._films, sortType, 0, this._showingCardsCountExtra);
    const newfilmExtra = renderFilms(sortedFilmCards, containerExtraComponent.getElement());
    this._shownFilms = [].concat(newfilmExtra);
  }

  _renderShowMoreBtn() {
    if (this._showingCardsCount >= this._films.length) {
      return;
    }

    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(() => {
      this._showMore(this._films);
    });
  }

  _showMore(films) {
    const prevCardsCount = this._showingCardsCount;
    this._showingCardsCount += ShowingCardsCount.BY_BUTTON;
    const sortedFilmCards = getSortedFilms(this._films, this._sortingComponent.getSortType(), prevCardsCount, this._showingCardsCount);
    const moreFilms = renderFilms(sortedFilmCards, this._filmsContainerComponent.getElement());

    this._shownFilms = this._shownFilms.concat(moreFilms);
    if (this._showingCardsCount >= films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _sortTypeHandler(sortType) {
    this._showingCardsCount = ShowingCardsCount.BY_BUTTON;
    const sortedCards = getSortedFilms(this._films, sortType, 0, this._showingCardsCount);

    this._filmsContainerComponent.getElement().innerHTML = ``;

    const moreFilms = renderFilms(sortedCards, this._filmsContainerComponent.getElement());
    this._shownFilms = [].concat(moreFilms);
    this._shownFilms = moreFilms;

    this._renderShowMoreBtn();
  }
}
