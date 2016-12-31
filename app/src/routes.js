export default [
  {
    path: '/',
    name: 'framework',
    component: require('components/Framework')
  },
  {
    path: '*',
    redirect: '/'
  }
]
