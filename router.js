import Vue from 'vue'
import Router from 'vue-router'

import WelcomePage from '@/pages/welcome'
import HomePage from '@/pages/home'
import TasksPage from '@/pages/tasks'
import ProjectsPage from '@/pages/projects'
import ReportsPage from '@/pages/reports'

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
      {
        path: '/tasks',
        component: TasksPage,
        name: 'tasks-page',
      },
      {
        path: '/projects',
        component: ProjectsPage,
        name: 'projects-page',
      },
      {
        path: '/reports',
        component: ReportsPage,
        name: 'reports-page',
      },
    ],
  })
}
