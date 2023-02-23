<template>
  <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation>
    
    <v-layout align-start>
    <v-flex>
      <v-data-table :headers="headers" :items="form">
        <template v-slot:item= " { item } " >
          <tr>
            <td align=center :class="{red2: item.f_yn==1, green2: item.f_yn == 0}">{{f_ynchk(item.f_yn)}} </td>
            <td> {{ item.n_filename }} </td>
            <td> {{ item.n_file2 }} </td>
            <td align=center>
                <v-file-input  v-model="item.n_file" :multiple="false"
                  :dense="true"
                  @change="getFilename($event, item)"
                  color="primary accent-4" hide-details prepend-icon="mdi-file-upload" />
            </td>  
            <td align=center>             
                <v-btn fab x-small  @click="onButtonClick2(item)">
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
import {saveAs} from 'file-saver';
import InputPost3 from '../../components/InputForms/InputPost3.vue';
export default {
  components: { InputPost3 },
  name: "SignedP03Form",
  props: {
    //attfile: [],
    attfile: {
      type: Array,
      default: null,
    },
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
        n_file2: null,
        t_att: null,       
      },
      
      headers: [
        { text: '신청번호',  value: 'i_shop', sortable: false, align:' d-none' },
        { text: '파일순번', value: 'i_ser', sortable: false, align:' d-none' },
        { text: '필수여부', value: 'f_yn', sortable: false, width: "120px", fixed: true, align:'center'},
        { text: '첨부파일명', value: 'n_filename', sortable: false, width: "200px" },
        { text: '신청no', value: 'i_no', sortable: false, align:' d-none' },
        { text: '파일명', value: 'n_file2', sortable: false, },
        { text: 'UP', value: 'n_file', sortable: false, width: "50px"},
        { text: 'DOWN', value: 't_att', sortable: false, width: "50px"  },        
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
      // 한번에 저장 하기 위해 아래 와 같이 전달 해야 함...  (첨부파일 동시 Upload 문제 때문에 주석 처리)
      const formData = new FormData();   
      
      for (const item of Object.keys(this.form)) {        
        const { n_file } = this.form[item];   
        if (n_file) {
          for (const key of Object.keys(this.form[item])) {            
            formData.append(key, this.form[item][key]);
          }
        }
      }
      this.$emit("save", formData);

      //console.log("save")
    },

    async getFilename(files, item) {
      if (files) {
        console.log(files.name);
        item.t_att = files.name;
      }
    },
    
    async onButtonClick1(item) {
      console.log(item);
    },
  
    async onButtonClick2(item) {  
      
      axios({
            url: "https://protagonist.kro.kr/server/upload/memberPhoto/Hxn3P8Ms5dKepNj7.jpg", // 파일 다운로드 요청 URL
            method: "GET", // 혹은 'POST'
            responseType: "blob", // 응답 데이터 타입 정의
        }).then((response) => {
            // 다운로드(서버에서 전달 받은 데이터) 받은 바이너리 데이터를 blob으로 변환합니다.
            const blob = new Blob([response.data]);
            // 특정 타입을 정의해야 경우에는 옵션을 사용해 MIME 유형을 정의 할 수 있습니다.
            // const blob = new Blob([this.content], {type: 'text/plain'})

            // blob을 사용해 객체 URL을 생성합니다.
            const fileObjectUrl = window.URL.createObjectURL(blob);

            // blob 객체 URL을 설정할 링크를 만듭니다.
            const link = document.createElement("a");
            link.href = fileObjectUrl;
            link.style.display = "none";

            // 다운로드 파일 이름을 지정 할 수 있습니다.
            // 일반적으로 서버에서 전달해준 파일 이름은 응답 Header의 Content-Disposition에 설정됩니다.
            link.download = extractDownloadFilename(response);

            // 다운로드 파일 이름을 추출하는 함수
            const extractDownloadFilename = (response) => {
                const disposition = response.headers["content-disposition"];
                const fileName = decodeURI(
                disposition
                    .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
                    .replace(/['"]/g, "")
                );
                return fileName;
            };

            // 다운로드 파일의 이름은 직접 지정 할 수 있습니다.
            // link.download = "sample-file.xlsx";

            // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행시킵니다.
            document.body.appendChild(link);
            link.click();
            link.remove();

            // 다운로드가 끝난 리소스(객체 URL)를 해제합니다.
            window.URL.revokeObjectURL(fileObjectUrl);
        });
      
    },

    
   
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