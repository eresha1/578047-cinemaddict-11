import {createElement} from "../utils/render.js";

const createFilmsListTemplate = (extra = ``, title = `All movies. Upcoming`) => {
  return (
    `<section class="films-list${extra}">
        <h2 class="films-list__title${extra ? `` : `visually-hidden`}">${title}</h2>
        <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsList {
  constructor(extra, title) {
    this._extra = extra;
    this._title = title;
    this._element = null;
  }
  getTemplate() {
    return createFilmsListTemplate(this._extra, this._title);
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
