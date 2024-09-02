import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';

import '/node_modules/primeflex/primeflex.css'
import 'primeflex/themes/primeone-light.css'
import Aura from '@primevue/themes/aura'

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'white',
            cssLayer: false
        }
    }
});
app.mount('#app');


