<thead class="table-light">
  <tr>
    <th>Subscription</th>
    <th>Amount</th>
    <th>Frequency</th>
    <th>Description</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  <tr v-for="s in items" :key="s.id">
    <td>{{ s.name }}</td>
    <td>${{ Number(s.amount).toFixed(2) }}</td>
    <td>{{ s.frequency }}</td>
    <td>{{ s.description }}</td>
    <td>
      <RouterLink class="btn btn-primary me-2" :to="`/edit/${s.id}`">Edit</RouterLink>
      <button class="btn btn-danger" @click="remove(s.id)">Delete</button>
    </td>
  </tr>
</tbody>