<template>
  <div class="container py-5">
    <h1 class="mb-4">Login</h1>
    <p class="text-muted mb-3">Please sign in to manage your subscriptions.</p>
    <button class="btn btn-primary" @click="login">Login with Google</button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { auth } from '../firebaseDb'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const router = useRouter()
const route = useRoute()

const login = async () => {
  const prov = new GoogleAuthProvider()
  await signInWithPopup(auth, prov)
  const next = route.query.redirect || '/about'
  router.push(next)
}
</script>