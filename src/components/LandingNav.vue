<template>
  <nav class="navbar">
    <div class="navbar-left">
      <!--      <h1 class="logo">MyApp</h1>-->
    </div>
    <div class="navbar-right">
      <a class="nav-link" href="#">FAQ</a>
      <a class="nav-link" href="#">About</a>
      <button class="login-button" @click="loginWithSpotify">Log In</button>
    </div>

  </nav>
</template>

<script>
import axios from "axios";

export default {
  name: 'LandingNav',
  methods: {
    async loginWithSpotify() {
      try {
        // Request the Spotify authorization URL from the backend
        const response = await axios.get('http://localhost:8080/api/v1/auth/login', {
          withCredentials: true // Include credentials (cookies) in the request
        });

        // Redirect to Spotify
        window.location.href = response.data;
      } catch (error) {
        console.error('Error during login request:', error);
      }
    }
  }
}
</script>
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #1f1f1f;
  color: white;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  margin-right: 20px;
  font-size: 16px;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  color: cyan; /* Light blue color on hover */
}

.nav-link:hover::after {
  background-color: cyan; /* Light blue underline on hover */
}

.login-button {
  padding: 8px 16px;
  background-color: darkcyan;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 4px;
}

.login-button:hover {
  background-color: cyan; /* Darker blue on hover */
}
</style>