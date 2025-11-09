import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import ManageView from '../views/ManageView.vue'
import EditView from '../views/EditView.vue'
import LoginView from '../views/LoginView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/about' },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/about', name: 'about', component: AboutView, meta: { requiresAuth: true } },
    { path: '/manage', name: 'manage', component: ManageView, meta: { requiresAuth: true } },
    { path: '/edit/:id', name: 'edit', component: EditView, props: true, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/about' }
  ]
})

// wait for Firebase to tell us the real current user
const getCurrentUser = () =>
  new Promise(resolve => {
    const auth = getAuth()
    const unsub = onAuthStateChanged(auth, user => {
      unsub()
      resolve(user)
    })
  })

router.beforeEach(async (to) => {
  // if already logged in and trying to go to /login, bounce to /about
  if (to.path === '/login') {
    const u = await getCurrentUser()
    if (u) return '/about'
    return
  }

  // protect routes that need auth
  if (to.meta.requiresAuth) {
    const u = await getCurrentUser()
    if (!u) {
      return { path: '/login', query: { redirect: to.fullPath } }
    }
  }
})

export default router