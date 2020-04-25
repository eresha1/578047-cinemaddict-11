import {createElement} from '../utils/render.js';

const createProfileRatingTemplate = (rank) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class ProfileRating {
  constructor(rank) {
    this._rank = rank;
    this._element = null;
  }
  getTemplate() {
    return createProfileRatingTemplate(this._rank);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
