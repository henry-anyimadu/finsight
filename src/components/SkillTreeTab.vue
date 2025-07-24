<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

interface Node { id: string; label: string; type: string; month: number }
interface EdgeMap { [key: string]: string[] }

const nodes = ref<Node[]>([])
const edges = ref<EdgeMap>({})

onMounted(async () => {
  const { data } = await axios.get('/api/skill-tree/starter')
  nodes.value = data.nodes
  edges.value = data.edges
})
</script>

<template>
  <section>
    <h2 class="font-display text-2xl mb-4">Your Credit Adventure</h2>

    <!-- simple horizontal scroll container -->
    <div class="relative overflow-x-auto py-8">
      <div class="flex space-x-10 min-w-max">
        <template v-for="n in nodes" :key="n.id">
          <div
            class="flex flex-col items-center"
            :style="{ marginLeft: n.id !== nodes[0].id ? '-4rem' : '0' }"
          >
            <!-- card bubble -->
            <div
              class="w-40 h-24 rounded-xl flex items-center justify-center
                     bg-bg-secondary ring-2"
              :class="n.type === 'CARD' ? 'ring-accent-blue' : 'ring-accent-purple'"
            >
              <span class="text-center px-2 text-sm">{{ n.label }}</span>
            </div>
            <!-- timeline marker -->
            <span class="mt-2 text-xs opacity-60">{{ n.month }} mo</span>
          </div>
        </template>
      </div>

      <!-- subtle bottom gradient -->
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-12
                  bg-gradient-to-t from-bg-primary to-transparent"></div>
    </div>
  </section>
</template>
