
<template>
  <div class="event-list-overlay" v-if="loading">
      Loading events...
    </div>
    <div class="event-list-overlay" v-else>
      <div class="event-list-content">
        <h4>Events</h4>
        <div class="event-grid">
          <div v-for="event in events" :key="event.id" class="event-card">
            <div class="event-details">
              <h3>{{ event.eventName }}</h3>
              <p><strong>Category:</strong> {{ event.eventCategory }}</p>
              <p><strong>Organizer:</strong> {{ event.eventUsername }}</p>
              <p><strong>Date:</strong> {{ event.eventDate }}</p>
              <p><strong>Location:</strong> {{ event.eventLocation }}</p>
              <p><strong>Total Registered:</strong><x>{{ event. applicationCount }}</x></p>
            </div>
            <div class="event-actions">
              <i @click="openEditEventForm(event)" class="fas fa-edit icon-edit"></i>
              <i @click="deleteEvent(event.id)" class="fas fa-trash icon-delete"></i>
            </div>
          </div>
        </div>
        <button @click="$emit('close')" class="btn-close">×</button>
      </div>
    </div>
  
    <!-- Edit Event Form Popup -->
    <div v-if="isEditing" class="edit-event-form-overlay">
  <div class="edit-event-form-content">
    <h4>Edit Event</h4>
    <form @submit.prevent="submitEditEvent">
      <div>
        <input type="text" v-model="editedEvent.eventName" required placeholder="Event Name" />
      </div>
      <div>
        <input type="text" v-model="editedEvent.eventCategory" required placeholder="Category" />
      </div>
      <div>
        <input type="text" v-model="editedEvent.eventUsername" required placeholder="Organizer" />
      </div>
      <div>
        <input type="date" v-model="editedEvent.eventDate" required placeholder="Date" />
      </div>
      <div>
        <input type="text" v-model="editedEvent.eventLocation" required placeholder="Location" />
      </div>
      <button type="submit">Save Changes</button>
      <button type="button" @click="cancelEditEvent">Cancel</button>
      </form>
    </div>
  </div>
</template>
  

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      events: [],
      loading: true,
      isEditing: false, // Flag to show the edit form
      editedEvent: null, // Holds the event data being edited
    };
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.post('http://localhost:8000/graphql/', {
          query: `
            query MyQuery {
              allEvents {
                id
                eventCategory
                eventDate
                eventLocation
                eventName
                eventUsername
                applicationCount
              }
            }
          `,
        });

        if (response.data.data && response.data.data.allEvents) {
          this.events = response.data.data.allEvents;
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        this.loading = false;
      }
    },

    async deleteEvent(eventId) {
      const toast = useToast();
      try {
        const response = await axios.post('http://localhost:8000/graphql/', {
          query: `
            mutation DeleteEvent($id: ID!) {
              deleteEvent(id: $id) {
                success
                message
              }
            }
          `,
          variables: {
            id: eventId,
          },
        });

        const result = response.data.data.deleteEvent;
        if (result && result.success) {
          // Remove the event from the list after deletion
          this.events = this.events.filter(event => event.id !== eventId);

          // Show success toast
          const toast = useToast()
          toast.success(result.message || 'Event deleted successfully!');
        } else {
          toast.error(result.message || 'Failed to delete event.');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        toast.error('Error deleting event!');
      }
    },

    openEditEventForm(event) {
      this.editedEvent = { ...event };
      this.isEditing = true;
    },

    cancelEditEvent() {
      this.isEditing = false;
      this.editedEvent = null;
    },

    async submitEditEvent() {
      const toast = useToast(); // Initialize toast

      try {
        const response = await axios.post('http://localhost:8000/graphql/', {
          query: `
            mutation EditEvent($input: EventUpdateInputObject!) {
              updateEvent(input: $input) {
                event {
                  id
                  eventName
                  eventCategory
                  eventUsername
                  eventDate
                  eventLocation
                }
              }
            }
          `,
          variables: {
            input: {
              id: this.editedEvent.id,
              eventName: this.editedEvent.eventName,
              eventCategory: this.editedEvent.eventCategory,
              eventUsername: this.editedEvent.eventUsername,
              eventDate: this.editedEvent.eventDate,
              eventLocation: this.editedEvent.eventLocation,
            },
          },
        });

        if (response.data.data.updateEvent) {
          const updatedEvent = response.data.data.updateEvent.event;
          const index = this.events.findIndex(event => event.id === updatedEvent.id);
          if (index !== -1) {
            this.events.splice(index, 1, updatedEvent); // Replace the old event with the updated one
          }

          const toast = useToast()
          toast.success('Event updated successfully!');
          await this.fetchEvents();
          this.isEditing = false;
          this.editedEvent = null;
        }

      } catch (error) {
        console.error('Error editing event:', error);
        toast.error('Error updating event!');
      }
    },
  },
  mounted() {
    this.fetchEvents();
  },
};
</script>

  

  <style scoped>
  /* Event List Overlay */
  .event-list-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  
  .event-list-content {
    background: white;
    color: black;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 1000px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    margin-top: 20px;
  }
  
  /* Event Card Container */
  .event-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
  }
  
  .event-card {
    background: #f9f9f9;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 260px;
    height: 200px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  /* Event Lift Effect on Hover */
  .event-card:hover {
    transform: translateY(-10px); /* Moves the card up */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Adds more shadow for lift effect */
  }
  
  /* Event Details */
  .event-details {
    margin-bottom: 15px;
  }
  
  .event-details h3 {
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #0f56b2;
  }
  
  .event-details p {
    font-size: 0.9em;
    margin: 5px 0;
    color: #555;
  }
  
  /* Event Action Icons */
  .event-actions {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    position: absolute;
    bottom: 10px;
    width: 100%;
  }
  
  .icon-edit,
  .icon-delete {
    cursor: pointer;
    font-size: 1.1em;
    transition: color 0.3s;
  }
  
  .icon-edit {
    color: #2ed19e;
  }
  
  .icon-delete {
    color: #dc3545;
  }
  
  .icon-edit:hover {
    color: #10c07c;
  }
  
  .icon-delete:hover {
    color: #c82333;
  }
  
  /* Close Button */
  .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 2em;
    color: #333;
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
  }
  
  .btn-close:focus, .btn-close:active {
    outline: none;
  }
  
  .btn-close:focus-visible {
    outline: none;
  }

