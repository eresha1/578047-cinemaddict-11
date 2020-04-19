import {generateCard} from './../mock/film.js';
import {creatButtonShowMoreTemplate} from "./button-show.js";
import {creatFilmCardTemplate} from "./film-card.js";

const getListCards = (count) => {
  let listCards = ``;
  for (let i = 0; i < count; i++) {
    const film = generateCard();
    listCards += creatFilmCardTemplate(film);
  }
  return listCards;
};

export const createFilmsListTemplate = (data) => {
  const {title, type, number} = data;
  const isUpcomingList = type === `upcoming`;
  const classFilmsList = isUpcomingList ? `films-list` : `films-list--extra`;
  const titleText = title;
  const classTitle = isUpcomingList ? `films-list__title visually-hidden` : `films-list__title`;
  const btnShow = isUpcomingList ? creatButtonShowMoreTemplate() : ``;
  const markupCards = getListCards(number);

  return (
    `<section class="${classFilmsList}">
      <h2 class="${classTitle}">
        ${titleText}
      </h2>
      <div class="films-list__container">
        ${markupCards}
      </div>
      ${btnShow}
    </section>`
  );
};
