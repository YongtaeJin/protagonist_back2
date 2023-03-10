<template>
    <v-container fluid>
    <v-toolbar>
        <v-toolbar-title>협약서관리</v-toolbar-title>
        <v-spacer/>
        <v-text-field label="업체명 : " v-model="chkf_serarch" hide-details  single-lin  />
        
        <v-radio-group inline  label="협약서 :" v-model="chkf_arfe" row hide-details class="small-radio no-space"   >
            <v-radio label="전체" value="%" />
            <v-radio label="완료" value="Y" />
            <v-radio label="미완료" value="N" />
        </v-radio-group>
        <v-btn color="primary"  @click="fetchData">조회</v-btn>
    </v-toolbar>
    <!-- <v-data-table height="500" max-height="800" 
                :headers="headers" :items-per-page="20"  :footer-props="{'items-per-page-options': [10, 20, 30, 40, 50, 100, -1]}" 
                class="elevation-5" > -->
    <v-data-table :headers="headers"  :items="itemArgee" >

    </v-data-table>
    </v-container>

</template>

<script>
import { deepCopy, extractNumber } from "../../../util/lib";
export default {
    name :"ShopArgeeMag",
	title : "사업협약서관리",
    data() {
        return {
            
            headers: [
                // { text: `업체명`,  value: 'n_company', sortable: false},
                // { text: '협약서', value: 't1', sortable: false, align:'center'},
                // { text: '수료증', value: 't2', sortable: false, align:'center'},
                // { text: '신청서', value: 't3', sortable: false, align:'center'},
                // { text: '확약서', value: 't4', sortable: false, align:'center'},
                // { text: '서약서', value: 't5', sortable: false, align:'center'},
                // { text: '정보동의', value: 't6', sortable: false, align:'center'},
            ],
            itemArgee: [],
            chkf_arfe : "%",
            chkf_serarch: "",
            rnum: 5,
           
        }
    },
    created() {
        this.init() ;
    },
    methods: {
        async init() {
            this.fetchData();
            
        },
        async fetchData() {
            const head = {};
            this.headers.splice(0);
            head.text = "업체명";
            head.value = `n_company`;                            
            head.sortable = false;
            head.align = 'center';
            this.headers.push( { ...head });

            this.itemArgee = await this.$axios.get(`/api/shopinfo/getShopArgeeMag?i_shop=23-001`);
            // const data = await this.$axios.get(`/api/shopinfo/getShopArgeeMag?i_shop=23-001`);
            if (this.itemArgee) {
                const rnum = this.itemArgee[0].rnum;              
                for(let i=0; i<Object.keys(this.itemArgee[0]).length; i++){
                    let name = Object.keys(this.itemArgee[0])[i];
                    let value = this.itemArgee[0][name];                    
                    
                    if(name[0] =='h') {
                        if (rnum >= extractNumber(name)) {
                            
                            
                            head.text = value;
                            // head.value = `t${extractNumber(name)}`;                            
                            head.value = 't' + extractNumber(name);
                            head.sortable = false;
                            head.align = 'center';
                            this.headers.push( { ...head });
                        }
                    }
                }
            }
   
        },
    }

}
</script>

<style>

</style>