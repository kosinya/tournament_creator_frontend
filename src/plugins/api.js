 import api from '../api/index.js'

 export default {
    install: (app) => {
        app.prototype.$api = api
    }
 }