p x {
  color: rgb(225, 42, 10);
}
  
  .btn-close:hover {
    color: #ff5722;
  }
  
  /* Edit Event Form Styles */
  .edit-event-form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
  
  .edit-event-form-content {
    background: white;
    color: black;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 400px;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
    box-shadow: 0 4px 8px rgba(4, 126, 116, 0.2);
    transition: transform 0.3s ease-in-out;
  }
  
  .edit-event-form-content h4 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .edit-event-form-content form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .edit-event-form-content form div {
    display: flex;
    flex-direction: column;
  }
  
  .edit-event-form-content form label {
    font-size: 1.1em;
  }
  
  .edit-event-form-content form input {
    padding: 8px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .edit-event-form-content form button {
    padding: 10px;
    font-size: 1.1em;
    border: none;
    background-color: #0fc29e;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .edit-event-form-content form button:hover {
    background-color: #08a67f;
  }
  
  .edit-event-form-content form button[type="button"] {
    background-color: #dc3545;
  }
  
  .edit-event-form-content form button[type="button"]:hover {
    background-color: #c82333;
  }
  </style>
  
  
  






















  <!-- <script>
  import axios from 'axios';
  import { useToast } from 'vue-toastification';
  
  export default {
    data() {
      return {
        events: [],
        loading: true,
        isEditing: false,
        editedEvent: null,
      };
    },
    methods: {
      async fetchEvents() {
      try {
        const response = await axios.post('http://localhost:8000/graphql/', {
          query: `
            query MyQuery {
              allEvents {
                id
                eventCategory
                eventDate
                eventLocation
                eventName
                eventUsername
              }
            }
          `,
        });

        if (response.data.data && response.data.data.allEvents) {
          this.events = response.data.data.allEvents;
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        this.loading = false;
      }
    },

    openEditEventForm(event) {

      this.editedEvent = { ...event };
      this.isEditing = true;
    },

    cancelEditEvent() {

      this.isEditing = false;
      this.editedEvent = null;
    },

    async submitEditEvent() {
      const toast = useToast();

      try {
        const response = await axios.post('http://localhost:8000/graphql/', {
          query: `
            mutation EditEvent($input: EventUpdateInputObject!) {
              updateEvent(input: $input) {
                event {
                  id
                  eventName
                  eventCategory
                  eventUsername
                  eventDate
                  eventLocation
                }
              }
            }
          `,
          variables: {
            input: {
              id: this.editedEvent.id,
              eventName: this.editedEvent.eventName,
              eventCategory: this.editedEvent.eventCategory,
              eventUsername: this.editedEvent.eventUsername,
              eventDate: this.editedEvent.eventDate,
              eventLocation: this.editedEvent.eventLocation,
            },
          },
        });

        if (response.data.data.updateEvent) {
          const updatedEvent = response.data.data.updateEvent.event;
          const index = this.events.findIndex(event => event.id === updatedEvent.id);
          if (index !== -1) {
            this.events.splice(index, 1, updatedEvent);
          }

          const toast = useToast()
          toast.success('Event updated successfully!');
          
        
          await this.fetchEvents();


          this.isEditing = false;
          this.editedEvent = null;
        }

      } catch (error) {
        console.error('Error editing event:', error);
        toast.error('Error updating event!');
      }
    },

    deleteEvent(eventId) {
      console.log(`Delete event ${eventId}`);

    },
  },
  mounted() {
    this.fetchEvents();
  },
  };
  </script> -->