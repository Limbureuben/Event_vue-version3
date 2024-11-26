<!-- <template>
  <div class="add-event-form">
    <h2 class="form-title">Add New Event</h2>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <input type="text" v-model="eventData.eventUsername" placeholder="Username" required />
      </div>
      <div class="form-group">
        <input type="text" v-model="eventData.eventName" placeholder="Event Name" required />
      </div>
      <div class="form-group">
        <input type="date" v-model="eventData.eventDate" placeholder="Event Date" required />
      </div>
      <div class="form-group">
        <input type="text" v-model="eventData.eventLocation" placeholder="Location" required />
      </div>
      <div class="form-group">
        <label for="eventCategory">Event Category</label>
        <select v-model="eventData.eventCategory" required>
          <option value="" disabled>Select category</option>
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary">Submit</button>
        <button type="button" class="btn-secondary" @click="closeForm">Cancel</button>
      </div>
    </form>
  </div>
</template> -->


<template>
  <div class="overlay" @click="closeForm">
    <div class="add-event-form" @click.stop>
      <h2 class="form-title">Add New Event</h2>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <input type="text" v-model="eventData.eventUsername" placeholder="Username" required />
        </div>
        <div class="form-group">
          <input type="text" v-model="eventData.eventName" placeholder="Event Name" required />
        </div>
        <div class="form-group">
          <input type="date" v-model="eventData.eventDate" placeholder="Event Date" required />
        </div>
        <div class="form-group">
          <input type="text" v-model="eventData.eventLocation" placeholder="Location" required />
        </div>
        <div class="form-group">
          <label for="eventCategory">Event Category</label>
          <select v-model="eventData.eventCategory" required>
            <option value="" disabled>Select category</option>
            <option v-for="category in categories" :key="category.id" :value="category.name">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary">Submit</button>
          <button type="button" class="btn-secondary" @click="closeForm">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import { useToast } from 'vue-toastification'

export default {
  data() {
    return {
      eventData: {
        eventUsername: '',          // Updated to match mutation field
        eventName: '',
        eventDate: '',
        eventLocation: '',
        eventCategory: '',     // Updated to match mutation field
      },
      categories: []
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      const query = `
        query {
          categories {
            id
            name
          }
        }
      `

      try {
        const response = await axios.post('http://localhost:8000/graphql/', { query })
        this.categories = response.data.data.categories
      } catch (error) {
        const toast = useToast()
        toast.error('Failed to fetch categories')
      }
    },
    async submitForm() {
      // Validate required fields before submission
      if (!this.validateForm()) {
        const toast = useToast()
        toast.error('Please fill all the fields')
        
        return
      }

      const mutation = `
        mutation registerEvent($input: EventRegistrationInputObject!) {
          registerEvent(input: $input) {
            message
            event {
              eventCategory
              eventDate
              eventLocation
              eventName
              eventUsername
            }
            success
          }
        }
      `

      const variables = {
        input: {
          eventCategory: this.eventData.eventCategory,
          eventDate: this.eventData.eventDate,
          eventLocation: this.eventData.eventLocation,
          eventName: this.eventData.eventName,
          eventUsername: this.eventData.eventUsername, // updated to match backend
        }
      }

      try {
        console.log('Sending GraphQL request with variables:', variables)
        const response = await axios.post('http://localhost:8000/graphql/', {
          query: mutation,
          variables
        })

        const result = response.data.data.registerEvent
        const toast = useToast()
        toast.success('Registration succesfully', result.message)
        if (result.success) {
          this.closeForm() // Close form if registration is successful
        }
      } catch (error) {
        console.error('Error registering event:', error.response ? error.response.data : error)
        const toast = useToast()
        toast.error('Failed to register try again!')
      }
    },
    validateForm() {
      // Check for required fields
      return (
        this.eventData.eventName &&
        this.eventData.eventDate &&
        this.eventData.eventLocation &&
        this.eventData.eventCategory &&
        this.eventData.eventUsername // Updated validation
      )
    },
    closeForm() {
      this.$emit('close') // Emit close event to parent to hide the form
    }
  }
}
</script>


<style scoped>
/* Overlay background to center the form */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

.add-event-form {
  padding: 20px;
  background-color: #ffffff;
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  text-align: center;
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  font-size: 14px;
  margin-bottom: 5px;
  color: #666;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #1eb1a7;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-primary,
.btn-secondary {
  font-size: 14px;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  width: 48%;
  text-align: center;
}

.btn-primary {
  background-color: #10a9a7;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #078d97;
}

.btn-secondary {
  background-color: #f44336;
  color: white;
  border: none;
}

.btn-secondary:hover {
  background-color: #e53935;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .add-event-form {
    padding: 15px;
    max-width: 90%;
  }

  .form-title {
    font-size: 18px;
  }

  .form-group input,
  .form-group select {
    padding: 8px;
    font-size: 13px;
  }

  .btn-primary,
  .btn-secondary {
    font-size: 12px;
    padding: 8px 12px;
    width: 100%;
    margin-bottom: 10px;
  }

  .form-actions {
    flex-direction: column;
    gap: 10px;
  }
}
</style>