import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';

import '/node_modules/primeflex/primeflex.css'
import 'primeflex/themes/primeone-light.css'
import Lara from '@primevue/themes/lara'

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Lara,
        options: {
            prefix: 'p',
            darkModeSelector: 'white',
            cssLayer: false
        }
    }
});
app.mount('#app');


