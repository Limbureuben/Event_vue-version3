<template>
  <div class="about-us">
    <p>
      Welcome to ARU event system! We are dedicated to providing the best services to the university.
      Our mission is to deliver high-quality service with a focus on innovation, usability, and university satisfaction.
    </p>
    <section class="team-section">
      <h2>The Team</h2>
      <div class="team">
        <div class="team-member">
          <img src="../assets/images/logo1.png" alt="The user of system" />
          <h4>ARU</h4>
          <p>User</p>
        </div>
        <div class="team-member">
          <img src="../assets/images/reuben.jpg" alt="The developer" />
          <h4>Reuben Limbu</h4>
          <p>Mantainer</p>
        </div>
        <!-- Add more team members as needed -->
      </div>
    </section>

    <section class="mission-section">
      <h2>Our Mission</h2>
      <p>
        Our mission is to create innovative solutions that make a positive impact on society. We strive to lead with
        integrity and make a difference in everything we do.
      </p>
    </section>
  </div>
  <FooterPage />
</template>
<script>
import FooterPage from '@/components/FooterPage.vue';
export default {
  name: 'AboutView',
  components: {
    FooterPage
  },
};

</script>

<style scoped>
.about-us {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1, h2 {
  text-align: center;
  color: #333;
}

p {
  line-height: 1.6;
  color: #666;
  text-align: center;
}

.team {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.team-member {
  text-align: center;
}

.team-member img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.mission-section {
  margin-top: 40px;
}
</style>
