<template>
  <UButton
    color="neutral"
    variant="link"
    class="block overflow-hidden p-0 cursor-zoom-in"
    :aria-label="$t('common.previewImage', { name: alt })"
    @click.stop="openLightbox(src, alt)"
  >
    <img
      :src="src"
      :alt="alt"
      :class="imageClass"
      loading="lazy"
    >
  </UButton>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  imageClass?: string
}>()

const { openLightbox } = useLightbox()
</script>
