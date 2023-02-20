<template>
  <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation>
     <v-data-table :headers="headers" :items="form"/>
  </v-form>

</template>

<script>
import { deepCopy } from "../../../util/lib";
import InputPost3 from '../../components/InputForms/InputPost3.vue';
export default {
  components: { InputPost3 },
  name: "SignedP03Form",
  props: {
    item: [],
  },
  data() {
    return {        
      valid: true,
      form: {
        i_shop: null,
        i_ser:null,        
        f_yn: null,
        n_filename: null,
        i_no: null,
        n_file: null,
        t_att: null,       
      },
      yn_Items: ["필수", '선택'],
      headers: [
        { text: '신청번호',  value: 'i_shop', align:' d-none' },
        { text: '파일순번', value: 'i_ser', align:' d-none' },
        { text: '필수여부', value: 'f_yn' },
        { text: '첨부파일명', value: 'n_filename' },
        { text: '신청no', value: 'i_no', align:' d-none' },
        { text: '파일명', value: 'n_file' },
        { text: 'upload위치', value: 't_att' },        
      ],
      
    };
  },  
  watch: {
    item() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.item) {
        this.form = deepCopy(this.item);
      }
    },
    async save() {
      this.$emit("save", this.form);
    },
  },  
}
</script>

<style>

</style>