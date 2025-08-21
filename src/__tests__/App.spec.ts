import App from '@/App.vue';
import router from '@/router';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { describe, expect, it } from 'vitest';

describe('App', () => {
  it('renders layout and navigation', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    });
    await router.isReady?.();
    expect(wrapper.text()).toContain('Home');
    expect(wrapper.text()).toContain('About');
    expect(wrapper.text()).toContain('Counter');
  });
});
