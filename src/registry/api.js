export default ({ host }, replace) => {
  return {
    mock: `${host}/mock/demo.json`,
    test: replace(`${host}/path/{param}/to`),
  };
};
