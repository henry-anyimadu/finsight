<script setup lang="ts">
import { RouterView } from 'vue-router'
import VerticalSidebar from './components/VerticalSidebar.vue'
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <VerticalSidebar />
    <main class="flex-1 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>
