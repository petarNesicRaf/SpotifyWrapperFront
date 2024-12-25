<template>
  <div class="playlist-container">

    <div class="playlist-table">
      <div class="playlist-header">
        <img :src="imageUrl" alt="Playlist Image" class="playlist-image"/>
        <div class="playlist-info">
          <h1>{{ playlistName }}</h1>
          <p>{{ description }}</p>
        </div>
      </div>
      <div v-if="isLoading" class="loading-spinner">
      </div>
      <table v-else>
        <thead>
        <tr>
          <th class="image-td">Cover</th>
          <th class="string-td">Name</th>
          <th class="string-td">Artist</th>
          <th class="string-td">Date Added</th>
          <th class="num-td" @click="sortTable('tempo')">BPM <span v-if="sortKey === 'tempo'">{{ sortOrder }}</span>
          </th>
          <th class="num-td" @click="sortTable('key')" >Key <span v-if="sortKey === 'key'">{{ sortOrder }}</span></th>
          <th class="num-td" @click="sortTable('popularity')">Popularity <span
              v-if="sortKey === 'popularity'">{{ sortOrder }}</span></th>
          <th class="num-td" @click="sortTable('energy')">Energy <span v-if="sortKey === 'energy'">{{
              sortOrder
            }}</span></th>
          <th class="num-td" @click="sortTable('speechiness')">Speechiness <span
              v-if="sortKey === 'speechiness'">{{ sortOrder }}</span></th>
          <th class="num-td" @click="sortTable('loudness')">Loudness <span v-if="sortKey === 'loudness'">{{
              sortOrder
            }}</span></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="track in playlistTracks" :key="track.id">
          <td class="image-td">
            <img :src="track.imageUrl" alt="Track Image"
                 style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;"/>
          </td>
          <td class="string-td">{{ track.name }}</td>
          <td class="string-td">{{ track.artistNames || 'N/A' }}</td> <!-- Assuming you have an album property -->
          <td class="string-td">{{ new Date(track.addedAt).toLocaleDateString() || 'N/A' }}</td>
          <td class="num-td">{{ track.trackFeatures?.tempo || 'N/A' }}</td>
          <td class="num-td" :style="{ color: track.trackFeatures.key.color}">{{ track.trackFeatures?.key.name || 'N/A' }}</td>
          <td class="num-td">{{ track.popularity || 'N/A' }}</td>
          <td class="num-td">{{ track.trackFeatures?.energy || 'N/A' }}</td>
          <td class="num-td">{{ track.trackFeatures?.speechiness || 'N/A' }}</td>
          <td class="num-td">{{ track.trackFeatures?.loudness || 'N/A' }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'PlaylistTable',
  props: ['playId', 'name', 'imageUrl', 'description'],

  data() {
    return {
      playlistTracks: [],
      playlistName: "",
      imageUrl: "",
      description: "",
      isLoading: true,
      sortKey: '', // Currently sorted column
      sortOrder: '↑' // Sort order indicator
    }
  },

  created() {
    const parsedId = this.$route.query.playId
    this.playlistName = this.$route.query.name
    this.imageUrl = this.$route.query.imageUrl
    this.description = this.$route.query.description


    console.log("parsedId", parsedId);
    this.fetchData(parsedId)
  },

  methods: {

    async fetchData(playlistId) {
      let accessToken = localStorage.getItem('access_token');
      try {
        const response = await axios.get(
            `http://localhost:8080/api/v1/playlist/${playlistId}/playlist-tracks`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              }
            }
        );

        // this.playlistTracks = response.data
        const temp = response.data.map(track => ({
          id: track.id || null,
          name: track.name || null,
          artistNames: track.artistNames.join(", ") || [],
          previewUrl: track.previewUrl || null,
          addedAt: track.addedAt || null,
          addedByHref: track.addedByHref || null,
          explicit: track.explicit || null,
          popularity: track.popularity || null,
          imageUrl: track.imageUrl || null,
          trackFeatures: {
            tempo: track.trackFeatures?.tempo || null,
            key: this.mapKeyToPitch(track.trackFeatures?.key) || null,
            mode: track.trackFeatures?.mode || null,
            acousticness: track.trackFeatures?.acousticness.toFixed(1) || null,
            danceability: track.trackFeatures?.danceability.toFixed(1) || null,
            durationMs: track.trackFeatures?.durationMs || null,
            energy: this.normalizeEnergy(track.trackFeatures?.energy) || null,
            instrumentalness: track.trackFeatures?.instrumentalness || null,
            liveness: track.trackFeatures?.liveness || null,
            loudness: this.normalizeLoudness(track.trackFeatures?.loudness) || null,
            speechiness: this.normalizeSpeechiness(track.trackFeatures?.speechiness) || null,
            valence: track.trackFeatures?.valence || null
          },
          local: track.local || null,
          album: track.album || 'N/A' // Ensure album is handled
        }));
        this.playlistTracks = temp
        this.playlistTracks.forEach((track) => console.log(track.previewUrl))

      } catch (error) {
        console.error('Error fetching tracks:', error);
      } finally {
        this.isLoading = false;
      }
    },

    normalizeLoudness(loudness) {
      if (loudness === null || loudness === undefined) return 'N/A';
      // Convert dB to percentage
      const minDb = -60;
      const maxDb = 0;
      const normalized = ((loudness - minDb) / (maxDb - minDb)) * 100;
      return normalized.toFixed(2) + '%';
    },
    normalizeSpeechiness(speechiness) {
      if (speechiness === null || speechiness === undefined) return 'N/A';
      // Convert speechiness to percentage
      const percentage = (speechiness * 100).toFixed(2);
      return percentage + '%';
    },
    normalizeEnergy(energy) {
      if (energy === null || energy === undefined) return 'N/A';
      // Convert energy to percentage
      const percentage = (energy * 100).toFixed(2);
      return percentage + '%';
    },
    sortTable(key) {
      this.sortKey = key;
      this.sortOrder = this.sortOrder === '↑' ? '↓' : '↑'; // Toggle sort order
      const order = this.sortOrder === '↑' ? 1 : -1;

      this.playlistTracks.sort((a, b) => {
        let valA, valB;

        // Special handling for 'key' sorting
        if (key === 'key') {
          valA = a.trackFeatures?.key?.name || 'Unknown';
          valB = b.trackFeatures?.key?.name || 'Unknown';
        } else {
          // Other numeric fields like 'tempo', 'popularity', etc.
          valA = a.trackFeatures?.[key] || a[key] || 0;
          valB = b.trackFeatures?.[key] || b[key] || 0;
        }

        // Normalize values for sorting strings and numbers
        if (typeof valA === 'string') {
          return valA.localeCompare(valB) * order;
        } else {
          return (valA - valB) * order;
        }
      });
    },

    mapKeyToPitch(key) {
      const pitches = [
        { name: 'C', color: '#FF0000' }, // Red
        { name: 'C♯/D♭', color: '#FF7F00' }, // Orange
        { name: 'D', color: '#FFFF00' }, // Yellow
        { name: 'D♯/E♭', color: '#7FFF00' }, // Light Green
        { name: 'E', color: '#00FF00' }, // Green
        { name: 'F', color: '#00FF7F' }, // Spring Green
        { name: 'F♯/G♭', color: '#00FFFF' }, // Cyan
        { name: 'G', color: '#007FFF' }, // Azure
        { name: 'G♯/A♭', color: '#0000FF' }, // Blue
        { name: 'A', color: '#7F00FF' }, // Violet
        { name: 'A♯/B♭', color: '#FF00FF' }, // Magenta
        { name: 'B', color: '#FF007F' } // Rose
      ];

      return key >= 0 && key <= 11 ? pitches[key] : { name: 'Unknown', color: '#808080' }; // Grey for unknown
    },
  },

}
</script>


