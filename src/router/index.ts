import { createRouter, createWebHistory } from 'vue-router'
import ProgressView from '../views/ProgressView.vue'
import GoalView from '../views/GoalView.vue'
import PointsTrackerView from '../views/PointsTrackerView.vue'
import AccountView from '../views/AccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/progress'
    },
    {
      path: '/progress',
      name: 'progress',
      component: ProgressView
    },
    {
      path: '/goal',
      name: 'goal',
      component: GoalView
    },
    {
      path: '/points',
      name: 'points',
      component: PointsTrackerView
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView
    }
  ]
})

export default router
