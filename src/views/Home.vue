<template>
  <v-container fill-height fluid> 
    <v-row class="text-center">
      
      <v-col class="mb-4">
        <h1 class="display-5 font-weight-bold">
          ..... Welcome to Pprotagonist ....
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
