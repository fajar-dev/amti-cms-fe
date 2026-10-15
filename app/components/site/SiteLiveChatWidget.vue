<script setup lang="ts">
const {
  isOpen,
  isStarting,
  isSending,
  isUploading,
  startError,
  session,
  messages,
  inputMessage,
  unreadBadge,
  pendingAttachment,
  messagesContainer,
  startForm,
  schema,
  handleFileSelected,
  handleStartChat,
  handleSendMessage,
  endChat,
  resetAndStartNew,
  toggleChat
} = useVisitorChat()
</script>

<template>
  <div class="fixed bottom-6 left-4 right-4 sm:left-auto z-50 flex flex-col items-end">
    <!-- Chat Window Container -->
    <Transition
      enter-active-class="motion-safe:transition motion-safe:duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-6 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="motion-safe:transition motion-safe:duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-6 scale-95"
    >
      <UCard
        v-if="isOpen"
        class="mb-3 flex h-144 max-h-dvh w-full flex-col overflow-hidden rounded-lg shadow-xl sm:w-100"
        :ui="{
          root: 'bg-default',
          header: 'bg-primary px-5 py-4 sm:px-5 sm:py-4 text-white',
          body: 'flex min-h-0 flex-1 flex-col overflow-hidden p-0 sm:p-0',
          footer: 'bg-default p-3 sm:p-3'
        }"
        role="dialog"
        :aria-label="$t('site.chat.widgetTitle')"
      >
        <!-- Header -->
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <UAvatar
                icon="i-lucide-headset"
                size="md"
                :chip="{ color: session?.status === 'IN_PROGRESS' ? 'success' : 'warning', position: 'bottom-right' }"
                class="bg-white/15 text-white ring-2 ring-white/20"
              />
              <div>
                <h3 class="text-sm font-semibold tracking-tight text-white">
                  {{ $t('site.chat.widgetTitle') }}
                </h3>
                <p class="text-xs text-white/80">
                  <span v-if="!session">{{ $t('site.chat.onlineSupport') }}</span>
                  <span v-else-if="session.status === 'WAITING'">{{ $t('site.chat.waitingAgent') }}</span>
                  <span v-else-if="session.status === 'IN_PROGRESS' && session.assignedTo">
                    {{ $t('site.chat.connectedWith', { name: session.assignedTo.name }) }}
                  </span>
                  <span v-else-if="session.status === 'RESOLVED'">{{ $t('site.chat.ticketResolved') }}</span>
                  <span v-else>{{ $t('site.chat.ticketClosed') }}</span>
                </p>
              </div>
            </div>

            <div class="flex items-center gap-1">
              <UTooltip :text="$t('site.chat.endChat')">
                <UButton
                  v-if="session && session.status !== 'CLOSED'"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  icon="i-lucide-log-out"
                  :aria-label="$t('site.chat.endChat')"
                  class="text-white/80 hover:bg-white/10 hover:text-white"
                  @click="endChat"
                />
              </UTooltip>
              <UTooltip :text="$t('site.chat.minimize')">
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  icon="i-lucide-minus"
                  :aria-label="$t('site.chat.minimize')"
                  class="text-white/80 hover:bg-white/10 hover:text-white"
                  @click="() => { isOpen = false }"
                />
              </UTooltip>
            </div>
          </div>
        </template>

        <!-- Body: Pre-chat Form OR Chat Messages -->
        <div class="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-default">
          <!-- State 1: Pre-chat Lead Capture Form (aligned with SiteContactForm.vue) -->
          <div
            v-if="!session"
            class="flex-1 overflow-y-auto p-5"
          >
            <div class="mb-5 text-center">
              <div class="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <UIcon
                  name="i-lucide-message-square-plus"
                  class="size-6"
                />
              </div>
              <h4 class="text-base font-semibold text-highlighted">
                {{ $t('site.chat.formTitle') }}
              </h4>
              <p class="mt-1 text-xs text-muted">
                {{ $t('site.chat.formSubtitle') }}
              </p>
            </div>

            <UForm
              :schema="schema"
              :state="startForm"
              class="space-y-3"
              @submit="handleStartChat"
            >
              <UFormField
                :label="$t('site.chat.nameLabel')"
                name="visitorName"
                required
              >
                <UInput
                  v-model="startForm.visitorName"
                  icon="i-lucide-user"
                  :placeholder="$t('site.chat.namePlaceholder')"
                  class="w-full"
                  size="md"
                />
              </UFormField>

              <UFormField
                :label="$t('site.chat.phoneLabel')"
                name="visitorPhone"
                required
              >
                <UInput
                  v-model="startForm.visitorPhone"
                  icon="i-lucide-phone"
                  :placeholder="$t('site.chat.phonePlaceholder')"
                  class="w-full"
                  size="md"
                />
              </UFormField>

              <UFormField
                :label="$t('site.chat.emailLabel')"
                name="visitorEmail"
                required
              >
                <UInput
                  v-model="startForm.visitorEmail"
                  icon="i-lucide-mail"
                  type="email"
                  :placeholder="$t('site.chat.emailPlaceholder')"
                  class="w-full"
                  size="md"
                />
              </UFormField>

              <UFormField
                :label="$t('site.chat.companyLabel')"
                name="visitorCompany"
                required
              >
                <UInput
                  v-model="startForm.visitorCompany"
                  icon="i-lucide-building"
                  :placeholder="$t('site.chat.companyPlaceholder')"
                  class="w-full"
                  size="md"
                />
              </UFormField>

              <UAlert
                v-if="startError"
                color="error"
                variant="subtle"
                icon="i-lucide-circle-alert"
                :title="startError"
                class="mt-2"
              />

              <UButton
                type="submit"
                color="primary"
                block
                size="md"
                :loading="isStarting"
                class="mt-4 font-semibold"
              >
                {{ $t('site.chat.startButton') }}
              </UButton>
            </UForm>
          </div>

          <!-- State 2: Active Chat Messages Timeline -->
          <template v-else>
            <!-- Ticket Info Banner -->
            <div class="flex min-w-0 items-center gap-3 border-b border-default px-4 py-3 text-xs">
              <div class="flex min-w-0 flex-1 items-center gap-1.5 text-muted">
                <span class="shrink-0">{{ $t('site.chat.ticketLabel') }}:</span>
                <span class="font-medium text-highlighted">#{{ session.id }}</span>
              </div>
              <span class="shrink-0 text-muted">{{ $t(`site.chat.status.${session.status.toLowerCase()}`) }}</span>
            </div>

            <!-- Messages Stream -->
            <div
              ref="messagesContainer"
              class="flex-1 space-y-3.5 overflow-y-auto p-4"
            >
              <ChatMessageBubble
                v-for="msg in messages"
                :key="msg.id"
                :msg="msg"
                own-sender="VISITOR"
              />

              <!-- Typing / Waiting Indicator -->
              <UAlert
                v-if="session.status === 'WAITING' && messages.length <= 1"
                color="warning"
                variant="subtle"
                icon="i-lucide-clock"
                :title="$t('site.chat.waitingNotice')"
                class="my-2"
                :ui="{ root: 'items-start gap-2 p-3', icon: 'size-4', title: 'text-xs font-normal leading-relaxed' }"
              />
            </div>
          </template>
        </div>

        <!-- Footer: Input Bar -->
        <template
          v-if="session"
          #footer
        >
          <!-- If Resolved/Closed, show restart banner -->
          <div
            v-if="session.status === 'RESOLVED' || session.status === 'CLOSED'"
            class="flex flex-col items-center gap-2 py-1 text-center"
          >
            <p class="text-xs text-muted">
              {{ $t('site.chat.sessionEndedNotice') }}
            </p>
            <UButton
              color="primary"
              variant="soft"
              size="xs"
              @click="resetAndStartNew"
            >
              {{ $t('site.chat.startNewChat') }}
            </UButton>
          </div>

          <!-- Active Message Input Form -->
          <div
            v-else
            class="space-y-2"
          >
            <ChatComposer
              v-model="inputMessage"
              v-model:attachment="pendingAttachment"
              :sending="isSending"
              :uploading="isUploading"
              :placeholder="$t('site.chat.inputPlaceholder')"
              @selected="handleFileSelected"
              @sent="handleSendMessage"
            />
          </div>
        </template>
      </UCard>
    </Transition>

    <!-- Floating Launcher Button with UChip unread indicator -->
    <UChip
      :text="unreadBadge"
      :show="unreadBadge > 0 && !isOpen"
      color="secondary"
      size="3xl"
      inset
    >
      <UButton
        size="xl"
        color="primary"
        class="size-14 rounded-full shadow-2xl justify-center items-center motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-105 motion-safe:active:scale-95"
        :icon="isOpen ? 'i-lucide-x' : 'i-lucide-message-circle'"
        :aria-label="isOpen ? $t('site.chat.closeChat') : $t('site.chat.openChat')"
        @click="toggleChat"
      />
    </UChip>
  </div>
</template>
