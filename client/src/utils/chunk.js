export const chunk = (arr, chunkSize) => {
  return arr.reduce((all, one, i) => {
    const result = Math.floor(i / chunkSize);
    all[result] = [].concat(all[result] || [], one);
    return all;
  }, []);
};
