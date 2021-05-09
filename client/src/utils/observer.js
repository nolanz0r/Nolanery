export const observer = (ref, callback) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }
  );
  if (ref.current) {
    observer.observe(ref.current);
  }
};
