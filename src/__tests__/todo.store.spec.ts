import { useTodoStore } from '@/stores/todo';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Todo Store', () => {
  beforeEach(() => setActivePinia(createPinia()));

  it('adds and toggles a todo', () => {
    const todo = useTodoStore();
    todo.addTodo('Task 1');
    expect(todo.allCount).toBe(1);
    const id = todo.todos[0].id;
    todo.toggleTodo(id);
    expect(todo.completedCount).toBe(1);
  });

  it('filters active and completed', () => {
    const todo = useTodoStore();
    todo.addTodo('A');
    todo.addTodo('B');
    const id = todo.todos[0].id;
    todo.toggleTodo(id);
    todo.setFilter('active');
    expect(todo.filteredTodos.every((t) => !t.completed)).toBe(true);
    todo.setFilter('completed');
    expect(todo.filteredTodos.every((t) => t.completed)).toBe(true);
  });

  it('clears completed', () => {
    const todo = useTodoStore();
    todo.addTodo('A');
    const id = todo.todos[0].id;
    todo.toggleTodo(id);
    todo.clearCompleted();
    expect(todo.completedCount).toBe(0);
  });
});
