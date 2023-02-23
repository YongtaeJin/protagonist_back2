<template>
    <v-card v-if="!this.$store.state.user.member"  width="100%" elevation="10">
        <login />
    </v-card>
    <v-card v-else>
        <v-toolbar>스마트공방 사업신청</v-toolbar>
        <!--
        <v-tabs v-model="tabs" background-color="primary" dark>
            <v-tab active v-for="item in items" :key="item" style="flex: 1">
                {{ item.name }}
            </v-tab>
        </v-tabs>
        -->
        <v-tabs v-model="tabs" background-color="primary" dark>
            <v-tab value="tbapage_1" style="flex: 1" >개인정보 동의</v-tab>
            <v-tab value="tbapage_2" style="flex: 1" :disabled="!this.$store.state.user.shopinfo || !this.$store.state.user.shopinfo.f_persioninfo=='1'">회사 정보</v-tab>
            <v-tab value="tbapage_3" style="flex: 1" :disabled="!this.$store.state.user.shopinfo || !this.$store.state.user.shopinfo.f_persioninfo=='1'">스마트공방 신청</v-tab>
            <v-tab value="tbapage_4" style="flex: 1" :disabled="!this.$store.state.user.shopinfo || !this.$store.state.user.shopinfo.f_persioninfo=='1'">회사 추가 정보</v-tab>
        </v-tabs>
        
        <v-card-text>
            <v-tabs-items v-model="tabs">                                 
                <v-tab-item><signed-p-01-form @save="save1" /></v-tab-item>                
                <v-tab-item><signed-p-02-form @save="save2" :item="this.$store.state.user.shopinfo"/></v-tab-item>
                <v-tab-item><signed-p-03-form @save="save3" :attfile="this.shioinfofiles" /></v-tab-item>
                <v-tab-item>d</v-tab-item>
            </v-tabs-items>            
        </v-card-text>
      
    </v-card>

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import Login from '../member/Login.vue'
import SignedP01Form from './SignedP01Form.vue'
import SignedP02Form from './SignedP02Form.vue'

import { deepCopy } from "../../../util/lib";
import SignedP03Form from './SignedP03Form.vue';

export default {
  components: { Login, SignedP01Form, SignedP02Form, SignedP03Form },

	name :"ShopSigned",
	title : "스마트공방 신청",
    data() {
        return {            
            tabs: parseInt(this.$route.query.tabs) || 0 ,
            // items: ["개인정보 동의", "회사 정보", "스마트공방 신청", "회사 추가 정보"],  

            isLoading: false,
            items: [
                {id:'Sucess', name:'개인정보 동의', enable:'Y'},
                {id:'Cominfo', name:'회사 정보', enable:'Y'},
                {id:'Input', name:'스마트공방 신청', enable:'Y'},
                {id:'Addinfo', name:'회사 추가 정보', enable:'Y'},
            ],
            shioinfofiles: [],
            shopinfofileadds: [],
            // active_tab: 0,                       
        }
    },
    mounted() {        
        if (this.$store.state.user.member ) {
            this.fetchData();
            if(this.$store.state.user.shopinfo) {
               this.tabs = 1;
            } else {
                this.tabs = 0;
            }
        }
    },
    methods: {
        ...mapActions("user", ["checkShopInfo", "updateShopInfo"]),
        ...mapMutations("user", ["SET_SHOPINFO"]),

        async fetchData() {       
            const data = await this.checkShopInfo();
            this.shioinfofiles = await this.$axios.patch(`/api/shopinfo/attfiles`);            
        },        
        async save1(form) {
            if (!form.i_shop) {
                form.i_shop = this.$store.state.user.shopinfo.i_shop;
                form.i_userid = this.$store.state.user.shopinfo.i_userid;
            }           
            const data = await this.updateShopInfo(form);
            if ( data ) {                
                this.shioinfofiles = await this.$axios.patch(`/api/shopinfo/attfiles`);
                await this.checkShopInfo();
                this.$toast.info(`개인정보 동의 하였습니다.`);                            
            }
        },
        async save2(form) {
            const data = await this.updateShopInfo(form);
            if ( data ) {
                await this.checkShopInfo(); 
                this.$toast.info(`회사 정보 저장 하였습니다.`);                   
            }
        },
        async save3(form) {
            await this.$axios.patch(`/api/shopinfo/attfiles/upload`, form);
        },

    }
}
</script>

<style>

</style>