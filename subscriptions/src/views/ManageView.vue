<template>
  <div class="container mt-4">
    <h2>Add New Subscription</h2>
    <form @submit.prevent="addSubscription">
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
      <button type="submit" class="btn btn-primary">Add Subscription</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";

const name = ref("");
const email = ref("");
const amount = ref(0);
const period = ref("");
const active = ref(false);
const notes = ref("");

const addSubscription = async () => {
  await addDoc(collection(db, "subscriptions"), {
    name: name.value,
    email: email.value,
    amount: amount.value,
    period: period.value,
    active: active.value,
    notes: notes.value,
  });

  name.value = "";
  email.value = "";
  amount.value = 0;
  period.value = "";
  active.value = false;
  notes.value = "";
  alert("Subscription added successfully!");
};
</script>