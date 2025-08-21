import { useCounterStore } from '@/stores/counter'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('increments and computes double', () => {
    const store = useCounterStore()
    expect(store.count).toBe(0)
    expect(store.doubleCount).toBe(0)
    store.increment()
    expect(store.count).toBe(1)
    expect(store.doubleCount).toBe(2)
  })
})


