import TodosView from '@/views/todos/TodosView.vue';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { describe, expect, it } from 'vitest';

describe('Todos View', () => {
  it('adds a todo via input + button', async () => {
    const wrapper = mount(TodosView, {
      global: {
        plugins: [createPinia()],
      },
    });
    const input = wrapper.get('[data-test="todo-input"] input');
    await input.setValue('New Task');
    await wrapper.get('[data-test="todo-input"] button').trigger('click');
    expect(wrapper.text()).toContain('New Task');
  });
});
