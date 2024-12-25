<template>
  <div class="home">
    <div v-if="isLoading" class="loading-spinner">
    </div>
    <div v-else class="playlist-container">
      <h1 class="header-one">Playlists</h1>
      <input
          v-model="searchQuery"
          class="search-input"
          placeholder="Search playlists..."
          type="text"
      />

      <div class="playlist-list">
        <div
            v-for="playlist in filteredPlaylists"
            :key="playlist.id"
            class="playlist-item"
            @click="loadPlaylistTracks(playlist.id, playlist.name, playlist.imageUrl,playlist.description)"
        >
          <img :src="playlist.imageUrl" alt="Playlist Image" class="playlist-thumbnail"/>
          <div class="playlist-details">
            <h2>{{ playlist.name }}</h2>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import axios from 'axios';
import PlaylistTable from './PlaylistTable.vue'; // Import PlaylistTable component

export default {
  name: 'Home',
  components: {
    PlaylistTable,
  },
  data() {
    return {
      playlists: [],              // Holds the playlists
      searchQuery: '',            // User search input
      selectedPlaylistTracks: null, // Tracks for selected playlist
      loadingTracks: false,       // Flag to indicate loading state
      isLoading: true,
      user:"",
      showPopUp: false
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    if(!localStorage.getItem("profile_image_url"))
      this.fetchUserProfilePicture(accessToken);
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      this.fetchPlaylists(accessToken);
      if(!localStorage.getItem("profile_image_url"))
        this.fetchUserProfilePicture(accessToken);
    }
  },
  computed: {
    filteredPlaylists() {
      const query = this.searchQuery.toLowerCase();
      return this.playlists.filter((playlist) =>
          playlist.name.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchPlaylists(accessToken) {
      try {
        const response = await axios.get(
            'http://localhost:8080/api/v1/playlist/user-playlists',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
        );
        this.playlists = response.data; // Store playlists
      } catch (error) {

        console.error('Error fetching playlists:', error);

      } finally {
        this.isLoading = false
      }
    },
    async loadPlaylistTracks(playlistId, name, imageUrl, description) {
      this.selectedPlaylistTracks = null; // Clear previous tracks
      this.loadingTracks = true;          // Set loading state
      let accessToken = localStorage.getItem('access_token');
      this.$router.push({
        name: 'PlaylistTable',
        query: {playId: playlistId, name: name, imageUrl: imageUrl, description: description}
      });

    },
    async fetchUserProfilePicture(accessToken){
      console.log(accessToken)
      try {
        const response = await axios.get(
            'http://localhost:8080/api/v1/user/profile',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
        );
        this.user = response.data;
        console.log(this.user.image)
        localStorage.setItem("profile_image_url", this.user.image);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        this.isLoading = false
      }
    }
  },
};
</script>

<style scoped>
body, html {
  background-color: #1E1E1E;

}

.home {
  padding-top: 0px;
  width: 100%;
  height: 100%;
  background-color: #1E1E1E;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  box-sizing: border-box;

}

.header-one {
  margin-bottom: 20px;
}

.playlist-container {
  margin-top: 0px;
  width: 100%;
  height: calc(100vh - 200px);
  background-color: #1E1E1E;
  color: white;
  padding: 10px;
}

.loading-spinner {
  border: 8px solid rgba(6, 14, 14, 0.2);
  border-top: 8px solid cyan;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin 1s linear infinite;
  margin-top: 10%;
}

/* Keyframes for rotation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}

.playlist-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /*max-height: calc(100vh - 0px);

   */
}

.playlist-item {
  display: flex;
  align-items: center;
  background-color: #2E2E2E;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.playlist-thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
}

.playlist-details {
  display: flex;
  flex-direction: column;
}

.playlist-details h2 {
  margin: 0;
  font-size: 1.2em;
}

.loading-message {
  margin-top: 20px;
  color: white;
  font-size: 18px;
}

.home::-webkit-scrollbar {
  width: 12px;
}

.home::-webkit-scrollbar-thumb {
  background-color: #4f4e4e;
  border-radius: 10px;
}

.home::-webkit-scrollbar-thumb:hover {
  background-color: #808080;
}

.home::-webkit-scrollbar-track {
  background-color: #1E1E1E;
}


@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>
