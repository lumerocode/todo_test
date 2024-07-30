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
import { defineComponent } from 'vue';

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

<style scoped>
.confirm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm-modal-content {
  background: white;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.confirm-modal-buttons {
  margin-top: 1rem;
}

.confirm-modal-buttons button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.confirm-modal-buttons button:first-child {
  background: #0074FF;
  color: white;
}

.confirm-modal-buttons button:last-child {
  background: #EBF1FF;
}
</style>
