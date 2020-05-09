import AbstractComponent from "./abstract-component.js";


export const SortType = {
  DEFAULT: `default`,
  DATE: `date-down`,
  RATING: `rating-down`,
  COMMENTS: `comments`,
};

export const SortingOrder = [
  {
    title: `Sort by default`,
    link: `default`,
    type: SortType.DEFAULT,
    isActive: true,
  },
  {
    title: `Sort by date`,
    link: `date`,
    type: SortType.DATE,
  },
  {
    title: `Sort by rating`,
    link: `rating`,
    type: SortType.RATING,
  },
];

const createSortItem = (orderItem) => {
  const {title, link, type, isActive} = orderItem;
  return `<li><a href="#${link}" data-sort-type="${type}" class="sort__button ${isActive === true ? `sort__button--active` : ``}">${title}</a></li>`;
};

const creatSortTemplate = () => {
  const sortItems = SortingOrder.map((it) => createSortItem(it)).join(`\n`);
  return `<ul class="sort">
            ${sortItems}
  </ul>`;
};

export default class Sorting extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return creatSortTemplate(this._currentSortType);
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const activeButton = this.getElement().querySelector(`.sort__button--active`);
      activeButton.classList.remove(`sort__button--active`);
      evt.target.classList.add(`sort__button--active`);

      const sortType = evt.target.dataset.sortType;
      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}

