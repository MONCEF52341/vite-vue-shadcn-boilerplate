<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);

async function handleAuthClick() {
  if (authStore.isAuthenticated) {
    await authStore.logout();
  } else {
    await authStore.login('demo@example.com', 'password');
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b bg-card">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <nav class="flex gap-2">
          <Button asChild>
            <RouterLink to="/">Home</RouterLink>
          </Button>
          <Button asChild variant="secondary">
            <RouterLink to="/about">About</RouterLink>
          </Button>
          <Button asChild variant="outline">
            <RouterLink to="/counter">Counter</RouterLink>
          </Button>
          <Button asChild variant="outline">
            <RouterLink to="/calculator">Calculator</RouterLink>
          </Button>
          <Button asChild variant="outline">
            <RouterLink to="/tic-tac-toe">Tic-Tac-Toe</RouterLink>
          </Button>
          <Button asChild variant="outline">
            <RouterLink to="/todos">Todos</RouterLink>
          </Button>
          <Button asChild variant="outline">
            <RouterLink to="/vue-use">Vue Use Demo</RouterLink>
          </Button>
        </nav>
        <div class="flex items-center gap-2">
          <Button @click="handleAuthClick">{{ isAuthenticated ? 'Logout' : 'Login' }}</Button>
        </div>
      </div>
    </header>
    <main class="container mx-auto px-4 py-6 flex-1">
      <RouterView />
    </main>
  </div>
</template>
