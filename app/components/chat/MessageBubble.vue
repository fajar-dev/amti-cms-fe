<script setup lang="ts">
import type { ChatMessage, ChatSenderType } from '~/types/livechat'

defineProps<{ msg: ChatMessage, ownSender: ChatSenderType }>()
const { locale } = useI18n()
</script>

<template>
  <div
    class="flex flex-col"
    :class="{
      'items-end': msg.senderType === ownSender,
      'items-start': msg.senderType !== ownSender && msg.senderType !== 'SYSTEM',
      'items-center text-center': msg.senderType === 'SYSTEM'
    }"
  >
    <!-- System notice -->
    <div
      v-if="msg.senderType === 'SYSTEM'"
      class="my-2 space-y-1 text-center text-xs text-muted"
    >
      <time
        :datetime="msg.createdAt"
        class="block"
      >{{ formatTime(msg.createdAt, locale) }}</time>
      <p class="font-normal">
        {{ msg.message }}
      </p>
    </div>

    <!-- Chat bubble (Visitor / User) -->
    <div
      v-else
      class="max-w-5/6 space-y-1"
    >
      <span
        v-if="msg.senderType !== ownSender"
        class="block text-xs font-medium text-muted"
      >
        {{ msg.senderName }}
      </span>

      <div
        class="rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-xs"
        :class="msg.senderType === ownSender
          ? 'rounded-tr-xs bg-primary text-white'
          : 'rounded-tl-xs border border-default bg-muted text-highlighted'"
      >
        <!-- Text Message -->
        <p
          v-if="msg.message"
          class="whitespace-pre-wrap break-words"
        >
          {{ msg.message }}
        </p>

        <!-- Media Attachment -->
        <div
          v-if="msg.mediaUrl"
          class="mt-2"
        >
          <!-- Image Attachment -->
          <CommonImagePreview
            v-if="msg.mediaType?.startsWith('image/')"
            :src="msg.mediaUrl"
            :alt="msg.mediaName || $t('site.chat.image')"
            class="rounded-xl border border-white/20 transition-opacity hover:opacity-90"
            image-class="max-h-48 w-full object-cover"
          />

          <!-- File / Document Attachment -->
          <a
            v-else
            :href="msg.mediaUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2.5 rounded-xl border p-2 transition-colors"
            :class="msg.senderType === ownSender
              ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
              : 'border-default bg-default text-highlighted hover:bg-muted'"
          >
            <UIcon
              name="i-lucide-file-text"
              class="size-5 shrink-0"
            />
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">
                {{ msg.mediaName || $t('site.chat.document') }}
              </p>
              <p
                v-if="msg.mediaSize"
                class="text-sm opacity-75"
              >
                {{ formatFileSize(msg.mediaSize, locale) }}
              </p>
            </div>
            <UIcon
              name="i-lucide-download"
              class="size-4 shrink-0 opacity-80"
            />
          </a>
        </div>
      </div>

      <span
        class="block text-xs text-muted"
        :class="msg.senderType === ownSender ? 'text-right' : 'text-left'"
      >
        {{ formatTime(msg.createdAt, locale) }}
      </span>
    </div>
  </div>
</template>
