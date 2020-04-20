const generateSort = () => {
  return [
    {
      title: `Sort by default`,
      link: `default`,
      isActive: true,
    },
    {
      title: `Sort by date`,
      link: `date`,
    },
    {
      title: `Sort by rating`,
      link: `rating`,
    },
  ];
};

export {generateSort};
