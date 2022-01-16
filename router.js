import Vue from 'vue'
import Router from 'vue-router'

import WelcomePage from '@/pages/welcome'

import HomePage from '@/pages/home'
import TasksPage from '@/pages/tasks'
import ProjectsPage from '@/pages/projects'
import ReportsPage from '@/pages/reports'

import ManagersPage from '@/pages/managers'
import ManagerPage from '@/pages/manager'
import UserPage from '@/pages/user'

import AdminPage from '@/pages/admin'

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

      {
        path: '/managers',
        component: ManagersPage,
        name: 'managers-page',
      },
      {
        path: '/managers/:manager_id',
        component: ManagerPage,
        name: 'manager-page',
      },
      {
        path: '/managers/:manager_id/users/:user_id',
        component: UserPage,
        name: 'user-page',
      },

      {
        path: '/admin',
        component: AdminPage,
        name: 'admin-page',
      },
    ],
  })
}
