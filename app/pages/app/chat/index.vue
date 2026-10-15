<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const { can } = usePermission()

const {
  t,
  activeTab,
  searchQuery,
  selectedTicketId,
  messages,
  replyMessage,
  isLoadingTickets,
  isLoadingMore,
  ticketsContainer,
  handleTicketScroll,
  isClaiming,
  isSending,
  isResolving,
  isUploading,
  pendingAttachment,
  messagesContainer,
  tabItems,
  activeTicket,
  filteredTickets,
  handleFileSelected,
  selectTicket,
  claimTicket,
  handleSendReply,
  resolveTicket,
  cleanPhone
} = useStaffChat()
</script>

<template>
  <div class="flex h-full min-h-0 flex-col gap-6">
    <!-- Standard Dashboard Header -->
    <Header
      :title="$t('pages.chat.title')"
      :description="$t('pages.chat.description')"
    />

    <!-- Main Workspace Split Panel -->
    <div class="grid min-h-0 flex-1 grid-cols-1 grid-rows-2 gap-5 lg:grid-cols-12 lg:grid-rows-1 xl:grid-cols-24">
      <!-- Left Column: Tickets Queue Panel (UCard) -->
      <UCard
        class="lg:col-span-4 xl:col-span-7 flex min-h-0 min-w-0 flex-col h-full overflow-hidden"
        :ui="{
          root: 'flex min-h-0 min-w-0 flex-col h-full overflow-hidden rounded-lg shadow-none',
          header: 'p-4 sm:p-4 space-y-3 shrink-0',
          body: 'flex-1 flex flex-col p-0 sm:p-0 overflow-hidden min-h-0'
        }"
      >
        <!-- Panel Header -->
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-messages-square"
                class="size-5 text-primary"
              />
              <h2 class="text-sm font-semibold text-highlighted">
                {{ $t('pages.chat.queueTitle') }}
              </h2>
            </div>
            <!-- Realtime status badge -->
            <UBadge
              size="sm"
              color="success"
              variant="subtle"
              class="gap-1.5 font-medium"
            >
              <span class="size-1.5 rounded-full bg-success motion-safe:animate-pulse" />
              {{ $t('pages.chat.live') }}
            </UBadge>
          </div>

          <!-- Search Input -->
          <UInput
            v-model="searchQuery"
            size="md"
            icon="i-lucide-search"
            :placeholder="$t('pages.chat.searchPlaceholder')"
            class="w-full"
          />

          <!-- Tab Filters (Nuxt UI UTabs) -->
          <UTabs
            v-model="activeTab"
            size="md"
            :items="tabItems"
            color="primary"
            class="w-full"
            :content="false"
          />
        </template>

        <!-- Tickets List -->
        <div
          ref="ticketsContainer"
          class="min-h-0 flex-1 overflow-y-auto divide-y divide-default"
          @scroll.passive="handleTicketScroll"
        >
          <!-- Loading State (USkeleton) -->
          <div
            v-if="isLoadingTickets"
            class="space-y-3 p-4"
          >
            <USkeleton
              v-for="i in 4"
              :key="i"
              class="h-20 w-full rounded-xl"
            />
          </div>

          <!-- Empty State (UEmpty) -->
          <div
            v-else-if="filteredTickets.length === 0"
            class="p-8"
          >
            <UEmpty
              icon="i-lucide-inbox"
              variant="naked"
              :title="$t('pages.chat.noTickets')"
              :description="$t('pages.chat.noTicketsDesc')"
            />
          </div>

          <!-- Ticket Cards -->
          <div
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="group relative flex flex-col border-l-4 p-4 cursor-pointer transition-colors hover:bg-muted/50"
            :class="selectedTicketId === ticket.id ? 'bg-primary/5 border-l-primary' : 'border-l-transparent'"
            @click="selectTicket(ticket.id)"
          >
            <!-- Card Top: Customer Name & Status -->
            <div class="flex items-start justify-between gap-2 mb-1">
              <div class="flex items-center gap-2.5 min-w-0 flex-1">
                <UAvatar
                  :alt="ticket.visitorName"
                  size="md"
                  class="shrink-0"
                  :chip="{ color: getChatStatusColor(ticket.status), position: 'bottom-right' }"
                />
                <div class="min-w-0 flex-1">
                  <h3 class="truncate text-sm font-medium text-highlighted">
                    {{ ticket.visitorName }}
                  </h3>
                  <p class="truncate text-sm text-muted flex items-center gap-1">
                    <UIcon
                      name="i-lucide-building"
                      class="size-4 shrink-0"
                    />
                    <span class="truncate">{{ ticket.visitorCompany }}</span>
                  </p>
                </div>
              </div>

              <!-- Status Pill (UBadge) -->
              <UBadge
                size="sm"
                :color="getChatStatusColor(ticket.status)"
                variant="subtle"
              >
                {{ $t(`site.chat.status.${ticket.status.toLowerCase()}`) }}
              </UBadge>
            </div>

            <!-- Card Middle: Ticket Number & Last message time -->
            <div class="flex items-center justify-between gap-3 text-xs text-muted my-1.5 pl-10">
              <span>#{{ ticket.id }}</span>
              <span class="shrink-0">{{ formatTimeAgo(ticket.lastMessageAt, t) }}</span>
            </div>

            <!-- Card Footer: Unread Indicator or Quick Claim Button -->
            <div class="flex items-center justify-between mt-auto pt-1 pl-10">
              <UBadge
                v-if="ticket.unreadCountUser > 0"
                size="sm"
                color="primary"
                variant="solid"
              >
                {{ ticket.unreadCountUser }} {{ $t('pages.chat.unread') }}
              </UBadge>
              <span
                v-else
                class="text-xs text-muted truncate max-w-36"
              >
                {{ ticket.assignedTo ? ticket.assignedTo.name : $t('pages.chat.unassigned') }}
              </span>

              <!-- Quick Claim Button (UButton) -->
              <UButton
                v-if="ticket.status === 'WAITING' && can('livechat.claim')"
                size="sm"
                color="primary"
                icon="i-lucide-user-check"
                :loading="isClaiming"
                @click.stop="claimTicket(ticket.id)"
              >
                {{ $t('pages.chat.claimTicket') }}
              </UButton>
            </div>
          </div>
          <div
            v-if="isLoadingMore"
            role="status"
            class="flex items-center justify-center gap-2 p-4 text-sm text-muted"
          >
            <UIcon
              name="i-lucide-loader-circle"
              class="size-4 motion-safe:animate-spin"
            />
            {{ $t('pages.chat.loadingTickets') }}
          </div>
        </div>
      </UCard>

      <!-- Right Column: Conversation Workspace (UCard) -->
      <UCard
        class="lg:col-span-8 xl:col-span-17 flex min-h-0 min-w-0 flex-col h-full overflow-hidden"
        :ui="{
          root: 'flex min-h-0 min-w-0 flex-col h-full overflow-hidden rounded-lg shadow-none',
          header: 'p-4 sm:p-4 shrink-0',
          body: 'flex-1 flex flex-col p-0 sm:p-0 overflow-hidden min-h-0',
          footer: 'p-4 sm:p-4 shrink-0'
        }"
      >
        <!-- Workspace Header: Lead Profile & Actions -->
        <template
          v-if="activeTicket"
          #header
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <!-- Left: Lead Info -->
            <div class="flex min-w-0 flex-1 items-center gap-3">
              <UAvatar
                :alt="activeTicket.visitorName"
                size="md"
                class="shrink-0"
                :chip="{ color: getChatStatusColor(activeTicket.status), position: 'bottom-right' }"
              />
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h2 class="text-sm font-semibold text-highlighted">
                    {{ activeTicket.visitorName }}
                  </h2>
                  <span class="text-xs text-muted">#{{ activeTicket.id }}</span>
                </div>
                <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted mt-0.5">
                  <span class="flex items-center gap-1.5 text-default">
                    <UIcon
                      name="i-lucide-building"
                      class="size-4"
                    />
                    {{ activeTicket.visitorCompany }}
                  </span>
                  <UButton
                    size="sm"
                    :to="`https://wa.me/${cleanPhone(activeTicket.visitorPhone)}`"
                    target="_blank"
                    color="neutral"
                    variant="link"
                    icon="i-lucide-phone"
                    class="p-0 font-normal text-default"
                  >
                    {{ activeTicket.visitorPhone }}
                  </UButton>
                  <UButton
                    size="sm"
                    :to="`mailto:${activeTicket.visitorEmail}`"
                    color="neutral"
                    variant="link"
                    icon="i-lucide-mail"
                    class="p-0 font-normal text-default"
                  >
                    {{ activeTicket.visitorEmail }}
                  </UButton>
                </div>
              </div>
            </div>

            <!-- Right: Actions -->
            <div class="flex items-center gap-2">
              <!-- Claim Button if WAITING -->
              <UButton
                v-if="activeTicket.status === 'WAITING' && can('livechat.claim')"
                size="sm"
                color="primary"
                icon="i-lucide-user-check"
                :loading="isClaiming"
                @click="claimTicket(activeTicket.id)"
              >
                {{ $t('pages.chat.claimThisTicket') }}
              </UButton>

              <!-- Resolve Button if IN_PROGRESS -->
              <UButton
                v-else-if="activeTicket.status === 'IN_PROGRESS' && can('livechat.resolve')"
                size="sm"
                color="success"
                variant="soft"
                icon="i-lucide-check-circle"
                :loading="isResolving"
                @click="resolveTicket(activeTicket.id)"
              >
                {{ $t('pages.chat.resolveTicket') }}
              </UButton>

              <!-- Status Tag (UBadge) -->
              <UBadge
                v-else
                size="sm"
                :color="getChatStatusColor(activeTicket.status)"
                variant="subtle"
              >
                {{ $t(`site.chat.status.${activeTicket.status.toLowerCase()}`) }}
              </UBadge>
            </div>
          </div>
        </template>

        <!-- Body: Empty State when no ticket selected -->
        <div
          v-if="!activeTicket"
          class="flex flex-1 items-center justify-center p-8"
        >
          <UEmpty
            icon="i-lucide-messages-square"
            variant="naked"
            :title="$t('pages.chat.selectTicketTitle')"
            :description="$t('pages.chat.selectTicketDesc')"
          />
        </div>

        <!-- Body: Chat Stream Timeline when ticket active -->
        <div
          v-else
          ref="messagesContainer"
          class="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6"
        >
          <ChatMessageBubble
            v-for="msg in messages"
            :key="msg.id"
            :msg="msg"
            own-sender="USER"
          />
        </div>

        <!-- Footer: Input Bar or Alert Banner -->
        <template
          v-if="activeTicket"
          #footer
        >
          <!-- Banner if Ticket Waiting / Not Claimed (UAlert) -->
          <UAlert
            v-if="activeTicket.status === 'WAITING' && can('livechat.claim')"
            color="warning"
            variant="subtle"
            icon="i-lucide-info"
            :title="$t('pages.chat.claimToReplyNotice')"
            :actions="[
              {
                label: $t('pages.chat.claimTicket'),
                color: 'primary',
                loading: isClaiming,
                onClick: () => {
                  if (activeTicket) {
                    claimTicket(activeTicket.id)
                  }
                }
              }
            ]"
          />

          <!-- Banner if Resolved / Closed (UAlert) -->
          <UAlert
            v-else-if="activeTicket.status === 'RESOLVED' || activeTicket.status === 'CLOSED'"
            color="neutral"
            variant="subtle"
            icon="i-lucide-check-circle"
            :title="$t('pages.chat.ticketClosedNotice')"
          />

          <!-- Active Reply Input Form -->
          <div
            v-else
            class="space-y-2"
          >
            <ChatComposer
              v-if="can('livechat.reply')"
              v-model="replyMessage"
              v-model:attachment="pendingAttachment"
              :sending="isSending"
              :uploading="isUploading"
              :placeholder="$t('pages.chat.replyPlaceholder')"
              @selected="handleFileSelected"
              @sent="handleSendReply"
            />
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>
