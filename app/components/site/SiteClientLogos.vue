<template>
  <ul
    class="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 sm:gap-x-20"
    :aria-label="$t('site.clients.aria')"
  >
    <li
      v-for="logo in logos"
      :key="logo.name"
    >
      <a
        v-if="logo.website"
        :href="logo.website"
        target="_blank"
        rel="noopener noreferrer"
        :title="logo.name"
        class="inline-flex items-center transition-transform hover:scale-105"
      >
        <img
          :src="logo.src"
          :alt="logo.name"
          loading="lazy"
          class="h-10 w-auto opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-12"
        >
      </a>
      <img
        v-else
        :src="logo.src"
        :alt="logo.name"
        loading="lazy"
        class="h-10 w-auto opacity-70 transition-opacity duration-300 hover:opacity-100 sm:h-12"
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
export interface ClientLogo {
  name: string
  src: string
  website?: string | null
}

defineProps<{
  logos: ClientLogo[]
}>()
</script>
