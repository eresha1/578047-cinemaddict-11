import {createFilmsListTemplate} from "./films-list.js";
import {CardCount} from "./../mock/film.js";

const filmsSection = [
  {
    title: `All movies. Upcoming`,
    type: `upcoming`,
    number: CardCount.ALL
  },
  {
    title: `Top rated`,
    type: `extra`,
    number: CardCount.TOP_RATED
  },
  {
    title: `Most commented`,
    type: `extra`,
    number: CardCount.MOST_COMMENTED
  }
];

const createBlockFilmCards = (block) => {
  let blockFilmCard = ``;
  for (let i = 0; i < block.length; i++) {
    blockFilmCard += createFilmsListTemplate(block[i]);
  }
  return blockFilmCard;
};

export const createTemplateContent = () => {
  return `<section class="films">
    ${createBlockFilmCards(filmsSection)}
  </section>`;
};
