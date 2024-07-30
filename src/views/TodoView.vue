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

<style scoped lang="scss">
@import '../styles/components/TodoView.scss';
</style>
