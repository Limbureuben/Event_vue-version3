<template>
    <div class="upcoming-events">
      <div class="events-list">
        <EventCard v-for="event in events" :key="event.id" :event="event" />
      </div>
    </div>
  </template>
  
  <script>
  import EventCard from './EventCard.vue';
  
  export default {
    components: { EventCard },
    data() {
      return {
        events: [
          { id: 1, title: 'Staff Event', date: '2024-10-20', location: 'Ardhi UNiversity' },
          { id: 3, title: 'ARU Event', date: '2024-11-05', location: 'Ardi University' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .upcoming-events {
    margin-top: 20px;
  }
  
  .section-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }
  
  .events-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Reduced min card width */
    gap: 15px; /* Reduced gap */
  }
  </style>
  