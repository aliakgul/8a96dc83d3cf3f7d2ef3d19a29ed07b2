<template>
  <div class="feedback-component">
    <div class="toast-container position-absolute bottom-0 start-50 translate-middle-x">
      <div
        ref="toastElement"
        class="toast align-items-center text-bg-danger border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">
            {{ message }}
          </div>
          <button
            type="button"
            class="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onUpdated, ref } from 'vue'
import { Toast } from 'bootstrap'

export default {
  props: {
    shouldShow: Boolean,
    message: {
      type: String,
      default() {
        return 'Something went wrong'
      }
    }
  },
  setup(props) {
    const toastElement = ref(null)

    onUpdated(() => {
      if (props.shouldShow) {
        new Toast(toastElement.value).show()
      }
    })

    return { toastElement }
  }
}
</script>
