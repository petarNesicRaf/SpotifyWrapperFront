<template>
  <div class="navbar">
    <div class="icon-logo" @click="toggleSidebar">
      <img alt="Menu" src="@/assets/icons/Grouplogo.svg"/>
    </div>

    <div class="profile-img" @click="showDropdown">
      <img alt="Profile" :src="profileImageUrl"/>
      <!-- Dropdown Menu -->
      <div v-if="dropdownVisible" class="dropdown-menu">
        <ul>
          <li @click="viewProfile">View Profile</li>
          <li @click="logout">Logout</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      profileImageUrl: this.getImage(),
      dropdownVisible: false,
    };
  },
  created() {
    this.profileImageUrl = this.getImage();
  },
  mounted() {
    // Hide dropdown when clicking outside
    this.profileImageUrl = this.getImage();
    window.addEventListener('click', this.handleOutsideClick);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleOutsideClick);
  },


  methods: {
    getImage(){
      if(localStorage.getItem('profile_image_url')){
        return localStorage.getItem('profile_image_url');
      }
      console.log("nesto")
      return "/assets/icons/profile.svg"
    },
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
    showDropdown() {
      this.dropdownVisible = !this.dropdownVisible; // Toggle dropdown visibility
    },
    viewProfile() {
      // Handle view profile logic
      alert("View Profile clicked");
    },
    logout() {
      localStorage.clear()
      const sidebar = document.querySelector('.sidebar'); // Assuming you have a sidebar class
      if (sidebar) {
        sidebar.style.transition = 'none'; // Disable transition
      }

      this.$router.push('/')
    },
    handleOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.dropdownVisible = false;
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 60px;
  background-color: #181818;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; /* Ensures the navbar stays on top */
}

.icon-logo {
  cursor: pointer;
}

.icon-logo img {
  width: 36px;
  height: 36px;
}

.title {
  color: #e1e1e1;
  font-size: 24px;
}

.profile-img {
  margin-left: auto; /* Pushes the profile image to the far right */
  position: relative; /* For positioning dropdown */
  cursor: pointer;
}

.profile-img img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

/* Dropdown styles */
.dropdown-menu {
  position: absolute;
  top: 50px; /* Positioned below the profile image */
  right: 0;
  background-color: #181818;
  border: 1px  #2f2f2f;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 150px;
}

.dropdown-menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  padding: 10px;
  color:white;
  cursor: pointer;
  font-size: 16px;
}

.dropdown-menu li:hover {
  background-color: rgba(79, 253, 253, 0.16);
}
</style>
