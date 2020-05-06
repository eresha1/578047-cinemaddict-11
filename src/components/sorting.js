import AbstractComponent from "./abstract-component.js";

const createSortItem = (title, link, isActive) => {
  return `<li><a href="#${link}" class="sort__button ${isActive === true ? `sort__button--active` : ``}">${title}</a></li>`;
};

const creatSortTemplate = (sort) => {
  const sortItems = sort.map((it) => createSortItem(it.title, it.link, it.isActive)).join(`\n`);
  return `<ul class="sort">
            ${sortItems}
  </ul>`;
};

export default class Sorting extends AbstractComponent {
  constructor(sort) {
    super();
    this._sort = sort;
  }
  getTemplate() {
    return creatSortTemplate(this._sort);
  }
}

