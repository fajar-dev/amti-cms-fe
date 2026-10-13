<template>
  <div class="space-y-6">
    <Header
      :title="$t('pages.client.title')"
      :description="$t('pages.client.description')"
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
      :search-placeholder="$t('pages.client.searchPlaceholder')"
      table-class="min-w-4xl"
    >
      <template #filters>
        <div class="flex items-center gap-2">
          <USelectMenu
            v-model="selectedStatusFilter"
            :items="statusFilterOptions"
            value-key="value"
            :placeholder="$t('pages.client.filterStatus')"
            class="w-full sm:w-36"
          />
        </div>
      </template>

      <template #actions>
        <UButton
          v-if="can('clients.create')"
          color="primary"
          variant="solid"
          icon="i-lucide-plus-circle"
          class="w-full sm:w-auto justify-center"
          @click="() => { showAddModal = true }"
        >
          {{ $t('pages.client.addClient') }}
        </UButton>
      </template>
    </DataTable>

    <ClientAddModal
      v-model="showAddModal"
      @created="fetchClients"
    />
    <ClientUpdateModal
      v-model="showUpdateModal"
      :client="selectedClient"
      @updated="fetchClients"
    />
    <DeleteModal
      v-model="showDeleteModal"
      :title="$t('pages.client.deleteTitle')"
      :item-name="selectedClient?.name"
      :loading="isDeleting"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { clientService } from '~/services/client-service'
import type { Client } from '~/types/client'

definePageMeta({
  layout: 'dashboard'
})

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UBadge = resolveComponent('UBadge')
const UIcon = resolveComponent('UIcon')
const { t, locale } = useI18n()
const toast = useToast()

const data = ref<Client[]>([])
const isLoading = ref(false)
const selectedClient = ref<Client | null>(null)

const showAddModal = ref(false)
const showUpdateModal = ref(false)
const showDeleteModal = ref(false)
const isDeleting = ref(false)

const selectedStatusFilter = ref<string>('all')
const statusFilterOptions = computed(() => [
  { label: t('pages.client.allStatus'), value: 'all' },
  { label: t('pages.client.active'), value: 'true' },
  { label: t('pages.client.inactive'), value: 'false' }
])

const meta = reactive({
  total: 0,
  from: 0,
  to: 0
})

async function fetchClients() {
  isLoading.value = true
  try {
    const isActiveParam = selectedStatusFilter.value === 'all'
      ? undefined
      : selectedStatusFilter.value === 'true'

    const response = await clientService.getAll(
      page.value,
      perPage.value,
      search.value,
      sortBy.value,
      order.value,
      isActiveParam
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

const { can } = usePermission()
const { search, perPage, page, sortBy, order, sortHeader } = useTableQuery(fetchClients, {
  defaultSortBy: 'order',
  defaultOrder: 'ASC'
})

watch(selectedStatusFilter, () => {
  page.value = 1
  fetchClients()
})

const columns = computed<TableColumn<Client>[]>(() => {
  const cols: TableColumn<Client>[] = [
    {
      accessorKey: 'logo',
      header: () => t('pages.client.columnLogo'),
      cell: ({ row }) => {
        const logo = row.original.logoUrl || row.original.logo
        return h('div', { class: 'size-12 rounded-xl border border-default bg-muted/60 p-1 flex items-center justify-center overflow-hidden' }, [
          h('img', {
            src: logo,
            alt: row.original.name,
            class: 'max-h-full max-w-full object-contain'
          })
        ])
      }
    },
    {
      accessorKey: 'name',
      header: sortHeader(() => t('pages.client.columnName'), 'name'),
      cell: ({ row }) => h('div', { class: 'font-medium max-w-xs truncate text-highlighted' }, row.original.name)
    },
    {
      accessorKey: 'website',
      header: () => t('pages.client.columnWebsite'),
      cell: ({ row }) => {
        const website = row.original.website
        if (!website) return h('span', { class: 'text-muted' }, '-')
        return h('a', {
          href: website,
          target: '_blank',
          rel: 'noopener noreferrer',
          class: 'text-primary hover:underline flex items-center gap-1 text-xs truncate max-w-xs'
        }, [
          h('span', { class: 'truncate' }, website),
          h(UIcon, { name: 'i-lucide-external-link', class: 'size-3 shrink-0' })
        ])
      }
    },
    {
      accessorKey: 'order',
      header: sortHeader(() => t('pages.client.columnOrder'), 'order'),
      cell: ({ row }) => h('span', { class: 'text-sm' }, String(row.original.order))
    },
    {
      accessorKey: 'isActive',
      header: () => t('pages.client.columnStatus'),
      cell: ({ row }) => {
        const isActive = row.original.isActive
        return h(
          UBadge,
          {
            color: isActive ? 'primary' : 'error',
            variant: 'subtle'
          },
          () => (isActive ? t('pages.client.active') : t('pages.client.inactive'))
        )
      }
    },
    {
      accessorKey: 'createdAt',
      header: sortHeader(() => t('common.createdAt'), 'createdAt'),
      cell: ({ row }) => {
        const val = row.getValue('createdAt') as string
        if (!val) return '-'
        return h('span', { class: 'text-muted whitespace-nowrap' }, formatDateTime(val, locale.value))
      }
    }
  ]

  if (can('clients.update') || can('clients.delete')) {
    cols.push({
      id: 'actions',
      header: () => t('pages.client.columnAction'),
      meta: {
        class: {
          td: 'text-right',
          th: 'text-right'
        }
      },
      cell: ({ row }) => {
        return h(
          UDropdownMenu,
          {
            'content': {
              align: 'end'
            },
            'items': getRowItems(row),
            'aria-label': t('pages.client.actionsDropdown')
          },
          () =>
            h(UButton, {
              'icon': 'i-lucide-ellipsis-vertical',
              'size': 'xs',
              'color': 'neutral',
              'variant': 'ghost',
              'aria-label': t('pages.client.actionsDropdown')
            })
        )
      }
    })
  }

  return cols
})

function getRowItems(row: Row<Client>): DropdownMenuItem[] {
  const items: DropdownMenuItem[] = []
  if (can('clients.update')) {
    items.push({
      label: t('pages.client.editClient'),
      icon: 'i-lucide-edit',
      onSelect() {
        selectedClient.value = row.original
        showUpdateModal.value = true
      }
    })
  }
  if (can('clients.delete')) {
    items.push({
      label: t('pages.client.deleteClient'),
      color: 'error' as const,
      icon: 'i-lucide-trash',
      onSelect() {
        selectedClient.value = row.original
        showDeleteModal.value = true
      }
    })
  }
  return items
}

const handleDelete = async () => {
  if (!selectedClient.value) return
  isDeleting.value = true
  try {
    const response = await clientService.delete(selectedClient.value.id)
    if (response.success) {
      toast.add({
        title: t('pages.client.deletedSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      showDeleteModal.value = false
      fetchClients()
    } else {
      toast.add({
        title: response.message || t('common.error'),
        color: 'error',
        icon: 'i-lucide-circle-alert'
      })
    }
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  fetchClients()
})
</script>
