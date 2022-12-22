import HomeView from '../views/HomeView.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/login',
        name: 'NoAuthLogin',
        component: () => import(/* webpackChunkName: "login" */ '../views/member/Login.vue')
    },
    {
        path: '/join',
        name: 'NoAuthJoin',
        component: () => import(/* webpackChunkName: "join" */ '../views/member/Join.vue')
    },
    {
      path: '*',
      name: 'Error',
      component: () => import(/* webpackChunkName: "error" */ '../views/Error.vue')
    },
    {
      path: '/modifyPassword/:hash',
      name: 'NoAuthModifyPassword',
      component: () => import(/* webpackChunkName: "modifyPassword" */ '../views/member/ModifyPassword.vue')
    },
  ]

export default routes;