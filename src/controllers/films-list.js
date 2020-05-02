import FilmsListComponent from '../components/films-list.js';
import ShowMoreButtonComponent from '../components/button-show.js';
import NoFilmsComponent from '../components/no-films.js';

import FilmController from '../controllers/film.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {ShowingCardsCount} from '../utils/../const.js';
import {getTopRatedMovies, getMostCommentedMovies} from '../utils/extra-block.js';



const renderListCard = (listComponent, films) => {

  const filmListElement = listComponent.getElement().querySelector(`.films-list__container`);
  const filmController = new FilmController(filmListElement);
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
  const cardListExtraElement = listExtraComponent.getElement().querySelector(`.films-list__container`);
  const filmController = new FilmController(cardListExtraElement);
  let showingCardsCount = ShowingCardsCount.EXTRA_MOVIE_CARD;
  films.slice(0, showingCardsCount)
    .forEach((card) => {
      filmController.render(card);
    });
};

const renderFilmsContent = (filmsContainer, cards) => {
  if (cards.length === 0) {
    render(filmsContainer, new NoFilmsComponent(), RenderPosition.BEFOREEND);
    return;
  }
  const listComponent = new FilmsListComponent();
  render(filmsContainer, listComponent, RenderPosition.BEFOREEND);
  renderListCard(listComponent, cards);

  const mostCommentedMovies = getMostCommentedMovies(cards);
  const topRatedMovies = getTopRatedMovies(cards);

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
export default class FilmsListController {
  constructor(container) {
    this._container = container;
  }

  render(films) {
    renderFilmsContent(this._container, films);
  }
}
