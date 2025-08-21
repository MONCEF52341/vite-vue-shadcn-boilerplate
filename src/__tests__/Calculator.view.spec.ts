import CalculatorView from '@/views/calculator/CalculatorView.vue'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'

function btn(wrapper: any, text: string) {
  return wrapper.findAll('button').find((b: any) => b.text() === text)!
}

describe('Calculator View', () => {
  it('performs 12 + 3 = 15', async () => {
    const wrapper = mount(CalculatorView, {
      global: { plugins: [createPinia()] },
    })
    await btn(wrapper, '1').trigger('click')
    await btn(wrapper, '2').trigger('click')
    await btn(wrapper, '+').trigger('click')
    await btn(wrapper, '3').trigger('click')
    await btn(wrapper, '=').trigger('click')
    expect(wrapper.text()).toContain('15')
  })

  it('shows Error on divide by 0', async () => {
    const wrapper = mount(CalculatorView, {
      global: { plugins: [createPinia()] },
    })
    await btn(wrapper, '8').trigger('click')
    await btn(wrapper, '÷').trigger('click')
    await btn(wrapper, '0').trigger('click')
    await btn(wrapper, '=').trigger('click')
    expect(wrapper.text()).toContain('Error')
  })
})
