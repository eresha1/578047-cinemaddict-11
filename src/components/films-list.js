import {creatButtonShowMoreTemplate} from "./button-show.js";
import {creatFilmCardTemplate} from "./film-card.js";
import {ShowingCardsCount} from "./../const.js";
import {CardCount, generateCard, generateCards} from './../mock/film.js';
import {render} from "../utils/render.js";

export const cards = generateCards(CardCount.ALL);
export const totalWatchedMovies = cards.filter((elem)=> elem.isWatched);

let showingCardsCountCurrent = ShowingCardsCount.ON_START;

export const showMoreCards = (place, element) => {
  const prevCardsCount = showingCardsCountCurrent;
  showingCardsCountCurrent = showingCardsCountCurrent + ShowingCardsCount.BY_BUTTON;
  let cardsMore = cards.slice(prevCardsCount, showingCardsCountCurrent);
  cardsMore.forEach((card) => render(place, creatFilmCardTemplate(card)));

  if (showingCardsCountCurrent >= cards.length) {
    element.remove();
  }
};

const getListCardsExtra = (count) => {
  let listCards = ``;
  for (let i = 0; i < count; i++) {
    const card = generateCard();
    listCards += creatFilmCardTemplate(card);
  }
  return listCards;
};

const getListCards = (count, start) => {
  let listCards = ``;
  for (let i = start; i < count; i++) {
    const card = cards[i];
    listCards += creatFilmCardTemplate(card);
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
  const markupCards = isUpcomingList ? getListCards(showingCardsCountCurrent, 0) : getListCardsExtra(number);

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
