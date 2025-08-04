<script setup lang="ts">
import SkillTree from '../components/SkillTree.vue'
import { larrySkillTree } from '@/data/skillTreeData.ts'
</script>

<template>
  <div class="flex flex-col h-screen p-6">
    <h2 class="font-display text-3xl font-bold text-white mb-8 flex-shrink-0">
      Goal: Travel The World
    </h2>
    <div class="flex-grow w-full h-full overflow-auto rounded-lg">
      <SkillTree :nodes="larrySkillTree" />
    </div>
  </div>
</template>
