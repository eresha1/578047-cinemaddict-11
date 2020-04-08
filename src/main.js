import {createProfileRatingTemplate} from "./components/profile-rating.js";
import {createMainNavigationTemplate} from "./components/main-navigation.js";
import {creatSortTemplate} from "./components/sort.js";
import {createTemplateContent} from "./components/films.js";
import {creatFooterStatisticsTemplate} from "./components/footer-statistics.js";
import {creatFilmDetailsTemplate} from "./components/film-details.js";
import {render} from "./components/utils.js";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(headerElement, createProfileRatingTemplate());
render(mainElement, createMainNavigationTemplate());
render(mainElement, creatSortTemplate());
render(mainElement, createTemplateContent());
render(footerStatisticsElement, creatFooterStatisticsTemplate());
render(document.body, creatFilmDetailsTemplate());
