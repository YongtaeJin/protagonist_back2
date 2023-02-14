<template>
    <v-card v-if="!this.$store.state.user.member"  width="100%" elevation="10">
        <login />
    </v-card>
    <v-card v-else>
        <v-toolbar>스마트공방 사업신청</v-toolbar>
        <v-tabs v-model="tabs" background-color="primary" dark>
            <v-tab v-for="item in items" :key="item" style="flex: 1">
                {{ item }}
            </v-tab>
        </v-tabs>
        <v-card-text>
            <v-tabs-items v-model="tabs">
                <v-tab-item><signed-p-01-form /></v-tab-item>
                
                <v-tab-item>b</v-tab-item>
                <v-tab-item>c</v-tab-item>
                <v-tab-item>d</v-tab-item>
            </v-tabs-items>
            
        </v-card-text>
    </v-card>
    
       

</template>

<script>
import Login from '../member/Login.vue'
import SignedP01Form from './SignedP01Form.vue'

export default {
  components: { Login, SignedP01Form },

	name :"ShopSigned",
	title : "스마트공방 신청",
    data() {
        return {	    
            tabs: parseInt(this.$route.query.tabs) || 0,
            items: ["개인정보 동의", "회사 정보", "스마트공방 신청", "회사 추가 정보"],        
            isLoading: false,
        }
    }
}
</script>

<style>

</style>