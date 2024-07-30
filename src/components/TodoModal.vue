<template>
  <div class="todo-modal-overlay" @click="handleOverlayClick">
    <div class="todo-modal-content" @click.stop>
      <h3>{{ isEditing ? 'Edit TODO' : 'Add TODO' }}</h3>
      <form @submit.prevent="saveTodo">
        <div class="form-group">
          <label for="todo-text">Name:</label>
          <input
            id="todo-text"
            v-model="todoText"
            type="text"
            placeholder="Enter TODO name"
            required
          />
        </div>
        <div class="form-group">
          <label for="todo-status">Status:</label>
          <select id="todo-status" v-model="todoStatus">
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>
        <div class="todo-modal-buttons">
          <button type="submit">{{ isEditing ? 'Save Changes' : 'Add TODO' }}</button>
          <button type="button" @click="cancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'TodoModal',
  props: {
    todo: {
      type: Object,
      default: () => null
    }
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const isEditing = ref(!!props.todo);
    const todoText = ref(props.todo?.text || '');
    const todoStatus = ref(props.todo?.status || 'PENDING');

    function saveTodo() {
      if (todoText.value.trim() === '') {
        return; // Prevent saving if the text is empty
      }

      const newTodo = {
        text: todoText.value,
        status: todoStatus.value
      };

      if (isEditing.value) {
        // Edit existing TODO
        emit('save', { ...props.todo, ...newTodo });
      } else {
        // Add new TODO
        emit('save', newTodo);
      }

      emit('close');
    }

    function cancel() {
      emit('close');
    }

    // Watch for prop changes to update form values when editing
    watch(() => props.todo, (newTodo) => {
      if (newTodo) {
        todoText.value = newTodo.text;
        todoStatus.value = newTodo.status;
        isEditing.value = true;
      } else {
        todoText.value = '';
        todoStatus.value = 'PENDING';
        isEditing.value = false;
      }
    });

    return {
      isEditing,
      todoText,
      todoStatus,
      saveTodo,
      cancel
    };
  }
});
</script>

<style scoped lang="scss">
@import '../styles/components/TodoModal.scss';
</style>
