import FilmsListComponent from '../components/films-list.js';
import ShowMoreButtonComponent from '../components/button-show.js';
import NoFilmsComponent from '../components/no-films.js';import FilmsContainerComponent from '../components/films-container.js';

import FilmController from '../controllers/film.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {ShowingCardsCount} from '../utils/../const.js';
import {getTopRatedMovies, getMostCommentedMovies} from '../utils/extra-block.js';

const renderListCard = (listComponent, films) => {
  const filmsContainerComponent = new FilmsContainerComponent();
  render(listComponent.getElement(), filmsContainerComponent, RenderPosition.BEFOREEND);
  const filmController = new FilmController(filmsContainerComponent.getElement());
  let showingCardsCount = ShowingCardsCount.ON_START;
  films.slice(0, showingCardsCount)
    .forEach((card) => {
      filmController.render(card);
    });

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(listComponent.getElement(), showMoreButtonComponent, RenderPosition.BEFOREEND);
  showMoreButtonComponent.setClickHandler(() => {
    const prevCardsCount = showingCardsCount;
    showingCardsCount = showingCardsCount + ShowingCardsCount.BY_BUTTON;

    films.slice(prevCardsCount, showingCardsCount)
      .forEach((card) => filmController.render(card));

    if (showingCardsCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  });
};


const renderListExtra = (listExtraComponent, films) => {
  const filmsContainerComponent = new FilmsContainerComponent();
  render(listExtraComponent.getElement(), filmsContainerComponent, RenderPosition.BEFOREEND);
  const filmController = new FilmController(filmsContainerComponent.getElement());
  let showingCardsCount = ShowingCardsCount.EXTRA_MOVIE_CARD;
  films.slice(0, showingCardsCount)
    .forEach((card) => {
      filmController.render(card);
    });
};

export default class FilmsListController {
  constructor(container) {
    this._container = container;
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._listTopRatedComponent = new FilmsListComponent(`--extra`, `Top rated`);
    this._listCommentedComponent = new FilmsListComponent(`--extra`, `Most commented`);
  }

  render(cards) {
    const filmsContainer = this._container.getElement();
    if (cards.length === 0) {
      render(filmsContainer, this._noFilmsComponent(), RenderPosition.BEFOREEND);
      return;
    }

    render(filmsContainer, this._filmsListComponent, RenderPosition.BEFOREEND);
    renderListCard(this._filmsListComponent, cards);

    const mostCommentedMovies = getMostCommentedMovies(cards);
    const topRatedMovies = getTopRatedMovies(cards);

    render(filmsContainer, this._listTopRatedComponent, RenderPosition.BEFOREEND);

    if (topRatedMovies.length > 0) {
      renderListExtra(this._listTopRatedComponent, topRatedMovies);
    }

    render(filmsContainer, this._listCommentedComponent, RenderPosition.BEFOREEND);

    if (mostCommentedMovies.length > 0) {
      renderListExtra(this._listCommentedComponent, mostCommentedMovies);
    }
  };
}
