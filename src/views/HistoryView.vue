<template>
  <TransactionTable :transactions="transactionStoreState.transactions" />
</template>

<script>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTransactionHistoryStore } from '@/stores/exchangeStore'
import { TransactionTable } from '../components'

export default {
  components: { TransactionTable },
  setup() {
    const transactionStore = useTransactionHistoryStore()
    const transactionStoreState = ref(storeToRefs(transactionStore))

    return {
      transactionStoreState
    }
  }
}
</script>
