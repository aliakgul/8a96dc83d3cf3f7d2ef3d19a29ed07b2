<template>
  <div class="history-view">
    <TransactionTable :transactions="transactions" />
    <FeedbackComponent v-if="!transactions.length" feedback="No Transaction Yet" />
  </div>
</template>

<script setup>
import { useTransactionHistoryStore } from '@/stores/exchangeStore'
import { FeedbackComponent, TransactionTable } from '../components'

const { transactions } = useTransactionHistoryStore()
</script>
