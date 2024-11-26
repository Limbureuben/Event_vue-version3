<!-- <template>
    <div class="user-actions">
      <div class="actions-buttons">
        <button @click="toggleForm" class="btn-primary">
          {{ showForm ? 'Close Form' : 'Add Event' }}
        </button>
        <button @click="viewRegistrations" class="btn-secondary">View Events</button>
      </div>
  
      <transition name="fade">
        <div v-if="showForm" class="form-overlay">
          <div class="form-content">
            <AddEventForm @close="closeForm" />
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import AddEventForm from "@/components/AddEventForm.vue";
  
  export default {
    components: {
      AddEventForm,
    },
    data() {
      return {
        showForm: false,
      };
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
      },
      closeForm() {
        this.showForm = false;
      },
      viewRegistrations() {
        console.log('View Registrations button clicked');
      },
    },
  };
  </script>
  
  <style scoped>
  .user-actions {
    padding: 20px;
  }
  
  .section-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .actions-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .btn-primary, .btn-secondary {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .form-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
   -->



   <!-- <template>
    <div class="user-actions">
      <div class="actions-buttons">
        <button @click="toggleForm" class="btn-primary">
          {{ showForm ? 'Close Form' : 'Add Event' }}
        </button>
        <button @click="toggleEventList" class="btn-secondary">View Events</button>
        <button @click="toggleUserList" class="btn-secondary">View Application</button>
      </div>

      <transition name="fade">
        <div v-if="showForm" class="form-overlay">
          <div class="form-content">
            <AddEventForm @close="closeForm" />
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="showEventList" class="form-overlay">
          <div class="form-content">
            <EventList :events="events" @close="closeEventList" />
          </div>
        </div>
      </transition>
  
      <transition name="fade">
        <div v-if="showUserList" class="form-overlay">
          <div class="form-content">
            <h4>Registered Users</h4>
            <ul>
              <li v-for="user in registeredUsers" :key="user.id">
                <span @click="fetchApplicationDetails(user)" class="user-link">{{ user.name }}</span>
              </li>
            </ul>
            <button @click="closeUserList" class="btn-secondary">Close</button>
          </div>
        </div>
      </transition>

      <transition name="fade">
  <div v-if="showUserList" class="form-overlay">
    <div class="form-content">
      <h4>Registered Users</h4>
      <table class="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in registeredUsers" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="fetchApplicationDetails(user)" class="view-details-btn">
                View Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="closeUserList" class="btn-secondary">Close</button>
    </div>
  </div>
</transition>

    </div>
  </template>
  
  <script>
  import axios from "axios";
  import AddEventForm from "@/components/AddEventForm.vue";
  import EventList from "@/components/EventList.vue";
  
  export default {
    components: {
      AddEventForm,
      EventList,
    },
    data() {
      return {
        showForm: false,
        showEventList: false,
        showUserList: false,
        showApplicationDetails: false,
        selectedUser: {},
        selectedApplication: {},
        events: [
          { id: 1, name: "Event 1" },
          { id: 2, name: "Event 2" },
          { id: 3, name: "Event 3" },
        ],
        registeredUsers: [], // Populated from backend
      };
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
      },
      closeForm() {
        this.showForm = false;
      },
      toggleEventList() {
        this.showEventList = !this.showEventList;
      },
      closeEventList() {
        this.showEventList = false;
      },
      toggleUserList() {
        this.showUserList = !this.showUserList;
      },
      closeUserList() {
        this.showUserList = false;
      },
      async fetchRegisteredUsers() {
        const query = `
          query {
            allApplication {
              name
              email
            }
          }
        `;
        try {
          const response = await axios.post("http://localhost:8000/graphql/", {
            query,
          });
          this.registeredUsers = response.data.data.allApplication;
        } catch (error) {
          console.error("Error fetching registered users:", error);
        }
      },
      async fetchApplicationDetails(user) {
        this.selectedUser = user;
        const query = `
          query {
            allApplication {
              email
              eventId
              name
              status
            }
          }
        `;
        try {
          const response = await axios.post("http://localhost:8000/graphql/", {
            query,
          });
          const application = response.data.data.allApplication.find(
            (app) => app.name === user.name
          );
          if (application) {
            this.selectedApplication = application;
            this.showApplicationDetails = true;
          } else {
            alert("No application details found for this user.");
          }
        } catch (error) {
          console.error("Error fetching application details:", error);
        }
      },
      closeApplicationDetails() {
        this.showApplicationDetails = false;
        this.selectedApplication = {};
      },
    },
    async mounted() {
      await this.fetchRegisteredUsers(); // Fetch registered users on component mount
    },
  };
  </script>
  
  <style scoped>
  .user-actions {
    padding: 20px;
  }
  
  .actions-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .btn-primary, .btn-secondary {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .form-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
  }
  
  .user-link {
    cursor: pointer;
    color: #007bff;
    text-decoration: underline;
  }
  
  .user-link:hover {
    color: #0056b3;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th, .user-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.user-table tr:hover {
  background-color: #f1f1f1;
}

