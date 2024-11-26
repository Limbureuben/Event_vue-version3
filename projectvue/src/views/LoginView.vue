<template>
  <div class="container">
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="min-400 shadow rounded-3 p-4 bg-light form-container">
        <div class="mb-3 text-center">
          <img src="../assets/images/logo1.png" alt="Emblem" class="logo-img mb-3" />
        </div>
        <div class="mb-4 text-center">
          <h4 class="fw-bold text-primary">Ardhi University Event System</h4>
        </div>
        <!-- Form Section -->
        <form @submit.prevent="loginUser">
          <div class="row">
            <!-- Username Field -->
            <div class="col-12 mb-3">
              <div class="form-outline mb-4">
                <input
                  type="text"
                  v-model="form.username"
                  :class="{'has-input': form.username !== '', 'empty-input': form.username === ''}"
                  placeholder="Enter Username"
                  class="form-control"
                />
                <small v-if="errors.username" class="text-danger">{{ errors.username }}</small>
              </div>
            </div>
    
            <!-- Password Field -->
            <div class="col-12 mb-3">
              <div class="form-outline mb-4">
                <input
                  type="password"
                  v-model="form.password"
                  :class="{'has-input': form.password !== '', 'empty-input': form.password === ''}"
                  placeholder="Enter Password"
                  class="form-control"
                />
                <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
              </div>
            </div>
            
            <!-- General Error Message -->
            <div class="col-12 mb-3">
              <small v-if="errors.general" class="text-danger">{{ errors.general }}</small>
            </div>
    
            <!-- Submit Button -->
            <div class="col-12 text-end mb-3">
              <button type="submit" class="btn w-100 py-2 fw-bold shadow-sm">
                SIGN IN
              </button>
            </div>
          </div>
        </form>
    
        <!-- Sign Up Link -->
        <div class="text-center">
          <p class="mb-0">
            Don't have an account?
            <router-link to="/signup" class="text-decoration-none text-primary fw-bold">
              Sign up
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <FooterPage />
  </div>
</template>

<script>
import FooterPage from '@/components/FooterPage.vue';
import AuthService from '@/services/authService';
import { useToast } from 'vue-toastification';

export default {
  name: 'LoginView',
  components: {
    FooterPage,
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        alert: null
      },
      errors: {},
    };
  },

  beforeRouteEnter(to, from, next){
    if(to.query.redirectForm){
      next(vm =>{
        vm.alert = 'Sorry have to login first'
      })
    } else {
      next()
    }
  },
  methods: {
    async loginUser() {
      this.errors = {};

      // Validate the form
      if (!this.form.username) {
        this.errors.username = "Username is required";
      }
      if (!this.form.password) {
        this.errors.password = "Password is required";
      }

      // Stop if validation fails
      if (this.errors.username || this.errors.password) {
        const toast = useToast();
        toast.error("Please fill in all fields correctly.");
        return;
      }

      try {
        const response = await AuthService.login(this.form.username, this.form.password);
        const data = response?.data?.data?.loginUser;

        // Handle successful login
        if (data && data.success) {
          const toast = useToast();
          toast.success(data.message);

          // Store tokens in localStorage
          localStorage.setItem("access_token", data.user.accessToken);
          localStorage.setItem("refresh_token", data.user.refreshToken);

          localStorage.setItem('isSuperuser', data.user.isSuperuser)

          // Redirect based on admin status
          if (data.user.isSuperuser) {
            this.$router.push("/dashboard");
          } else {
            this.$router.push("/homepage");
          }
        } else {
          this.errors.general = data?.message || "Username or password is incorrect.";
          const toast = useToast();
          toast.error(this.errors.general);
        }
      } catch (error) {
        console.error("Login error: ", error.response);
        this.errors.general = "Server error occurred. Please try again later.";
        const toast = useToast();
        toast.error(this.errors.general);
      }
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
}

.form-container {
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  overflow: hidden;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
}

.logo-img {
  width: 100px;
  height: auto;
}

h4 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

input {
  border: 1px solid #ccc;
  outline: none;
  box-shadow: none;
  transition: border-color 0.3s ease; /* Smooth transition */
}

/* When the input is focused */
input:focus {
  outline: none;
  border: 1px solid green; /* Green border on focus */
  box-shadow: none;
}

/* When the input has content (user has typed) */


.has-input {
  border: 1px solid rgb(88, 199, 88);
}


.text-danger {
  font-size: 0.875rem;
}

button {
  background-color: lightseagreen;
}

button:hover {
  background-color: rgb(18, 141, 135);
}
</style>
