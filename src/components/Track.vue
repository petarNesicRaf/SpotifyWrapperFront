<template>
  <div class="track">
    <div class="wave">
      <img :src="waveFormImage" alt="WaveForm Image" class="waveform-image"/>
    </div>
    <h1>Track Page</h1>
    <p>Welcome to the home page!</p>
  </div>
</template>

<script>
import waveForm from '@/assets/icons/wave.svg'; // Replace with your image path

export default {
  name: 'Track',
  data() {
    return {waveFormImage: waveForm}
  }
};
</script>

<style scoped>
.track {
  width: 100%;
  height: 100%;
  background-color: #313131;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  box-sizing: border-box;
}

.wave {
  background-color: #1E1E1E;
  width: 100%;
  display: flex;
  height: 100%;
  padding: 0;
  margin-bottom: 18%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

}

.waveform-image {
  justify-content: center;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
}
</style>
