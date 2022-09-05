export default ({ $http, $api }) => {
  const state = {
    git: `https://github.com/joenix/vue-scaff`,
    logo: `vue-scaff-fox.png`,
    title: `VUE-SCAFF`,
    sub: `0 CONFIGURATION`,
  };

  const mutations = {};

  const actions = {
    async GET_MOCK() {
      return await $http($api.mock).get();
    },
  };

  return { state, mutations, actions };
};
