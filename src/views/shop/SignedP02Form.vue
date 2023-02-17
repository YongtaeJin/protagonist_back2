<template>
  <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation>
    <v-text-field
      label="사업자번호"
      v-model="form.i_regno"
      prepend-icon="mdi-card-account-details-outline"      
    />  	
    <v-text-field
      label="업체명"
      v-model="form.i_regno"
      prepend-icon="mdi-card-account-details-outline"      
    />
    <v-text-field
      label="대표자"
      v-model="form.i_regno"
      prepend-icon="mdi-card-account-details-outline"      
    />
    <v-text-field
      label="대표자 주민번호"
      v-model="form.i_regno"
      prepend-icon="mdi-card-account-details-outline"
    />
    <input-post :zipcode.sync="form.t_post" :addr1.sync="form.t_addr1" :addr2.sync="form.t_addr2" />
    <v-text-field
      label="사업자구분"
      v-model="form.i_regno"
      prepend-icon="mdi-card-account-details-outline"
    />
    <v-text-field
      label="이전 중진공 사업"
      v-model="form.i_regno"
      prepend-icon="mdi-card-account-details-outline"
    />
    <v-text-field
      label="3년 표준 재무제표 (손익계산서 필수)"
      v-model="form.i_regno"
      prepend-icon="mdi-card-account-details-outline"
    />
  </v-form>
</template>

<script>
import InputPost from '../../components/InputForms/InputPost.vue';
export default {
  components: { InputPost },
  name: "SignedP02Form",
  data() {
    return {        
      valid: true,
      form: {
        i_shop: null,
        i_no: null,
        i_userid: null,
        f_persioninfo: null,
        d_persioninfo: null,
        i_regno: null,
        n_company: null,
        n_person: null,
        t_tel1: null,
        t_tel2: null,
        i_presno: null,
        i_post: null,
        t_addr1: null,
        t_addr2: null,
        f_saugup: null,
        f_run: null,
        f_dart: null,
        t_enarainfo: null,
      },
    };
  },    
}
</script>

<style>

</style>