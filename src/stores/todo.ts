import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface TodoItem {
  id: string
  title: string
  completed: boolean
}

export type TodoFilter = 'all' | 'active' | 'completed'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<TodoItem[]>([])
  const filter = ref<TodoFilter>('all')

  const allCount = computed(() => todos.value.length)
  const activeCount = computed(() => todos.value.filter(t => !t.completed).length)
  const completedCount = computed(() => todos.value.filter(t => t.completed).length)
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(t => !t.completed)
      case 'completed':
        return todos.value.filter(t => t.completed)
      default:
        return todos.value
    }
  })

  function setFilter(next: TodoFilter) {
    filter.value = next
  }

  function addTodo(title: string) {
    const trimmed = title.trim()
    if (!trimmed) return
    todos.value.unshift({ id: crypto.randomUUID(), title: trimmed, completed: false })
  }

  function toggleTodo(id: string) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.completed = !todo.completed
  }

  function removeTodo(id: string) {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  function clearCompleted() {
    todos.value = todos.value.filter(t => !t.completed)
  }

  function editTodo(id: string, title: string) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.title = title.trim()
  }

  return {
    todos,
    filter,
    filteredTodos,
    allCount,
    activeCount,
    completedCount,
    setFilter,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted,
    editTodo,
  }
})


