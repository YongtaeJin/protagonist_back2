import Home from '../views/Home.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		
	},
	{
		path: '/about',
		name: 'About',
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
		path: '/modifyPassword/:hash',
		name: 'NoAuthModifyPassword',
		component: () => import(/* webpackChunkName: "modifyPassword" */ '../views/member/ModifyPassword.vue')
	},
	{
		path: '/adm/config',
		name: 'AdmConfig',
		component: () => import(/* webpackChunkName: "AdmConfig" */ '../views/admin/Config.vue')
	},
	{
		path: '/sys/company',
		name: 'SysCompany',
		component: () => import(/* webpackChunkName: "SysCompany" */ '../views/sys/Company.vue')		
	},
	{
		path: '/sys/users',
		name: 'SysUsers',
		component: () => import(/* webpackChunkName: "SysUsers" */ '../views/sys/SysUsers.vue')		
	},
	{
		path: '/shop/signed',
		name: 'ShopSigned',
		component: () => import(/* webpackChunkName: "ShopSigned" */ '../views/shop/Signed.vue'),
		meta: { requireLogin: true },
	},
	{
		path: '/no',
		name: 'NoLogin',
		component: () => import(/* webpackChunkName: "nologin" */ '../views/NotLogin.vue')
	},
	{
		path: '*',
		name: 'Error',
		component: () => import(/* webpackChunkName: "error" */ '../views/Error.vue')
	},
]

export default routes;