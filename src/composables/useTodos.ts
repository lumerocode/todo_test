import { ref } from 'vue';

interface Todo {
  id: number;
  title: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
}

const todos = ref<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value));
};

const addTodo = (title: string) => {
  todos.value.push({
    id: Date.now(),
    title,
    status: 'PENDING',
  });
  saveTodos();
};

const editTodo = (id: number, title: string, status: Todo['status']) => {
  const todo = todos.value.find(todo => todo.id === id);
  if (todo) {
    todo.title = title;
    todo.status = status;
    saveTodos();
  }
};

const deleteTodo = (id: number) => {
  todos.value = todos.value.filter(todo => todo.id !== id);
  saveTodos();
};

export const useTodos = () => {
  return {
    todos,
    addTodo,
    editTodo,
    deleteTodo,
  };
};
