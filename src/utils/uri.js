export default (link = '') => {
  return new URL(`/src/assets/${link}`, import.meta.url);
};
