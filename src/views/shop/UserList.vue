<template>
    <v-form  ref="form">
        <v-toolbar background-color="primary" dark >
            <v-spacer/>
            <v-text-field label="업체명 : " v-model="f_serarch" hide-details  single-lin  />            
            <v-btn color="primary"  @click="fetchData">조회</v-btn>
        </v-toolbar>
        
        <v-data-table :headers="headers" class="mytable"
            :items="items" :items-per-page="20"  :footer-props="{'items-per-page-options': [10, 20, 30, 40, 50, 100, -1]}" 
        />
    </v-form>
</template>

<script>
export default {
    name :"UserList",
	title : "사용자정보",
    data() {
        return {
            headers: [
                { text: 'ID',  value: 'mb_id', sortable: true},
                { text: '이름',  value: 'mb_name', sortable: true},
                { text: '연락처',  value: 'mb_phone', sortable: false},
                { text: 'email',  value: 'mb_email', sortable: true},
                { text: '등급',  value: 'mb_level', sortable: true},
                { text: '비빌먼호',  value: 'chkpw', sortable: false},
                // { text: '업체명',  value: 'mb_login_at', sortable: false},
            ],
            items: [],
            f_serarch: "",
        }
    },
    
    created() {
        this.fetchData() ;
    },
    methods: {
        async fetchData(){
            this.items = await this.$axios.get(`/api/shopinfo/getShopUserList?f_serarch=${this.f_serarch}`);
        },
    }
}
</script>

<style>

</style>