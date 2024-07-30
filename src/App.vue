<template>
  <div id="app">
    <header>
      <h1>MY TODO LIST</h1>
    </header>
    <main>
      <TodoView />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoView from './views/TodoView.vue';

export default defineComponent({
  name: 'App',
  components: {
    TodoView
  }
});
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #333;
  background-color: #EBF1FF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: #0074FF;
  color: white;
  padding: 1rem;
}
</style>
