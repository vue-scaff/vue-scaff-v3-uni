export default ({ host }, replace) => {
  return {
    mock: `${host}/path/to/api`,
    test: replace(`${host}/path/{param}/to`),
  };
};
