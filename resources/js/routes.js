// const ExampleComponent = () => import('./components/ExampleComponent.vue')
// const TestComponent = () => import('./components/TestComponent.vue')

import App from './components/App.vue'
import Lk from './components/Lk.vue'
import Page from './components/Page.vue'
import LandingPage from './components/LandingPage/LandingPage.vue'
import Confidentiality from './components/Confidentiality/Confidentiality.vue'
import PublickOffer from './components/PublickOffer/PublickOffer.vue'

import Statistics from './views/lk/statistics/Statistics.vue'
import Statistic from './views/lk/statictic/Statistic.vue'
import MyPages from './views/lk/my-pages/MyPages.vue'
import Balance from './views/lk/Balance.vue'
import Domains from './views/lk/Domains.vue'
import ParthnerProgram from './views/lk/ParthnerProgram.vue'
import Instructions from './views/lk/Instructions.vue'
import Profile from './views/lk/Profile.vue'
import Login from './views/auth/Login.vue'
import Register from './views/auth/Register.vue'
import ForgotPassword from './views/auth/ForgotPassword.vue'
import ResetPasswordForm from './views/auth/ResetPassword.vue'
import VerifyEmail from './views/auth/VerifyEmail.vue'

import ParthnerMain from './views/lk/referral/Main.vue'
import ParthnerPay from './views/lk/referral/Pay.vue'
import ParthnerAggre from './views/lk/referral/Aggre.vue'

import Get from './views/page/Get.vue'
import Subscribe from './views/page/Subscribe.vue'
import Thanks from './views/page/Thanks.vue'

import PageNotFound from './views/auth/404.vue'
import Users from './views/admin/Users'
import Pages from './views/admin/Pages'
import AdminPayments from './views/admin/Payments.vue'
import AdminPaymentsWithdrawal from './views/admin/payments/Withdrawal.vue'
import AdminPaymentsReplenishment from './views/admin/payments/Replenishment.vue'
import AdminUsers from './views/admin/Users.vue'

export const routes = [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path: '/offer',
    component: PublickOffer,
  },
  {
    path: '/confidentiality',
    component: Confidentiality,
  },
  {
    path: '/lk',
    name: 'lk',
    component: Lk,
    alias: '/',
    meta: { auth: true },
    children: [

      { path: 'statistic', component: Statistic },
      { path: 'statistics', component: Statistics },
      // { path: 'my-pages', component: MyPages, redirect: { name: 'pp-main' }, name: 'my-pages', alias: '/lk' },
      { path: 'my-pages', component: MyPages },

      { path: 'balance', component: Balance },
      { path: 'domains', component: Domains },
      { path: 'parthner-program', component: ParthnerProgram },
      { path: 'instructions', component: Instructions },
      // { path: 'parthner-program', component: ParthnerProgram, redirect: { name: 'pp-main' }, children: [
      //   { path: 'main', component: ParthnerMain, name: 'pp-main' },
      //   { path: 'payouts', component: ParthnerPay },
      //   { path: 'aggrements', component: ParthnerAggre },
      // ] },
      { path: 'parthner-program', component: ParthnerProgram },
      { path: 'instructions', component: Instructions },
      { path: 'profile', component: Profile }
    ]
    },
  { path: '/login', component: Login, meta: { guest: true }, name: 'login' },
  { path: '/register', component: Register, meta: { guest: true } },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ForgotPassword,
    meta: {
      auth: false,
    },
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password-form',
    component: ResetPasswordForm,
    meta: {
      auth: false,
    },
  },
  {
    path: '/verify-email',
    name: 'verifyEmail',
    component: VerifyEmail,
    meta: {
      auth: false,
    },
  },
  {
    path: '/page/:username/',
    component: Page,
    children: [
      { path: '/', component: Get, name: 'page-get' },
      { path: 'subscribe', component: Subscribe, name: 'subscribe' },
      { path: 'success', component: Thanks, name: 'page-success' },
    ],
    meta: {
      auth: false,
    },
  },
  {
    path: '/admin',
    redirect: { name: 'admin-users'},
    component: App,
    meta: {
        auth: true,
        admin: true
    },
    children: [
        { path: 'users', component: AdminUsers, name: 'admin-users' },
        {
            path: 'payments',
            component: AdminPayments,
            redirect: { name: 'admin-payments-main'},
            children: [
                { path: 'withdrawal', component: AdminPaymentsWithdrawal, name: 'admin-payments-main' },
                { path: 'replenishment', component: AdminPaymentsReplenishment }
            ]
        }
    ]
  },
    {
        path: '/admin/users',
        name: 'admin/users',
        component: Users,
        alias: '/',
        meta: { auth: false },
    },

    {
        path: '/admin/pages',
        name: 'admin/pages',
        component: Pages,
        alias: '/',
        meta: { auth: false },
    },

    { path: '*', component: PageNotFound },
]
