<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="space-y-6">
    <h1 class="text-2xl font-bold">Home</h1>
    <p class="text-muted-foreground">Bienvenue sur l'application Vue + Pinia + shadcn.</p>
    <div class="flex gap-2">
      <Button asChild>
        <RouterLink to="/counter">Aller au compteur</RouterLink>
      </Button>
      <Button asChild variant="secondary">
        <RouterLink to="/about">En savoir plus</RouterLink>
      </Button>
    </div>
  </section>
</template>
