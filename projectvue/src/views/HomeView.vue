<template>
  <HeaderPage />
  <div class="home-page">
    <!-- Your content goes here -->
    <h1>Welcome to the Home Page</h1>
    <p>This is a simple home page without a header.</p>
    <!-- Add more content or components as needed -->
  </div>
  <FooterPage />
</template>

<script>
import HeaderPage from '@/components/HeaderPage.vue';
import FooterPage from '@/components/FooterPage.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderPage,
    FooterPage
  },
};
</script>

<style scoped>
.home-page {
  /* Add your styles here */
  text-align: center;
  position: absolute;
  top: 200px;
  left: 400px;
  padding: 20px;
}
</style>

