<template>
  <v-container fill-height fluid> 
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../../server/upload/mainlog.jpeg')"          
          contain
          height="200"
        />
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-5 font-weight-bold">
          Welcome to Protagonist
        </h1>
      </v-col>   
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
	data() {
		return {
			title : "Protagonist App",      
		}
	},
	title() {
		return this.title;
	},
	
  methods: {
    
  },
};
</script>
