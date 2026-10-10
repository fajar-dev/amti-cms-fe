<template>
  <div class="space-y-6">
    <!-- Header -->
    <Header
      :title="$t('pages.messages.title')"
      :description="$t('pages.messages.description')"
    />

    <DataTable
      v-model:search="search"
      v-model:page="page"
      v-model:per-page="perPage"
      :data="data"
      :columns="columns"
      :loading="isLoading"
      :total="meta.total"
      :from="meta.from"
      :to="meta.to"
      :search-placeholder="$t('pages.messages.searchPlaceholder')"
      table-class="min-w-4xl"
    >
      <template #filters>
        <div class="flex items-center gap-2">
          <USelectMenu
            v-model="selectedStatusFilter"
            :items="statusFilterOptions"
            value-key="value"
            :placeholder="$t('pages.messages.filterStatus')"
            class="w-full sm:w-40"
          />
        </div>
      </template>
    </DataTable>

    <!-- Modals -->
    <MessageDetailModal
      v-model="showDetailModal"
      :message="selectedMessage"
      @updated="handleMessageUpdated"
      @delete="handleRequestDelete"
    />

    <DeleteModal
      v-model="showDeleteModal"
      :title="$t('pages.messages.deleteTitle')"
      :item-name="selectedMessage?.subject"
      :loading="isDeleting"
      @confirm="handleConfirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent, ref, reactive, computed, watch, onMounted } from 'vue'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { messageService } from '~/services/message-service'
import type { Message } from '~/types/message'

definePageMeta({
  layout: 'dashboard'
})

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UBadge = resolveComponent('UBadge')

const { t } = useI18n()
const toast = useToast()
const { can } = usePermission()

// State
const data = ref<Message[]>([])
const isLoading = ref(false)
const selectedMessage = ref<Message | null>(null)

// Modal states
const showDetailModal = ref(false)
const showDeleteModal = ref(false)
const isDeleting = ref(false)

// Status filter
const selectedStatusFilter = ref<string>('all')
const statusFilterOptions = computed(() => [
  { label: t('pages.messages.allStatus'), value: 'all' },
  { label: t('pages.messages.unread'), value: 'false' },
  { label: t('pages.messages.read'), value: 'true' }
])

// Pagination meta
const meta = reactive({
  total: 0,
  from: 0,
  to: 0
})

// Fetch messages
async function fetchMessages() {
  isLoading.value = true
  try {
    const isReadParam = selectedStatusFilter.value === 'all'
      ? undefined
      : selectedStatusFilter.value === 'true'

    const response = await messageService.getAll(
      page.value,
      perPage.value,
      search.value,
      sortBy.value,
      order.value,
      isReadParam
    )

    if (response.success) {
      data.value = response.data
      if (response.meta) {
        meta.total = response.meta.total
        meta.from = response.meta.from
        meta.to = response.meta.to
      }
    }
  } finally {
    isLoading.value = false
  }
}

const { search, perPage, page, sortBy, order, sortHeader } = useTableQuery(fetchMessages, {
  defaultSortBy: 'createdAt',
  defaultOrder: 'DESC'
})

onMounted(() => {
  fetchMessages()
})

watch(selectedStatusFilter, () => {
  page.value = 1
  fetchMessages()
})

