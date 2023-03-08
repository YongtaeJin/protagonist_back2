<template>
    <v-form ref="form">
        <v-toolbar background-color="primary" dark >
            <v-toolbar-title>일괄 내려받기 : </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-checkbox label="회사명" v-model="f_downchk1" hide-details color="primary"/>
            <v-checkbox label="서류명" v-model="f_downchk2" hide-details color="primary"/>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="alldownLoad">다운로드</v-btn>
        </v-toolbar>
            
        
        <v-data-table :headers="fileHeaders" :items="form">
            <template v-slot:item="{ item }">        
                <tr>
                    <td align=center> {{ item.i_ser }} </td>
                    <td align=center :class="{redcol: item.f_yn==1, greencol: item.f_yn == 0}">{{f_ynchk(item.f_yn)}} </td>
                    <td> {{ item.n_filename }} </td>
                    <td> {{ item.n_file }} </td>
                    <td align=center>
                        <v-btn v-if=item.t_att fab x-small  @click="downLoad(item)">
                        <v-icon dark>mdi-file-download</v-icon>
                        </v-btn>                
                    </td>   
                </tr>
            </template>
        </v-data-table>
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
                { text: '순번',           value: 'i_ser', sortable: false, align:'center', width: "55px"},
                { text: '필수여부',       value: 'f_yn', sortable: false, align:'center', width: "75px"},
                { text: '신청(추가)서류', value: 'n_filename', sortable: false, }, 
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
            f_downchk1: 1,
            f_downchk2: 1,
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
             const disableAutoBOM = true;

            const downFile = item.n_file;
            const fileBuffer = await this.$axios.get(`/api/shopinfo/getFileDown?path=${ item.t_att }`);

            // save (fileBuffer, downFile, disableAutoBOM);

            // try {
                
            //     const a = document.createElement("a");
            //     a.href = fileBuffer;        
            //     a.download = downFile;
            //     document.body.appendChild(a);
            //     a.click();
            //     document.body.removeChild(a);
            // } catch(err) {
            //     console.log({ err })
            // }
     
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + fileBuffer);
            element.setAttribute('download', downFile);
            document.body.appendChild(element);
            element.click();


        },
        async alldownLoad() {
            const path = require('path');
             
            // 일괄 다운르드
            let downFile = "";           
            let fileName = ""; // `http://localhost:8080${item.t_att}`; 
            if (this.fileLists) {               
                for (let ob in this.fileLists) {
                    if (this.f_downchk1) {
                        downFile = this.companyName + "_";
                    } else {
                        downFile = "";
                    }
                    if (this.fileLists[ob].n_file && this.fileLists[ob].t_att) {
                        if (this.f_downchk2) {
                            downFile = downFile + this.fileLists[ob].n_filename;
                        } else {
                            downFile = downFile + this.fileLists[ob].n_file;
                        }
                        downFile = downFile + path.extname(this.fileLists[ob].n_file);                        
                        fileName = `https://protagonist.kro.kr${this.fileLists[ob].t_att}`; 
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
                    }
                }
            }
        },
    },
}
</script>

<style>

</style>