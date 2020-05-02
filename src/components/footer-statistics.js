import AbstractComponent from "./abstract-component.js";

const creatFooterStatisticsTemplate = (number) => {
  return (
    `<p>${number} movies inside</p>`
  );
};

export default class FooterStatistics extends AbstractComponent {
  constructor(number) {
    super();
    this._number = number;
  }
  getTemplate() {
    return creatFooterStatisticsTemplate(this._number);
  }
}
