import {createElement} from '../utils/render.js';

const creatFooterStatisticsTemplate = (number) => {
  return (
    `<p>${number} movies inside</p>`
  );
};

export default class FooterStatistics {
  constructor(number) {
    this._number = number;
    this._element = null;
  }
  getTemplate() {
    return creatFooterStatisticsTemplate(this._number);
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
