console.log('test');

import { createApp } from '@vue/runtime-dom';
import App from '@scripts/vue/App.vue';

const app = createApp(App);

app.mount('#app');
