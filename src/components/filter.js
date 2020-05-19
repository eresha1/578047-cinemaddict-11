import AbstractComponent from "./abstract-component.js";

const createFilterMarkup = (filter) => {
  const {name, count, checked} = filter;

  const itemCount = name === `All movies` ? `` : `<span class="main-navigation__item-count">${count}</span>`;
  return (
    `<a href="#${name.toLowerCase().split(` `, 1)}" id="${name}"  class="main-navigation__item ${checked ? `main-navigation__item--active` : ``}">${name}
    ${itemCount}
    </a>`
  );
};

const createFiltersTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filtersMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this._filterChangeHandler = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  recoveryListeners() {
    this.setFilterChangeHandler(this._filterChangeHandler);
  }

  rerender() {
    super.rerender();
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterName = evt.target.id;
      handler(filterName);
      this._filterChangeHandler = handler;
    });
  }
}
