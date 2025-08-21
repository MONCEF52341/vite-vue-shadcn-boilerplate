<script setup lang="ts">
import TodoInput from '@/components/todo/TodoInput.vue'
import TodoList from '@/components/todo/TodoList.vue'
import { Button } from '@/components/ui/button'
import { useTodoStore, type TodoFilter } from '@/stores/todo'

const todo = useTodoStore()

function add(title: string) {
  todo.addTodo(title)
}

function setFilter(f: TodoFilter) {
  todo.setFilter(f)
}
</script>

<template>
  <div class="mx-auto max-w-lg space-y-4">
    <h1 class="text-2xl font-bold">Todolist</h1>
    <TodoInput @submit="add" />

    <div class="flex items-center justify-between">
      <div class="flex gap-2">
        <Button :variant="todo.filter === 'all' ? 'default' : 'outline'" size="sm" @click="setFilter('all')">Tous ({{ todo.allCount }})</Button>
        <Button :variant="todo.filter === 'active' ? 'default' : 'outline'" size="sm" @click="setFilter('active')">Actifs ({{ todo.activeCount }})</Button>
        <Button :variant="todo.filter === 'completed' ? 'default' : 'outline'" size="sm" @click="setFilter('completed')">Terminés ({{ todo.completedCount }})</Button>
      </div>
      <Button variant="secondary" size="sm" @click="todo.clearCompleted">Effacer terminés</Button>
    </div>

    <TodoList :items="todo.filteredTodos" @toggle="todo.toggleTodo" @remove="todo.removeTodo" />
  </div>
  
</template>


