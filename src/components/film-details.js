import {MONTH_NAMES} from '../const.js';
import {COMMENTS_EMODJIES} from './../mock/comment.js';
import {getFormatDuration} from '../utils/common.js';
import AbstractSmartComponent from "./abstract-smart-component";

const createGenresnMarkup = (genres) => {
  return genres.map((genre) => {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  }).join(`\n`);
};

const createEmojinMarkup = (names) => {
  return names.map((name) => {
    return (
      `<input
        class="film-details__emoji-item visually-hidden"
        name="comment-emoji"
        type="radio"
        id="emoji-${name}"
        value="${name}"
      >
      <label class="film-details__emoji-label" for="emoji-${name}">
        <img src="images/emoji/${name}.png" width="30" height="30" alt="emoji">
      </label>`
    );
  }).join(`\n`);
};

const createCommentsnMarkup = (comments) => {
  return comments.map((comment) => {
    const {text, author, emoji, date} = comment;
    return (
      `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-{emotion}">
              </span>
              <div>
                <p class="film-details__comment-text">${text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${author}</span>
                  <span class="film-details__comment-day">${date}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`
    );
  }).join(`\n`);
};

const createButtonMarkup = (name, text, isChecked = true) => {
  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}" ${isChecked ? `checked` : ``}>
    <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${text}</label>`
  );
};


// const createEmojiImage = (name) => {
//   const image = document.createElement(`img`);
//   image.width = 55;
//   image.height = 55;
//   image.src = `images/emoji/${name}.png`;
//   image.alt = `emoji-${name}`;
//   return image;
// };


const creatFilmDetailsCardTemplate = (bigCard, options = {}) => {
  const {
    title,
    originalTitle,
    poster,
    rating,
    producer,
    writers,
    actors,
    countries,
    genres,
    duration,
    description,
    dateRelease,
    comments,
    commentsCount,
    ageRating,
    isFavorite,
    isWatched,
    isAtWatchlist
  } = bigCard;

  const {newComment} = options;


  const date = `${dateRelease.getDate()} ${MONTH_NAMES[dateRelease.getMonth()]}`;
  const year = dateRelease.getFullYear();

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
                <td class="film-details__cell">${date} ${year}</td>
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
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">${comments.length === 1 ? `Comment` : `Comments`} <span class="film-details__comments-count">${commentsCount}</span></h3>

          <ul class="film-details__comments-list">
          ${createCommentsnMarkup(comments)}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">
            ${ newComment.emoji ? `<img src="images/emoji/${newComment.emoji}.png" width="55" height="55" alt="emoji-smile">` : ``}
          </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
            ${createEmojinMarkup(COMMENTS_EMODJIES)}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(bigCard) {
    super();
    this._bigCard = bigCard;

    this._newComment = {
      // text: ``,
      emoji: ``,
      // author: ``,
      // date: null,
    };


    this._subscribeOnEvents();

    this._closeFilmDetailsHandler = null;
    this._addToWatchlistClickHandler = null;
    this._addWatchedClickHandler = null;
    this._addToFavoriteClickHandler = null;
  }

  getTemplate() {
    return creatFilmDetailsCardTemplate(this._bigCard, {
      newComment: this._newComment,
    });
  }

  recoveryListeners() {
    this.setCloseFilmDetailsHandler(this._closeFilmDetailsHandler);
    this.setAddToWatchlistClickHandler(this._addToWatchlistClickHandler);
    this.setMarkAsWatchedClickHandler(this._addWatchedClickHandler);
    this.setMarkAsFavoriteClickHandler(this._addToFavoriteClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this._newComment = {
      // text: ``,
      emoji: ``,
      // author: ``,
      // date: null,
    };

    this.rerender();
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

  _subscribeOnEvents() {
    const element = this.getElement();
    element.querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, (evt) => {
        this._newComment.emoji = evt.target.value;
        this.rerender();
      });
  }

}
