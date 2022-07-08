export default (target, { value }) => {
  Object.assign(target.style, { position: 'relative', ...value });
};
