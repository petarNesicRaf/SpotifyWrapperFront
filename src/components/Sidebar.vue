<template>
  <div :class="{hidden: !isVisible}" class="sidebar">
    <!--    <div class="icon-logo">-->
    <!--      <img src="@/assets/icons/logo.svg" alt="Logo" />-->
    <!--    </div>-->
    <div class="icon" @click="goToSearch">
      <img alt="Search" src="@/assets/icons/searchicon.svg" class = "image-fluid"/>
    </div>
    <div class="icon" @click="goToHome">
      <img alt="Home" src="@/assets/icons/playwhite.svg"/>
    </div>
    <div class="icon">
      <img alt="User" src="@/assets/icons/User.svg"/>
    </div>
    <div class="icon">
      <img alt="Save" src="@/assets/icons/Save.svg"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isVisible: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    goToHome() {
      const access = localStorage.getItem("access_token");

      this.$router.push({
        name: 'Home',
        query: {access_token: access}
      },);
    },
    goToSearch(){
      this.$router.push({name:'SearchComponent'})
    }
  }
};
</script>

<style scoped>
html, body {
  background-color: #1E1E1E;
}

.sidebar {
  width: 5.2%;
  height: 100vh;
  background-color: #181818;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px; /* Padding to account for the navbar */
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
}

.sidebar.hidden {
  transform: translateX(-100%);
}



@media (max-width: 992px) {
  .sidebar {
    width: 6%;
    padding-top: 60px; /* Adjust padding if needed */
  }

  .icon img {
    width: 20px; /* Further reduce icon size */
    height: 20px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 6%;
    padding-top: 60px; /* Further adjust padding */
  }

  .icon img {
    width: 18px; /* Further reduce icon size */
    height: 18px;
  }
}

@media (max-width: 576px) {
  .sidebar {
    width: 6%;
    padding-top: 60px; /* Further adjust padding */
  }

  .icon img {
    width: 16px; /* Further reduce icon size */
    height: 16px;
  }
}

.icon {
  margin: 16px 0; /* Adjust margin for smaller screens */
}

.icon-logo img {
  width: 24px; /* Adjust size of logo image */
  height: 24px;
}

.icon img {
  width: 28px; /* Adjust default size of icons */
  height: 28px;
}

.icon:hover img {
  opacity: 0.7;
}
</style>
