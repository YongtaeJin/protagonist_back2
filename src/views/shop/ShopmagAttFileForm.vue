<template>
    <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation>
        <v-radio-group label="구분 : " row v-model="form.f_gubun">
            <v-radio label="신청서" value="1"></v-radio>
            <v-radio label="추가정보" value="2"></v-radio>
        </v-radio-group>
        <v-text-field label="순번 : " type="number" v-model="form.i_sort" />
        <v-radio-group label="필수 : " row v-model="form.f_yn">
            <v-radio label="필수" value="1"></v-radio>
            <v-radio label="선택" value="0"></v-radio>
        </v-radio-group>
        <v-text-field label="파일명 : " v-model="form.n_file"  />
        <v-textarea label="설명 : " v-model="form.t_remark" />
        
        <v-btn type="submit" block color="primary" :loading="isLoading">{{isNew?'추  가':'수  정'}}</v-btn>
        <v-btn block @click="onDelete" :loading="isLoading" v-if=!isNew>삭 제</v-btn> 
    </v-form>
</template>

<script>
import { deepCopy } from '../../../util/lib';
import validateRules from "../../../util/validateRules";
import InputDate from '../../components/InputForms/InputDate.vue';
import InputDuplicateCheck from '../../components/InputForms/InputDuplicateCheck.vue';
export default {
  components: { InputDate, InputDuplicateCheck },
    name: "ShopmagUpdateForm",
    props: {
        addFileInfo: {
            type: Object,
            default: null,
        },
        cbSerId: {
            type: Function,
            default: null,
        },
        isNew : Boolean, 
        isLoading : Boolean,
        maxno : 0,
    },
    data() {
        return {
            valid: true,
            form: {
                i_shop: "",
                i_ser: "",
                f_gubun: 1,
                f_yn: 1,
                n_file: "",
                t_remark: "",
                t_sample: "",
                i_sort : 1,
            },            
        }
    },
    created() {        
        this.init();        
    },    
    destroyed() {        
        this.form = null;
    },
    watch: {        
        addFileInfo() {            
            this.init();            
        }
    },
    computed: {
        rules: () => validateRules,
        // originKey() {            
        //    return this.addFileInfo ? this.addFileInfo.i_ser : "";            
        // },
    },

    methods: {
        async save() {
            // this.$refs.form.validate();
            // await this.$nextTick();
            // if (!this.valid) return;
            // if (!this.$refs.i_ser.validate()) return;
            
            const formData = new FormData();
			const keys = Object.keys(this.form);
            for (const key of keys) {
                formData.append(key, this.form[key]);
            };
            this.$emit("save", formData);
        },
        init() {
            if (this.addFileInfo) {
                this.form = deepCopy(this.addFileInfo);
            } else {
                this.form = {
                    i_shop: "",
                    i_ser: 0,
                    f_gubun: '1',
                    f_yn: '1',
                    n_file: "",
                    t_remark: "",
                    t_sample: "",
                    i_sort: this.maxno + 1,
                }
            };     
            if (this.$refs.form) {
                this.$refs.form.resetValidation();
            };
        },
        onClose() {
            console.log("onClose");
        },
        async onDelete() {
             const res = await this.$ezNotify.confirm("삭제 하시겠습니까 ?", this.form.n_file);
             if (res) {
                this.$emit('onDelete', this.form);
             }
        }
    }
}
</script>

<style>

</style>