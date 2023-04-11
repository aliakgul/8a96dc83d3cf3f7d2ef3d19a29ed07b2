<template>
  <div class="history-view">
    <TransactionTable :transactions="transactions" />
  </div>
</template>

<script setup>
import { useTransactionHistoryStore } from '@/stores/exchangeStore'
import { TransactionTable } from '../components'

const { transactions } = useTransactionHistoryStore()
</script>
