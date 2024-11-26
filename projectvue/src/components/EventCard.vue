<template>
  <div class="event-card">
    <h3>{{ event.title }}</h3>
    <p>Date: {{ event.date }}</p>
    <p>Location: {{ event.location }}</p>
    <button class="btn-register" @click="showForm = !showForm">
      Register
    </button>

    <!-- Registration form as a modal -->
    <transition name="fade">
      <div v-if="showForm" class="modal-overlay">
        <div class="modal-content">
          <h3>Register for {{ event.title }}</h3>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <input type="text" id="name" v-model="form.name" placeholder="Enter name" required />
            </div>
            <div class="form-group">
              <input type="email" id="email" v-model="form.email" placeholder="Enter email" required />
            </div>
            <div class="form-group">
              <input type="date" id="date" v-model="form.date" required />
            </div>
            <div class="form-group">
              <input type="location" id="email" v-model="form.location" placeholder="Enter location" required />
            </div>
            <div class="form-group">
              <textarea id="comments" v-model="form.comments" rows="4" placeholder="Enter comment" required></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-submit">Submit</button>
              <button type="button" class="btn-cancel" @click="closeForm">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props: {
    event: Object,
  },
  data() {
    return {
      showForm: false,
      form: {
        name: '',
        email: '',
        comments: '', // New field for comments
      },
    };
  },
  methods: {
    submitForm() {

      alert(`You have registered for ${this.event.title}!`);
      this.showForm = false;
    },
    closeForm() {
      this.showForm = false;
    },
  },
};
</script>

<style scoped>
/* Event Card Styles */
.event-card {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 14px;
}

.event-card h3 {
  font-size: 16px;
  margin-bottom: 5px;
}

.event-card p {
  margin: 4px 0;
}

/* Button Styles */
.btn-register {
  background-color: lightseagreen;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}


/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 500px; /* Increased width */
  position: relative;
}

/* Form Group Styles */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group textarea {
  resize: none; /* Prevent resizing of textarea */
}

/* Form Actions: Submit and Cancel Buttons */
.form-actions {
  display: flex;
  justify-content: space-between; /* Space between the buttons */
}

.btn-submit,
.btn-cancel {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-submit {
  background-color: lightseagreen;
  color: white;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: lightseagreen;
}

.btn-cancel {
  background-color: #ff4d4f;
  color: white;
  transition: background-color 0.3s;
}

.btn-cancel:hover {
  background-color: #d9363e;
}

/* Transition for modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
