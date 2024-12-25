<template>
  <div id="app" :style="appStyle">
    <Navbar v-if="!isLanding" @toggle-sidebar="toggleSidebar" />
    <Sidebar  v-if="!isLanding" :isVisible="isSidebarVisible" />
      <div v-if= "!isLanding" class="workspace">
        <router-view />
      </div>
    <MusicPlayer  v-if="!isLanding" />
    <LandingPage v-if="isLanding"/>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";
import LandingPage from "@/components/LandingPage.vue";

export default {
  components: {
    LandingPage,
    MusicPlayer,
    Navbar,
    Sidebar
  },
  data() {
    return {
      isSidebarVisible: true,
    };
  },
  computed: {
    isLanding(){
      return this.$route.name === 'LandingPage';
    },
    appStyle() {
      return this.isLanding
          ? { margin: '0', width: '100%' }
          : { maxWidth: this.isSidebarVisible ? '94.8%' : '100%'};
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-right: 0;
  padding: 0 !important;
  overflow: hidden;
  max-width: 100%;
  transition: max-width 0.3s ease; /* Smooth transition for max-width change */

}

.workspace {
  display: flex;
  flex: 1;
  margin-top: 60px;
  margin-left: 0px;
  margin-bottom: 80px;
  width: 100%;
  background-color: #1E1E1E;
}

html, body{
  margin: 0 !important;
  padding: 0 !important;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>