<template>
  <header class="flex items-center justify-between px-6 py-4 bg-bg-secondary rounded-b-2xl shadow-lg">
    <h1 class="font-display text-xl">Pointiful</h1>
    <button
      @click="$emit('toggle')"
      class="rounded-full bg-bg-primary p-2 hover:bg-bg-secondary transition"
    >
      🌓
    </button>
  </header>
</template>
