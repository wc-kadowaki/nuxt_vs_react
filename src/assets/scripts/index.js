import { createApp } from '@vue/runtime-dom';
import VueApp from '@scripts/vue/App.vue';

const vueApp = createApp(VueApp);

vueApp.mount('#vue-app');

import React from 'react';
import { createRoot} from 'react-dom/client';
import ReactApp from '@scripts/react/App.jsx';

const container = document.getElementById('react-app');
const reactRoot = createRoot(container);

reactRoot.render(<ReactApp />);
