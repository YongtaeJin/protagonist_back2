<template>
    <v-card v-if="!this.$store.state.user.member"  width="100%" elevation="10">
        <login />
    </v-card>
    <v-card v-else>
        <v-toolbar>사업등록</v-toolbar>

        <v-tabs v-model="tabs" background-color="primary" dark>
            <v-tab value="tbapage_1" style="flex: 1" >사업등록</v-tab>
            <v-tab value="tbapage_2" style="flex: 1" >첨부서류</v-tab>            
        </v-tabs>

    </v-card>

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { deepCopy } from "../../../util/lib";
import Login from '../member/Login.vue'


export default {
  components: { Login },

	name :"ShopMag",
	title : "사업관리",
    data() {
        return {            
            tabs: parseInt(this.$route.query.tabs) || 0 ,
            isLoading: false,
        }
    },
    mounted() {        
        if (this.$store.state.user.member ) {
            this.fetchData();

        }
    },
    methods: {
        ...mapActions("user", ["checkShopInfo", "updateShopInfo"]),
        ...mapMutations("user", ["SET_SHOPINFO"]),

        async fetchData() {       
            
        },        
        async save1(form) {
           
        },
        async save2(form) {
            const data = await this.updateShopInfo(form);
            if ( data ) {
                await this.checkShopInfo(); 
                this.$toast.info(`회사 정보 저장 하였습니다.`);                   
            }
        },  

    }
}
</script>

<style>

</style>