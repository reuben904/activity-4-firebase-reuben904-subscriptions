<template>
  <div class="container mt-4">
    <h1>Subscriptions</h1>
    <table class="table table-bordered">
      <thead class="table-light">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Amount</th>
          <th>Period</th>
          <th>Active</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sub in subscriptions" :key="sub.id">
          <td>{{ sub.name }}</td>
          <td>{{ sub.email }}</td>
          <td>{{ sub.amount }}</td>
          <td>{{ sub.period }}</td>
          <td>{{ sub.active }}</td>
          <td>{{ sub.notes }}</td>
          <td class="d-flex gap-2">
            <RouterLink class="btn btn-success btn-sm" :to="`/edit/${sub.id}`">
              Edit
            </RouterLink>
            <button class="btn btn-danger btn-sm" @click="deleteSubscription(sub.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../firebaseDb";

const subscriptions = ref([]);

const loadData = async () => {
  const querySnapshot = await getDocs(collection(db, "subscriptions"));
  subscriptions.value = querySnapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
};

const deleteSubscription = async (id) => {
  await deleteDoc(doc(db, "subscriptions", id));
  alert("Subscription deleted successfully!");
  loadData();
};

onMounted(loadData);
</script>