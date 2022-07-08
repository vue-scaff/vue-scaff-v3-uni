export default (target) => {
  if (['undefined', undefined, 'null', null, ''].includes(target)) {
    return true;
  }

  for (let i in target) {
    return false;
  }

  return true;
};
