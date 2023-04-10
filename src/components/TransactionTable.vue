<template>
  <div class="transaction-table">
    <table>
      <tr>
        <th>Timestamp</th>
        <th>Date</th>
        <th>From Currency</th>
        <th>To Currency</th>
        <th>Rate</th>
        <th>Amount</th>
      </tr>
      <tr v-for="transaction in transactions.slice().reverse()" :key="transaction.timestamp">
        <th>{{ transaction.timestamp }}</th>
        <th>{{ transaction.date }}</th>
        <th>{{ transaction.from }}</th>
        <th>{{ transaction.to }}</th>
        <th>{{ transaction.rate }}</th>
        <th>{{ transaction.amount }}</th>
      </tr>
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
