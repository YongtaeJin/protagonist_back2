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
                <template v-slot:item="{ item }">
                    <tr  align=center>
                        <td> {{ item.n_company }} </td>
                        <td > {{ datachk(item.f_persioninfo) }} </td>
                        <td > {{ datachk(item.chk1) }} </td>
                        <td > {{ datachk(item.chk2) }} </td>
                        <td > {{ datachk(item.chk3) }} </td>
                        <td > {{ item.f_dochk }} </td>
                        <td > {{ item.f_enarachk }} </td>
                    </tr>
                </template>
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
        datachk(data) {
            let val = "";
            if (data == "1" || data == "Y" ) { 
                val = "●"
            } else {
                val = "○"
            }
            return  val;
        },
        async fetchData() {
            this.itemInputs = await this.$axios.get(`/api/shopinfo/getShopInputMag`);

        },
    },
}
</script>

<style>

</style>