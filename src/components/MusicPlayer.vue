<template>
  <div class="music-player">
    <div class="controls-container">
      <div class="now-playing">
        <img :src="albumArt" alt="Album Art" class="album-art" />
        <div class="song-info">
          <span class="song-title">{{ songTitle }}</span>
          <br />
          <span class="artist-name">{{ artistName }}</span>
        </div>
      </div>

      <div class="player-controls">
        <button @click="prevSong">
          <img alt="Previous" src="@/assets/icons/prevprevwh.svg" />
        </button>
        <button @click="togglePlayPause">
          <img :src="playPauseIcon" alt="Play/Pause" />
        </button>
        <button @click="nextSong">
          <img alt="Next" src="@/assets/icons/nextnextwh.svg" />
        </button>
      </div>
    </div>

    <div class="progress-container">
      <span class="current-time">{{ formatTime(currentTime) }}</span>
      <input
          v-model="currentTime"
          :max="duration"
          min="0"
          type="range"
          @input="seek"
      />
      <span class="duration">{{ formatTime(duration) }}</span>
    </div>

    <div class="volume-container">
      <img alt="Volume" class="volume-icon" src="@/assets/icons/soundwh.svg" />
      <input
          v-model="volume"
          max="100"
          min="0"
          type="range"
          @input="adjustVolume"
      />
    </div>
  </div>
</template>

<script>
import playIcon from "@/assets/icons/playwh.svg";
import pauseIcon from "@/assets/icons/pausewh.svg";
import albumArtImage from "@/assets/icons/monk.jpg";

export default {
  name: "MusicPlayer",
  data() {
    return {
      isPlaying: true,
      currentTime: 0,
      duration: 180, // Example song duration in seconds
      volume: 50, // Default volume level
      songTitle: "Song Title",
      artistName: "Artist Name",
      albumArt: albumArtImage,
    };
  },
  computed: {
    playPauseIcon() {
      return this.isPlaying ? pauseIcon : playIcon;
    },
  },
  methods: {
    togglePlayPause() {
      this.isPlaying = !this.isPlaying;
    },
    prevSong() {
      this.currentTime = 0;
    },
    nextSong() {
      this.currentTime = 0;
    },
    seek() {},
    adjustVolume() {},
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    },
  },
};
</script>

<style scoped>
.music-player {
  width: 100%;
  height: 80px;
  background-color: #181818;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  z-index: 1000;
}

.now-playing {
  display: flex;
  align-items: center;
  position: absolute;
  left: 14px;
  margin-top: 30px;
}

.controls-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.player-controls {
  display: flex;
  align-items: center;
}

.player-controls button {
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 10px;
}

.player-controls img {
  width: 20px;
  height: 20px;
}

.progress-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin-top: 2px;
}

.current-time,
.duration {
  color: white;
  font-size: 12px;
  margin: 0 10px;
}

input[type="range"] {
  flex: 1;
  -webkit-appearance: none;
  height: 5px;
  background: #535353;
  border-radius: 5px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}

.volume-container {
  display: flex;
  align-items: center;
  position: absolute;
  right: 20px;
  bottom: 10px;
}

.volume-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.volume-container input[type="range"] {
  width: 100px;
}

.album-art {
  width: 58px;
  height: 58px;
  border-radius: 5px;
  margin-right: 10px;
}

.song-info {
  color: white;
  margin-top: 0px;
  padding: 2px;
  flex-direction: column;
}

.song-title {
  font-size: 14px;
  font-weight: bold;
}

.artist-name {
  font-size: 12px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .album-art {
    display: none;
  }
  .music-player{
    padding: 20px 18px;
  }

  .player-controls img {
    width: 18px;
    height: 18px;
  }

  .volume-icon {
    display: none;
  }

  .volume-container input[type="range"] {
    display: none;
  }

  .progress-container input[type="range"] {
  }
  .progress-container{
    width: 100%;
  }

  .current-time,
  .duration {
    font-size: 10px;
  }

  .song-title {
    font-size: 12px;
    font-weight: bold;
    margin: 0px;
    padding: 0px;

  }

  .artist-name {
    display:none;
  }
  .song-info {
    color: white;
    padding-bottom: 40px;
    flex-direction: column;
    margin:0px;
    display: flex; /* Ensure it stacks vertically */

  }
}

@media (max-width: 480px) {
  .album-art {
    display: none;
  }
  .music-player{
    padding: 20px 18px;
  }

  .player-controls img {
    width: 18px;
    height: 18px;
    margin-bottom: 10px;
  }

  .volume-icon {
    display: none;
  }

  .volume-container input[type="range"] {
    display: none;
  }

  .progress-container input[type="range"] {
  }
  .progress-container{
    width: 100%;
  }

  .current-time,
  .duration {
    font-size: 10px;
  }

  .song-title {
    font-size: 12px;
    font-weight: bold;
    margin: 0px;
    padding: 0px;

  }

  .artist-name {
    display:none;
  }
  .song-info {
    color: white;
    padding-bottom: 40px;
    flex-direction: column;
    margin:0px;
    display: flex; /* Ensure it stacks vertically */

  }
}
</style>
