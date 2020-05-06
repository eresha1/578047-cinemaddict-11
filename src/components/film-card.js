import {getFormatDuration} from '../utils/common.js';
import AbstractComponent from "./abstract-component.js";

const creatFilmCardTemplate = (card) => {
  const {
    title,
    rating,
    dateRelease,
    duration,
    genreFirst,
    poster,
    shortDescription,
    commentsCount,
    isAtWatchlist,
    isFavorite,
    isWatched
  } = card;
  const year = dateRelease.getFullYear();
  const formatDuration = getFormatDuration(duration);

  const isActive = (status) => {
    return status ? `film-card__controls-item--active` : ``;
  };
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
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist  ${isActive(isAtWatchlist)}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isActive(isWatched)}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isActive(isFavorite)}">Mark as favorite</button>
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
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }
}
