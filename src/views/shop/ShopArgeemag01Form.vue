<template>
    <v-form ref="form">
    </v-form>
</template>

<script>
import { deepCopy } from "../../../util/lib";
import { save } from 'save-file';
export default {
    name: "Shopinputmag03Form",
    props: {        
        fileLists: {
            type: Array,
            default: null,
        },
        companyName: null,
    },
    data() {
        return {
             fileHeaders : [
                { text: '순번',           value: 'i_sort', sortable: false, align:'center', width: "55px"},
                { text: '별칭',       value: 'f_yn', sortable: false, align:'center', width: "75px"},
                { text: '첨부서류', value: 'n_filename', sortable: false, }, 
                { text: '파일명', value: 'n_filename', sortable: false, }, 
                { text: '첨부파일명',     value: 'n_file', sortable: false, },
                { text: 'DOWN',          value: 't_att', sortable: false, align:'center', width: "75px"}, 
                
            ],
            form : {
                i_shop: "",
                i_ser: "",
                i_no: "",
                f_yn: "",
                n_filename: "",
                n_file: "",
                t_att: "",
            },
        }
    },
    created() {       
        this.init();
    },
     watch: {
        fileLists() {
            this.init();
        }
    },
    methods: {
        init() {

        },
        async downLoad(item) {
        }

    }

}
</script>

<style>

</style>