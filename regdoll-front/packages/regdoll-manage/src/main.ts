import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';

const app = createApp(App as any);
app.use(router);

app.mount('#app');
