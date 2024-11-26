<template>
  <!-- Section: Design Block -->
  <section class="signup-container">
    <!-- Jumbotron -->
    <div
      class="px-4 py-5 px-md-5 text-center text-lg-start"
      style="background-color: hsl(0, 0%, 96%)"
    >
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <h3 class="my-5 display-4">Ardhi University Events System</h3>
            <img src="../assets/images/logo1.png" alt="Logo" class="logo" />
            <p style="color: hsl(217, 10%, 50.8%)">
              This is an event system for Ardhi University that will be used to manage all the
              events that will be held at Ardhi University. It will be used to organize all the
              events and the data to which the event will be held together with the location where
              the event will be held.
            </p>
          </div>
          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="card">
              <div class="card-body py-5 px-md-5">
                <form @submit.prevent="registerUser">
                  <!-- 2 column grid layout with text inputs for the first and last names -->
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <input
                          type="text"
                          id="form3Example1"
                          v-model="form.username"
                          :class="{
                            'has-input': form.username !== '',
                            'empty-input': form.username === '',
                          }"
                          class="form-control"
                          placeholder="Enter username"
                        />
                        <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <input
                          type="email"
                          id="form3Example11"
                          v-model="form.email"
                          @input="validateEmail"
                          :class="{
                            'has-input': form.email !== '',
                            'empty-input': form.email === ''
                          }"
                          class="form-control"
                          placeholder="Enter email"
                        />
                        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Password input -->
                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example2"
                      v-model="form.password"
                      @input="validatePassword"
                      :class="{
                        'has-input': form.password !== '',
                        'empty-input': form.password === ''
                      }"
                      placeholder="Enter password"
                      class="form-control"
                    />
                    <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                  </div>

                  <!-- Confirm Password input -->
                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example3"
                      @input="validatePassword_confirm"
                      :class="{
                        'has-input': form.password_confirm !== '',
                        'empty-input': form.password_confirm === ''
                      }"
                      v-model="form.password_confirm"
                      placeholder="Confirm Password"
                      class="form-control"
                    />
                    <div v-if="errors.password_confirm" class="text-danger">
                      {{ errors.password_confirm }}
                    </div>
                  </div>

                  <p>
                    Already have an account?
                    <router-link to="/" class="text-decoration-none text-primary fw-bold"
                      >Login</router-link
                    >
                  </p>

                  <!-- Checkbox -->
                  <div class="form-check d-flex justify-content-center mb-4">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example33"
                      checked
                    />
                    <label class="form-check-label" for="form2Example33"
                      >Subscribe to our newsletter</label
                    >
                  </div>

                  <button type="submit" class="btn bg-secondary btn-block mb-4">Sign up</button>

                  <!-- Register buttons -->
                  <div class="text-center">
                    <p>or sign up with:</p>
                    <button type="button" class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-google"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-twitter"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-github"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <FooterPage />
</template>

<script>
import FooterPage from '@/components/FooterPage.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export default {
  name: 'signupView',
  components: {
    FooterPage
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        password_confirm: ''
      },
      errors: {}, // Store validation errors here
      successMessage: '', // Store success message here
      commonPasswords: ['password', '123456', '123456789', 'qwerty', 'abc123', 'letmein'] // Example common passwords
    }
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(this.form.email)) {
        this.errors.email = 'Invalid email format.'
      } else {
        delete this.errors.email
      }
    },

    validatePassword() {
      // Define the pattern for a complex password
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

      if (!passwordPattern.test(this.form.password)) {
        this.errors.password =
          'Password must be at least 8 characters, include an uppercase letter, a number, and a special character.'
      } else if (['12345678', 'password', 'qwerty'].includes(this.form.password)) {
        this.errors.password = 'Password is too common. Please choose a stronger password.'
      } else {
        delete this.errors.password
      }
    },

    validatePassword_confirm() {
      if (this.form.password_confirm !== this.form.password) {
        this.errors.password_confirm = 'Passwords do not match.'
      } else {
        delete this.errors.password_confirm
      }
    },

    async registerUser() {
      this.errors = {} // Clear previous errors
      this.successMessage = '' // Clear previous success message

      // Check for empty fields
      if (
        !this.form.username ||
        !this.form.email ||
        !this.form.password ||
        !this.form.password_confirm
      ) {
        this.errors.general = 'All fields are required'
        const toast = useToast()
        toast.error(this.errors.general)
        return
      }

      // Run validation checks
      this.validateEmail()
      this.validatePassword()
      this.validatePassword_confirm()

      // If there are validation errors, stop the registration process
      if (Object.keys(this.errors).length > 0) {
        const toast = useToast()
        toast.error('Please correct the errors.')
        return
      }

      // Proceed with registration if no errors
      try {
        const response = await axios.post('http://localhost:8000/graphql/', {
          query: `
          mutation {
            registerUser(
              input: {
                username: "${this.form.username}",
                email: "${this.form.email}",
                password: "${this.form.password}",
                passwordConfirm: "${this.form.password_confirm}"
              }
            ) {
              message
              success
              user {
                email
                id
                username
              }
            }
          }
        `
        })

        const { data } = response.data

        // Handle the server response
        if (data.registerUser.success) {
          const toast = useToast()
          toast.success(data.registerUser.message)
          this.$router.push('/')
        } else {
          const toast = useToast()
          toast.error(data.registerUser.message)
        }
      } catch (error) {
        const toast = useToast()
        toast.error('Server error occurred. Please try again.')
      }
    }
  }
}
</script>

<style scoped>
.signup-container {
  position: relative;
  padding: 20px; 
}

.logo {
  width: 100px;
  height: auto; 
  margin: 20px 0; 
}

h3 {
  margin: 20px 0;
  color: #007bff;
  font-size: 2rem; 
}

.form-control {
  font-size: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  box-shadow: none;
  outline: none;
}

.btn {
  width: 100%; 
}

.text-danger {
  font-size: 0.875rem; 
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .signup-container {
    padding: 10px; 
  }

  h3 {
    font-size: 1.5rem; 
  }

  .logo {
    width: 80px;
  }

  .btn {
    width: auto;
  }
}

@media (max-width: 576px) {
  h3 {
    font-size: 1.25rem; 
  }

  .form-control {
    font-size: 0.875rem;
  }
}

.has-input {
  border: 1px solid rgb(88, 199, 88);
}
input {
  transition: border-color 0.1s ease;
}
</style>
