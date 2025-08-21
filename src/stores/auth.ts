import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface UserProfile {
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserProfile | null>(null)
  const isAuthenticated = computed(() => user.value !== null)

  async function login(email: string, _password: string) {
    await new Promise((resolve) => setTimeout(resolve, 150))
    user.value = { email }
  }

  async function logout() {
    await new Promise((resolve) => setTimeout(resolve, 50))
    user.value = null
  }

  return { user, isAuthenticated, login, logout }
})


