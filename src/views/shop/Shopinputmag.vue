<template>
    <v-container fluid>
    <v-toolbar>
        <v-toolbar-title>사업신청관리</v-toolbar-title>
    </v-toolbar>
    <v-row>
        <v-col sm=6>
            <v-data-table height="500" max-height="800" 
                :headers="headers" :items="itemInputs" :items-per-page="20"  :footer-props="{'items-per-page-options': [10, 20, 30, 40, 50, 100, -1]}" 
                class="elevation-5" >
                <template v-slot:item="{ item }">
                    <tr align=center >
                        <td @click="clickItem(item, tabs)" align=left> {{ item.n_company }} </td>
                        <td @click="clickItem(item, tabs)" :class="{greencol: item.f_persioninfo=='1', redcol: item.f_persioninfo != '1'}"> {{ datachk(item.f_persioninfo) }} </td>
                        <td @click="clickItem(item, 0)" :class="{greencol: item.chk1=='Y', redcol: item.chk1 != 'Y'}"> {{ datachk(item.chk1) }} </td>
                        <td @click="clickItem(item, 1)" :class="{greencol: item.chk2=='Y', redcol: item.chk2 != 'Y'}"> {{ datachk(item.chk2) }} </td>
                        <td @click="clickItem(item, 2)" :class="{greencol: item.chk3=='Y', redcol: item.chk3 != 'Y'}"> {{ datachk(item.chk3) }} </td>
                        <td @dblclick="f_dochk(item)" :class="{greencol: item.f_dochk=='Y', redcol: item.f_dochk != 'Y'}"> {{ datachk2(item.f_dochk) }} </td>
                        <td @dblclick="f_enarachk(item)" :class="{greencol: item.f_enarachk=='Y', redcol: item.f_enarachk != 'Y'}"> {{ datachk2(item.f_enarachk) }} </td>
                    </tr>
                </template>
            </v-data-table>
        </v-col>
        <v-col sm=6>
            <v-tabs v-model="tabs" background-color="primary" dark>
                <v-tab value="tbapage_1">회사정보</v-tab>
                <v-tab value="tbapage_2">신청서류</v-tab>            
                <v-tab value="tbapage_3">추가서류</v-tab>
            </v-tabs>
            <v-card-text>
                <v-tabs-items v-model="tabs" class="elevation-2"> 
                    <v-tab-item>
                        <table class="type03">
                            <tr><th>업체명</th><td>{{ itemInput.n_company }}</td></tr>                            
                            <tr><th>사업자번호</th><td>{{ itemInput.i_regno }}</td></tr>
                            <tr><th>대표자</th><td>{{ itemInput.n_person }}</td></tr>
                            <tr><th>대표자주민번호</th><td>{{ itemInput.i_presno }}</td></tr>
                            <tr><th>연락처(유선)</th><td>{{ itemInput.t_tel1 }}</td></tr>
                            <tr><th>휴대폰</th><td>{{ itemInput.t_tel2 }}</td></tr>
                            <tr><th>이메일</th><td>{{ itemInput.i_email }}</td></tr>
                            <tr><th>사업자구분</th><td>{{ itemInput.f_saugup }}</td></tr>
                            <tr><th>이전중진공사업</th><td>{{ itemInput.f_run }}</td></tr>
                            <tr><th>3년 표준 재무제표</th><td>{{ itemInput.f_dart }}</td></tr>
                            <tr><th>이나아도룸 아이디</th><td>{{ itemInput.t_enarainfo }}</td></tr>
                            <tr><th>이나라도움 패스워드</th><td>{{ itemInput.t_enarainfopw }}</td></tr>
                            <tr><th>우편번호</th><td>{{ itemInput.i_post }}</td></tr>
                            <tr><th>주소</th><td>{{ itemInput.t_addr1 }}</td></tr>
                            <tr><th>세부 주소</th><td>{{ itemInput.t_addr2 }}</td></tr>
                        </table>
                    </v-tab-item>

                    <v-tab-item><shopinputmag-03-form :fileLists="fileAdds" :companyName="itemInput.n_company"></shopinputmag-03-form></v-tab-item>                    

                    <v-tab-item><shopinputmag-03-form :fileLists="fileAddsB" :companyName="itemInput.n_company"></shopinputmag-03-form></v-tab-item>
                </v-tabs-items>
            </v-card-text>
        </v-col>
    </v-row>

    </v-container>
</template>

<script>
import { deepCopy } from "../../../util/lib";
import Shopinputmag03Form from './Shopinputmag03Form.vue';
export default {
  components: { Shopinputmag03Form },
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
            },
            fileHeaders: [
                { text: '순번',           value: 'i_ser', sortable: false, align:'center', width: "55px"},
                { text: '필수여부',       value: 'f_yn', sortable: false, align:'center', width: "75px"},
                { text: '신청(추가)서류', value: 'n_filename', sortable: false, align:'center'}, 
                { text: '첨부파일명',     value: 'n_file', sortable: false, align:'center'},
                { text: '위치',           value: 't_att', sortable: false, align:' d-none', width: "98px"},           
            ],
            itemFiles: {
                i_shop: null,
                i_ser: null,
                i_no: null,
                f_yn: null,
                n_filename: null,
                n_file: null,
                t_att: null,
            },
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
            } else if (data == "-" ) {
                val = ""            
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
                this.isLoading = true;
                this.shopInput = await this.$axios.get(`/api/shopinfo/getShopInputMag1?i_shop=${ item.i_shop }&i_no=${ item.i_no }`);
                this.itemInput = deepCopy(this.shopInput);
                
                this.fileAdds =  await this.$axios.get(`/api/shopinfo/getShopInputMag2?i_shop=${ item.i_shop }&i_no=${ item.i_no }&f_gubun=1`);
                this.fileAddsB =  await this.$axios.get(`/api/shopinfo/getShopInputMag2?i_shop=${ item.i_shop }&i_no=${ item.i_no }&f_gubun=2`);
                this.isLoading = false;
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

table.type03 {
  border-collapse: collapse;
  text-align: left;
  line-height: 1;
  border-top: 1px solid #ccc;
  border-left: 3px solid #369;
  margin : 20px 10px;
  font-size: 0.40rem;
}
table.type03 th {
  width: 160px;
  padding: 10px;
  font-weight: bold;
  vertical-align: top;
  color: white;
  background: #153d73; 
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

}
table.type03 td {
  width: 349px;
  padding: 10px;
  vertical-align: top;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}


</style>