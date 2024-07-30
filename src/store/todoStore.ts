import { ref } from 'vue';

const todos = ref<Array<{ id: number; text: string; status: string }>>(
  JSON.parse(localStorage.getItem('todos') || '[]')
);

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos.value));
}

function addTodo(todo: { text: string; status: string }) {
  todos.value.push({ ...todo, id: Date.now() });
  saveTodos();
}

function editTodo(updatedTodo: { id: number; text: string; status: string }) {
  const index = todos.value.findIndex(todo => todo.id === updatedTodo.id);
  if (index !== -1) {
    todos.value[index] = updatedTodo;
    saveTodos();
  }
}

function deleteTodo(id: number) {
  todos.value = todos.value.filter(todo => todo.id !== id);
  saveTodos();
}

export default {
  todos,
  addTodo,
  editTodo,
  deleteTodo
};
