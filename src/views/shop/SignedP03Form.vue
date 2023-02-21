<template>
  <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation>
    <v-layout align-start>
    <v-flex>
      <v-data-table :headers="headers" :items="form" class="elevation-1">
        <template v-slot:item= " { item } " >
          <tr>
            <td  :class="{red2: item.f_yn==1, green2: item.f_yn == 0}">{{item.f_yn}} </td>
            <td> <span style="color:green"> {{ item.n_filename }} </span></td>
            <td> {{ item.n_file }} </td>
          </tr>            
        </template>
      </v-data-table>
    </v-flex>
    </v-layout>
  </v-form>

</template>

<script>
import { deepCopy } from "../../../util/lib";
import InputPost3 from '../../components/InputForms/InputPost3.vue';
export default {
  components: { InputPost3 },
  name: "SignedP03Form",
  props: {
    attfile: [],
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
      
      headers: [
        { text: '신청번호',  value: 'i_shop', sortable: false, align:' d-none' },
        { text: '파일순번', value: 'i_ser', sortable: false, align:' d-none' },
        { text: '필수여부', value: 'f_yn', sortable: false },
        { text: '첨부파일명', value: 'n_filename', sortable: false },
        { text: '신청no', value: 'i_no', sortable: false, align:' d-none' },
        { text: '파일명', value: 'n_file', sortable: false, },
        { text: 'upload위치', value: 't_att', sortable: false, align:' d-none'  },        
      ],
      
    };
  },  
  watch: {
    attfile() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  computed: {
    
  },
  methods: {
    init() {
      if (this.attfile) {
        this.form = deepCopy(this.attfile);
      }
    },
    f_ynchk(data) {
      return data == 1  ? '필수' : '선택';
    },
    async save() {
      this.$emit("save", this.form);
    },
   
    
  },  
}
</script>
<style>
.red2 {
  font-size: 25;
  color: red;
}
.green2 {
  color: green;
}
.blue2 {
  color: blue;
}
</style>