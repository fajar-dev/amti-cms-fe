<script setup lang="ts">
defineProps<{ loading: boolean }>()
const emit = defineEmits<{ selected: [file: File] }>()

function handleSelected(file: File | null | undefined) {
  if (file) emit('selected', file)
}
</script>

<template>
  <UFileUpload
    :reset="true"
    :dropzone="false"
    :preview="false"
    :disabled="loading"
    accept="image/*,.pdf,.doc,.docx,.txt"
    @update:model-value="handleSelected"
  >
    <template #default="{ open }">
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-paperclip"
        :aria-label="$t('site.chat.attachFile')"
        :loading="loading"
        @click="open()"
      />
    </template>
  </UFileUpload>
</template>
