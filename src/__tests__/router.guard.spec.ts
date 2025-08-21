import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { createPinia, setActivePinia } from 'pinia';
import { describe, expect, it } from 'vitest';

describe('Router Guard', () => {
  it('redirects to home when route requires auth and not authenticated', async () => {
    setActivePinia(createPinia());
    const auth = useAuthStore();
    await router.push('/counter');
    await router.isReady();
    expect(router.currentRoute.value.name).toBe('home');
    // authenticate and try again
    await auth.login('a@b.c', 'x');
    await router.push('/counter');
    await router.isReady();
    expect(router.currentRoute.value.name).toBe('counter');
  });
});
