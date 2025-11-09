<template>
  <div class="container mt-4">
    <h2>Edit Subscription</h2>
    <form @submit.prevent="updateSubscription">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input v-model="name" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Amount</label>
        <input v-model.number="amount" type="number" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Period</label>
        <input v-model="period" type="text" class="form-control" required />
      </div>
      <div class="mb-3 form-check">
        <input v-model="active" type="checkbox" class="form-check-input" id="activeCheck" />
        <label class="form-check-label" for="activeCheck">Active</label>
      </div>
      <div class="mb-3">
        <label class="form-label">Notes</label>
        <input v-model="notes" type="text" class="form-control" />
      </div>
      <button type="submit" class="btn btn-success">Update Subscription</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../firebaseDb";
import { useRoute } from "vue-router";

const route = useRoute();

const name = ref("");
const email = ref("");
const amount = ref(0);
const period = ref("");
const active = ref(false);
const notes = ref("");

onMounted(async () => {
  const docRef = doc(db, "subscriptions", route.params.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    name.value = data.name;
    email.value = data.email;
    amount.value = data.amount;
    period.value = data.period;
    active.value = data.active;
    notes.value = data.notes;
  }
});

const updateSubscription = async () => {
  const docRef = doc(db, "subscriptions", route.params.id);
  await updateDoc(docRef, {
    name: name.value,
    email: email.value,
    amount: amount.value,
    period: period.value,
    active: active.value,
    notes: notes.value,
  });
  alert("Subscription updated successfully!");
};
</script>