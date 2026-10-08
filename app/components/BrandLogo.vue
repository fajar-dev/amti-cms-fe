<template>
  <div class="flex items-center gap-3">
    <NuxtLink
      to="/"
      class="flex items-center gap-2.5"
    >
      <!-- Light Mode Logo -->
      <img
        src="/logo.png"
        alt="logo"
        class="h-12 w-auto dark:hidden"
      >
      <!-- Dark Mode Logo -->
      <img
        src="/logo-light.png"
        alt="logo"
        class="h-12 w-auto hidden dark:block"
      >
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isCollapsed?: boolean
}>()
</script>
