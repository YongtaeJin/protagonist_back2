(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["SysCompany"],{"414b":function(t,e,a){"use strict";var i=function(){var t=this,e=t._self._c;return e("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function({on:a,attrs:i}){return[e("v-btn",t._g(t._b({class:t.childClass,on:{click:function(e){return t.$emit("click")}}},"v-btn",{...i,...t.$attrs},!1),a),[t._t("default")],2)]}}],null,!0)},[e("span",[t._v(t._s(t.label))])])},o=[],n={name:"TooltipBtn",props:{label:{type:String,required:!0},childClass:[String,Object]}},r=n,l=a("2877"),s=Object(l["a"])(r,i,o,!1,null,null,null);e["a"]=s.exports},a2e4:function(t,e,a){"use strict";var i=function(){var t=this,e=t._self._c;return e("v-dialog",t._b({model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},"v-dialog",t.$attrs,!1),[e("v-card",[e("v-toolbar",[e("v-toolbar-title",[t._v(t._s(t.label))]),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:t.close}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-card-text",[t._t("default")],2)],1)],1)},o=[],n={name:"ezDialog",props:{label:{type:String,required:!0}},data(){return{dialog:!1}},methods:{close(){this.dialog=!1,this.$emit("onClose")},open(){this.$emit("onOpen"),this.dialog=!0}}},r=n,l=a("2877"),s=Object(l["a"])(r,i,o,!1,null,null,null);e["a"]=s.exports},acdf:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t._self._c;return e("v-container",{attrs:{fluid:""}},[e("v-toolbar",[e("v-toolbar-title",[t._v("사업장 관리")]),e("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e("v-spacer"),e("v-btn",{staticClass:"mr-2",attrs:{color:"primary",dark:""},on:{click:function(e){return t.openDialog()}}},[t._v("사업장 추가")])],1),e("v-card",[e("v-card-title",[e("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1),e("v-data-table",{attrs:{headers:t.headers,items:t.items,search:t.search,loading:t.loading},scopedSlots:t._u([{key:"item.cmd",fn:function({item:a}){return[e("tooltip-btn",{attrs:{icon:"",label:"수정"},on:{click:function(e){return t.openDialog(a)}}},[e("v-icon",[t._v("mdi-pencil")])],1)]}}])}),e("ez-dialog",{ref:"dialog",attrs:{label:"사업장 추가/수정",width:"500",color:"primary",persistent:""}},[e("company-update-form",{attrs:{keyCheck:t.keyCheck,company:t.curitem,newItem:t.newItem},on:{onSave:t.companyUpdate,onCreate:t.companyCreate}})],1)],1)},o=[],n=(a("14d9"),a("2f62")),r=(a("bc3a"),a("a2e4")),l=function(){var t=this,e=t._self._c;return e("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.save.apply(null,arguments)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[e("input-duplicate-check",{ref:"i_com",attrs:{label:"사업장코드",counter:"10","prepend-icon":"mdi-barcode",cbCheck:t.keyCheck,origin:t.originKey,readonly:"추 가"!=t.newItem,rules:[t.rules.require({label:"사업장코드"}),t.rules.alphaNum()]},model:{value:t.form.i_com,callback:function(e){t.$set(t.form,"i_com",e)},expression:"form.i_com"}}),e("v-text-field",{attrs:{label:"사업자번호","prepend-icon":"mdi-office-building-outline"},model:{value:t.form.i_creg,callback:function(e){t.$set(t.form,"i_creg",e)},expression:"form.i_creg"}}),e("v-text-field",{attrs:{label:"사업자  명","prepend-icon":"mdi-rename-box "},model:{value:t.form.n_com,callback:function(e){t.$set(t.form,"n_com",e)},expression:"form.n_com"}}),e("v-text-field",{attrs:{label:"대표자성명","prepend-icon":"mdi-account"},model:{value:t.form.n_pernm,callback:function(e){t.$set(t.form,"n_pernm",e)},expression:"form.n_pernm"}}),e("input-phone",{attrs:{label:"전화번호","prepend-icon":"mdi-phone",rules:t.rules.phone({required:!1})},model:{value:t.form.t_tel,callback:function(e){t.$set(t.form,"t_tel",e)},expression:"form.t_tel"}}),e("input-phone",{attrs:{label:"FAX 번호","prepend-icon":"mdi-fax",rules:t.rules.phone({required:!1})},model:{value:t.form.t_fax,callback:function(e){t.$set(t.form,"t_fax",e)},expression:"form.t_fax"}}),e("v-text-field",{attrs:{label:"E-mail","prepend-icon":"mdi-at",rules:t.rules.email({required:!1})},model:{value:t.form.t_email,callback:function(e){t.$set(t.form,"t_email",e)},expression:"form.t_email"}}),e("input-post2",{attrs:{zipcode:t.form.t_post,addr1:t.form.t_addr1,addr2:t.form.t_addr2},on:{"update:zipcode":function(e){return t.$set(t.form,"t_post",e)},"update:addr1":function(e){return t.$set(t.form,"t_addr1",e)},"update:addr2":function(e){return t.$set(t.form,"t_addr2",e)}}}),e("v-btn",{attrs:{type:"submit",block:"",color:"primary",loading:t.isLoading}},[t._v(t._s(t.newItem))])],1)},s=[],c=a("64f2"),d=a("248f"),m=a.n(d),p=a("50d8"),u=a("604d"),f=function(){var t=this,e=t._self._c;return e("div",[e("v-sheet",{attrs:{"max-width":"200"}},[e("v-text-field",{attrs:{label:"우편번호",value:t.zipcode,readonly:"","prepend-icon":"mdi-map-marker"},scopedSlots:t._u([{key:"append",fn:function(){return[e("v-btn",{attrs:{icon:"",small:"",tabindex:"-1"},on:{click:t.open}},[e("v-icon",[t._v("mdi-magnify")])],1)]},proxy:!0}])})],1),e("v-text-field",{attrs:{label:"주소",value:t.addr1,readonly:""}}),e("v-text-field",{attrs:{label:"상세주소",value:t.addr2},on:{input:t.updateAddr2}}),e("v-dialog",{attrs:{"max-width":"500",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e("v-toolbar",[e("v-toolbar-title",[t._v("주소검색")]),e("v-spacer"),e("v-btn",{attrs:{icon:"",plain:""},on:{click:t.close}},[e("v-icon",[t._v("mdi-close")])],1)],1),t.themeChange?e("daum-postcode",{attrs:{"on-complete":t.handleAddress,theme:t.isDark?t.darkStyle:t.lightStyle,animation:!0}}):t._e()],1)],1)},h=[],_=a("9cf0"),v=a.n(_),b={name:"InputPost",components:{DaumPostcode:v.a},props:{zipcode:String,addr1:String,addr2:String,required:{type:Boolean,default:!0}},data(){return{dialog:!1,darkStyle:{bgColor:"#121212",searchBgColor:"#131313",contentBgColor:"#272727",pageBgColor:"#121212",textColor:"#FFFFFF",queryTextColor:"#FFFFFF",outlineColor:"#444444"},lightStyle:{searchBgColor:"#ECECEC"},themeChange:!0}},computed:{rules:()=>m.a,isDark(){return this.themeChange=!1,this.$nextTick(()=>{this.themeChange=!0}),this.$vuetify.theme.isDark}},methods:{open(){this.dialog=!0},close(){this.dialog=!1},updateAddr2(t){this.$emit("update:addr2",t)},handleAddress(t){let e=t.address,a="";"R"===t.addressType&&(""!==t.bname&&(a+=t.bname),""!==t.buildingName&&(a+=""!==a?", "+t.buildingName:t.buildingName),e+=""!==a?` (${a})`:""),this.$emit("update:zipcode",t.zonecode),this.$emit("update:addr1",e),this.close()}}},g=b,y=a("2877"),x=Object(y["a"])(g,f,h,!1,null,null,null),k=x.exports,C={components:{InputDuplicateCheck:p["a"],InputPhone:u["a"],InputPost2:k},name:"CompanyUpdateForm",props:{keyCheck:{type:Function,default:null},company:{type:Object,default:null},isLoading:Boolean,newItem:{type:String,default:null}},data(){return{valid:!0,form:{i_com:"",n_com:"",i_creg:"",n_pernm:"",t_tel:"",t_fax:"",t_email:"",t_post:"",t_addr1:"",t_addr2:""}}},mounted(){this.form=Object(c["deepCopy"])(this.company)},watch:{company(){this.init()}},computed:{rules:()=>m.a,originKey(){return this.company?this.company.i_com:""}},created(){this.init()},destroyed(){this.form=null},methods:{init(){this.company?this.form=Object(c["deepCopy"])(this.company):this.from={i_com:"",n_com:"",i_creg:"",n_pernm:"",t_tel:"",t_fax:"",t_email:"",t_post:"",t_addr1:"",t_addr2:""},this.$refs.form&&this.$refs.form.resetValidation()},async save(){if(this.$refs.form.validate(),await this.$nextTick(),!this.valid)return;if(!this.$refs.i_com.validate())return;const t=new FormData,e=Object.keys(this.form);for(const a of e)t.append(a,this.form[a]);"수 정"==this.newItem?this.$emit("onSave",t):this.$emit("onCreate",t),this.init()}}},$=C,w=Object(y["a"])($,l,s,!1,null,null,null),S=w.exports,F=a("414b"),I={components:{TooltipBtn:F["a"],EzDialog:r["a"],CompanyUpdateForm:S},name:"SysCompany",data(){return{search:"",loading:!1,headers:[{text:"사업장코드",align:"start",filterable:!1,value:"i_com"},{text:"사업장명",value:"n_com"},{text:"사업자번호",value:"i_creg"},{text:"대표자명",value:"n_pernm"},{text:"전화번호",value:"t_tel"},{text:"FAX번호",value:"t_fax"},{text:"email",value:"t_email"},{text:"",value:"cmd",sortable:!1}],items:[],curitem:null,initItem:{i_com:"",n_com:"",i_creg:"",n_pernm:"",t_tel:"",t_fax:"",t_email:"",t_post:"",t_addr1:"",t_addr2:""},newItem:""}},mounted(){this.fetchData()},methods:{...Object(n["b"])("company",["duplicateCheckCompany"]),async keyCheck(t){const e={field:"i_com",value:t};return await this.duplicateCheckCompany(e)},async fetchData(){this.items=await this.$axios.get("/api/company/company")},openDialog(t){t?(this.curitem=t,this.newItem="수 정"):(this.curitem=this.initItem,this.newItem="추 가"),this.$refs.dialog.open()},async companyUpdate(t){this.loading=!0;const e=await this.$axios.patch("/api/company",t);if(this.loading=!1,e){const t=this.items.indexOf(this.curitem);this.items.splice(t,1,e),this.$toast.info(e.i_com+" 수정 하였습니다.")}this.$refs.dialog.close()},async companyCreate(t){this.loading=!0;const e=await this.$axios.post("/api/company",t);this.loading=!1,e&&(this.items.push(e),this.$toast.info(e.i_com+" 추가 하였습니다.")),this.$refs.dialog.close()}}},D=I,O=Object(y["a"])(D,i,o,!1,null,null,null);e["default"]=O.exports}}]);
//# sourceMappingURL=SysCompany.15566471.js.map