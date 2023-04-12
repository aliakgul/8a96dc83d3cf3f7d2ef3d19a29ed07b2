<template>
  <div class="transaction-table">
    <table class="table table-secondary table-hover caption-bottom">
      <caption>
        {{
          transactions.length ? 'Transaction History' : 'No Transactions Yet.'
        }}
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
        <tr v-for="(transaction, index) in state.reversedTransactions" :key="index">
          <th scope="col">{{ index }}</th>
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
import { reactive } from 'vue'

export default {
  props: {
    transactions: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props) {
    const state = reactive({
      reversedTransactions: props.transactions.slice().reverse()
    })

    return { state }
  }
}
</script>
