import {getFormatDuration} from '../utils/common.js';
import AbstractSmartComponent from "./abstract-smart-component";
import CommentsComponent from './comments.js';
import {createElement, render, RenderPosition} from '../utils/render.js';
import moment from "moment";

const createGenresnMarkup = (genres) => {
  return genres.map((genre) => {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  }).join(`\n`);
};

const createButtonMarkup = (name, text, isChecked = true) => {
  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}" ${isChecked ? `checked` : ``}>
    <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${text}</label>`
  );
};

const creatFilmDetailsCardTemplate = (bigCard) => {
  const {title, originalTitle, poster, rating, producer, writers, actors, countries, genres, duration, description, dateRelease, ageRating, isFavorite, isWatched, isAtWatchlist} = bigCard;

  const release = moment(dateRelease).format(`D MMMM YYYY`);

  const formatDuration = getFormatDuration(duration);

  const addToWatchlistButton = createButtonMarkup(`watchlist`, `Add to watchlist`, isAtWatchlist);
  const alreadyWatchedtButton = createButtonMarkup(`watched`, `Already watched`, isWatched);
  const addToFavoritesButton = createButtonMarkup(`favorite`, `Add to favorites`, isFavorite);

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">${ageRating}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${originalTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${producer}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${release}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formatDuration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${countries}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genres.length === 1 ? `Genre` : `Genres`}</td>
                <td class="film-details__cell">
                ${createGenresnMarkup(genres)}
                </td>
              </tr>
            </table>
            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>
        <section class="film-details__controls">
        ${addToWatchlistButton}
        ${alreadyWatchedtButton}
        ${addToFavoritesButton}
        </section>
      </div>
      <div class="form-details__bottom-container">
      </div>
    </form>
  </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(bigCard) {
    super();
    this._bigCard = bigCard;

    this._comments = new CommentsComponent(bigCard, this._onDataChange);

    this._closeFilmDetailsHandler = null;
    this._addToWatchlistClickHandler = null;
    this._addWatchedClickHandler = null;
    this._addToFavoriteClickHandler = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      render(this._element.querySelector(`.form-details__bottom-container`), this._comments, RenderPosition.AFTERBEGIN);
    }
    return this._element;
  }

  getTemplate() {
    return creatFilmDetailsCardTemplate(this._bigCard);
  }

  recoveryListeners() {
    this.setCloseFilmDetailsHandler(this._closeFilmDetailsHandler);
    this.setAddToWatchlistClickHandler(this._addToWatchlistClickHandler);
    this.setMarkAsWatchedClickHandler(this._addWatchedClickHandler);
    this.setMarkAsFavoriteClickHandler(this._addToFavoriteClickHandler);
  }

  rerender() {
    super.rerender();
  }

  setCloseFilmDetailsHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._closeFilmDetailsHandler = handler;
  }

  setAddToWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
    this._addToWatchlistClickHandler = handler;
  }

  setMarkAsWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
    this._addWatchedClickHandler = handler;
  }

  setMarkAsFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
    this._addToFavoriteClickHandler = handler;
  }

  // _subscribeOnEvents() {
  //   const element = this.getElement();
  //   element.querySelector(`.film-details__emoji-list`)
  //     .addEventListener(`change`, (evt) => {
  //       this._newComment.emoji = evt.target.value;
  //       this.rerender();
  //     });
  // }

}
