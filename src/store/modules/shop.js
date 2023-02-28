import Vue from "vue";
import qs from 'qs';
import { LV } from '../../../util/level';


export const actions = {
	async duplicateCheckShop(ctx, { field, value }) {        
		const { $axios } = Vue.prototype;
		const data = await $axios.get(`/api/shopinfo/duplicgateCheckShop/${field}/${value}`);        
		return data;
	},


}

