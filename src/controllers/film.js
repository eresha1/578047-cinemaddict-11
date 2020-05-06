import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';
import {render, RenderPosition} from '../utils/render.js';

export default class FilmController {
  constructor(container) {
    this._container = container;
    // this._body = document.querySelector(`body`);
  }

  render(film) {
    this._film = film;
    const escPressHandler = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        closeFilmDetails();
      }
    };

    const cardOpenFilmDetailsHandler = () => {
      document.body.classList.add(`hide-overflow`);
      render(document.body, filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, escPressHandler);
    };

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
    render(this._container, filmCardComponent, RenderPosition.BEFOREEND);
  }
}
