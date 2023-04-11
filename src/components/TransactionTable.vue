<template>
  <div class="transaction-table">
    <table class="table table-primary table-hover table-sm caption-bottom">
      <caption>
        {{transactions.length ? 'Transaction History' : 'No Transactions Yet.'}}
      </caption>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Timestamp</th>
          <th scope="col">Date</th>
          <th scope="col">From</th>
          <th scope="col">To</th>
          <th scope="col">Rate</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, index) in transactions.slice().reverse()" :key="index">
          <th>{{ index }}</th>
          <td>{{ transaction.timestamp }}</td>
          <td>{{ transaction.date }}</td>
          <td>{{ transaction.from }}</td>
          <td>{{ transaction.to }}</td>
          <td>{{ transaction.rate }}</td>
          <td>{{ transaction.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TransactionTable',
  props: {
    transactions: Array
  }
}
</script>
