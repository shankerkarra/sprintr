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
    path: '/projectBacklog/:id',
    name: 'ProjectBacklog',
    component: loadPage('ProjectBacklogPage'),
    beforeEnter: authGuard
  },
  {
    path: '/projectSprint/:id',
    name: 'ProjectSprint',
    component: loadPage('ProjectSprintPage'),
    beforeEnter: authGuard
  },
  {
    path: '/backlogItems/:id',
    name: 'BackLogItems',
    component: loadPage('BackLogItemsPage'),
    beforeEnter: authGuard
  },
  {
    path: '/sprints/:id',
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
