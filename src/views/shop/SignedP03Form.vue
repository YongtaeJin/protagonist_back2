<template>
  <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation>
    
    <v-layout align-start>
    <v-flex>
      <v-data-table :headers="headers" :items="form">
        <template v-slot:item= " { item } " >
          <tr>
            <td align=center :class="{red2: item.f_yn==1, green2: item.f_yn == 0}">{{f_ynchk(item.f_yn)}} </td>
            <td> {{ item.n_filename }} </td>
            <td>                 
                <v-file-input v-model="item.n_file" :multiple="false" color="primary accent-4" hide-details prepend-icon="" />
            </td>  
            <td align=center>
                <v-btn fab x-small  @click="onButtonClick1(item)">
                  <v-icon dark>mdi-file-download</v-icon>
                </v-btn>                
            </td>          
          </tr>            
        </template>
      </v-data-table>
    </v-flex>    
    </v-layout>
    <v-btn  color="primary" type="submit" block> 저 장 </v-btn>
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
        { text: '필수여부', value: 'f_yn', sortable: false, width: "120px", fixed: true, align:'center'},
        { text: '첨부파일명', value: 'n_filename', sortable: false, width: "200px" },
        { text: '신청no', value: 'i_no', sortable: false, align:' d-none' },
        { text: '파일명', value: 'n_file', sortable: false, },
        { text: 'UP/DOWN', value: 't_att', sortable: false, width: "100px"  },        
      ],
      isSelecting: false,
      selectedFile: null,
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
      const formData = new FormData();
			const keys = Object.keys(this.form);
			for(const key of keys) {        
				formData.append(key, this.form[key]);
			}
      this.$emit("save", formData);
    },
    async onButtonClick1(item) {
    },
  
    async onButtonClick2(item) {      
    }
   
  },  
}
</script>
<style>
.red2 {
  font-size: 30;
  color: red;
}
.green2 {
  font-size: 10;
  color: green;
}
.blue2 {
  color: blue;
}

</style>