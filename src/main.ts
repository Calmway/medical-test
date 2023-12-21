import 'primevue/resources/themes/lara-light-green/theme.css';
import './assets/style/style.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router';
import PrimeVue from 'primevue/config';

const pinia = createPinia()
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.mount('#app');
