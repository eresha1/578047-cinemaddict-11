import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';
import {render, RenderPosition} from '../utils/render.js';

export default class FilmController {
  constructor(container) {
    this._container = container;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._escPressHandler = this._escPressHandler.bind(this);
    this._closeFilmDetails = this._closeFilmDetails.bind(this);
    this._openFilmDetails = this._openFilmDetails.bind(this);
  }

  render(film) {
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    const cardCloseFilmDetailsHandler = () => this._closeFilmDetails();
    const cardOpenFilmDetailsHandler = () => this._openFilmDetails();

    this._filmCardComponent.setOpenFilmDetailsHandler(cardOpenFilmDetailsHandler);


    this._filmDetailsComponent.setCloseFilmDetailsHandler(cardCloseFilmDetailsHandler);

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
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
