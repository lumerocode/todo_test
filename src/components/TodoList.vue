<template>
  <div class="todo-list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @edit="editTodo"
      @delete="deleteTodo"
      @update-status="updateTodoStatus"
    />
    <!-- Modal para agregar TODO -->
    <TodoModal v-if="showAddTodoModal" @close="showAddTodoModal = false" @save="addTodo" />
    <!-- Modal para confirmación de eliminación -->
    <ConfirmModal v-if="showConfirmModal" @confirm="confirmDelete" @cancel="showConfirmModal = false" />
  </div>
  <button @click="showAddTodoModal = true">+</button>
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
    const todoToDelete = ref<{ id: number } | null>(null);

    // Cargar TODOs desde localStorage al montar el componente
    onMounted(() => {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        todos.value = JSON.parse(savedTodos);
      }
    });

    // Guardar TODOs en localStorage cada vez que cambien
    watch(todos, (newTodos) => {
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }, { deep: true });

    function addTodo(newTodo: { text: string; status: string }) {
      todoStore.addTodo(newTodo);
      showAddTodoModal.value = false;
    }

    function editTodo(todo: { id: number; text: string; status: string }) {
      todoStore.editTodo(todo);
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

    return {
      todos,
      addTodo,
      editTodo,
      deleteTodo,
      showAddTodoModal,
      showConfirmModal,
      confirmDelete,
      updateTodoStatus
    };
  }
});
</script>

<style scoped lang="scss">
  .todo-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.5rem;
    justify-content: center;
  }

  button {
    align-items: center;
    border: none;
    border-radius: 50%;
    bottom: 24px;
    box-shadow: 0 5px 25px rgba(0, 116, 255, 0.5);
    color: #fafafa;
    cursor: pointer;
    display: flex;
    font-size: 50px;
    font-weight: 700;
    height: 64px;
    justify-content: center;
    position: fixed;
    right: 24px;
    -webkit-transform: rotate(0);
    transform: rotate(0);
    transition: .3s ease;
    width: 64px;
    z-index: 1;
    background-color: #0074FF;
  }
</style>
