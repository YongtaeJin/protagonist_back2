<template>
    <v-container fluid>        
        <v-toolbar >
            <v-toolbar-title>사업장 관리</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>       
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mr-2" @click="addCompany">사업장 추가</v-btn>
        </v-toolbar>
        <v-card>
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            </v-card-title>
        </v-card>
        <v-data-table :headers="headers" :items="desserts" :search="search">
            <template v-slot:item.cmd="{ item }">
                <tooltip-btn icon label="수정" @click="openDialog(item)">
                <v-icon>mdi-pencil</v-icon>
                </tooltip-btn>
            </template>
        </v-data-table>

        <ez-dialog label="사업장 추가/수정" ref="dialog" width="500" persistent @onClose="closeDialog">
            <company-update-form v-if="curCompany"  :company="curCompany" :isLoading="loading" :admMode="true" @onSave="saveCompany">

            </company-update-form>
        </ez-dialog>

        
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import EzDialog from '../../components/etc/EzDialog.vue';
import CompanyUpdateForm from './CompanyUpdateForm.vue';
import TooltipBtn from "../../components/etc/TooltipBtn.vue";
export default {
  components: { TooltipBtn, EzDialog, CompanyUpdateForm },
    name: "SysCompany",
    data () {
        return {
            search: '',
            headers: [
                { text: '사업장코드', align: 'start', filterable: false, value: 'i_com' },
                { text: '사업장명', value: 'n_com' },
                { text: '사업자번호', value: 'i_creg' },
                { text: '대표자명', value: 'n_pernm' },
                { text: '전화번호', value: 't_tel' },
                { text: 'FAX번호', value: 't_fax' },
                { text: 'email', value: 't_email' },
                { text: '', value: 'cmd', sortable: false,},
            ],
            desserts: [],
            curCompany: null,
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            this.desserts = await this.$axios.get("/api/company/company");
        },
        async addCompany() {

        },
        async saveCompany() {

        },
        openDialog(item) {
            this.curCompany = item;
            this.$refs.dialog.open();
        },
        closeDialog() {
            this.curCompany = null;
        },
    },
}
</script>

<style>

</style>

