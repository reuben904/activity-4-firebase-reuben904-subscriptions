<template>
  <div class="col-lg-6 mx-auto">
    <h2 class="text-center mb-4">Add Subscription</h2>
    <form @submit.prevent="add">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input v-model="name" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Description</label>
        <input v-model="description" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Amount</label>
        <input v-model.number="amount" type="number" step="0.01" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Payment Frequency</label>
        <input v-model="frequency" class="form-control" placeholder="monthly" required />
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-primary" type="submit">Add Subscription</button>
        <RouterLink class="btn btn-secondary" to="/subscriptionsList">Cancel</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebaseDb";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref("");
const description = ref("");
const amount = ref(null);
const frequency = ref("");

const add = async () => {
  await addDoc(collection(db, "subscriptions"), {
    name: name.value,
    description: description.value,
    amount: amount.value,
    frequency: frequency.value,
  });
  router.push("/subscriptionsList");
};
</script>