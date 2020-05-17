import {getFormatDuration, getFormatReleaseDate} from '../utils/common.js';
import AbstractComponent from "./abstract-component.js";


const createButtonMarkup = (name, title, isActive = false) => {
  return (
    `<button class="film-card__controls-item button film-card__controls-item--${name} ${isActive ? `` : `film-card__controls-item--active`}">${title}</button>`
  );
};
const creatFilmCardTemplate = (card) => {
  const {title, rating, dateRelease, duration, genreFirst, poster, shortDescription, commentsCount, isAtWatchlist, isFavorite, isWatched} = card;

  const year = getFormatReleaseDate(dateRelease);
  const formatDuration = getFormatDuration(duration);

  const watchlistButton = createButtonMarkup(`add-to-watchlist`, `Add to watchlist`, !isAtWatchlist);
  const historyButton = createButtonMarkup(`mark-as-watched`, `Mark as watched`, !isWatched);
  const favoritesButton = createButtonMarkup(`favorite`, `Mark as favorite`, !isFavorite);

  return (
    `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${formatDuration}</span>
      <span class="film-card__genre">${genreFirst}</span>
    </p>
    <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
    <p class="film-card__description">${shortDescription}</p>
    <a class="film-card__comments">${commentsCount} ${commentsCount === 1 ? `comment` : `comments`}</a>
    <form class="film-card__controls">
    ${watchlistButton}
    ${historyButton}
    ${favoritesButton}
    </form>
  </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return creatFilmCardTemplate(this._card);
  }

  setOpenFilmDetailsHandler(handler) {
    this.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)
      .forEach((element) => {
        element.addEventListener(`click`, handler);
      });
  }

  setAddToWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setMarkAsWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setMarkAsFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
