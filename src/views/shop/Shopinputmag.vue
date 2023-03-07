<template>
    <v-container fluid>
    <v-toolbar>
        <v-toolbar-title>사업신청관리</v-toolbar-title>
    </v-toolbar>
    <v-row>
        <v-col sm=7>
            <v-data-table height="500" max-height="800" 
                :headers="headers" :items="itemInputs" :items-per-page="20"  :footer-props="{'items-per-page-options': [10, 20, 30, 40, 50, 100, -1]}" 
                class="elevation-5" >
                <template v-slot:item="{ item }">
                    <tr align=center >
                        <td align=left> {{ item.n_company }} </td>
                        <td :class="{greencol: item.f_persioninfo=='1', redcol: item.f_persioninfo != '1'}"> {{ datachk(item.f_persioninfo) }} </td>
                        <td @click="clickItem(item, 0)" :class="{greencol: item.chk1=='Y', redcol: item.chk1 != 'Y'}"> {{ datachk(item.chk1) }} </td>
                        <td @click="clickItem(item, 1)" :class="{greencol: item.chk2=='Y', redcol: item.chk2 != 'Y'}"> {{ datachk(item.chk2) }} </td>
                        <td @click="clickItem(item, 2)" :class="{greencol: item.chk3=='Y', redcol: item.chk3 != 'Y'}"> {{ datachk(item.chk3) }} </td>
                        <td @dblclick="f_dochk(item)" :class="{greencol: item.f_dochk=='1', redcol: item.f_dochk != 'Y'}"> {{ datachk2(item.f_dochk) }} </td>
                        <td @dblclick="f_enarachk(item)" :class="{greencol: item.f_enarachk=='1', redcol: item.f_enarachk != 'Y'}"> {{ datachk2(item.f_enarachk) }} </td>
                    </tr>
                </template>
            </v-data-table>
        </v-col>
        <v-col sm=5>
            <v-tabs v-model="tabs" background-color="primary" dark>
                <v-tab value="tbapage_1">회사정보</v-tab>
                <v-tab value="tbapage_2">신청서류</v-tab>            
                <v-tab value="tbapage_3">추가서류</v-tab>
            </v-tabs>
            <v-card-text>
                <v-tabs-items v-model="tabs"> 
                    <v-tab-item>
                        <table>
                            <tr>
                                <td>업체명</td><td>{{ itemInput.n_company }}</td>
                            </tr>
                            <tr>
                            <tr>
                                <td>사업자번호</td><td>{{ itemInput.i_regno }}</td>
                            </tr>
                            <tr>
                                <td>대표자</td><td>{{ itemInput.n_person }}</td>
                            </tr>
                            <tr>
                                <td>대표자주민번호</td><td>{{ itemInput.i_presno }}</td>
                            </tr>
                            <tr>
                                <td>연락처(유선)</td><td>{{ itemInput.t_tel1 }}</td>
                            </tr>
                            <tr>
                                <td>휴대폰</td><td>{{ itemInput.t_tel2 }}</td>
                            </tr>
                            <tr>
                                <td>이메일</td><td>{{ itemInput.i_email }}</td>
                            </tr>
                            <tr>
                                <td>사업자구분</td><td>{{ itemInput.f_saugup }}</td>
                            </tr>
                            <tr>
                                <td>이전중진공사업</td><td>{{ itemInput.f_run }}</td>
                            </tr>
                            <tr>
                                <td>3년 표준 재무제표</td><td>{{ itemInput.f_dart }}</td>
                            </tr>
                            <tr>
                                <td>이나아도룸 아이디</td><td>{{ itemInput.t_enarainfo }}</td>
                            </tr>
                            <tr>
                                <td>이나라도움 패스워드</td><td>{{ itemInput.t_enarainfopw }}</td>
                            </tr>
                        </table>
                        
                      
                    </v-tab-item>
                    <v-tab-item>2ddd</v-tab-item>
                    <v-tab-item>3ddd</v-tab-item>
                </v-tabs-items>
            </v-card-text>
        </v-col>
    </v-row>

    </v-container>
</template>

<script>
import { deepCopy } from "../../../util/lib";
export default {
    name :"ShopInputMag",
	title : "사업신청관리",
    data() {
        return {
            tabs: parseInt(this.$route.query.tabs) || 0 ,
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
            shopInput: [],
            fileAdds: [],
            fileAddsB: [],

            itemInput: {
                n_company : null,
                n_person : null,
                i_presno : null,
                t_tel1 : null,
                t_tel2 : null,
                i_email : null,
                f_saugup : null,
                f_run : null,
                f_dart : null,
                t_enarainfo : null,
                t_enarainfopw : null,
            }            
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
                val = "등록완료"
            } else {
                val = "미등록"
            }
            return  val;
        },
        datachk2(data) {
            let val = "";
            if (data == "1" || data == "Y" ) { 
                val = "완료"
            } else {
                val = "미완료"
            }
            return  val;
        },
        async clickRow(item) {

        },
       
        async fetchData() {
            this.itemInputs = await this.$axios.get(`/api/shopinfo/getShopInputMag`);
        },
         async clickItem(item, col) {
            this.tabs = col;            
            if (!this.itemInput.i_shop || this.itemInput.i_no != item.i_no) {
                this.shopInput = await this.$axios.get(`/api/shopinfo/getShopInputMag1?i_shop=${ item.i_shop }&i_no=${ item.i_no }`);
                this.itemInput = deepCopy(this.shopInput);
            }
        },
        async f_dochk(item) {
            if (item.f_dochk == "Y") {
                item.f_dochk  = 'N' ;
            } else {
                item.f_dochk  = 'Y' ;
            }                       
        },
        async f_enarachk(item) {
            if (item.f_enarachk == "Y") {
                item.f_enarachk  = 'N' ;
            } else {
                item.f_enarachk  = 'Y' ;
            }           
        }
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

.redcol {  
  color: red;
}
.greencol {  
  color: green;
}
.bluecol {
  color: blue;
}
</style>