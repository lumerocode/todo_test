<template>
  <div class="todo-item">
    <div class="todo-item__left">
      <font-awesome-icon icon="check" />
      <span :class="todo.status">{{ todo.text }}</span>
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
.todo-item {
  width: 600px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #E0E0E0;
  background-color: #FFFFFF;
  justify-content: space-between;

  &__left {
    display: flex;
    column-gap: 1rem;
    align-items: center;

    span {
      font-size: 16px;
    }
  }

  &__right {
    display: flex;
    column-gap: 2rem;
    align-items: center;

    select {
      background-color: #EBF1FF;
      font-family: Arial, sans-serif;
      border-radius: 4px;
      width: 130px;
      height: 30px;
      font-size: 16px;
      border: 1px solid #E0E0E0;
    }

    .btn-edit, .btn-trash {
      svg {
        color: #0074FF;
      }
    }

    .btn-trash:hover {
      svg {
        color: red;
      }
    }

  }
}
</style>
