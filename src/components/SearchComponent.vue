<template>
  <div class="search-component">
    <!-- Search Input -->
    <div class="playlist-container">

      <input
          type="text"
          v-model="query"
          placeholder="Search Spotify..."
          @input="search"
      />

      <!-- Tags for Filtering -->
      <div class="search-tags">
        <span
            :class="{ active: selectedType === 'album' }"
            @click="setType('album')"
        >
          Album
        </span>
        <span
            :class="{ active: selectedType === 'playlist' }"
            @click="setType('playlist')"
        >
          Playlist
        </span>
        <span
            :class="{ active: selectedType === 'track' }"
            @click="setType('track')"
        >
          Track
        </span>
      </div>
      <div class="playlist-list">
        <div
            v-for="(result, index) in results"
            :key="index"
            class="playlist-item"
            @click ="loadPlaylistTracks(result.id, result.name, result.image, result.description)"
        >
          <img :src="result.image" alt="result.name" class="playlist-thumbnail"/>
          <div class="playlist-details">
            <h2>{{ result.name }}</h2>
            <p v-if="result.artists">{{ result.artists }}</p> <!-- Display Artist Names -->
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'SearchComponent',

  data() {
    return {
      query: "", // Search query input
      selectedType: "album", // Default search type
      results: [], // Holds search results
      accessToken: localStorage.getItem("access_token")
    };
  },
  methods: {
    // Method to set the search type based on selected tag
    setType(type) {
      this.selectedType = type;
      this.search(); // Trigger search after changing type
    },
    // Method to trigger search request to backend
    search() {
      // Only perform search if query is not empty
      if (this.query.length > 2) {
        axios
            .get("http://localhost:8080/api/v1/search", {
              params: {
                query: this.query,
                type: this.selectedType,
                limit: 10,
                offset: 0,
              },
              headers: {
                Authorization: `Bearer ${this.accessToken}`,
              }
            })
            .then((response) => {

              this.parseResults(response.data);
            })
            .catch((error) => {
              console.error("Error fetching search results", error);
            });
      }
    },
    parseResults(data){
      if (this.selectedType === 'album' && data.albums) {
        this.results = data.albums.items.map(item => ({
          name: item.name,
          image: item.images[0]?.url || '',
          artists: item.artists.map(artist => artist.name).join(", "), // Album Artists


        }));
      } else if (this.selectedType === 'playlist' && data.playlists) {
        this.results = data.playlists.items.map(item => ({
          name: item.name,
          image: item.images[0]?.url || '',
          artists: item.owner.display_name,
          description: "",
          id: item.id,
        }));
      } else if (this.selectedType === 'track' && data.tracks) {
        this.results = data.tracks.items.map(item => ({
          name: item.name,
          image: item.album.images[0]?.url || '',
          artists: item.artists.map(artist => artist.name).join(", "), // Album Artists

        }));
      }
    },
    async loadPlaylistTracks(playlistId, name, imageUrl, description) {
      if(this.selectedType === 'playlist') {
        this.$router.push({
          name: 'PlaylistTable',
          query: {playId: playlistId, name: name, imageUrl: imageUrl, description: description}
        });
      }
    },
  },
};
</script>

<style scoped>
.search-component {
  padding-top: 0px;
  width: 100%;
  height:100%;
  background-color: #1E1E1E;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  box-sizing: border-box;

}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-tags {
  display: flex;
  gap: 15px;
  justify-content: left;
  width: 100%;
  max-width: 100%; /* Limit the max width */
  margin-bottom: 20px; /* Add margin below tags */

}

.search-tags span {
  cursor: pointer;
  width:100px;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: #2E2E2E;
  transition: background-color 0.3s ease;
}

.search-tags span.active {
  background-color: rgba(79, 253, 253, 0.16);
  color: #fff;
}


.search-results h4 {
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.playlist-container {
  margin-top: 0px;
  width: 100%;
  height: calc(100vh - 200px);
  background-color: #1E1E1E;
  color: white;
  padding: 10px;
}


.playlist-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  overflow-y: auto;
}

.playlist-item {
  display: flex;
  align-items: center;
  background-color: #2E2E2E;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  flex-grow: 1;
  overflow-y: auto;
}

.playlist-thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
}

.playlist-details h2 {
  margin: 0;
  font-size: 1.2em;
  color: white;
}


.search-component::-webkit-scrollbar {
  width: 12px;
}

.search-component::-webkit-scrollbar-thumb {
  background-color: #4f4e4e;
  border-radius: 10px;
}

.search-component::-webkit-scrollbar-thumb:hover {
  background-color: #808080;
}

.search-component::-webkit-scrollbar-track {
  background-color: #1E1E1E;
}

p{
  color: white;
}

</style>
