import {createApp} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import {store} from './store'
import router from './router/router.js'

import DialogService from 'primevue/dialogservice'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice';


import './style.css'
import '/node_modules/primeflex/primeflex.css'
import 'primeflex/themes/primeone-light.css'
import 'primeicons/primeicons.css'
import Nora from '@primevue/themes/nora'


const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Nora,
        options: {
            prefix: 'p',
            darkModeSelector: '.my-app-dark',
            cssLayer: false
        }
    }
});
app.use(store);
app.use(router);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.mount('#app');


