<template>
  <div class="todo-view">
    <h2>ITEMS</h2>
    <TodoList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoList from '../components/TodoList.vue';

export default defineComponent({
  name: 'TodoView',
  components: {
    TodoList
  }
});
</script>

<style scoped>
.todo-view {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>
