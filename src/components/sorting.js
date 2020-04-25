import {createElement} from '../utils/render.js';

const createSortItem = (title, link, isActive) => {
  return `<li><a href="#${link}" class="sort__button ${isActive === true ? `sort__button--active` : ``}">${title}</a></li>`;
};

const creatSortTemplate = (sort) => {
  const sortItems = sort.map((it) => createSortItem(it.title, it.link, it.isActive)).join(`\n`);
  return `<ul class="sort">
            ${sortItems}
  </ul>`;
};

export default class Sorting {
  constructor(sort) {
    this._sort = sort;
    this._element = null;
  }
  getTemplate() {
    return creatSortTemplate(this._sort);
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

