export default [
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: '404',
    },
  },
  {
    path: '/',
    redirect: {
      name: 'start',
    },
  },
];
