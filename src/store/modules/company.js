import Vue from "vue";
import qs from 'qs';
import { LV } from '../../../util/level';

export const state = () => ({
    company : null,
});

export const mutations = {
};
export const getters = {

};
export const actions = {
    async duplicateCheckCompany(ctx, { field, value }) {        
		const { $axios } = Vue.prototype;
		const data = await $axios.get(`/api/company/duplicateCheckCompany/${field}/${value}`);
		return data;
	},
};