<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #1E1E1E;
}

.playlist-container {
  width: 100%;
  height: 100vh;
  background-color: #1E1E1E;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
  box-sizing: border-box;
}

.playlist-table {
  width: 100%;
  height: calc(100vh - 135px);
  background-color: #1E1E1E;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  box-sizing: border-box;
}

.playlist-header {
  width: 100%;
  background: linear-gradient(180deg, rgba(21,255,249,1) 0%, rgb(26, 30, 30) 100%);
  color: white;
  display: flex;
  flex-direction: row; /* Changed to column for better responsiveness */
  align-items: center;
  padding: 10px 10px 20px 10px;
  box-sizing: border-box;
}

.playlist-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 20px;
}

.playlist-info {
  text-align: center; /* Center-align text for smaller screens */
}

.loading-spinner {
  border: 8px solid rgba(6, 14, 14, 0.2); /* Light cyan border */
  border-top: 8px solid cyan; /* Cyan top border */
  border-radius: 50%;
  width: 50px; /* Adjust size for smaller screens */
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin 1s linear infinite;
  margin-top: 10%; /* Center it vertically */
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

th {
  text-align: left;
  text-wrap: wrap;
}

.track-image {
  width: 40px; /* Adjust size as needed */
  height: 40px; /* Adjust size as needed */
  border-radius: 5px;
}

.image-td {
  width: 10%; /* Adjust width for better responsiveness */
  padding-left: 4px;
  border-bottom: 1px solid #4f4e4e;
  color: white;
  white-space: nowrap; /* Prevent wrapping to keep table clean */
  overflow: hidden;
}

.string-td, .num-td {
  border-bottom: 1px solid #4f4e4e;
  color: white;
  padding: 8px;
  white-space: nowrap; /* Prevent wrapping to keep table clean */
  overflow: hidden;
}

/* Specific width for string columns */
.string-td {
  width: 20%; /* Adjust width for better responsiveness */
  text-wrap: wrap;
}

/* Specific width for number columns */
.num-td {
  width: 10%; /* Adjust width for better responsiveness */
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #1E1E1E;
  table-layout: fixed;
}

thead th {
  position: sticky;
  top: 0;
  background-color: #1E1E1E;
}

tbody tr:hover {
  background-color: #5d5c5c;
}

/* Custom Scrollbar Styling */
.playlist-table::-webkit-scrollbar {
  width: 12px;
}

.playlist-table::-webkit-scrollbar-thumb {
  background-color: #4f4e4e;
  border-radius: 10px;
}

.playlist-table::-webkit-scrollbar-thumb:hover {
  background-color: #808080;
}

.playlist-table::-webkit-scrollbar-track {
  background-color: #1E1E1E;
}

/* Media Queries for Responsive Design */
@media (max-width: 1200px) {
  .playlist-image {
    width: 100px;
    height: 100px;
  }

  .playlist-info h1 {
    font-size: 1.2em; /* Adjust font size for smaller screens */
  }

  .playlist-info p {
    font-size: 0.9em; /* Adjust font size for smaller screens */
  }

  .image-td {
    width: 15%;
    border-bottom: 1px solid #4f4e4e;
    color: white;
    white-space: nowrap; /* Prevent wrapping to keep table clean */
    overflow: hidden;
  }

  .string-td, .num-td {
    font-size: 0.9em; /* Adjust font size for smaller screens */
  }
}

@media (max-width: 992px) {
  .playlist-image {
    width: 80px;
    height: 80px;
  }

  .playlist-info h1 {
    font-size: 1em; /* Further adjust font size */
  }

  .playlist-info p {
    font-size: 0.8em; /* Further adjust font size */
  }

  .image-td {
    width: 20%;
    border-bottom: 1px solid #4f4e4e;
    color: white;
    white-space: nowrap; /* Prevent wrapping to keep table clean */
    overflow: hidden;
  }

  .string-td, .num-td {
    font-size: 0.8em; /* Further adjust font size */
  }
}

@media (max-width: 768px) {
  .playlist-image {
    width: 60px;
    height: 60px;
  }

  .playlist-info h1 {
    font-size: 0.8em; /* Further adjust font size */
  }

  .playlist-info p {
    font-size: 0.7em; /* Further adjust font size */
  }

  .image-td {
    width: 25%;
  }

  .string-td, .num-td {
    font-size: 0.7em; /* Further adjust font size */
  }
}

@media (max-width: 576px) {
  .playlist-image {
    width: 50px;
    height: 50px;
  }

  .playlist-info h1 {
    font-size: 0.7em; /* Further adjust font size */
  }

  .playlist-info p {
    font-size: 0.6em; /* Further adjust font size */
  }

  .image-td {
    width: 30%;
  }

  .string-td, .num-td {
    font-size: 0.6em; /* Further adjust font size */
  }
}

</style>
