<template>
    <v-container fluid>
    <v-card v-if="!this.$store.state.user.member"  width="100%" elevation="10">
        <login />
    </v-card>
    <v-card v-else>
        <v-toolbar>
            <v-toolbar-title>사업관리</v-toolbar-title>
            <v-spacer></v-spacer>
            <tooltip-btn fab small label="사업추가" @click="addShop">
                <v-icon>mdi-plus</v-icon>
            </tooltip-btn>
        </v-toolbar>
        
        <v-tabs v-model="tabs" background-color="primary" dark>
            <v-tab value="tbapage_1" style="flex: 1" >사업 내역</v-tab>
            <v-tab value="tbapage_2" style="flex: 1" >첨부 서류</v-tab>            
        </v-tabs>
        <v-card-text>
            <v-tabs-items v-model="tabs"> 
                <v-tab-item><shopmag-01-form @save="save2" :itemLists="this.itemShops" @edit="addShop" @select="selectRow"/></v-tab-item>                 
                <v-tab-item><shopmag-02-form /></v-tab-item>

            </v-tabs-items>            
        </v-card-text>
    </v-card>
    
    <ez-dialog label="사업 추가 / 수정" ref="dialog" max-width="400" dark color="primary" persistent>
        <shopmag-update-form @save="save1" 
            :shopinfo="itemShop" :isNew="isNew" :cbShopId="cbShopIdChk">
        </shopmag-update-form>
    </ez-dialog>
    <ez-dialog label="첨부서류" ref="dialog2" max-width="400" dark color="primary" persistent>
        
    </ez-dialog>

    </v-container>

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { deepCopy } from "../../../util/lib";
import Login from '../member/Login.vue'
import TooltipBtn from "../../components/etc/TooltipBtn.vue";
import EzDialog from '../../components/etc/EzDialog.vue';
import Shopmag01Form from './Shopmag01Form.vue';
import Shopmag02Form from './Shopmag02Form.vue';
import ShopmagUpdateForm from './ShopmagUpdateForm.vue';


export default {
  components: { Login, TooltipBtn, EzDialog, Shopmag01Form, Shopmag02Form, ShopmagUpdateForm },

	name :"ShopMag",
	title : "사업관리",
    data() {
        return {            
            tabs: parseInt(this.$route.query.tabs) || 0 ,
            isLoading: false,
            itemShops: [],
            itemShop: null,
            isNew: true,
            idx: -1,
        }
    },
    mounted() {        
        if (this.$store.state.user.member ) {
            this.fetchData();
        }
    },
    watch: {
        async tabs() {
            console.log("tabs_change:", this.tabs);
            if (this.tabs === 1) {   
                if ( this.idx === -1 ) {                    
                    if (this.itemShops) { this.idx = 0 }
                }
                if( this.idx > -1 ) {                                       
                    await this.$axios.get(`/api/shopinfo/getShopMagFile?i_shop=${this.itemShops[this.idx].i_shop}`);  
                }

            }

        }
    },
    methods: {
        ...mapActions("shop", ["duplicateCheckShop", "shopInfoSave"]),
        ...mapMutations("user", ["SET_SHOPINFO"]),

        async fetchData() {
            this.itemShops = await this.$axios.get("/api/shopinfo/getShopMag");            
        },        
        async addShop(item) {
           if (item) {
                this.isNew = false;  
                this.itemShop = deepCopy(item);
            } else {                
                this.isNew = true;
                this.itemShop = null;
            }
            this.$refs.dialog.open();
        },
        async cbShopIdChk(value) {
            const payload = {
                field: "i_shop",
                value,
            };
            return await this.duplicateCheckShop(payload);
        },

        async selectRow(index, item) {
            this.idx = index;           
        },

        async save1(form) {
            // 사업관리 추가 및 수정 처리 
            const data = await this.shopInfoSave(form);
            if (this.isNew) {
                this.$toast.info(`${form.i_shop} 추가 하였습니다.`);                
            } else {
                this.$toast.info(`${form.i_shop} 수정 하였습니다.`);
            }
            this.fetchData();
            this.$refs.dialog.close();
        },

        async addFile(item) {
            this.$refs2.dialog.open();
        },        

        async save2(form) {
            this.$refs.dialog2.close();
        },  

    }
}
</script>

<style>

</style>