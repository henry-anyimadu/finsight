<template>
  <nav class="w-64 h-full bg-black/30 text-white flex flex-col p-4 backdrop-blur-sm">
    <div class="p-4 mb-4">
      <h1 class="text-4xl font-bold text-center">CreditJourney</h1>
    </div>
    <ul class="flex-grow space-y-4">
      <li>
        <router-link
          to="/progress"
          class="flex items-center p-4 bg-indigo-950 rounded-lg hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
        >
          <span>Progress</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/goal"
          class="flex items-center p-4 bg-indigo-950 rounded-lg hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
        >
          <span>Goal</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/points"
          class="flex items-center p-4 bg-indigo-950 rounded-lg hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
        >
          <span>Points Tracker</span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/account"
          class="flex items-center p-4 bg-indigo-950 rounded-lg hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
        >
          <span>Account</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts"></script>
