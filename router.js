import Vue from 'vue'
import Router from 'vue-router'

import WelcomePage from '@/pages/welcome'
import HomePage from '@/pages/home'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: WelcomePage,
        name: 'welcome-page',
      },
      {
        path: '/home',
        component: HomePage,
        name: 'home-page',
      },
    ],
  })
}
