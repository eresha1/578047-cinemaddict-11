import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

const bodyContainer = document.querySelector(`body`);

export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._escPressHandler = this._escPressHandler.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
    this._openFilmDetails = this._openFilmDetails.bind(this);

    this._film = null;
  }

  render(film) {
    this._film = film;
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetalesComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    const cardCloseFilmDetailsHandler = () => this._closeFilmDetails();
    const cardOpenFilmDetailsHandler = () => this._openFilmDetails();

    this._filmCardComponent.setOpenFilmDetailsHandler(cardOpenFilmDetailsHandler);

    this._filmDetailsComponent.setCloseFilmDetailsHandler(cardCloseFilmDetailsHandler);

    this._filmCardComponent.setAddToWatchlistClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist
      }));
    });

    this._filmCardComponent.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        isWatched: !film.isWatched
      }));
    });

    this._filmCardComponent.setMarkAsFavoriteClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        isFavorite: !film.isFavorite
      }));
    });

    if (oldFilmDetalesComponent && oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetalesComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmDetails();
    }
  }

  destroy() {
    remove(this._filmDetailsComponent);
    remove(this._filmCardComponent);
    document.removeEventListener(`keydown`, this._escPressHandler);
  }

  _escPressHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._closeFilmDetails();
    }
  }

  _openFilmDetails() {
    bodyContainer.classList.add(`hide-overflow`);
    bodyContainer.appendChild(this._filmDetailsComponent.getElement());
    document.addEventListener(`keydown`, this._escPressHandler);

    this._onViewChange();
    this._mode = Mode.EDIT;
  }

  _closeFilmDetails() {
    this._onDataChange(this._film, Object.assign({}, this._film, {
      isWatched: this._filmDetailsComponent._isWatched,
      isFavorite: this._filmDetailsComponent._isFavorite,
      isWatchlist: this._filmDetailsComponent._isWatchlist
    }));
    bodyContainer.classList.remove(`hide-overflow`);
    bodyContainer.removeChild(this._filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, this._escPressHandler);
    this._mode = Mode.DEFAULT;
  }
}