.view-details-btn {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

.view-details-btn:hover {
  background-color: #0056b3;
}

  </style> -->







  <!-- <template>
    <div class="user-actions">
      <div class="actions-buttons">
        <button @click="toggleForm" class="btn-primary">
          {{ showForm ? 'Close Form' : 'Add Event' }}
        </button>
        <button @click="toggleEventList" class="btn-secondary">Events</button>
        <button @click="toggleUserList" class="btn-secondary">Applications</button>
      </div>
  
      <transition name="fade">
        <div v-if="showForm" class="form-overlay">
          <button @click="closeForm" class="close-btn">✕</button>
          <AddEventForm @close="closeForm" />
        </div>
      </transition>
  
      <transition name="fade">
        <div v-if="showEventList" class="form-overlay">
          <div class="form-content centered">
            <button @click="closeEventList" class="close-btn">✕</button>
            <EventList :events="events" @close="closeEventList" />
          </div>
        </div>
      </transition>
  

      <transition name="fade">
        <div v-if="showUserList" class="form-overlay">
          <div class="form-content centered">
            <button @click="closeUserList" class="close-btn">✕</button>
            <h5 class="table-heading">Event Applications</h5>
            <div class="table-container">
              <table class="user-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in registeredUsers" :key="user.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                      <span
                        @click="fetchApplicationDetails(user)"
                        class="action-icon view-icon"
                        title="View Details"
                      >
                        👁️
                      </span>
                      <span
                        @click="deleteUser(user)"
                        class="action-icon delete-icon"
                        title="Delete User"
                      >
                        🗑️
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </transition>
  
      <transition name="fade">
        <div v-if="showApplicationDetails" class="form-overlay">
          <div class="form-content centered details-content">
            <button @click="closeApplicationDetails" class="close-btn">✕</button>
            <h3>User Details</h3>
            <div class="details-container">
              <p><strong>Name:</strong> {{ selectedApplication.name }}</p>
              <p><strong>Email:</strong> {{ selectedApplication.email }}</p>
              <p><strong>Status:</strong> {{ selectedApplication.status }}</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import AddEventForm from "@/components/AddEventForm.vue";
  import EventList from "@/components/EventList.vue";
  
  export default {
    components: {
      AddEventForm,
      EventList,
    },
    data() {
      return {
        showForm: false,
        showEventList: false,
        showUserList: false,
        showApplicationDetails: false,
        selectedUser: {},
        selectedApplication: {},
        events: [
          { id: 1, name: "Event 1" },
          { id: 2, name: "Event 2" },
          { id: 3, name: "Event 3" },
        ],
        registeredUsers: [],
      };
    },
    methods: {
      toggleForm() {
        this.showForm = !this.showForm;
        this.showEventList = false;
        this.showUserList = false;
        this.showApplicationDetails = false;
      },
      closeForm() {
        this.showForm = false;
      },
      toggleEventList() {
        this.showEventList = !this.showEventList;
        this.showForm = false;
        this.showUserList = false;
        this.showApplicationDetails = false;
      },
      closeEventList() {
        this.showEventList = false;
      },
      toggleUserList() {
        this.showUserList = !this.showUserList;
        this.showForm = false;
        this.showEventList = false;
        this.showApplicationDetails = false;
      },
      closeUserList() {
        this.showUserList = false;
      },
      async fetchRegisteredUsers() {
        const query = `
          query {
            allApplication {
              name
              email
            }
          }
        `;
        try {
          const response = await axios.post("http://localhost:8000/graphql/", {
            query,
          });
          this.registeredUsers = response.data.data.allApplication;
        } catch (error) {
          console.error("Error fetching registered users:", error);
        }
      },
      async fetchApplicationDetails(user) {
        this.selectedUser = user;
        const query = `
          query {
            allApplication {
              email
              name
              status
            }
          }
        `;
        try {
          const response = await axios.post("http://localhost:8000/graphql/", {
            query,
          });
          const application = response.data.data.allApplication.find(
            (app) => app.name === user.name
          );
          if (application) {
            this.selectedApplication = application;
            this.showApplicationDetails = true;
            this.showUserList = false;
          } else {
            alert("No application details found for this user.");
          }
        } catch (error) {
          console.error("Error fetching application details:", error);
        }
      },
      closeApplicationDetails() {
        this.showApplicationDetails = false;
        this.selectedApplication = {};
        this.showUserList = true;
      },
      deleteUser(user) {
        alert(`Delete user: ${user.name}`);
      },
    },
    async mounted() {
      await this.fetchRegisteredUsers();
    },
  };
  </script>
  
  <style scoped>
  .user-actions {
    padding: 20px;
  }
  
  .actions-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .form-content.centered {
    position: relative;
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .details-content {
    max-width: 400px; /* Smaller display for user details */
  }

  .user-table td {
  word-wrap: break-word; /* Ensure long content doesn't overflow */
  white-space: normal;
}
  
  .table-heading {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
  }
  
  .table-container {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: auto;
  width: 100%; /* Ensure the container spans the full width */
}
  
.user-table {
  width: 100%; /* Ensure the table spans the full width of the container */
  border-collapse: collapse;
  margin-top: 10px;
  background-color: #ffffff;
  table-layout: auto; /* Allow columns to resize based on content */
}


.user-table th,
.user-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table td {
  word-wrap: break-word; /* Ensure long content doesn't overflow */
  white-space: normal;
}
  
.user-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 10;
}

.user-table th:nth-child(2),
.user-table td:nth-child(2) {
  min-width: 200px; /* Ensures name column is wide enough */
}

.user-table th:nth-child(3),
.user-table td:nth-child(3) {
  min-width: 250px; /* Ensures email column is wide enough */
}

  .action-icon {
    cursor: pointer;
    font-size: 18px;
    padding: 5px;
    margin-right: 8px;
  }
  
  .view-icon:hover {
    color: #0056b3;
  }
  
  .delete-icon:hover {
    color: #c82333;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #333;
  }
  
  .details-container p {
    font-size: 16px;
    margin: 8px 0;
  }
  
  @media (max-width: 600px) {
    .user-table th,
    .user-table td {
      padding: 8px;
      font-size: 14px;
    }
  
    .btn-primary,
    .btn-secondary {
      font-size: 14px;
      padding: 8px 16px;
    }
  }
  </style>
   -->
  
  
   <template>
    <div class="user-actions">
      <div class="actions-buttons">
        <button @click="toggleForm" class="btn-primary">
          {{ showForm ? 'Close Form' : 'Add Event' }}
        </button>
        <button @click="toggleEventList" class="btn-secondary">Events</button>
        <button @click="toggleUserList" class="btn-secondary">Applications</button>
      </div>
  
      <!-- Add Event Form -->
      <transition name="fade">
        <div v-if="showForm" class="form-overlay">
          <button @click="closeForm" class="close-btn">✕</button>
          <AddEventForm @close="closeForm" />
        </div>
      </transition>
  
      <!-- Event List -->
      <transition name="fade">
        <div v-if="showEventList" class="form-overlay">
          <div class="form-content centered">
            <button @click="closeEventList" class="close-btn">✕</button>
            <EventList :events="events" @close="closeEventList" />
          </div>
        </div>
      </transition>
  
      <!-- Applications List -->
      <transition name="fade">
        <div v-if="showUserList" class="form-overlay">
          <div class="form-content centered">
            <button @click="closeUserList" class="close-btn">✕</button>
            <h5 class="table-heading">Event Applications</h5>
            <div class="table-container">
              <table class="user-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in registeredUsers" :key="user.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                      <span
                        @click="fetchApplicationDetails(user)"
                        class="action-icon view-icon"
                        title="View Details"
                      >
                        <i class="fas fa-eye"></i> <!-- Font Awesome Eye Icon -->
                      </span>
                      <span
                        @click="deleteUser(user)"
                        class="action-icon delete-icon"
                        title="Delete User"
                      >
                        <i class="fas fa-trash-alt"></i> <!-- Font Awesome Trash Icon -->
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </transition>
  
      <!-- User Details View -->
      <transition name="fade">
        <div v-if="showApplicationDetails" class="form-overlay">
          <div class="form-content centered details-content">
            <button @click="closeApplicationDetails" class="close-btn">✕</button>
            <h3>User Details</h3>
            <div class="details-container">
              <p><strong>Name:</strong> {{ selectedApplication.name }}</p>
              <p><strong>Email:</strong> {{ selectedApplication.email }}</p>
              <p><strong>Status:</strong> {{ selectedApplication.status }}</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </template>

<script>
import axios from "axios";
import AddEventForm from "@/components/AddEventForm.vue";
import EventList from "@/components/EventList.vue";

export default {
  components: {
    AddEventForm,
    EventList,
  },
  data() {
    return {
      showForm: false,
      showEventList: false,
      showUserList: false,
      showApplicationDetails: false,
      selectedUser: {},
      selectedApplication: {},
      events: [
        { id: 1, name: "Event 1" },
        { id: 2, name: "Event 2" },
        { id: 3, name: "Event 3" },
      ],
      registeredUsers: [],
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
      this.showEventList = false;
      this.showUserList = false;
      this.showApplicationDetails = false;
    },
    closeForm() {
      this.showForm = false;
    },
    toggleEventList() {
      this.showEventList = !this.showEventList;
      this.showForm = false;
      this.showUserList = false;
      this.showApplicationDetails = false;
    },
    closeEventList() {
      this.showEventList = false;
    },
    toggleUserList() {
      this.showUserList = !this.showUserList;
      this.showForm = false;
      this.showEventList = false;
      this.showApplicationDetails = false;
    },
    closeUserList() {
      this.showUserList = false;
    },
    async fetchRegisteredUsers() {
      const query = `
        query {
          allApplication {
            name
            email
          }
        }
      `;
      try {
        const response = await axios.post("http://localhost:8000/graphql/", {
          query,
        });
        this.registeredUsers = response.data.data.allApplication;
      } catch (error) {
        console.error("Error fetching registered users:", error);
      }
    },
    async fetchApplicationDetails(user) {
      this.selectedUser = user;
      const query = `
        query {
          allApplication {
            email
            name
            status
          }
        }
      `;
      try {
        const response = await axios.post("http://localhost:8000/graphql/", {
          query,
        });
        const application = response.data.data.allApplication.find(
          (app) => app.name === user.name
        );
        if (application) {
          this.selectedApplication = application;
          this.showApplicationDetails = true;
          this.showUserList = false;
        } else {
          alert("No application details found for this user.");
        }
      } catch (error) {
        console.error("Error fetching application details:", error);
      }
    },
    closeApplicationDetails() {
      this.showApplicationDetails = false;
      this.selectedApplication = {};
      this.showUserList = true; // Return to the applications list
    },
    deleteUser(user) {
      alert(`Delete user: ${user.name}`);
    },
  },
  async mounted() {
    await this.fetchRegisteredUsers();
  },
};
</script>

<style scoped>
.user-actions {
  padding: 20px;
}

.actions-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.form-content.centered {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.details-content {
  max-width: 400px; /* Smaller display for user details */
}

.table-heading {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
}

.table-container {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: auto;
  width: 100%; /* Ensure the container spans the full width */
}

.user-table {
  width: 100%; /* Ensure the table spans the full width of the container */
  border-collapse: collapse;
  margin-top: 10px;
  background-color: #ffffff;
  table-layout: auto; /* Allow columns to resize based on content */
}

.user-table th,
.user-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table td {
  word-wrap: break-word; /* Ensure long content doesn't overflow */
  white-space: normal;
}

.user-table th {
  background-color: #f8f9fa;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 10;
}

.user-table th:nth-child(2),
.user-table td:nth-child(2) {
  min-width: 200px; /* Ensures name column is wide enough */
}

.user-table th:nth-child(3),
.user-table td:nth-child(3) {
  min-width: 250px; /* Ensures email column is wide enough */
}

.action-icon {
  cursor: pointer;
  font-size: 18px;
  margin-right: 10px;
}

.view-icon {
  color: #007bff;
}

.delete-icon {
  color: #dc3545;
}

.view-icon:hover,
.delete-icon:hover {
  opacity: 0.7;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
