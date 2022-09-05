export default (time, outer) =>
  new Promise(resolve => {
    outer = setTimeout(() => {
      resolve(), clearTimeout(outer);
    }, time || 0);
  });
