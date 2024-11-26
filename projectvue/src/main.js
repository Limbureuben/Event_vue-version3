// import './assets/main.css'
// import Vue from 'vue';
// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router';
// import vuetify from './plugins/vuetify';
// const app = createApp(App)

// app.use(router)
// app.use(vuetify);

// app.mount('#app')

// Vue.use(VueMaterial);
// src/main.js

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
library.add(faFacebook, faInstagram, faTwitter, faLinkedin);
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap';
import 'jquery';



// const app = createApp(App);
const options = {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
};


const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(vuetify);
app.use(Toast, options);

app.mount('#app');