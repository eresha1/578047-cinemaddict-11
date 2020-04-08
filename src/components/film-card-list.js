import {creatFilmCardTemplate} from "./film-card.js";

export const getListCards = (count) => {
  let listCards = ``;
  for (let i = 0; i < count; i++) {
    listCards += creatFilmCardTemplate();
  }
  return listCards;
};
