export const generateGrid = () => {
  const arr = Array.from({ length: 18 }, (_, index) => index + 1);
  const grid = [...arr, ...arr].sort(() => Math.random() - 0.5);

  return grid.map((item, index) => ({
    id: index,
    number: item,
    isFlipped: false,
  }));
};
