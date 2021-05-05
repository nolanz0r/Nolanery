export const getArrayOfRandomNumbers = (length) => {
  return Array.from({ length: 5 }, () => Math.floor(Math.random() * length));
};
