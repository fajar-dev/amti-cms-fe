<template>
  <UModal
    v-model:open="open"
    :title="$t('pages.messages.detailTitle')"
    :ui="{ content: 'sm:max-w-xl' }"
  >
    <template #body>
      <div
        v-if="message"
        class="space-y-5"
      >
        <!-- Header Info Card -->
        <div class="bg-muted/15 border border-default rounded-lg p-4 space-y-3">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="text-base font-semibold text-highlighted">
                {{ message.subject }}
              </h3>
              <p class="text-xs text-muted mt-0.5">
                {{ formatDate(message.createdAt) }}
              </p>
            </div>
            <UBadge
              :color="message.isRead ? 'neutral' : 'primary'"
              variant="subtle"
              class="shrink-0"
            >
              <span
                v-if="!message.isRead"
                class="w-1.5 h-1.5 rounded-full bg-primary inline-block mr-1"
              />
              {{ message.isRead ? $t('pages.messages.read') : $t('pages.messages.unread') }}
            </UBadge>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-default text-sm">
            <div>
              <span class="text-xs text-muted block">{{ $t('pages.messages.columnSender') }}</span>
              <span class="font-medium text-highlighted">{{ message.name }}</span>
            </div>
            <div>
              <span class="text-xs text-muted block">{{ $t('pages.messages.email') }}</span>
              <a
                :href="mailtoLink"
                class="font-medium text-primary hover:underline inline-flex items-center gap-1"
              >
                <UIcon
                  name="i-lucide-mail"
                  class="w-3.5 h-3.5"
                />
                {{ message.email }}
              </a>
            </div>
            <div v-if="message.phone">
              <span class="text-xs text-muted block">{{ $t('pages.messages.phone') }}</span>
              <a
                :href="`tel:${message.phone}`"
                class="font-medium text-highlighted hover:underline inline-flex items-center gap-1"
              >
                <UIcon
                  name="i-lucide-phone"
                  class="w-3.5 h-3.5"
                />
                {{ message.phone }}
              </a>
            </div>
            <div v-else>
              <span class="text-xs text-muted block">{{ $t('pages.messages.phone') }}</span>
              <span class="text-muted text-xs italic">{{ $t('pages.messages.noPhone') }}</span>
            </div>
          </div>
        </div>

        <!-- Message Content -->
        <div class="space-y-2">
          <h4 class="text-xs font-semibold text-muted uppercase tracking-wider">
            {{ $t('pages.messages.message') }}
          </h4>
          <div class="p-4 rounded-lg bg-default border border-default text-sm text-highlighted whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
            {{ message.message }}
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div
        v-if="message"
        class="flex flex-wrap items-center justify-between gap-2 w-full"
      >
        <!-- Left Action: Delete -->
        <div>
          <UButton
            v-if="can('messages.delete')"
            color="error"
            variant="ghost"
            icon="i-lucide-trash-2"
            @click="handleDelete"
          >
            {{ $t('pages.messages.deleteMessage') }}
          </UButton>
        </div>

        <!-- Right Actions: Reply & Status Toggle & Close -->
        <div class="flex items-center gap-2">
          <UButton
            v-if="can('messages.update')"
            color="neutral"
            variant="outline"
            :icon="message.isRead ? 'i-lucide-mail' : 'i-lucide-mail-open'"
            :loading="isToggling"
            @click="handleToggleRead"
          >
            {{ message.isRead ? $t('pages.messages.markAsUnread') : $t('pages.messages.markAsRead') }}
          </UButton>

          <UButton
            :href="mailtoLink"
            color="primary"
            icon="i-lucide-reply"
          >
            {{ $t('pages.messages.reply') }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { messageService } from '~/services/message-service'
import type { Message } from '~/types/message'

const open = defineModel<boolean>({ default: false })
const props = defineProps<{
  message: Message | null
}>()

const emit = defineEmits<{
  updated: [message: Message]
  delete: [message: Message]
}>()

const toast = useToast()
const { t } = useI18n()
const { can } = usePermission()
const isToggling = ref(false)

const mailtoLink = computed(() => {
  if (!props.message) return '#'
  const subject = encodeURIComponent(`Re: ${props.message.subject}`)
  return `mailto:${props.message.email}?subject=${subject}`
})

function formatDate(val: string) {
  if (!val) return '-'
  return new Date(val).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

// Auto mark as read on view if unread
watch(open, async (isOpen) => {
  if (isOpen && props.message && !props.message.isRead && can('messages.update')) {
    try {
      const res = await messageService.updateStatus(props.message.id, true)
      if (res.success && res.data) {
        emit('updated', res.data)
      }
    } catch {
      // Silently ignore background mark-as-read failure
    }
  }
})

async function handleToggleRead() {
  if (!props.message) return
  isToggling.value = true
  try {
    const newStatus = !props.message.isRead
    const res = await messageService.updateStatus(props.message.id, newStatus)
    if (res.success && res.data) {
      toast.add({
        title: t('pages.messages.statusUpdatedSuccess'),
        icon: 'i-lucide-check-circle',
        color: 'success'
      })
      emit('updated', res.data)
    }
  } finally {
    isToggling.value = false
  }
}

function handleDelete() {
  if (!props.message) return
  open.value = false
  emit('delete', props.message)
}
</script>
