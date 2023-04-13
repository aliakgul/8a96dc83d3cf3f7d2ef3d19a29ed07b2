<template>
  <div class="table-responsive-sm">
    <table class="table align-middle caption-bottom">
      <caption>
        Timeseries Table
      </caption>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">From</th>
          <th scope="col">To</th>
          <th scope="col">Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in tableData" :key="data.date">
          <td>{{ data.date }}</td>
          <td>{{ data.from }}</td>
          <td>{{ data.to }}</td>
          <td>{{ data.rate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
