import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import router from './router';
import store from './store';
import Toast from 'vue-toastification';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'vue-toastification/dist/index.css';


/*
const routes = [
  { path: '/', component: Home } // Trang chủ
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
*/

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: false,
});

app.mount('#app');
