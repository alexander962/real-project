/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from './vuetify'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMoment from 'vue-moment'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../css/app.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(VueMoment);

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        store.commit('SET_token', null);
        store.commit('SET_user', null);
        store.commit('SET_loggedIn', false);
        router.push('/login');
    }
    return Promise.reject(error)
});

Vue.use(VueAxios, axios)

import App from './components/App.vue';
import {routes} from './routes';

const router = new VueRouter({
    mode: 'history',
    routes: routes,
});

router.beforeEach((to, from, next) => {
    if (store.state.auth.token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.auth.token;
    if (to.matched.some(record => record.meta.admin)) {
        if (store.state.auth.loggedIn == false) {
            next({
                path: '/login'
            })
        } else if (store.state.auth.user.is_admin) {
            next()
        } else {
            next({
                path: '/404'
            })
        }
    } else if (to.matched.some(record => record.meta.auth)) {
        if (store.state.auth.loggedIn == false) {
            next({
                path: '/login'
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (store.state.auth.loggedIn == false) {
            next()
        } else {
            next({
                path: '/lk'
            })
        }
    } else {
        next()
    }
});

const app = new Vue({
    el: '#app',
    store,
    router,
    vuetify,
    render: h => h(App),
});
