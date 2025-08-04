<template>
  <div class="relative flex flex-col items-start transition-all duration-300">
    <!-- Optimal Pick Badge -->
    <!-- <div
      v-if="isOptimal"
      class="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-2 py-1 text-xs font-bold rounded-full z-10"
    >
      Optimal Pick
    </div> -->

    <!-- Credit Card Image -->
    <div class="credit-card-container rounded-xl overflow-hidden shadow-lg mb-3">
      <img v-if="img" :src="img" :alt="name" class="w-full h-full object-cover" />
      <div
        v-else
        class="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center"
      >
        <span class="text-white font-bold text-sm">{{ name }}</span>
      </div>
    </div>

    <!-- Card Info Below Image -->
    <div class="text-left w-full" :style="textStyles">
      <h3 class="font-display font-bold text-base leading-tight mb-1">{{ name }}</h3>
      <div class="text-xs space-y-0.5">
        <p><span class="font-semibold">Limit:</span> {{ limit }}</p>
        <p><span class="font-semibold">Rewards:</span> {{ points }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  limit: string
  points: string
  img: string
  link: string
  isOwned: boolean
  isUnlocked: boolean
  isOptimal: boolean
}>()

const textStyles = computed(() => {
  if (props.isOwned) {
    return {
      color: '#22c55e', // green for owned
    }
  }
  if (props.isUnlocked) {
    return {
      color: '#f97316', // orange for unlocked
    }
  }
  return {
    color: '#9ca3af', // gray for locked
    opacity: '0.8',
  }
})
</script>

<style scoped>
.credit-card-container {
  /* Responsive sizing with standard credit card aspect ratio 1.58:1 */
  width: clamp(180px, 15.6vw, 200px);
  height: clamp(114px, 9.92vw, 120px);
  aspect-ratio: 1.58/1;
}

@media (max-width: 768px) {
  .credit-card-container {
    width: clamp(120px, 35vw, 300px);
    height: clamp(76px, 22.2vw, 190px);
  }
}
</style>
