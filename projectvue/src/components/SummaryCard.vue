<template>
  <div class="summary-card">
    <h2 class="section-title">Dashboard Summary</h2>
    <div class="summary-details">
      <p>Total Events: <span>{{ totalEvents }}</span></p>
      <p>Total Application: <span>{{ totalApplications }}</span></p> <!-- Updated -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      totalEvents: 0,       // Initialize totalEvents as 0; will be updated with fetched data
      totalApplications: 0, // Initialize totalApplications as 0; will be updated with fetched data
    };
  },
  methods: {
    async fetchTotalEvents() {
      try {
        const response = await axios.post('http://localhost:8000/graphql/', {
          query: `
            query MyQuery {
              eventCount
            }
          `,
        });

        // Assign the total event count from the response
        if (response.data.data && response.data.data.eventCount !== undefined) {
          this.totalEvents = response.data.data.eventCount;
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching total events:', error);
      }
    },
    
    async fetchTotalApplications() {
      try {
        const response = await axios.post('http://localhost:8000/graphql/', {
          query: `
            query MyQuery {
              eventuserCount
            }
          `,
        });

        // Assign the total application count from the response
        if (response.data.data && response.data.data.eventuserCount !== undefined) {
          this.totalApplications = response.data.data.eventuserCount;
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching total applications:', error);
      }
    },
  },
  mounted() {
    this.fetchTotalEvents();        // Fetch total events when the component mounts
    this.fetchTotalApplications();  // Fetch total applications when the component mounts
  },
};
</script>

<style scoped>
.summary-card {
  background-color: #e0f7fa; /* Default background color */
  border-radius: 8px;
  padding: 20px; /* Increased padding for better aesthetics */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.3s ease, background-color 0.3s ease; /* Smooth transition for scaling and background color */
}

.summary-card:hover {
  transform: scale(1.05); /* Scale the card up when hovered */
  background-color: #e0f7fa; /* Change background color on hover */
}

.section-title {
  font-size: 24px;
  color: #333;
}

.summary-details p {
  font-size: 18px;
  color: #666;
}

.summary-details span {
  font-weight: bold;
  color: #333;
}
</style>
