<script setup lang="ts">
import { z } from 'zod'
import type { UploadedMedia } from '~/types/livechat'

const message = defineModel<string>({ required: true })
const attachment = defineModel<UploadedMedia | null>('attachment', { required: true })
defineProps<{ sending: boolean, uploading: boolean, placeholder: string }>()
const emit = defineEmits<{ sent: [], selected: [file: File] }>()
const { t, locale } = useI18n()
const state = computed(() => ({ message: message.value, attachment: attachment.value }))
const schema = z.object({
  message: z.string().trim().max(2000, t('site.chat.messageTooLong')),
  attachment: z.custom<UploadedMedia>().nullable()
}).refine(value => Boolean(value.message || value.attachment), {
  message: t('site.chat.messageRequired'),
  path: ['message']
})
</script>

<template>
  <UForm
    :state="state"
    :schema="schema"
    class="space-y-2"
    @submit="emit('sent')"
  >
    <UCard
      v-if="attachment"
      :ui="{ body: 'flex items-center justify-between gap-2 p-2' }"
    >
      <span class="truncate text-sm">
        {{ attachment.name }} ({{ formatFileSize(attachment.size, locale) }})
      </span>
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-x"
        :aria-label="$t('site.chat.removeAttachment')"
        @click="attachment = null"
      />
    </UCard>
    <UFormField
      name="message"
      :aria-label="placeholder"
    >
      <UInput
        v-model="message"
        size="md"
        :placeholder="placeholder"
        :aria-label="placeholder"
        class="w-full"
      >
        <template #leading>
          <ChatAttachmentButton
            :loading="uploading"
            @selected="emit('selected', $event)"
          />
        </template>
        <template #trailing>
          <UButton
            type="submit"
            color="primary"
            size="sm"
            icon="i-lucide-send"
            :aria-label="$t('site.chat.sendMessage')"
            :loading="sending"
            :disabled="uploading || (!message.trim() && !attachment)"
          />
        </template>
      </UInput>
    </UFormField>
  </UForm>
</template>
