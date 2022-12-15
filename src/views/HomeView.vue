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

  </div>
</template>

<script>
  

  export default {
    name: 'Home',
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
      }
    }
  
  }
</script>
