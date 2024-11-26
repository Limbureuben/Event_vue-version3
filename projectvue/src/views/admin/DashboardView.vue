<template>
  <HeaderPage />
  <div class="dashboard">
    <h3 class="dashboard-title">Dashboard</h3>
    <div class="dashboard-grid">
      <SummaryCard />
      <UserActions />
      <UpcomingEvents />
    </div>
  </div>
</template>

<script>
import SummaryCard from '@/components/SummaryCard.vue';
import UserActions from '@/components/UserActions.vue';
import UpcomingEvents from '@/components/UpcomingEvents.vue';
import HeaderPage from '@/components/HeaderPage.vue';

export default {
  name: 'DashboardView',
  components: {
    SummaryCard,
    UserActions,
    UpcomingEvents,
    HeaderPage,
  },
};
</script>

<style scoped>
/* General styles to apply to the whole page */
html, body {
  margin: 0;          /* Remove default margin */
  padding: 0;         /* Remove default padding */
  height: 100%;       /* Ensure the body takes full height */
  overflow: hidden;   /* Prevent scrolling */
  background-color: #f0f4f7; /* Background color for the whole page */
}

/* Dashboard specific styles */
.dashboard {
  padding: 40px;
  box-sizing: border-box;
  margin-top: 100px;
}

.dashboard-title {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto; /* Center the grid within the dashboard */
}

@media (min-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr; /* Two columns on wider screens */
  }
}
</style>











