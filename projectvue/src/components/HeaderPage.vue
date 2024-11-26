<!-- <template>
  <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
    <div class="container">
      <img src="../assets/images/emblem.png" class="navbar-logo" alt="Emblem" />
      <a class="navbar-brand" href="#page-top">Ardhi University</a>
      <button
        class="navbar-toggler text-uppercase font-weight-bold text-white rounded"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item mx-0 mx-lg-1">
         
            <a @click="showProfileModal = true" class="nav-link py-2 px-1" href="#">
              <i class="fas fa-user-circle"></i> Profile
            </a>
          </li>
          <li class="nav-item mx-0 mx-lg-1">
            <button @click="logout" class="btn btn-danger logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>


    <UserProfileModal v-if="showProfileModal" @close="showProfileModal = false" />
  </nav>
</template>


<script>
import UserProfileModal from "@/components/UserProfileModal.vue"; 

export default {
  name: 'HeaderPage',
  components: {
    UserProfileModal
  },
  data() {
    return {
      showProfileModal: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style scoped>
.navbar-nav .fa-user-circle {
  font-size: 1.5rem;
  margin-right: 5px;
}

.dropdown-menu {
  background-color: #f8f9fa; 
  
  border-radius: 5px;
}

.dropdown-item:hover {
  background-color: #e9ecef; 
}

.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: bold;
}

.navbar-logo {
  height: auto; 
  max-width: 100%; 
  width: 50px; 
  margin-right: 20px; 
}

.logo {
  position: absolute;
  top: 10px;
  right: 20px; 
}

.logo-img {
  height: auto; 
  max-width: 100%; 
  width: 50px; 
}


.navbar-nav .nav-link {
  padding: 8px 10px; 
  font-size: 14px; 
}

.navbar-nav .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2); 
  border-radius: 4px; /* Rounded corners */
}


.logout-btn {
  padding: 5px 10px; 
  font-size: 14px; 
}


.navbar-toggler {
  background-color: transparent !important; 
}

/* Media Queries */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column; 
    align-items: center; 
  }

  .logo {
    position: relative; 
    margin-top: 10px; 
  }

  .navbar-nav {
    margin-top: 10px; 
  }

  .navbar-logo,
  .logo-img {
    width: 40px; 
  }
}

@media (max-width: 480px) {
  .navbar-logo,
  .logo-img {
    width: 30px;
  }

  .logout-btn {
    padding: 3px 6px;
    font-size: 12px; 
  }

  .navbar-nav .nav-link {
    font-size: 12px;
  }
}
</style> -->








<!-- 
<template>
  <header class="user-header flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
    <div class="flex items-center space-x-3">
      <img src="../assets/images/emblem.png" alt="Logo" class="logo-img" />
      <h1 class="text-xl font-semibold">Event Management</h1>
    </div>

    <div class="md:hidden">
      <button @click="toggleDropdown" class="text-white focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
    <nav :class="{'hidden': !showDropdown, 'md:flex': true}" class="flex flex-col md:flex-row md:space-x-6">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/contact" class="nav-link">Contact</router-link>
      <button @click="logout" class="nav-link logout-button">Logout</button>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.$router.push({ name: 'login' });
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  },
};
</script>

