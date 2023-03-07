<template>
    <v-form ref="form">
        <v-data-table :headers="fileHeaders">
        
        </v-data-table>
    </v-form>
</template>

<script>
import { deepCopy } from "../../../util/lib";
export default {
    name: "Shopinputmag02Form",

    data() {
        return {
            fileHeaders : [
                { text: '순번',  value: 'i_shop', sortable: false, align:'center', width: "55px"},
                // { text: '필수여부',       value: 'f_yn', sortable: false, align:'center', width: "75px"},
                // { text: '신청(추가)서류', value: 'n_filename', sortable: false, align:'center'}, 
                // { text: '첨부파일명',     value: 'n_file', sortable: false, align:'center'},
                // { text: '위치',           value: 't_att', sortable: false, align:' d-none', width: "98px"},           
            ],
            form : {
                i_shop: "",
                // i_ser: "",
                // i_no: "",
                // f_yn: "",
                // n_filename: "",
                // n_file: "",
                // t_att: "",
            },
        }
    }
}
</script>

<style>

</style>