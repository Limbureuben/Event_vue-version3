<!-- SuccessMessage.vue -->
<template>
  <div class="success-overlay">
    <div class="success-box">
      <i class="check-icon">✔</i>
      <h2>Application Submitted Successfully!</h2>
      <p>Your application was successful. You will receive an email with the event details shortly.</p>
      <button @click="navigateToHomepage" class="close-btn">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToHomepage() {
      this.$router.push('/homepage');
    }
  }
};
</script>

<style scoped>
.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1002;
  animation: fadeIn 0.3s ease forwards;
}

.success-box {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25), 0 0 10px #28a745;
  animation: popUp 0.4s ease forwards;
  transform: scale(1);
  transition: transform 0.2s;
}

.success-box:hover {
  transform: scale(1.02);
}

.check-icon {
  font-size: 3em;
  color: #28a745;
  display: inline-block;
  animation: bounceTick 0.5s ease forwards;
}

h2 {
  color: #333;
  margin: 20px 0 10px;
}

p {
  color: #555;
  margin-bottom: 20px;
}

.close-btn {
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-btn:hover {
  background-color: #17a58b;
}

/* Keyframes for animations */
@keyframes popUp {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    background: rgba(0, 0, 0, 0);
  }
  100% {
    background: rgba(0, 0, 0, 0.7);
  }
}

@keyframes bounceTick {
  0% {
    transform: scale(0) rotate(0deg);
  }
  60% {
    transform: scale(1.3) rotate(10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
</style>
