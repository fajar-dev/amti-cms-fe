<template>
  <UModal
    v-model:open="lightboxOpen"
    :title="$t('common.imagePreview')"
    :description="lightboxAlt || $t('common.imagePreview')"
    :ui="{
      content: 'h-5/6 sm:max-w-6xl bg-transparent divide-y-0 ring-0 shadow-none overflow-visible'
    }"
  >
    <template #content>
      <img
        :src="lightboxImage"
        :alt="lightboxAlt || $t('common.imagePreview')"
        class="h-full min-h-0 w-full rounded-lg object-contain p-4 sm:p-8"
      >
      <UButton
        icon="i-lucide-x"
        color="neutral"
        variant="solid"
        class="absolute top-2 right-2 rounded-full"
        :aria-label="$t('common.closePreview')"
        @click="closeLightbox"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const { lightboxOpen, lightboxImage, lightboxAlt, closeLightbox } = useLightbox()
const route = useRoute()

watch(() => route.fullPath, closeLightbox)
</script>