<style scoped>
.user-header {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo-img {
  width: 28px;
  height: 28px;
  @apply md:w-10 md:h-10;
}

.nav-link {
  transition: color 0.2s;
}

.nav-link:hover {
  color: #a0c4ff;
}

.logout-button {
  background-color: green; /* Green background */
  color: white; /* White text */
  padding: 8px 12px; /* Padding for the button */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor */
  transition: background-color 0.3s ease; /* Smooth background color transition */
}

.logout-button:hover {
  background-color: darkgreen; /* Dark green on hover */
}
</style> -->






<template>
  <nav class="navbar navbar-expand-lg custom-navbar fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="@/assets/images/logo1.png" alt="Logo" class="logo-img" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleNavbar"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" :class="{ show: isNavbarOpen }" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/homepage" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <a href="#" @click.prevent="openProfileModal" class="nav-link">Profile</a>
          </li>
        </ul>
        <button @click="logout" class="btn btn-danger">Logout</button>
      </div>
    </div>
  </nav>

  <!-- Profile Modal -->
  <div v-if="isProfileModalVisible" class="modal-overlay" @click.self="closeProfileModal">
    <div class="modal-content">
      <h3>User Profile</h3>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>

      <!-- Display user profile details -->
      <div v-if="userProfile">
        <p><strong>Username:</strong> {{ userProfile.username }}</p>
        <p><strong>Email:</strong> {{ userProfile.email }}</p>

        <!-- Reset Password Button -->
        <button
          @click="showResetPasswordForm = !showResetPasswordForm"
          class="custom-btn w-full">
          {{ showResetPasswordForm ? 'Cancel Reset Password' : 'Reset Password' }}
        </button>
      </div>

      <!-- Password Reset Form -->
      <div v-if="showResetPasswordForm" class="reset-password-form mt-4">
        <h3>Reset Password</h3>
        <input v-model="oldPassword" placeholder="Old Password" type="password" class="form-control mb-2" />
        <input v-model="newPassword" placeholder="New Password" type="password" class="form-control mb-2" />
        <input v-model="confirmPassword" placeholder="Confirm New Password" type="password" class="form-control mb-2" />
        <button @click="resetPassword" class="btn btn-primary w-100">Reset Password</button>
        <p v-if="resetError" class="error-message text-danger mt-2">{{ resetError }}</p>
      </div>

      <button class="close-btn btn btn-secondary mt-3 w-100" @click="closeProfileModal">Close</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import jwt_decode from 'jwt-decode';  // Make sure jwt-decode is imported

export default {
  data() {
    return {
      isNavbarOpen: false,
      isProfileModalVisible: false,
      userProfile: null,
      loading: false,
      error: null,
      showResetPasswordForm: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      resetError: null,
    };
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
    logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.$router.push({ name: 'login' });
    },
    openProfileModal() {
      this.isProfileModalVisible = true;
      this.fetchUserProfile();
    },
    closeProfileModal() {
      this.isProfileModalVisible = false;
      this.resetForm();
    },
    // Fetch user profile after token validation
    async fetchUserProfile() {
  this.loading = true;
  this.error = null;

  const token = localStorage.getItem('access_token');
  if (!token) {
    this.error = 'No authentication token found. Please log in.';
    this.loading = false;
    return;
  }

  try {
    // Decode the JWT token to inspect its structure
    const decodedToken = jwt_decode(token);
    console.log('Decoded Token:', decodedToken); // Log the token to identify the correct user ID field

    // Look for the user ID in the decoded token
    const userId = decodedToken.id || decodedToken.user_id || decodedToken.sub;  // Adjust this line based on the actual token structure

    if (!userId) {
      this.error = 'User ID not found in token';
      this.loading = false;
      return;
    }

    // Fetch the user profile using the identified user ID
    const response = await axios.post('http://localhost:8000/graphql/', {
      query: `
        query MyQuery($id: ID!) {
          user(id: $id) {
            email
            id
            username
          }
        }
      `,
      variables: {
        id: userId,  // Pass the correct user ID here
      },
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,  // Include the JWT token in the headers
      },
    });

    if (response.data.data.user) {
      this.userProfile = response.data.data.user;
    } else {
      this.error = 'User profile is not available or you are not authenticated';
    }
  } catch (err) {
    console.error('Error fetching user profile:', err);
    this.error = 'Error fetching user profile: ' + (err.response?.data?.message || err.message);
  } finally {
    this.loading = false;
  }
},

    // Reset password functionality
    async resetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.resetError = 'Passwords do not match';
        return;
      }

      try {
        const response = await axios.post('http://localhost:8000/graphql/', {
          query: `
            mutation {
              resetPassword(old_password: "${this.oldPassword}", new_password: "${this.newPassword}", new_password_confirm: "${this.confirmPassword}") {
                success
                message
              }
            }
          `,
        });

        if (response.data.data.resetPassword.success) {
          alert('Password reset successfully');
          this.resetForm();
        } else {
          this.resetError = response.data.data.resetPassword.message;
        }
      } catch (err) {
        this.resetError = 'Error resetting password: ' + err.response?.data?.message;
      }
    },
    // Reset the password form after submission
    resetForm() {
      this.showResetPasswordForm = false;
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.resetError = null;
    },
  },
  created() {
    // Optionally fetch the user profile when the component is created (if necessary)
    if (localStorage.getItem('access_token')) {
      this.fetchUserProfile();
    }
  },
};

</script>


<style scoped>
body {
  background-color: lightseagreen;
}

.custom-navbar {
  background-color: lightseagreen;
}

.nav-link {
  color: #000;
  transition: color 0.3s;
}

.nav-link:hover {
  color: lightseagreen;
  background-color: rgba(255, 255, 255, 0.3);
}

.logo-img {
  width: 40px;
  height: auto;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
}

.reset-password-form {
  margin-top: 20px;
}

.close-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #c82333;
}

.error-message {
  color: red;
  margin-top: 10px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .modal-content {
    width: 90%;
    padding: 15px;
  }

  .form-control {
    font-size: 16px;
  }

  h2, h3 {
    font-size: 1.5rem;
  }

  .btn {
    padding: 8px 15px;
  }
}

.custom-btn {
  background-color: #08a67f; /* Change to your preferred color */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.custom-btn:hover {
  background-color: #08a67f; /* Darker shade on hover */
}

.custom-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(72, 157, 231, 0.5); /* Focus effect */
}
</style>
