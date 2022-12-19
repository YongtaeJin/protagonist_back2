<template>
  <div>
    <h1>토스트 테스트</h1>
    <div>
      <v-btn @click="toastTest1">토스트  info</v-btn>
      <v-btn @click="toastTest2">토스트  Sucess</v-btn>
      <v-btn @click="toastTest3">토스트  Error</v-btn>
      <v-btn @click="toastTest4">토스트  Waring</v-btn>
      <v-btn @click="toastTest5">토스트  전역에러</v-btn>
    </div>
    <h1>프로그레스 테스트</h1>
    <div>
      <v-btn @click="batTest1">Start</v-btn>
      <v-btn @click="batTest2">Finish</v-btn>  
      <v-btn @click="batTest3">Fail</v-btn>
    </div>
    <h1>Notify 테스트</h1>
    <div>
      <v-btn @click="notifyTest1">Alert</v-btn>
      <v-btn @click="notifyTest2">Confirm</v-btn>
      <v-btn @click="notifyTest3">Prompt</v-btn>
    </div>
    <h1>Axios 테스트</h1>
    <div>
      <v-btn @click="axiosTest1">Test</v-btn>
      <v-btn @click="axiosTest2">Error</v-btn>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Home',
    title() {      
      return "My Homepage";
    },
    serverPrefetch() {      
      return new Promise((resolve, reject) => {        
        resolve();
      });
    },
    beforeCreate() {
      
    },
    created() {
      
    },
    beforeMount() {
      
    },
    mounted() {
      
    },
    methods : {
      toastTest1() {
        this.$toast.info('토스트 Info');
      },
      toastTest2() {
        this.$toast.success('토스트 Success');
      },
      toastTest3() {
        this.$toast.error('토스트 Error');
      },
      toastTest4() {
        this.$toast.warning('토스트 Waring');
      },
      toastTest5() {        
        throw new Error("전역 에러");        
      },
      batTest1() {
        this.$Progress.start();
      },
      batTest2() {
        this.$Progress.finish();
      },
      batTest3() {
        this.$Progress.fail();
      },
      async notifyTest1() {
        const res = await this.$ezNotify.alert("테스트 내용입니다.", "안내", {
          icon: "mdi-video-4k-box",
        });
        console.log(res);
      },
      async notifyTest2() {
        const res = await this.$ezNotify.confirm("테스트 내용입니다.", "");        
        console.log(res);
      },
      async notifyTest3() {
        const res = await this.$ezNotify.prompt("테스트 내용입니다.", "프롬프트", {width: 400});
        console.log(res);
      },      
      async axiosTest1() {
        const result = await this.$axios.get('/api/member/test');
        console.log(result);
      },
      async axiosTest2() {
        const result = await this.$axios.get('/api/error');
        console.log(result);
      },
    }
  
  }
</script>
