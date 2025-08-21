<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-2xl font-bold">404 - Page non trouvée</h1>
    <p>La page demandée n'existe pas.</p>
    <Button asChild>
      <RouterLink to="/">Retour à l'accueil</RouterLink>
    </Button>
  </section>
</template>
