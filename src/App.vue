<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <site-navi @close="toggleDrawer" />
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark hide-on-scroll>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <site-title />
		</v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <site-footer />
    <vue-progress-bar></vue-progress-bar>
  </v-app>
</template>

<script>
import SiteFooter from './components/layout/SiteFooter.vue';
import SiteTitle from './components/layout/SiteTitle.vue';
import SiteNavi from './components/layout/SiteNavi.vue';

export default {
  components: { SiteTitle, SiteFooter, SiteNavi },
  
  name: 'App',

  data() {
    return {
      drawer : false,
    }
  },
  methods : {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },

  serverPrefetch() {
    return new Promise((resolve, reject)=>{
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
};
</script>
