<template>
  <div class="feedback-component">{{ feedback }}</div>
</template>

<script>
export default {
  name: 'FeedbackComponent',
  props: {
    feedback: String
  }
}
</script>
