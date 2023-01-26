<template>
    <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation>
        <v-select 
            v-model="form.i_com"
            prepend-icon="mdi-office-building-outline"
            :items="companys"
            :hint="`${form.i_com.n_com || ''}, ${form.i_com.i_com  || ''}`"
            item-text="n_com"
            item-value="i_com"
            label="사업장"
            persistent-hint
            return-object     
            :readonly=!isNew
        />
        
        <input-duplicate-check-2 ref="id"
            v-model="form.i_id"
            label="아이디"
            prepend-icon="mdi-account"
            counter="30"
            :rules="rules.id()"
            :readonly=!isNew
            :cbCheck="cbCheckId" />
        <v-text-field
            label="이름"
            v-model="form.n_name"
            prepend-icon="mdi-card-account-details-outline"
            :rules="rules.name()"
        />        
        <input-password
            label="비밀번호"
            v-model="form.i_password"
            prepend-icon="mdi-lock"
            :rules="rules.password()"
        />
        <v-text-field
            label="비고"
            v-model="form.t_memo"
            prepend-icon="mdi-note" 
        />
        <v-btn type="submit" block color="primary" :loading="isLoading">{{isNew?'추  가':'수  정'}}</v-btn>  
        <v-btn block @click="delUser" :loading="isLoading" v-if=!isNew>삭 제</v-btn> 


    </v-form>
</template>

<script>
import { deepCopy } from "../../../util/lib";
import validateRules from "../../../util/validateRules";
import InputDuplicateCheck from '../../components/InputForms/InputDuplicateCheck.vue';
import InputDuplicateCheck2 from '../../components/InputForms/InputDuplicateCheck2.vue';
import InputPassword from '../../components/InputForms/InputPassword.vue';

export default {
  components: { InputDuplicateCheck, InputDuplicateCheck2, InputPassword },
    name: "SysUsersForm",
    props: {
        user: {
            type: Object,
            default: null,
        },
        companys: null,
        cbCheckId: {
            type: Function,
            default: null,
        },
        isLoading : Boolean,
        isNew : Boolean,
    },
    data() {
        return {
            valid: true,            
            form: {
                i_com: "",                
                i_id: "",
                i_password: "",
                n_name: "",
                t_memo: ""
            },            
        };
    },
    mounted() {        
        //this.form = deepCopy(this.user);        
    },
    watch: {        
        user() {        
            this.init();             
        },        
    },
    computed: {
        rules: () => validateRules,
        // originKey() {
        //     return this.company ? this.company.i_com : "";
        // },
    },
   
    created() {        
        this.init();        
    },    
    destroyed() {        
        this.form = null;
    },
    methods: {   
        init() {
            if (this.user) {
                this.form = deepCopy(this.user);
            } else {
                this.form = {
                    i_com: "",
                    i_id: "",
                    i_password: "",
                    n_name: "",
                    t_memo: ""
                }
            };
            this.form.i_password = "";            
            if (this.$refs.form) {
                this.$refs.form.resetValidation();
            };
        },
        async save() {
            //this.$refs.form.validate();
            //await this.$nextTick();
            //if (!this.valid) return;
            //if (!this.$refs.id.validate()) return;
            
            const formData = new FormData();
			const keys = Object.keys(this.form);
            
			for(const key of keys) {
                if(key == "i_com") {                    
                    if (this.isNew) {
                        formData.append(key, this.form.i_com.i_com);
                        formData.append("n_com", this.form.i_com.n_com);
                    }
                    else {
                        formData.append(key, this.form.i_com);                    
                    }                    
                } else if(key == "n_com" && !this.isNew ) {
                    formData.append(key, this.form.n_com);
                } else {
				    formData.append(key, this.form[key]);
                } 
			}         
            this.$emit('onSave', formData);
            this.init();
        },       
        async delUser() {           
             
            const formData = new FormData();
			const keys = Object.keys(this.form);
            
			for(const key of keys) {
                if(key == "i_com") {                    
                    if (this.isNew) {
                        formData.append(key, this.form.i_com.i_com);
                        formData.append("n_com", this.form.i_com.n_com);
                    }
                    else {
                        formData.append(key, this.form.i_com);                    
                    }                    
                } else if(key == "n_com" && !this.isNew ) {
                    formData.append(key, this.form.n_com);
                } else {
				    formData.append(key, this.form[key]);
                } 
			}        
            this.$emit('onDelete', formData);
        }
    },
}
</script>

<style>

</style>