import { createRouter, createWebHistory } from 'vue-router'
import PlaylistTable from "@/components/PlaylistTable.vue";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";
import Home from "@/components/Home.vue";
import Track from "@/components/Track.vue";
import LandingPage from "@/components/LandingPage.vue";
import SearchComponent from "@/components/SearchComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/playlist',
      name: 'PlaylistTable',
      props:true,
      components: {
        default: PlaylistTable,
        navbar: Navbar,
        sidebar: Sidebar,
        musicPlayer: MusicPlayer
      }
    },
    {
      path:'/home',
      name: 'Home',
      props: true,
      components: {
        default: Home,
        navbar: Navbar,
        sidebar: Sidebar,
        musicPlayer: MusicPlayer
      }
    },
    {
      path:'/track',
      name: 'Track',
      components: {
        default: Track,
        navbar: Navbar,
        sidebar: Sidebar,
        musicPlayer: MusicPlayer
      }
    },
    {
      path:'/',
      name: 'LandingPage',
      components: {
        default: LandingPage,
      }
    },
    {
      path:'/search',
      name: 'SearchComponent',
      components: {
        default: SearchComponent,
      }
    },
  ]
})

export default router
