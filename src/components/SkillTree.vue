<template>
  <div class="relative w-full h-full flex items-center justify-center overflow-auto">
    <div
      class="relative"
      :style="{
        width: `${bounds.width}px`,
        height: `${bounds.height}px`,
      }"
    >
      <!-- Connection layer -->
      <svg ref="svgRef" :width="bounds.width" :height="bounds.height" class="absolute inset-0" />

      <!-- Cards layer -->
      <div
        class="absolute inset-0"
        :style="{
          transform: `translate(${-bounds.minX}px, ${-bounds.minY}px)`,
        }"
      >
        <div
          v-for="node in allNodes"
          :key="node.data.id"
          class="absolute"
          :style="{
            transform: `translate(${node.y}px, ${node.x}px)`,
          }"
        >
          <SkillCard
            :name="node.data.name"
            :limit="node.data.limit"
            :points="node.data.points"
            :img="node.data.img || ''"
            :link="node.data.link"
            :is-owned="node.data.isOwned"
            :is-unlocked="node.data.isUnlocked"
            :is-optimal="node.data.isOptimal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import * as d3 from 'd3'
import type { HierarchyPointNode, HierarchyLink } from 'd3'
import SkillCard from './SkillCard.vue'
import type { SkillNodeData } from '@/data/skillTreeData.ts'

/* ─── LAYOUT CONSTANTS ─────────────────────────────── */
const CARD_W = 200 // must match SkillCard final width
const CARD_H = 120 // must match SkillCard final height
const COL_GAP = 120 // horizontal gap between columns
const ROW_GAP = 200 // vertical gap between rows
/* ───────────────────────────────────────────────────── */

/* props */
const props = defineProps<{ nodes: SkillNodeData[] }>()
const svgRef = ref<SVGSVGElement | null>(null)

/* Build a hierarchy using d3.tree */
const tree = computed(() => {
  if (!props.nodes || props.nodes.length === 0) {
    return null
  }

  const root = d3
    .stratify<SkillNodeData>()
    .id((d) => d.id)
    .parentId((d) => d.parentId)(props.nodes)

  const treeLayout = d3.tree<SkillNodeData>().nodeSize([0, CARD_W + COL_GAP])
  const hierarchy = treeLayout(root)

  // Override y-positions to be grid-based
  const nodesByDepth: { [key: number]: HierarchyPointNode<SkillNodeData>[] } = {}
  hierarchy.each((node) => {
    if (!nodesByDepth[node.depth]) {
      nodesByDepth[node.depth] = []
    }
    nodesByDepth[node.depth].push(node as HierarchyPointNode<SkillNodeData>)
  })

  Object.values(nodesByDepth).forEach((nodes) => {
    nodes.forEach((node, i) => {
      node.x = i * (CARD_H + ROW_GAP)
    })
  })

  return hierarchy
})

const allNodes = computed(() => (tree.value ? tree.value.descendants() : []))
const allLinks = computed(() => (tree.value ? tree.value.links() : []))

/* bounding box for svg */
const bounds = computed(() => {
  if (allNodes.value.length === 0) {
    return { width: 0, height: 0, minX: 0, minY: 0 }
  }

  let minNodeY = Infinity,
    maxNodeY = -Infinity,
    minNodeX = Infinity,
    maxNodeX = -Infinity

  allNodes.value.forEach((node: HierarchyPointNode<SkillNodeData>) => {
    minNodeY = Math.min(minNodeY, node.y)
    maxNodeY = Math.max(maxNodeY, node.y)
    minNodeX = Math.min(minNodeX, node.x)
    maxNodeX = Math.max(maxNodeX, node.x)
  })

  const padding = 20
  const width = maxNodeY - minNodeY + CARD_W + padding * 2
  const height = maxNodeX - minNodeX + CARD_H + padding * 2
  const minX = minNodeY - padding
  const minY = minNodeX - padding

  return { width, height, minX, minY }
})

/* Draw right-angled connectors */
function drawLinks() {
  const svgEl = svgRef.value
  if (!svgEl) return
  const svg = d3.select(svgEl)
  svg.selectAll('*').remove() // Clear previous links

  if (allLinks.value.length === 0) return

  const g = svg
    .append('g')
    .attr('transform', `translate(${-bounds.value.minX}, ${-bounds.value.minY})`)

  // A custom path generator for right-angled links
  const pathGenerator = (link: HierarchyLink<SkillNodeData>) => {
    const source = link.source as HierarchyPointNode<SkillNodeData>
    const target = link.target as HierarchyPointNode<SkillNodeData>
    const x1 = source.y + CARD_W
    const y1 = source.x + CARD_H / 2
    const x4 = target.y
    const y4 = target.x + CARD_H / 2
    const xMid = x1 + (x4 - x1) / 2
    return `M${x1},${y1} H${xMid} V${y4} H${x4}`
  }

  g.selectAll('path')
    .data(allLinks.value)
    .join('path')
    .attr('d', pathGenerator)
    .attr('fill', 'none')
    .attr('stroke-width', 6)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke', ({ source, target }) => {
      if (source.data.isOwned && target.data.isOwned) return '#22c55e'
      if (
        (source.data.isOwned && target.data.isUnlocked) ||
        (source.data.isUnlocked && target.data.isUnlocked)
      )
        return '#f97316'
      return '#6b7280'
    })
}

watch(tree, () => nextTick(drawLinks), { immediate: true, deep: true })
</script>

<style scoped>
path {
  transition: stroke 0.25s ease-in-out;
}
</style>
