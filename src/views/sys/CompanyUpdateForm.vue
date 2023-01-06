<template>
    <v-form v-if="form" @submit.prevent="save" ref="form" v-model="valid" lazy-validation >
        <v-text-field label="사업장코드" v-model="form.i_com"  readonly />
        <v-text-field label="사업자번호" v-model="form.n_com"   />
        <v-text-field label="사업자  명" v-model="form.i_creg"   />
        <v-text-field label="대표자성명" v-model="form.n_pernm"   />
        <v-text-field label="전화번호" v-model="form.t_tel"   />
        <v-text-field label="FAX 번호" v-model="form.t_fax"   />
        <v-text-field label="E-mail" v-model="form.t_email"   />
        <v-text-field label="우편번호" v-model="form.t_post"   />
        <v-text-field label="주소" v-model="form.t_addr1"   />
        <v-text-field label="상세주소" v-model="form.t_addr2"   />
        
    </v-form>
  
</template>

<script>
import { deepCopy } from "../../../util/lib";
import validateRules from "../../../util/validateRules";
export default {
    name: "CompanyUpdateForm",
    props: {
        admMode: {
            type: Boolean,
            default: false,
        },
        company: {
            type: Object,
            required: true,
        },
        isLoading: Boolean,
    },
    data() {
        return {
        valid: true,
        form: null,
        }
    },
    mounted() {
        this.form = deepCopy(this.company);
        console.log(this.company);
    },
    destroyed() {
        this.form = null;
    },
}
</script>

<style>

</style>