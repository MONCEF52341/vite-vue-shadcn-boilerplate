import Counter from '@/views/counter/CounterView.vue'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'

describe('Counter View', () => {
  it('shows and increments count', async () => {
    const wrapper = mount(Counter, {
      global: { plugins: [createPinia()] },
    })
    expect(wrapper.get('[data-test="count"]').text()).toBe('0')
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('[data-test="count"]').text()).toBe('1')
    expect(wrapper.get('[data-test="double"]').text()).toBe('2')
  })
})


