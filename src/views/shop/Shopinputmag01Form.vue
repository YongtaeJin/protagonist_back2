<template>
    <v-form ref="form">
         <v-data-table height="500" max-height="800" 
            :headers="headers" :items="form" :items-per-page="20"  :footer-props="{'items-per-page-options': [10, 20, 30, 40, 50, 100, -1]}" 
            class="elevation-5" >
            <!-- <template v-slot:item="{ item }">
                <tr align=center >
                    <td @click="clickItem(item, tabs)" align=left> {{ item.n_company }} </td>
                    <td @click="clickItem(item, tabs)" :class="{greencol: item.f_persioninfo=='1', redcol: item.f_persioninfo != '1'}"> {{ datachk(item.f_persioninfo) }} </td>
                    <td @click="clickItem(item, 0)" :class="{greencol: item.chk1=='Y', redcol: item.chk1 != 'Y'}"> {{ datachk(item.chk1) }} </td>
                    <td @click="clickItem(item, 1)" :class="{greencol: item.chk2=='Y', redcol: item.chk2 != 'Y'}"> {{ datachk(item.chk2) }} </td>
                    <td @click="clickItem(item, 2)" :class="{greencol: item.chk3=='Y', redcol: item.chk3 != 'Y'}"> {{ datachk(item.chk3) }} </td>
                    <td @dblclick="f_dochk(item)" :class="{greencol: item.f_dochk=='1', redcol: item.f_dochk != 'Y'}"> {{ datachk2(item.f_dochk) }} </td>
                    <td @dblclick="f_enarachk(item)" :class="{greencol: item.f_enarachk=='1', redcol: item.f_enarachk != 'Y'}"> {{ datachk2(item.f_enarachk) }} </td>
                </tr>
            </template> -->
        
        </v-data-table>
    </v-form>
</template>

<script>
import { deepCopy } from "../../../util/lib";
export default {
    name: "Shopinputmag01Form",
    props: {        
        itemInputs: {
            type: Array,
            default: null,
        },
    },
    data() {
        return {
            headers: [
                { text: '업체명',  value: 'n_company', sortable: false},
                { text: '정보동의', value: 'f_persioninfo', sortable: false, align:'center', width: "98px"},
                { text: '회사정보', value: 'chk1', sortable: false, align:'center', width: "98px"}, 
                { text: '신청서류', value: 'chk2', sortable: false, align:'center', width: "98px"},
                { text: '추가정보', value: 'chk3', sortable: false, align:'center', width: "98px"},
                { text: '공방서류', value: 'f_dochk', sortable: false, align:'center', width: "98px"},  
                { text: 'e나라도움등록', value: 'f_enarachk', sortable: false, align:'center', width: "98px"},
            ],
            form: {
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
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            if (this.itemInputs) {       
                this.form = deepCopy(this.itemInputs);
            } else {

            }
        },
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
        async clickItem(item, col) {
        },
    },
}
</script>

<style>

</style>