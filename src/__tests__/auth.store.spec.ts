import { useAuthStore } from '@/stores/auth';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('logs in and logs out', async () => {
    const store = useAuthStore();
    expect(store.isAuthenticated).toBe(false);
    await store.login('test@example.com', 'pw');
    expect(store.isAuthenticated).toBe(true);
    await store.logout();
    expect(store.isAuthenticated).toBe(false);
  });
});
