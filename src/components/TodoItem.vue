<template>
  <div class="todo-item">
    <div class="todo-item__left">
      <div class="btn-check">
        <font-awesome-icon icon="check"/>
      </div>
      <span :class="[todo.status, { 'done': todo.status === 'DONE' }]">{{ todo.text }}</span>
    </div>
    <div class="todo-item__right"> 
      <select v-model="todo.status">
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
      <div class="bnt-list btn-edit">
        <button @click="editTodo">
          <font-awesome-icon icon="edit"/>
        </button>
      </div>
      <div class="btn-list btn-trash">
        <button @click="deleteTodo">
          <font-awesome-icon icon="trash"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<{ text: string; status: string }>,
      required: true
    }
  },
  methods: {
    editTodo() {
      this.$emit('edit', this.todo);
    },
    deleteTodo() {
      this.$emit('delete', this.todo);
    },
    updateStatus() {
      this.$emit('update-status', this.todo);
    }
  }
});
</script>

<style scoped lang="scss">
@import '../styles/components/TodoItem.scss';
</style>
