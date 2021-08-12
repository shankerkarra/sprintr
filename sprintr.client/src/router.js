import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage'),
    beforeEnter: authGuard
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage'),
    beforeEnter: authGuard
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/project/:projectId/backlog',
    name: 'ProjectBacklog',
    component: loadPage('ProjectBacklogPage'),
    beforeEnter: authGuard
  },
  {
    path: '/project/:projectId/sprint',
    name: 'ProjectSprint',
    component: loadPage('ProjectSprintPage'),
    beforeEnter: authGuard
  },
  {
    path: '/project/:projectId/backlog/:backlogId',
    name: 'BackLogItems',
    component: loadPage('BackLogItemsPage'),
    beforeEnter: authGuard
  },
  {
    path: '/project/:projectId/sprint/:sprintId',
    name: 'Sprint',
    component: loadPage('SprintsPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
