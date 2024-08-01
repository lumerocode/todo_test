<template>
  <div class="confirm-modal-overlay" @click="handleOverlayClick">
    <div class="confirm-modal-content" @click.stop>
      <h3>Are you sure you want to delete this item?</h3>
      <div class="confirm-modal-buttons">
        <button @click="confirm">Yes</button>
        <button @click="cancel">No</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConfirmModal',
  emits: ['confirm', 'cancel'],
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    },
    handleOverlayClick() {
      this.$emit('cancel');
    }
  }
});
</script>

<style scoped lang="scss">
@import '../styles/components/ConfirmModal.scss';
</style>
