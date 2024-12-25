<template>

  <div class="landing">
    <LandingNav/>
    <div class="banner">
      <div class="text">
        <h1 class="landing-header">Welcome to Your Music World</h1>
        <p class="landing-description">Discover your favorite tracks, curated playlists, and the best beats all in one place. Let the music play!</p>
      </div>
    </div>

    <!-- Steps Section -->
    <div class="steps-section">
      <div class="step">
        <img class="step-icon" src="@/assets/icons/spotify-svg.svg" alt="Log In Icon"/>
        <h3 class="step-title">Log in With Spotify</h3>
        <p class="step-description">Connect your Spotify account to start analyzing your music data effortlessly.</p>
      </div>
      <div class="step">
        <img class="step-icon" src="@/assets/icons/playlist-svg.svg" alt="Playlists Icon"/>
        <h3 class="step-title">View Your Playlists</h3>
        <p class="step-description">Browse through your playlists and see all your favorite tracks in one place.</p>
      </div>
      <div class="step">
        <img class="step-icon" src="@/assets/icons/eq-svg.svg" alt="Analyze Icon"/>
        <h3 class="step-title">Analyze Your Tracks</h3>
        <p class="step-description">Dive deep into your listening habits and get detailed insights into your favorite tracks.</p>
      </div>
    </div>

    <!-- Scrollable Content Section -->
    <div class="first-scrollable-content">
      <section class="section">
        <h2>Explore Features</h2>
        <p>Detailed Music Insights: Gain a deeper understanding of your listening patterns, favorite genres, and artist preferences. Our analysis reveals trends and patterns in your music library, helping you discover new favorites and track your listening evolution.
          Personalized Recommendations: Based on your music taste, receive curated recommendations tailored specifically to your preferences.</p>
      </section>
      <section class="section-image"> </section>
    </div>
  </div>
</template>

<script>
import LandingNav from "@/components/LandingNav.vue";

export default {
  name: 'LandingPage',
  components: {
    LandingNav,
  }
};
</script>

<style scoped>
.landing {
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background: #1f1f1f;
}

/* Banner Section */
.banner {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh; /* Full screen height */
}

.text {
  width: 100%; /* Adjust width as needed */
  padding: 40px;
  color: white;
  background-color: #1f1f1f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  /*background: linear-gradient(225deg, #1f1f1f, #1f1f1f, #008080); /* Exotic cyan gradient */
  background-image: url('@/assets/wtf-gray.png');
  background-size: cover;
  height: 100vh;
}

.landing-header {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 5px;
  color: cyan; /* Custom color for the header */
}

.landing-description {
  font-size: 20px;
  line-height: 1.6;
  color: #f5f5f5; /* Custom color for the description */
  max-width: 600px;
  font-weight: bold;
}


/* Scrollable Content Section */
.first-scrollable-content {
  background-color: #1f1f1f; /* Background color for scrollable content */
  color: #f5f5f5; /* Light gray text */
  padding-left: 50px;
  padding-right: 20px;
  padding-top:0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0px;
  /* Make sure this takes up remaining space and allows scrolling */
  box-sizing: border-box;
  margin-top: 0px;
}

.section {
  background-color: #383838; /* Slightly lighter dark gray */
  padding: 40px;
  border-radius: 8px;
  width: 80%; /* Adjust width as needed */
  max-width: 800px;
  text-align: left;

}
.section-image{
  background-color: #1f1f1f; /* Slightly lighter dark gray */
  padding: 300px;
  border-radius: 8px;
  background-image: url('@/assets/icons/simplebg.png'); /* Replace with your image path */
  background-size: cover;  width: 80%; /* Adjust width as needed */
  width: 500px;
  height: 100px;
  text-align: center;
}

.section h2 {
  font-size: 2rem;
  margin: 0;
  color: #00b3b3; /* Cyan */
}

.section p {
  font-size: 1.2rem;
  margin-top: 10px;
}

.steps-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 40px;
  background-color: #1f1f1f; /* Background color for steps section */
}

.step {
  background-color: #383838; /* Slightly lighter dark gray */
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 30%; /* Adjust width as needed */
}

.step-icon {
  width: 60px; /* Adjust icon size as needed */
  height: 60px;
  margin-bottom: 10px;
}

.step-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #00b3b3; /* Cyan */
}

.step-description {
  font-size: 1rem;
  color: #f5f5f5;
}

/* Custom Scrollbar Styling */
.landing::-webkit-scrollbar {
  width: 12px;
}

.landing::-webkit-scrollbar-thumb {
  background-color: #4f4e4e;
  border-radius: 10px;
}

.landing::-webkit-scrollbar-thumb:hover {
  background-color: #808080;
}

.landing::-webkit-scrollbar-track {
  background-color: #1E1E1E;
}
</style>
