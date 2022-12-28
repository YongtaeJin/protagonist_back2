(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["AdmConfig"],{9415:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e._self._c;return t("v-container",{attrs:{fluid:""}},[t("v-toolbar",[t("v-toolbar-title",[e._v("설정관리")]),t("v-spacer"),t("tooltip-btn",{attrs:{fab:"",small:"",label:"설정추가"},on:{click:e.addConfig}},[t("v-icon",[e._v("mdi-plus")])],1)],1),t("ez-dialog",{ref:"dialog",attrs:{label:"설정 추가","max-width":"500",dark:"",color:"primary",persistent:""}},[t("config-form",{attrs:{keyCheck:e.keyCheck},on:{save:e.save}})],1)],1)},o=[],n=l("2f62"),r=function(){var e=this,t=e._self._c;return t("v-dialog",e._b({model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},"v-dialog",e.$attrs,!1),[t("v-card",[t("v-toolbar",[t("v-toolbar-title",[e._v(e._s(e.label))]),t("v-spacer"),t("v-btn",{attrs:{icon:""},on:{click:e.close}},[t("v-icon",[e._v("mdi-close")])],1)],1),t("v-card-text",[e._t("default")],2)],1)],1)},i=[],s={name:"ezDialog",props:{label:{type:String,required:!0}},data(){return{dialog:!1}},methods:{close(){this.dialog=!1},open(){this.dialog=!0}}},c=s,u=l("2877"),f=Object(u["a"])(c,r,i,!1,null,null,null),p=f.exports,m=function(){var e=this,t=e._self._c;return t("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function({on:l,attrs:a}){return[t("v-btn",e._g(e._b({on:{click:function(t){return e.$emit("click")}}},"v-btn",{...a,...e.$attrs},!1),l),[e._t("default")],2)]}}],null,!0)},[t("span",[e._v(e._s(e.label))])])},v=[],d={name:"TooltipBtn",props:{label:{type:String,required:!0}}},b=d,_=Object(u["a"])(b,m,v,!1,null,null,null),y=_.exports,g=function(){var e=this,t=e._self._c;return t("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.save.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t("v-combobox",{attrs:{items:e.groupItems,label:"그룹",rules:[e.rules.require({label:"그룹"})]},model:{value:e.form.cf_group,callback:function(t){e.$set(e.form,"cf_group",t)},expression:"form.cf_group"}}),t("div",{staticClass:"d-flex"},[t("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function({on:l,attrs:a}){return[t("span",e._g(e._b({staticClass:"mr-2"},"span",a,!1),l),[t("v-checkbox",{attrs:{"true-value":"1","false-value":"0"},model:{value:e.form.cf_client,callback:function(t){e.$set(e.form,"cf_client",t)},expression:"form.cf_client"}})],1)]}}])},[t("span",[e._v("클라이언트")])]),t("input-duplicate-check",{ref:"cfKey",attrs:{label:"키",cbCheck:e.keyCheck,rules:[e.rules.require({label:"키"}),e.rules.alphaNum()]},model:{value:e.form.cf_key,callback:function(t){e.$set(e.form,"cf_key",t)},expression:"form.cf_key"}})],1),t("v-text-field",{attrs:{label:"이름",rules:e.rules.name()},model:{value:e.form.cf_name,callback:function(t){e.$set(e.form,"cf_name",t)},expression:"form.cf_name"}}),t("v-select",{attrs:{label:"값 타입",items:e.typeItems},model:{value:e.form.cf_type,callback:function(t){e.$set(e.form,"cf_type",t)},expression:"form.cf_type"}}),t("type-value",{attrs:{fieldType:e.form.cf_type},model:{value:e.form.cf_val,callback:function(t){e.$set(e.form,"cf_val",t)},expression:"form.cf_val"}}),t("v-slider",{attrs:{label:`접근레벨 (${e.form.cf_level})`,min:e.LV.ADMIN,max:e.LV.SUPER,"thumb-color":"primary","thumb-label":""},model:{value:e.form.cf_level,callback:function(t){e.$set(e.form,"cf_level",t)},expression:"form.cf_level"}}),t("v-textarea",{attrs:{label:"설명"},model:{value:e.form.cf_comment,callback:function(t){e.$set(e.form,"cf_comment",t)},expression:"form.cf_comment"}}),t("v-btn",{attrs:{type:"submit",block:""}},[e._v("저장")])],1)},h=[],k=l("248f"),x=l.n(k),$=l("50d8"),S=l("bb5e"),C=function(){var e=this,t=e._self._c;return"String"==e.fieldType?t("div",[t("v-text-field",{attrs:{label:"Value",value:e.value},on:{input:e.onInput}})],1):"Number"==e.fieldType?t("div",[t("v-text-field",{attrs:{label:"Value",type:"number",value:e.value},on:{input:e.onInput}})],1):"Json"==e.fieldType?t("div",[t("v-textarea",{attrs:{label:"Value",value:e.value},on:{input:e.onInput}})],1):"Secret"==e.fieldType?t("div",[t("input-password",{attrs:{label:"Sercet Value",value:e.value},on:{input:e.onInput}})],1):t("div",[t("div",[e._v("선택한 타입 입력필드가 없습니다.")])])},w=[],I=l("445e"),T={components:{InputPassword:I["a"]},name:"TypeValue",model:{prop:"value",event:"input"},props:{value:{type:String},fieldType:{type:String,default:"String"}},methods:{onInput(e){this.$emit("input",e)}}},V=T,D=Object(u["a"])(V,C,w,!1,null,null,null),j=D.exports,O={components:{InputDuplicateCheck:$["a"],TypeValue:j},name:"ConfigForm",props:{keyCheck:{type:Function,default:null}},data(){return{valid:!0,form:{cf_key:"",cf_val:"",cf_name:"",cf_group:"",cf_level:"",cf_type:"String",cf_comment:"",cf_client:0},groupItems:[],typeItems:["String","Number","Json","Secret"]}},computed:{rules:()=>x.a,LV:()=>S["LV"]},methods:{async save(){this.$refs.form.validate(),await this.$nextTick(),this.valid&&this.$refs.cfKey.validate()&&(this.form.cf_sort=0,this.$emit("save",this.form))}}},q=O,z=Object(u["a"])(q,g,h,!1,null,null,null),J=z.exports,L={components:{TooltipBtn:y,EzDialog:p,ConfigForm:J},name:"AdmConfig",data(){return{items:[]}},mounted(){this.fetchData()},methods:{...Object(n["b"])(["configDuplicate","configSave"]),addConfig(){this.$refs.dialog.open()},async save(e){this.configSave(e);this.$refs.dialog.close()},async keyCheck(e){const t={field:"cf_key",value:e};return await this.configDuplicate(t)},async fetchData(){this.items=await this.$axios.get("/api/config?all=true")}}},N=L,A=Object(u["a"])(N,a,o,!1,null,null,null);t["default"]=A.exports}}]);
//# sourceMappingURL=AdmConfig.a52094e0.js.map