import {createElement} from '../utils/render.js';

const createFilterMarkup = (filter, isActive) => {
  const {name, count} = filter;
  const itemCount = name === `All movies` ? `` : `<span class="main-navigation__item-count">${count}</span>`;
  return (
    `<a href="${name}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${name}
    ${itemCount}
    </a>`
  );
};

const createMainNavigationTemplate = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filtersMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export default class MainNavigation {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }
  getTemplate() {
    return createMainNavigationTemplate(this._filters);
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
