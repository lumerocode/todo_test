<template>
  <div class="todo-modal-overlay" @click="handleOverlayClick">
    <div class="todo-modal-content" @click.stop>
      <h3>{{ isEditing ? 'Edit TODO' : 'Add TODO' }}</h3>
      <form @submit.prevent="saveTodo">
        <div class="form-group">
          <label for="todo-text">TODO Text:</label>
          <input
            id="todo-text"
            v-model="todoText"
            type="text"
            placeholder="Enter TODO text"
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

<style scoped>
.todo-modal-overlay {
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

.todo-modal-content {
  background: white;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.todo-modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.todo-modal-buttons button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.todo-modal-buttons button:first-child {
  background: #42b983;
  color: white;
}

.todo-modal-buttons button:last-child {
  background: #ccc;
}
</style>
