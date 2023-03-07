<template>
    <v-container fluid>
    <v-toolbar>
        <v-toolbar-title>사업신청관리</v-toolbar-title>
    </v-toolbar>
    <v-row>
        <v-col sm=7>
            <v-data-table max-height="800" 
                :headers="headers" :items="itemInputs" :items-per-page="20"  :footer-props="{'items-per-page-options': [10, 20, 30, 40, 50, 100, -1]}" 
                
                class="elevation-5" >

            </v-data-table>
        </v-col>
        <v-col sm=5>
            s
        </v-col>
    </v-row>

    </v-container>
</template>

<script>
export default {
    name :"ShopInputMag",
	title : "사업신청관리",
    data() {
        return {
            isLoading: false,
            headers: [
                { text: '업체명',  value: 'n_company', sortable: false},
                { text: '정보동의', value: 'f_persioninfo', sortable: false, align:'center', width: "98px"},
                { text: '회사정보', value: 'chk1', sortable: false, align:'center', width: "98px"}, 
                { text: '신청서류', value: 'chk2', sortable: false, align:'center', width: "98px"},
                { text: '추가정보', value: 'chk3', sortable: false, align:'center', width: "98px"},
                { text: '공방서류', value: 'f_dochk', sortable: false, align:'center', width: "98px"},  
                { text: 'e나라도움등록', value: 'f_enarachk', sortable: false, align:'center', width: "98px"},
            ],
            itemInputs: [],
        }
    },
    mounted() {     
    },
    created() {
        this.fetchData() ;
    },
    methods: {
        async fetchData() {
            this.itemInputs = await this.$axios.get(`/api/shopinfo/getShopInputMag`);

        },
    },
}
</script>

<style>

.v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th 
{
    font-size: 0.40rem;
    height: 35px;    
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  font-size: 0.35rem;
  height: 26px; 
}
</style>