<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p>&copy; 2024 ARU Made by Limbu</p>
      <ul class="footer-links">
        <li><router-link to="/">Login</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/policy">Privacy</router-link></li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.app-footer {
  background-color: #fff;
  color: black;
  padding: 20px;
  opacity: 0.7;
  text-align: center;
  position: fixed;
  bottom: 0;
  font-size: 15px;
  width: 100%;
  border-top: 2px solid #ccc;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  display: inline;
  margin: 0 10px;
}

.footer-links a {
  color: black;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  opacity: 0.7;
}

.footer-links a:hover {
  opacity: 1;
}
</style>
