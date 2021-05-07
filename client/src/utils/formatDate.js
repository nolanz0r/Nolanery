export const formatDate = (date) => {
  const time = date.split("T")[0];

  const day = time.slice(8, 10);
  const month = time.slice(5, 7);
  const year = time.slice(0, 4);
  const hours = date.split("T")[1].slice(0, 5);

  return `${day}.${month}.${year} at ${hours}`;
};
