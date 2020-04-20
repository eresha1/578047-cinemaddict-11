export const creatFilmCardTemplate = (card) => {
  const {title, rating, dateRelease, duration, genreFirst, poster, shortDescription, commentsCount, isAtWatchlist, isFavorite, isWatched} = card;
  const year = dateRelease.getFullYear();
  return (
    `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genreFirst}</span>
    </p>
    <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
    <p class="film-card__description">${shortDescription}</p>
    <a class="film-card__comments">${commentsCount} ${commentsCount === 1 ? `comment` : `comments`}</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist  ${isAtWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
    </form>
  </article>`
  );
};
