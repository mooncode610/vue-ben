
/**
* Components are lazy-loaded - See "Grouping Components in the Same Chunk"
* http://router.vuejs.org/en/advanced/lazy-loading.html
*/
/* eslint-disable global-require */
const Newpage = r => require.ensure([], () => r(require('./main')), 'newpage-bundle')

const meta = {
  requiresAuth: false,
}

export default [
  {
    name: 'newpage.index',
    path: '/newpage',
    component: Newpage,
    meta,
  },
]
