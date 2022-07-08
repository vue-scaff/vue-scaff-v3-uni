export default (value, mode) => {
  switch (mode) {
    case 'dollar':
      return `$${value}.00`;
    case 'euro':
      return `€${value}.00`;
    default:
      return value;
  }
};