// Table columns
const columns = computed<TableColumn<Message>[]>(() => {
  const cols: TableColumn<Message>[] = [
    {
      accessorKey: 'isRead',
      header: sortHeader(() => t('pages.messages.columnStatus'), 'isRead'),
      cell: ({ row }) => {
        const isRead = row.original.isRead
        return h(
          UBadge,
          {
            color: isRead ? 'neutral' : 'primary',
            variant: 'subtle',
            class: 'inline-flex items-center gap-1 font-medium'
          },
          () => [
            !isRead ? h('span', { class: 'w-1.5 h-1.5 rounded-full bg-primary inline-block' }) : null,
            isRead ? t('pages.messages.read') : t('pages.messages.unread')
          ]
        )
      }
    },
    {
      accessorKey: 'name',
      header: sortHeader(() => t('pages.messages.columnSender'), 'name'),
      cell: ({ row }) => {
        const m = row.original
        return h('div', { class: 'space-y-0.5' }, [
          h(
            'div',
            { class: ['font-medium text-sm', !m.isRead ? 'text-highlighted font-semibold' : 'text-toned'] },
            m.name
          ),
          h('div', { class: 'text-xs text-muted flex items-center gap-2' }, [
            h('span', m.email),
            m.phone ? h('span', { class: 'text-muted/60' }, `• ${m.phone}`) : null
          ])
        ])
      }
    },
    {
      accessorKey: 'subject',
      header: sortHeader(() => t('pages.messages.columnSubject'), 'subject'),
      cell: ({ row }) => {
        const m = row.original
        return h('div', { class: 'max-w-xs md:max-w-md space-y-0.5 cursor-pointer', onClick: () => openDetail(m) }, [
          h(
            'div',
            { class: ['text-sm truncate', !m.isRead ? 'font-semibold text-highlighted' : 'font-medium text-toned'] },
            m.subject
          ),
          h('div', { class: 'text-xs text-muted line-clamp-1' }, m.message)
        ])
      }
    },
    {
      accessorKey: 'createdAt',
      header: sortHeader(() => t('pages.messages.columnDate'), 'createdAt'),
      cell: ({ row }) => {
        const val = row.getValue('createdAt') as string
        if (!val) return '-'
        return h('span', { class: 'text-xs text-muted whitespace-nowrap' }, new Date(val).toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }))
      }
    }
  ]

  // Action column: only view, reply (mailto), and delete as requested
  cols.push({
    id: 'actions',
    header: () => t('pages.messages.columnAction'),
    meta: {
      class: {
        td: 'text-right',
        th: 'text-right'
      }
    },
    cell: ({ row }) => {
      const m = row.original
      const mailto = `mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`

      return h('div', { class: 'flex items-center justify-end gap-1' }, [
        // Quick Reply button (mailto:)
        h(UButton, {
          'icon': 'i-lucide-reply',
          'color': 'neutral',
          'variant': 'ghost',
          'href': mailto,
          'target': '_blank',
          'title': t('pages.messages.reply'),
          'aria-label': t('pages.messages.reply')
        }),
        // Dropdown menu for more actions
        h(
          UDropdownMenu,
          {
            'content': { align: 'end' },
            'items': getRowItems(row),
            'aria-label': t('pages.messages.actionsDropdown')
          },
          () =>
            h(UButton, {
              'icon': 'i-lucide-ellipsis-vertical',
              'color': 'neutral',
              'variant': 'ghost',
              'aria-label': t('pages.messages.actionsDropdown')
            })
        )
      ])
    }
  })

  return cols
})

function openDetail(m: Message) {
  selectedMessage.value = m
  showDetailModal.value = true
}

function getRowItems(row: Row<Message>): DropdownMenuItem[] {
  const m = row.original
  const mailto = `mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`
  const items: DropdownMenuItem[] = [
    {
      label: t('pages.messages.viewDetail'),
      icon: 'i-lucide-eye',
      onSelect() {
        openDetail(m)
      }
    },
    {
      label: t('pages.messages.reply'),
      icon: 'i-lucide-reply',
      onSelect() {
        window.open(mailto, '_blank')
      }
    }
  ]

  if (can('messages.update')) {
    items.push({
      label: m.isRead ? t('pages.messages.markAsUnread') : t('pages.messages.markAsRead'),
      icon: m.isRead ? 'i-lucide-mail' : 'i-lucide-mail-open',
      async onSelect() {
        await toggleReadStatus(m)
      }
    })
  }

  if (can('messages.delete')) {
    items.push({
      label: t('pages.messages.deleteMessage'),
      icon: 'i-lucide-trash-2',
      color: 'error',
      onSelect() {
        selectedMessage.value = m
        showDeleteModal.value = true
      }
    })
  }

  return items
}

async function toggleReadStatus(m: Message) {
  try {
    const newStatus = !m.isRead
    const res = await messageService.updateStatus(m.id, newStatus)
    if (res.success && res.data) {
      toast.add({
        title: t('pages.messages.statusUpdatedSuccess'),
        icon: 'i-lucide-check-circle',
        color: 'success'
      })
      handleMessageUpdated(res.data)
    }
  } catch {
    toast.add({
      title: t('common.error'),
      icon: 'i-lucide-circle-x',
      color: 'error'
    })
  }
}

function handleMessageUpdated(updatedMessage: Message) {
  const index = data.value.findIndex(item => item.id === updatedMessage.id)
  if (index !== -1) {
    data.value[index] = updatedMessage
  }
  if (selectedMessage.value && selectedMessage.value.id === updatedMessage.id) {
    selectedMessage.value = updatedMessage
  }
}

function handleRequestDelete(m: Message) {
  selectedMessage.value = m
  showDeleteModal.value = true
}

async function handleConfirmDelete() {
  if (!selectedMessage.value) return
  isDeleting.value = true
  try {
    const res = await messageService.delete(selectedMessage.value.id)
    if (res.success) {
      toast.add({
        title: t('pages.messages.deletedSuccess'),
        icon: 'i-lucide-check-circle',
        color: 'success'
      })
      showDeleteModal.value = false
      selectedMessage.value = null
      fetchMessages()
    }
  } finally {
    isDeleting.value = false
  }
}
</script>
