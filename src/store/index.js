import Vue from 'vue'
import Vuex from 'vuex'
import modules from "./modules";
import qs from 'qs';
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		appReady: false,
		config: {
			menu : [
				{
					title : "Home",
					icon : "mdi-home",
					to : '/',
					grant : 2, 
					newTab : false,
					subItems : []
				},
				{
					title : "스마트공방",
					icon : "mdi-store-plus",
					to : '',
					grant : 2, 
					newTab : false,
					subItems : [
						{
							title : "사업신청",
							icon : "",
							to : '/shop/signed',							
							grant : 2, 
							newTab : false,
							subItems : []
						},
						{
							title : "협약신청",
							icon : "",
							to : '/shop/agree',							
							grant : 2, 
							newTab : false,
							subItems : []
						},
					]
				},
			]
		},
	},
	mutations: {
		SET_APP_READY(state) {
			state.appReady = true;
		},
		SET_CONFIG(state, { key, value }) {
			if (state.config[key]) {
				try {
					value = JSON.parse(value);
				} catch (e) { }
				state.config[key] = value;
			} else {
				Vue.set(state.config, key, value);
			}
		}
	},
	actions: {
		async appInit({ dispatch, commit }, ctx) {
			if (ctx) {
				const keys = Object.keys(ctx.config);
				for (const key of keys) {
					commit('SET_CONFIG', { key, value: ctx.config[key] });
				}
				commit('user/SET_MEMBER', ctx.member);
				commit('user/SET_TOKEN', ctx.token);
			} else {
				await dispatch('configLoad');
				await dispatch('user/initUser');
			}
			commit('SET_APP_READY');
		},
		async configDuplicate(ctx, payload) {
			const { $axios } = Vue.prototype;
			const query = qs.stringify(payload);
			const data = await $axios.get(`/api/config/duplicateCheck?${query}`);
			return data;
		},
		async configSave({ commit }, form) {
			const { $axios } = Vue.prototype;
			const data = await $axios.post(`/api/config`, form);
			return data;
		},
		async configLoad({ commit }) {
			const data = await $axios.get('/api/config');
			if (data) {
				const keys = Object.keys(data);
				for (const key of keys) {
					commit('SET_CONFIG', { key, value: data[key] });
				}
			}

		}

	},
	modules,
});

export function createStore() {
	return store;
}

export default store;

