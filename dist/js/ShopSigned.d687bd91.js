(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ShopSigned","login"],{"2b2b":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t._self._c;return this.$store.state.user.member?e("v-card",[e("v-toolbar",[t._v("스마트공방 사업신청")]),e("v-tabs",{attrs:{"background-color":"primary",dark:""},model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[e("v-tab",{staticStyle:{flex:"1"},attrs:{value:"tbapage_1"}},[t._v("개인정보 동의")]),e("v-tab",{staticStyle:{flex:"1"},attrs:{value:"tbapage_2",disabled:!this.$store.state.user.shopinfo||"1"==!this.$store.state.user.shopinfo.f_persioninfo}},[t._v("회사 정보")]),e("v-tab",{staticStyle:{flex:"1"},attrs:{value:"tbapage_3",disabled:!this.$store.state.user.shopinfo||"1"==!this.$store.state.user.shopinfo.f_persioninfo}},[t._v("스마트공방 신청")]),e("v-tab",{staticStyle:{flex:"1"},attrs:{value:"tbapage_4",disabled:!this.$store.state.user.shopinfo||"1"==!this.$store.state.user.shopinfo.f_persioninfo}},[t._v("회사 추가 정보")])],1),e("v-card-text",[e("v-tabs-items",{model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[e("v-tab-item",[e("signed-p-01-form",{on:{save:t.save1}})],1),e("v-tab-item",[e("signed-p-02-form")],1),e("v-tab-item",[t._v("c")]),e("v-tab-item",[t._v("d")])],1)],1)],1):e("v-card",{attrs:{width:"100%",elevation:"10"}},[e("login")],1)},s=[],o=a("2f62"),n=a("71fb"),r=function(){var t=this,e=t._self._c;return e("v-form",{ref:"form",on:{submit:function(e){return e.preventDefault(),t.save.apply(null,arguments)}}},[e("v-checkbox",{attrs:{label:"개인정보 수집 및 이용 동의함",color:"success",value:"1","hide-details":""},model:{value:t.form.f_persioninfo,callback:function(e){t.$set(t.form,"f_persioninfo",e)},expression:"form.f_persioninfo"}}),e("v-btn",{attrs:{color:"primary",type:"submit",block:""}},[t._v("동의함")]),e("br"),t._v(" 당 사이트는 「개인정보보호법」 제15조 제1항 제1호, 제17조 제1항 제1호, 제23조 제1호 따라 아래와 같이 개인정보의 수집. 이용에 관하여 귀하의 동의를 얻고자 합니다."),e("br"),e("br"),t._v(" 당 사이트는 이용자의 사전 동의 없이는 이용자의 개인정보를 함부로 공개하지 않으며, 수집된 정보는 아래와 같이 이용하고 있습니다. 이용자가 제공한 모든 정보는 아래의 목적에 필요한 용도 이외로는 사용되지 않으며 이용 목적이 변경될 시에는 이를 알리고 동의를 구할 것입니다."),e("br"),e("br"),e("br"),t._v(" 1. 개인정보의 수집·이용에 관한 사항"),e("br"),e("br"),t._v(" I. 개인정보의 수집·이용 목적"),e("br"),t._v(" 가. 소상공인 지원사업 신청 및 정책연동 : 교육, 컨설팅, 희망리턴패키지, 자금, 협동조합활성화, 프랜차이즈, 나들가게, 상권정보, 특성화시장육성, 행사, 이용자 만족도조사, 이벤트, 경품발송, 게시글, 메일링서비스, SMS 제공을 위하여 개인의 정보를 수집, 이용하고 있습니다."),e("br"),t._v(" 나. 회원관리 : 회원제 서비스 이용 및 제한적 본인 확인제에 따른 본인확인, 개인식별, 가입의사 확인, 가입 및 가입횟수 제한, 추후 법정 대리인 본인확인, 분쟁 조정을 위한 기록보존, 불만처리 등 민원처리, 공지사항 전달"),e("br"),e("br"),t._v(" II. 수집하려는 개인정보의 항목"),e("br"),t._v(" 필수 11개 항목: 사업자 구분(개인사업자, 법인사업자, 예비창업자), 아이디, 비밀번호, 사업자등록번호, 업체명, 대표자명, 사업장주소, 전화번호, 휴대전화번호, 이메일"),e("br"),t._v(" 추가 2개 항목 : SMS 수신, 이메일 수신"),e("br"),t._v(" 자동수집 1개 항목 : 접속IP정보(동시접속제어)"),e("br"),e("br"),t._v(" III. 개인정보의 보유 및 이용 기간 : 2년"),e("br"),t._v(" 개인정보 및 관련 정보는 원칙적으로 보유기간의 경과, 개인정보의 수집 및 이용목적의 달성 등 그 개인정보가 불필요하게 되었을 때에는 지체 없이 파기합니다. 다만, 다른 법령에 따라 보존하여야 하는 경우에는 그러하지 않을 수 있습니다. 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다."),e("br"),e("br"),t._v(" IV. 동의를 거부할 권리 및 동의를 거부할 경우의 불이익"),e("br"),t._v(" 정보주체는 개인정보 수집에 동의를 거부할 권리가 있습니다. 다만, 필수 항목에 대한 동의를 거부할 시 저희가 제공하는 서비스를 이용할 수 없습니다."),e("br"),e("br"),t._v(" V. 14세 미만 아동의 경우 회원가입 및 저희가 제공하는 서비스를 이용할 수 없습니다."),e("br")],1)},l=[],b=(a("64f2"),{name:"SignedP01Form",props:{},data(){return{valid:!0,form:{i_shop:null,i_no:null,i_userid:null,f_persioninfo:"1",d_persioninfo:null,i_regno:null,n_company:null,n_person:null,t_tel1:null,t_tel2:null,i_presno:null,i_post:null,t_addr1:null,t_addr2:null,f_saugup:null,f_run:null,f_dart:null,t_enarainfo:null}}},methods:{async save(){this.form.f_persioninfo?this.$emit("save",this.form):this.$toast.error("동의 후 사용 가능 합니다.")}}}),c=b,u=a("2877"),d=Object(u["a"])(c,r,l,!1,null,null,null),f=d.exports,h=function(){var t=this,e=t._self._c;return e("div")},m=[],v={name:"SignedP02Form"},_=v,p=Object(u["a"])(_,h,m,!1,null,null,null),g=p.exports,S={components:{Login:n["default"],SignedP01Form:f,SignedP02Form:g},name:"ShopSigned",title:"스마트공방 신청",data(){return{tabs:parseInt(this.$route.query.tabs)||0,isLoading:!1,items:[{id:"Sucess",name:"개인정보 동의",enable:"Y"},{id:"Cominfo",name:"회사 정보",enable:"Y"},{id:"Input",name:"스마트공방 신청",enable:"Y"},{id:"Addinfo",name:"회사 추가 정보",enable:"Y"}]}},mounted(){this.$store.state.user.member&&this.fetchData()},methods:{...Object(o["b"])("user",["checkShopInfo","updateShopInfo"]),...Object(o["d"])("user",["SET_SHOPINFO"]),async fetchData(){await this.checkShopInfo()},async save1(t){t.i_shop||(t.i_shop=this.$store.state.user.shopinfo.i_shop,t.i_userid=this.$store.state.user.shopinfo.i_userid);const e=await this.updateShopInfo(t);e&&await this.checkShopInfo()}}},w=S,$=Object(u["a"])(w,i,s,!1,null,null,null);e["default"]=$.exports},"71fb":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"d-flex justify-center align-center",staticStyle:{height:"100%"}},[e("v-card",{attrs:{"max-width":"400",width:"100%",elevation:"10"}},[e("v-toolbar",[e("site-title")],1),e("v-tabs",{attrs:{"background-color":"primary",dark:""},model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},t._l(t.items,(function(a){return e("v-tab",{key:a,staticStyle:{flex:"1"}},[t._v(" "+t._s(a)+" ")])})),1),e("v-card-text",[e("v-tabs-items",{model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[e("v-tab-item",[e("sign-in-form",{attrs:{isLoading:t.isLoading},on:{save:t.loginLocal}})],1),e("v-tab-item",[e("find-id-form",{attrs:{isLoading:t.isLoading},on:{save:t.findId}})],1),e("v-tab-item",[e("find-pw-form",{attrs:{isLoading:t.isLoading},on:{save:t.findPw}})],1)],1)],1),[t._e(),t._e(),t._e(),e("v-card-text",{staticClass:"mt-n4"},[e("v-btn",{attrs:{to:"/join",block:""}},[t._v("회원가입")])],1)]],2)],1)},s=[],o=(a("14d9"),a("2f62")),n=a("4842"),r=a("bad9"),l=a("9ec9"),b=a("aca5"),c={components:{SiteTitle:b["a"],SignInForm:l["a"],FindIdForm:n["a"],FindPwForm:r["a"]},name:"Login",data(){return{tabs:parseInt(this.$route.query.tabs)||0,items:["로그인","아이디 찾기","비밀번호 찾기"],isLoading:!1}},methods:{...Object(o["b"])("user",["signInLocal","findIdLocal","findPwLocal"]),...Object(o["d"])("user",["SET_MEMBER","SET_TOKEN"]),async loginLocal(t){this.isLoading=!0;const e=await this.signInLocal(t);if(this.isLoading=!1,e){const t=this.$store.state.user.member.mb_name;this.$toast.info(t+"님 환영합니다."),this.$router.push("/")}},async findId(t){this.isLoading=!0;const e=await this.findIdLocal(t);this.isLoading=!1,e&&e.mb_id&&(await this.$ezNotify.alert(`<span style="font-size:1.5em">회원 아이디 : [ <b>${e.mb_id}</b> ]</span>`,"아이디 찾기 결과"),this.tabs=0)},async findPw(t){this.isLoading=!0;const e=await this.findPwLocal(t);this.isLoading=!1,e&&(await this.$ezNotify.alert(`${e.mb_name}님<br><b>${t.mb_email}</b>로 이메일 발송하였습니다.`,"이메일 발송 성공"),this.tabs=0)},loginGoogle(){this.loginSocial("/api/member/loginGoogle")},loginKakao(){this.loginSocial("/api/member/loginKakao")},loginNaver(){this.loginSocial("/api/member/loginNaver")},loginSocial(t){window.open(t,"Auth","top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizeable=no"),window.onSocialCallback||(window.onSocialCallback=this.socialLoginCallback)},socialLoginCallback(t){t.err?this.$toast.error(t.err):(this.SET_MEMBER(t.member),this.SET_TOKEN(t.token),this.$router.push("/"),this.$toast.info(this.$store.state.user.member.mb_name+"님 환영합니다."))}}},u=c,d=a("2877"),f=Object(d["a"])(u,i,s,!1,null,null,null);e["default"]=f.exports}}]);
//# sourceMappingURL=ShopSigned.d687bd91.js.map