<template>
    <login v-if="!this.$store.state.user.member"/>
</template>

<script>
import Login from '../member/Login.vue'

export default {
  components: { Login },

	name :"ShopSigned",
	title : "스마트공방 신청",	    
   
}
</script>

<style>

</style>