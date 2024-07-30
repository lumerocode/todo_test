<template>
  <div class="todo-list">
    <p v-if="todos.length === 0">Start creating your list items</p>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @edit="editTodo"
      @delete="deleteTodo"
      @update-status="updateTodoStatus"
    />
    <!-- Modal to add TODO -->
    <TodoModal v-if="showAddTodoModal" :todo="todoToEdit" @close="showAddTodoModal = false" @save="addTodo" />
    <!-- Modal to confirm deletion -->
    <ConfirmModal v-if="showConfirmModal" @confirm="confirmDelete" @cancel="showConfirmModal = false" />
  </div>
  <button class="btn-add" @click="showAddTodoModal = true">+</button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import TodoItem from './TodoItem.vue';
import TodoModal from './TodoModal.vue';
import ConfirmModal from './ConfirmModal.vue';
import todoStore from '../store/todoStore';

export default defineComponent({
  components: { TodoItem, TodoModal, ConfirmModal },
  setup() {
    const todos = ref(todoStore.todos);
    const showAddTodoModal = ref(false);
    const showConfirmModal = ref(false);
    const todoToEdit = ref<{ id: number; text: string; status: string } | null>(null);
    const todoToDelete = ref<{ id: number } | null>(null);

    // Load TODOs from localStorage when mounting component
    onMounted(() => {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        todos.value = JSON.parse(savedTodos);
      }
    });

    // Save TODO in localStorage every time they change
    watch(todos, (newTodos) => {
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }, { deep: true });

    function addTodo(newTodo: { id?: number; text: string; status: string }) {
      if (todoToEdit.value) {
        // Edit existing TODO
        todoStore.editTodo({ ...todoToEdit.value, ...newTodo });
      } else {
        // Add new TODO
        todoStore.addTodo(newTodo);
      }
      showAddTodoModal.value = false;
      resetTodoModal()
    }

    function editTodo(todo: { id: number; text: string; status: string }) {
      todoToEdit.value = todo;
      showAddTodoModal.value = true;
    }

    function deleteTodo(todo: { id: number }) {
      todoToDelete.value = todo;
      showConfirmModal.value = true;
    }

    function confirmDelete() {
      if (todoToDelete.value) {
        todoStore.deleteTodo(todoToDelete.value.id);
        todoToDelete.value = null;
        showConfirmModal.value = false;
      }
    }

    function updateTodoStatus(updatedTodo: { id: number; text: string; status: string }) {
      const index = todos.value.findIndex(t => t.id === updatedTodo.id);
      if (index !== -1) {
        todos.value[index].status = updatedTodo.status;
      }
    }

    function resetTodoModal() {
      todoToEdit.value = null;
    }

    return {
      todos,
      addTodo,
      editTodo,
      deleteTodo,
      showAddTodoModal,
      showConfirmModal,
      confirmDelete,
      updateTodoStatus,
      todoToEdit,
      resetTodoModal,
    };
  }
});
</script>

<style scoped lang="scss">
@import '../styles/components/TodoList.scss';
</style>
