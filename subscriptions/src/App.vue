<template>
  <header class="bg-dark text-white py-3">
    <div class="container d-flex justify-content-between align-items-center">
      <h3 class="m-0 text-success">Subscriptions</h3>

      <nav class="d-flex align-items-center gap-3">
        <RouterLink class="text-white text-decoration-none" to="/about">List</RouterLink>
        <RouterLink class="text-white text-decoration-none" to="/manage">Add</RouterLink>

        <!-- Auth buttons -->
        <button
          v-if="!user"
          type="button"
          class="btn btn-primary btn-sm"
          @click="login"
        >
          Login with Google
        </button>

        <button
          v-else
          type="button"
          class="btn btn-outline-light btn-sm"
          @click="logout"
        >
          Logout ({{ user.displayName || 'User' }})
        </button>
      </nav>
    </div>
  </header>

  <main class="container my-4">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { auth } from './firebaseDb'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const user = ref(null)
let unsub = null

onMounted(() => {
  unsub = onAuthStateChanged(auth, (u) => {
    user.value = u || null
  })
})

onBeforeUnmount(() => {
  if (typeof unsub === 'function') unsub()
})

const login = async () => {
  try {
    const prov = new GoogleAuthProvider()
    await signInWithPopup(auth, prov)
    // after login, send them to the list so it's obvious
    router.push('/about')
  } catch (err) {
    alert('Login failed. Check Firebase auth settings and try again.')
    console.error(err)
  }
}

const logout = async () => {
  try {
    await signOut(auth)
  } catch (err) {
    console.error(err)
  } finally {
    router.push('/about')
  }
}
</script>