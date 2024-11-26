<!-- <template>
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
            <router-link to="#" class="nav-link">Profile</router-link>
          </li>
        </ul>
        <button @click="logout" class="btn btn-danger">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isNavbarOpen: false, // Track navbar state
    };
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen; // Toggle the state on click
    },
    logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style scoped>
body {
  background-color: lightseagreen; /* Set background color for body */
}

.custom-navbar {
  background-color: lightseagreen; /* Set navbar background color */
}

.nav-link {
  color: #000; /* Default link color */
  transition: color 0.3s; /* Smooth transition for hover */
}

.nav-link:hover {
  color: lightseagreen; /* Change color on hover */
  background-color: rgba(255, 255, 255, 0.3); /* Light background on hover */
}

.logo-img {
  width: 40px; /* Adjust logo size */
  height: auto;
}

.navbar {
  padding: 1rem; /* Adjust padding for navbar */
}

/* Custom styles for the navbar toggler */
.navbar-toggler {
  border: none; /* Remove border */
  outline: none; /* Remove outline */
}

.navbar-toggler:focus {
  box-shadow: none; /* Remove the focus shadow */
}

.navbar-toggler-icon {
  width: 30px; /* Set width of the icon */
  height: 3px; /* Set height for the lines */
  background-color: #000; /* Change color of the lines */
}

.navbar-toggler-icon::before,
.navbar-toggler-icon::after {
  content: '';
  display: block;
  width: 30px; /* Set width of the icon */
  height: 3px; /* Set height for the lines */
  background-color: #000; /* Change color of the lines */
  margin: 6px 0; /* Space between lines */
}
</style>
 -->


















 




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
      resetSuccessMessage: null, 
    }
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
      this.resetError = null; // Clear previous error messages
      this.resetSuccessMessage = null; // Clear previous success messages
      
      // Input validation
      if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
        this.resetError = "All fields are required.";
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        this.resetError = "New passwords do not match.";
        return;
      }

      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.post('http://localhost:8000/graphql/', {
          query: `
          mutation MyMutation {
          resetPassword(input: {newPassword: "", newPasswordConfirm: "", oldPassword: ""}) {
            message
            success
          }
        }

          `,
          variables: {
            input: {
              oldPassword: this.oldPassword,
              newPassword: this.newPassword,
              newPasswordConfirm: this.confirmPassword,
            },
          },
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = response.data.data?.resetPassword;
        if (result && result.success) {
          this.resetSuccessMessage = result.message;
          this.resetForm(); // Reset form fields after success
        } else {
          this.resetError = result ? result.message : 'An unexpected error occurred';
        }
      } catch (err) {
        this.resetError = 'Error resetting password: ' + err.message;
        console.error('Error resetting password:', err);
      }
    },
    
    resetForm() {
      this.showResetPasswordForm = false;
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.resetError = null;
      this.resetSuccessMessage = null;
    },
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
  background-color: rgb(172, 20, 20);
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: rgb(162, 29, 11);
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
  background-color: #23c7d0; /* Change to your preferred color */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.custom-btn:hover {
  background-color: #26b19f; /* Darker shade on hover */
}

.custom-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(72, 157, 231, 0.5); /* Focus effect */
}
</style>



