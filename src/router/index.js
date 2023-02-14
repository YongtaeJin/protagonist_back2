import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';
import store from '../store';

Vue.use(VueRouter)

export function createRouter() {
	const router = new VueRouter({
		mode: 'history',
		base: process.env.BASE_URL,
		routes
	});

	router.beforeEach(async (to, from, next) => {
		const { $Progress, $toast } = Vue.prototype;
		const { requireLogin } = to.meta;

		// routes.js 페이지에 meta 값 부여 하여 권한 변수 활용		
		// 사용자 페이지 접속권한 체크 	
		try {
			if(requireLogin) {
				if(!store.state.user.member) {				
					// $toast.error('로그인 후 사용 가능 합니다. ')
					return next({path: '/login'});
				}
			}
			
		} catch (err) {}
		
				
		if($Progress) $Progress.start();

		if(typeof(window) == 'object') {
			if(!store.state.appReady) {
				if(window.__INITIAL_STATE__) {
					store.replaceState(window.__INITIAL_STATE__);
				} else {
					await store.dispatch('appInit');
				}
			}
		}

		if($Progress) $Progress.finish();

		next();
	});

	router.afterEach((to, from)=> {
	
	})

	return router;
}

