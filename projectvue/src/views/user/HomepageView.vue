<template>
  <UserHeader />

  <div class="events-container">
    <!-- Search Input and Button -->
    <div class="search-bar">
      <input 
      type="text" 
      v-model="searchQuery"
      placeholder="Search events..."
      class="search-input"
    />
    </div>

    <!-- Events List -->
    <ul class="events-list" v-if="filteredEvents.length">
      <li v-for="event in filteredEvents" :key="event.id" class="event-card" @click="selectEvent(event)">
        <h3 class="event-name">{{ event.eventName }}</h3>
        <p><strong>Category:</strong> {{ event.eventCategory }}</p>
        <p><strong>Date:</strong> {{ event.eventDate }}</p>
        <p><strong>Location:</strong> {{ event.eventLocation }}</p>
        <p><strong>Organizer:</strong> {{ event.eventUsername }}</p>
      </li>
    </ul>
    <p v-else>No events found</p>

    <!-- Event Details Overlay -->
    <div v-if="selectedEvent" class="event-details-overlay" @click="closeEventDetails">
      <div class="event-details" @click.stop>
        <button class="close-button" @click="closeEventDetails">X</button>
        <h3>{{ selectedEvent.eventName }}</h3>
        <div class="detail-item"><strong>Category:</strong> <span>{{ selectedEvent.eventCategory }}</span></div>
        <div class="detail-item"><strong>Date:</strong> <span>{{ selectedEvent.eventDate }}</span></div>
        <div class="detail-item"><strong>Location:</strong> <span>{{ selectedEvent.eventLocation }}</span></div>
        <div class="detail-item"><strong>Organizer:</strong> <span>{{ selectedEvent.eventUsername }}</span></div>
        <div class="detail-item"><strong>Description:</strong> <span>{{ selectedEvent.eventDescription }}</span></div>
        <button class="apply-button" @click="applyForEvent(selectedEvent)">Apply</button>
      </div>
    </div>

    <!-- Event Application Form -->
    <EventApplicationForm 
      v-if="showApplicationForm"
      :event="selectedEvent"
      @close="showApplicationForm = false"
      @submitted="handleApplicationSubmitted"
    />
  </div>
</template>

  
<script>
import UserHeader from '@/components/UserHeader.vue';
import EventApplicationForm from '@/components/EventApplicationForm.vue';
import axios from 'axios';

export default {
  name: 'HomepageView',
  components: {
    UserHeader,
    EventApplicationForm
  },
  data() {
    return {
      events: [],
      filteredEvents: [],
      searchQuery: "",
      selectedEvent: null,
      showApplicationForm: false
    };
  },

  computed: {
    // eslint-disable-next-line vue/no-dupe-keys
    filteredEvents() {
      if (!this.searchQuery) return this.events;
      return this.events.filter(event =>
        event.eventName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.eventCategory.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  
  mounted() {
    this.fetchEvents();
  },
  methods: {
    searchEvents() {
    // this can be empty
  },
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
                eventUsername
                eventName
              }
            }
          `
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        if (response.data && response.data.data && response.data.data.allEvents) {
          this.events = response.data.data.allEvents;
          this.filteredEvents = this.events;  // Initialize filtered events
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
    filterEvents() {
      const query = this.searchQuery.toLowerCase();
      this.filteredEvents = this.events.filter(event =>
        event.eventName.toLowerCase().includes(query) ||
        event.eventCategory.toLowerCase().includes(query) ||
        event.eventLocation.toLowerCase().includes(query)
      );
    },
    selectEvent(event) {
      this.selectedEvent = event;
    },
    closeEventDetails() {
      this.selectedEvent = null;
    },
    applyForEvent() {
      this.showApplicationForm = true;
    },
    handleApplicationSubmitted() {
      this.showApplicationForm = false;
      console.log("Application submitted successfully");
    }
  }
};
</script>

  
  <style scoped>
  body {
    background-color: #f0f4f8; /* Light background for contrast */
  }
  
  h1 {
    color: #333; /* Dark text for better readability */
    text-align: left; /* Align header to the left */
    margin-left: 20px; /* Add margin to the left of the header */
    margin-top: 20px; /* Add margin at the top of the header for spacing */
  }

  h3 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

p {
  font-size: 1em;
  color: #555;
  line-height: 1.5;
  margin: 10px 0;
}

strong {
  color: #333;
}
  
  .events-container {
    padding: 20px; /* Add padding to the container */
    display: flex;
    position: relative;
    flex-direction: column; /* Stack header and list vertically */
    align-items: center; /* Center align items for mobile */
    margin-top: 100px; /* This is the added margin to prevent overlap with header */
  }
  
  .events-list {
    display: flex; /* Use flexbox for horizontal layout */
    flex-wrap: wrap; /* Allow wrapping of cards to the next line */
    list-style-type: none; /* Remove default list styles */
    padding: 0; /* Remove padding */
    margin: 0; /* Remove margin */
    justify-content: center; /* Center the cards in the container */
  }
  
  .event-card {
    background-color: white; /* Background color for the event card */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Subtle box shadow */
    padding: 15px; /* Padding inside the card */
    margin: 15px; /* Space around each card */
    transition: transform 0.3s, box-shadow 0.3s; /* Smooth transition for hover effect */
    width: 300px; /* Set a fixed width for the card */
    cursor: pointer; /* Change cursor to pointer on hover */
    text-align: left; /* Align text to the left for better readability */
    overflow: hidden; /* Prevent overflow */
  }
  
  .event-card:hover {
    transform: translateY(-5px); /* Raise card on hover */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Increased shadow on hover */
  }
  
  .event-name {
    color: #007bff; /* Blue color for event names */
    font-size: 1.2em; /* Slightly increase font size */
    margin-bottom: 10px; /* Space below event name */
  }
  
  
  /* Event Details */
  .event-details {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 90%;
  max-width: 500px;
  position: relative;
  font-family: 'Arial', sans-serif;
}

.event-details-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
  
.apply-button {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  font-size: 1em;
  color: #fff;
  background-color: lightseagreen;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.apply-button:hover {
  background-color: #23c6ab;
}
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .event-card {
      width: 100%; /* Full width on small screens */
      margin: 10px 0; /* Reduced margin for smaller screens */
    }
  
    .event-details {
      width: 90%; /* Adjust width of details section on mobile */
    }
  }
  
  @media (max-width: 480px) {
    h1 {
      font-size: 1.5em; /* Smaller header font size on mobile */
      margin-left: 10px; /* Less margin on mobile */
    }
  
    .event-card {
      padding: 10px; /* Smaller padding for mobile */
    }
  }

  .close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  color: #777;
}

.detail-item {
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
  font-size: 1em;
  color: #555;
}

/* .detail-item strong {
  min-width: 100px;
  color: #333;
} */

.detail-item span {
  flex: 1;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid green;
  flex: 1;
}

.search-input:focus {
  outline: none;
  border: 1px solid green;
}

.search-button:hover {
  background-color: #23c6ab;
}

  </style>
