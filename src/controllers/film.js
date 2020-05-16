import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';
import {render, RenderPosition, replace} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};


export default class FilmController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._escPressHandler = this._escPressHandler.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
    this._openFilmDetails = this._openFilmDetails.bind(this);
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetalesComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    const cardCloseFilmDetailsHandler = () => this._closeFilmDetails();
    const cardOpenFilmDetailsHandler = () => this._openFilmDetails();

    this._filmCardComponent.setOpenFilmDetailsHandler(cardOpenFilmDetailsHandler);

    this._filmCardComponent.setAddToWatchlistClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        isAtWatchlist: !film.isAtWatchlist
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


    this._filmDetailsComponent.setCloseFilmDetailsHandler(cardCloseFilmDetailsHandler);

    this._filmDetailsComponent.setAddToWatchlistClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        isAtWatchlist: !film.isAtWatchlist
      }));
    });

    this._filmDetailsComponent.setMarkAsWatchedClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(film, Object.assign({}, film, {
        isWatched: !film.isWatched
      }));
    });

    this._filmDetailsComponent.setMarkAsFavoriteClickHandler((evt) => {
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
      this._replaceEditToTask();
    }
  }

  _escPressHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._closeFilmDetails();
    }
  }

  _openFilmDetails() {
    document.body.classList.add(`hide-overflow`);
    render(document.body, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._escPressHandler);
  }

  _closeFilmDetails() {
    document.body.classList.remove(`hide-overflow`);
    document.body.removeChild(this._filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, this._escPressHandler);
  }
}
