<template>
  <div class="space-y-6">
    <!-- Header -->
    <Header
      :title="$t('pages.faq.title')"
      :description="$t('pages.faq.description')"
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
      :search-placeholder="$t('pages.faq.searchPlaceholder')"
      table-class="min-w-4xl"
    >
      <template #filters>
        <div class="flex items-center gap-2">
          <USelectMenu
            v-model="selectedStatusFilter"
            :items="statusFilterOptions"
            value-key="value"
            :placeholder="$t('pages.faq.filterStatus')"
            class="w-full sm:w-36"
          />
        </div>
      </template>

      <template #actions>
        <UButton
          v-if="can('faqs.create')"
          color="primary"
          variant="solid"
          icon="i-lucide-plus-circle"
          class="w-full sm:w-auto justify-center"
          @click="() => { showAddModal = true }"
        >
          {{ $t('pages.faq.addFaq') }}
        </UButton>
      </template>
    </DataTable>

    <!-- Modals -->
    <FaqAddModal
      v-model="showAddModal"
      @created="fetchFaqs"
    />
    <FaqUpdateModal
      v-model="showUpdateModal"
      :faq="selectedFaq"
      @updated="fetchFaqs"
    />
    <DeleteModal
      v-model="showDeleteModal"
      :title="$t('pages.faq.deleteTitle')"
      :item-name="selectedFaq?.question"
      :loading="isDeleting"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { faqService } from '~/services/faq-service'
import type { Faq } from '~/types/faq'

definePageMeta({
  layout: 'dashboard'
})

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UBadge = resolveComponent('UBadge')
const { t } = useI18n()
const toast = useToast()

// State
const data = ref<Faq[]>([])
const isLoading = ref(false)
const selectedFaq = ref<Faq | null>(null)

// Modal states
const showAddModal = ref(false)
const showUpdateModal = ref(false)
const showDeleteModal = ref(false)
const isDeleting = ref(false)

// Status filter
const selectedStatusFilter = ref<string>('all')
const statusFilterOptions = computed(() => [
  { label: t('pages.faq.allStatus'), value: 'all' },
  { label: t('pages.faq.active'), value: 'true' },
  { label: t('pages.faq.inactive'), value: 'false' }
])

// Pagination meta
const meta = reactive({
  total: 0,
  from: 0,
  to: 0
})

// Fetch FAQs
async function fetchFaqs() {
  isLoading.value = true
  try {
    const isActiveParam = selectedStatusFilter.value === 'all'
      ? undefined
      : selectedStatusFilter.value === 'true'

    const response = await faqService.getAll(
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
const { search, perPage, page, sortBy, order, sortHeader } = useTableQuery(fetchFaqs, {
  defaultSortBy: 'order',
  defaultOrder: 'ASC'
})

watch(selectedStatusFilter, () => {
  page.value = 1
  fetchFaqs()
})

// Table columns
const columns = computed<TableColumn<Faq>[]>(() => {
  const cols: TableColumn<Faq>[] = [
    {
      accessorKey: 'question',
      header: sortHeader(() => t('pages.faq.columnQuestion'), 'question'),
      cell: ({ row }) => h('div', { class: 'font-medium max-w-xs md:max-w-sm truncate' }, row.original.question)
    },
    {
      accessorKey: 'answer',
      header: () => t('pages.faq.columnAnswer'),
      cell: ({ row }) => h('div', { class: 'text-toned max-w-xs md:max-w-md line-clamp-2 text-sm' }, row.original.answer)
    },
    {
      accessorKey: 'order',
      header: sortHeader(() => t('pages.faq.columnOrder'), 'order'),
      cell: ({ row }) => h('span', { class: 'text-sm' }, String(row.original.order))
    },
    {
      accessorKey: 'isActive',
      header: () => t('pages.faq.columnStatus'),
      cell: ({ row }) => {
        const isActive = row.original.isActive
        return h(
          UBadge,
          {
            color: isActive ? 'primary' : 'error',
            variant: 'subtle'
          },
          () => (isActive ? t('pages.faq.active') : t('pages.faq.inactive'))
        )
      }
    },
    {
      accessorKey: 'createdAt',
      header: sortHeader(() => t('pages.faq.columnCreatedAt'), 'createdAt'),
      cell: ({ row }) => {
        const val = row.getValue('createdAt') as string
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
    }
  ]

  if (can('faqs.update') || can('faqs.delete')) {
    cols.push({
      id: 'actions',
      header: () => t('pages.faq.columnAction'),
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
            'aria-label': t('pages.faq.actionsDropdown')
          },
          () =>
            h(UButton, {
              'icon': 'i-lucide-ellipsis-vertical',
              'color': 'neutral',
              'variant': 'ghost',
              'aria-label': t('pages.faq.actionsDropdown')
            })
        )
      }
    })
  }

  return cols
})

function getRowItems(row: Row<Faq>): DropdownMenuItem[] {
  const items: DropdownMenuItem[] = []
  if (can('faqs.update')) {
    items.push({
      label: t('pages.faq.editFaq'),
      icon: 'i-lucide-edit',
      onSelect() {
        selectedFaq.value = row.original
        showUpdateModal.value = true
      }
    })
  }
  if (can('faqs.delete')) {
    items.push({
      label: t('pages.faq.deleteFaq'),
      color: 'error' as const,
      icon: 'i-lucide-trash',
      onSelect() {
        selectedFaq.value = row.original
        showDeleteModal.value = true
      }
    })
  }
  return items
}

// Handle delete
const handleDelete = async () => {
  if (!selectedFaq.value) return
  isDeleting.value = true
  try {
    const response = await faqService.delete(selectedFaq.value.id)
    if (response.success) {
      toast.add({
        title: t('pages.faq.deletedSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
    }
    showDeleteModal.value = false
    fetchFaqs()
  } finally {
    isDeleting.value = false
  }
}

// Initial fetch
onMounted(() => {
  fetchFaqs()
})
</script>
