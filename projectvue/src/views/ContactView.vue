<template>
    <div class="contact-us">
      <h3>Contact Us</h3>
      <p>
        We'd love to hear from you! Please fill out the form below and we'll get in touch as soon as possible.
      </p>
      
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <input type="text" id="name" v-model="form.name" placeholder="Enter name" required />
        </div>
  
        <div class="form-group">
          
          <input type="email" id="email" v-model="form.email" placeholder="Enter email" required />
        </div>
  
        <div class="form-group">
        
          <textarea id="message" v-model="form.message" rows="5" placeholder="Enter message" required></textarea>
        </div>
  
        <button type="submit" class="submit-btn">Send Message</button>
      </form>
    </div>
    <FooterPage />
  </template>
  
  <script>
import FooterPage from '@/components/FooterPage.vue';

  export default {
    name: 'ContactView',
    components: {
        FooterPage,
    },
    data() {
      return {
        form: {
          name: '',
          email: '',
          message: ''
        }
      };
    },
    methods: {
      submitForm() {
        // Simple form submission logic
        alert(`Thank you, ${this.form.name}. Your message has been sent.`);
        // You can add more complex form submission logic, such as sending data to an API
        this.form.name = '';
        this.form.email = '';
        this.form.message = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .contact-us {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  p {
    text-align: center;
    color: #666;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #333;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .submit-btn {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: lightseagreen;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  </style>
  