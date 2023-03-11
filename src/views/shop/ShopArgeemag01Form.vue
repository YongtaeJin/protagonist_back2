<template>
    <v-form ref="form">
        <v-data-table :headers="fileHeaders" :items="inputfilelist" class="" @dblclick:row="downLoad" />
    </v-form>
</template>

<script>
import { deepCopy } from "../../../util/lib";
import { save } from 'save-file';
export default {
    name: "Shopinputmag03Form",
    props: {        
        fileLists: {
            type: Object,
            default: null,
        },
        companyName: null,
    },
    data() {
        return {
             fileHeaders : [
                { text: '순번',       value: 'i_sort', sortable: false, align:'center', width: "55px"},
                { text: '필수',       value: 'f_yn', sortable: false, align:'center', width: "75px"},
                { text: '명칭',       value: 'n_nm', sortable: false, }, 
                { text: '첨부서류',   value: 'n_file', sortable: false, }, 
                { text: '첨부파일명', value: 'n_filename', sortable: false, },
                // { text: 'DOWN',       value: 't_att', sortable: false, align:'center', width: "75px"}, 
                
            ],       
            inputfilelist: [],
            form : {
                i_shop: "",
                i_ser: "",
                f_gubun: "",
                n_nm: "",                
                i_sort: "",
                f_yn: "",
                i_no: "",
                n_file: "",
                n_filename: "",
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
        async init() {
             if (this.fileLists) {                   
                this.inputfilelist = await this.$axios.get(`/api/shopinfo/getShopArgeeInDetail?i_shop=${this.fileLists.i_shop}&i_no=${this.fileLists.i_no}`);
            } 
        },
        async downLoad(event, { item }) {
            // this.editedIndex = this.items.indexOf(item)
            // this.editedItem = Object.assign({}, item)
            // this.dialog = true
            const { n_filename, t_att } = item;
            if (!n_filename && !t_att)  {
                await this.$ezNotify.alert("서류 미등록 ", item.n_nm, {});
                return
            }
            const fileBuffer = await this.$axios.get(`/api/shopinfo/getFileDown?path=${t_att }`);            
            if (fileBuffer ) {
                save (fileBuffer, n_filename);
                alert('File Donw load Click !!!!!'); 
            } else {
                await this.$ezNotify.alert("다운로드 실패 !!", "오류", {
                    // icon: "mdi-video-4k-box",
                });
            }
        },

    }

}
</script>

<style>

</style>