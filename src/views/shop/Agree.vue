<template>
    <v-card v-if="!this.$store.state.user.member"  width="100%" elevation="10">
        <login />
    </v-card>
    <v-card v-else>
        <v-card>
            사업신청 접수 중
        </v-card>
        <v-card>
            <v-toolbar>
                <v-toolbar-title>스마트공방 협약신청</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>  
            <v-card background-color="primary" dark>
                <div v-text="memo" style="white-space:pre-line"></div>
            </v-card>
            <signed-p-03-form @save="save3" :attfile="this.shioinfofiles" />
        </v-card>
    </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import SignedP03Form from './SignedP03Form.vue'
export default {
    components: { SignedP03Form },
    name :"ShopArgee",
	title : "협약신청",
    data() {
        return {   
            shioinfofiles: [],
            memo: "",
        }
    },
    created() {
        this.init();
        this.fetchData();
    },
    methods: {
        ...mapActions("user", ["checkShopInfo"]),    
        ...mapMutations("user", ["SET_SHOPINFO"]),        
        ...mapGetters("user", ["isShopinfochk"]),

        async init() {
            const data = await this.checkShopInfo(); 
            this.memo = this.$store.state.user.shopinfo.t_remark2;
        },
        async fetchData() {
            this.shioinfofiles = await this.$axios.patch(`/api/shopinfo/attfiles?f_gubun=3`);   

        },
        async save3(form) {
            await this.$axios.patch(`/api/shopinfo/attfiles/upload`, form);
            this.shioinfofiles = await this.$axios.patch(`/api/shopinfo/attfiles?f_gubun=3`);
            this.$toast.info(`저장 하였습니다.`);              
        },
    }
}
</script>

<style>
.box {
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
}
</style>