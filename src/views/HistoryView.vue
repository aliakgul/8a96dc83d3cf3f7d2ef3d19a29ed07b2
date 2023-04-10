<template>
  <div class="history-view">
    <TransactionTable :transactions="transactions" />
    <FeedbackComponent v-if="isLoading" feedback="Loading" />
  </div>
</template>

<script setup>
import { useTransactionHistoryStore } from '@/stores/exchangeStore'
import { FeedbackComponent, TransactionTable } from '../components'
import { ref } from 'vue'

const isLoading = ref(false)

const { transactions } = useTransactionHistoryStore()
</script>
