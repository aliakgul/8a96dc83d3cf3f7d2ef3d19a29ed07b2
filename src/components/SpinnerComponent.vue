<template>
  <div>{{ message }}</div>
  <div class="spinner-grow" role="status"></div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default() {
        return 'Loading...'
      }
    }
  }
}
</script>
