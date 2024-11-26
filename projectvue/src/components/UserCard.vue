<template>
    <div class="user-card">
      <h3>{{ name }}</h3>
      <p><strong>Email:</strong> {{ email }}</p>
      <p><strong>Event ID:</strong> {{ eventId }}</p>
      <button @click="showApplicationDetails" class="btn-details">View Application Details</button>
  
      <!-- Application Details Modal -->
      <ApplicationDetails
        v-if="showDetails"
        :name="name"
        :email="email"
        :eventId="eventId"
        :status="status"
        @close="showDetails = false"
      />
    </div>
  </template>
  
  <script>
  import ApplicationDetails from "./ApplicationDetails.vue";
  
  export default {
    props: {
      name: String,
      email: String,
      eventId: String,
      status: String,
    },
    components: {
      ApplicationDetails,
    },
    data() {
      return {
        showDetails: false,
      };
    },
    methods: {
      showApplicationDetails() {
        this.showDetails = true;
      },
    },
  };
  </script>
  
  <style scoped>
  .user-card {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: left;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .user-card h3 {
    margin-top: 0;
  }
  
  .btn-details {
    padding: 10px 15px;
    font-size: 14px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-details:hover {
    background-color: #0056b3;
  }
  </style>
  