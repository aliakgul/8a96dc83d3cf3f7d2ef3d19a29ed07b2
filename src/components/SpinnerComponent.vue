<template>
  <div class="spinner-component">
    <div>{{ message }}</div>
    <div class="spinner-grow text-secondary" role="status">
      <span class="visually-hidden">{{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpinnerComponent',
  props: {
    message: String
  }
}
</script>
