import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ManageView from '../views/ManageView.vue'
import EditView from '../views/EditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/about' },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/manage', name: 'manage', component: ManageView },
    { path: '/edit/:id', name: 'edit', component: EditView, props: true }
  ]
})

export default router