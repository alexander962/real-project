import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
import DataTable from 'laravel-vue-datatable';

Vue.use(DataTable);

import auth from './auth'

export default new Vuex.Store({
    modules:{
        auth
    },
    plugins: [new VuexPersistence().plugin]
})
