<template>
    <v-form ref="form">
        <v-data-table :headers="fileHeaders" :items="form">
            <template v-slot:item="{ item }">        
                <tr>
                    <td align=center> {{ item.i_ser }} </td>
                    <td align=center :class="{redcol: item.f_yn==1, greencol: item.f_yn == 0}">{{f_ynchk(item.f_yn)}} </td>
                    <td> {{ item.n_filename }} </td>
                    <td> {{ item.n_file }} </td>
                </tr>
            </template>
        </v-data-table>
    </v-form>
</template>

<script>
import { deepCopy } from "../../../util/lib";
export default {
    name: "Shopinputmag03Form",
    props: {        
        fileLists: {
            type: Array,
            default: null,
        },
    },
    data() {
        return {
            fileHeaders : [
                { text: '순번',           value: 'i_ser', sortable: false, align:'center', width: "55px"},
                { text: '필수여부',       value: 'f_yn', sortable: false, align:'center', width: "75px"},
                { text: '신청(추가)서류', value: 'n_filename', sortable: false, }, 
                { text: '첨부파일명',     value: 'n_file', sortable: false, },
                { text: '위치',           value: 't_att', sortable: false, align:' d-none', width: "98px"},           
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
            if (this.fileLists) {       
                this.form = deepCopy(this.fileLists);
            } 
        },
        f_ynchk(data) {
            return data == 1  ? '필수' : '선택';
        },
        async downLoad(item) {
            const fileName = `http://localhost:8080${item.t_att}`;
            const downFile = item.t_samplefile;
            
            try {
                const response = await fetch(fileName)
                const blob = await response.blob();
                const url = await URL.createObjectURL(blob)

                const a = document.createElement("a");
                a.href = url;        
                a.download = downFile;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } catch(err) {
                console.log({ err })
            }
        },
    },
}
</script>

<style>

</style>