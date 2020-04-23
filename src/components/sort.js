const createSortItem = (title, link, isActive) => {
  return `<li><a href="#${link}" class="sort__button ${isActive === true ? `sort__button--active` : ``}">${title}</a></li>`;
};

export const creatSortTemplate = (sort) => {
  const sortItems = sort.map((it) => createSortItem(it.title, it.link, it.isActive)).join(`\n`);
  return `<ul class="sort">
            ${sortItems}
  </ul>`;
};


