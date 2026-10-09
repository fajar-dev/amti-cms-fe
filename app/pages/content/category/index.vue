<template>
  <div class="space-y-6">
    <!-- Header -->
    <Header
      :title="$t('pages.category.title')"
      :description="$t('pages.category.description')"
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
      :search-placeholder="$t('pages.category.searchPlaceholder')"
      table-class="min-w-2xl"
    >
      <template #actions>
        <UButton
          color="primary"
          variant="solid"
          icon="i-lucide-plus-circle"
          class="w-full sm:w-auto justify-center"
          @click="() => { showAddModal = true }"
        >
          {{ $t('pages.category.addCategory') }}
        </UButton>
      </template>
    </DataTable>

    <!-- Modals -->
    <ContentCategoryAddModal
      v-model="showAddModal"
      @created="fetchCategories"
    />
    <ContentCategoryUpdateModal
      v-model="showUpdateModal"
      :category="selectedCategory"
      @updated="fetchCategories"
    />
    <DeleteModal
      v-model="showDeleteModal"
      :title="$t('pages.category.deleteTitle')"
      :item-name="selectedCategory?.name"
      :loading="isDeleting"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { categoryService } from '~/services/category-service'
import type { Category } from '~/types/content'

definePageMeta({
  layout: 'dashboard'
})

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const { t } = useI18n()
const toast = useToast()

// State
const data = ref<Category[]>([])
const isLoading = ref(false)
const selectedCategory = ref<Category | null>(null)

// Modal states
const showAddModal = ref(false)
const showUpdateModal = ref(false)
const showDeleteModal = ref(false)
const isDeleting = ref(false)

// Pagination meta
const meta = reactive({
  total: 0,
  from: 0,
  to: 0
})

// Fetch categories from API
async function fetchCategories() {
  isLoading.value = true
  try {
    const response = await categoryService.getAll(page.value, perPage.value, search.value, sortBy.value, order.value)
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

const { search, perPage, page, sortBy, order, sortHeader } = useTableQuery(fetchCategories)

// Table columns
const columns: TableColumn<Category>[] = [
  {
    accessorKey: 'name',
    header: sortHeader(() => t('pages.category.columnName'), 'name')
  },
  {
    accessorKey: 'slug',
    header: () => t('pages.category.columnSlug')
  },
  {
    accessorKey: 'description',
    header: () => t('pages.category.columnDescription'),
    cell: ({ row }) => row.original.description || '-'
  },
  {
    accessorKey: 'createdAt',
    header: sortHeader(() => t('common.createdAt'), 'createdAt'),
    cell: ({ row }) => {
      const val = row.getValue('createdAt') as string
      if (!val) return '-'
      return new Date(val).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  },
  {
    id: 'actions',
    header: () => t('common.action'),
    meta: {
      class: {
        td: 'text-right',
        th: 'text-right'
      }
    },
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'flex justify-end' },
        h(
          UDropdownMenu,
          {
            items: getRowItems(row),
            content: { align: 'end' }
          },
          () =>
            h(UButton, {
              'icon': 'i-lucide-ellipsis-vertical',
              'color': 'neutral',
              'variant': 'ghost',
              'size': 'xs',
              'aria-label': 'Actions'
            })
        )
      )
    }
  }
]

function getRowItems(row: Row<Category>) {
  return [
    {
      label: t('common.edit'),
      icon: 'i-lucide-pencil',
      onSelect: () => {
        selectedCategory.value = row.original
        showUpdateModal.value = true
      }
    },
    {
      label: t('common.delete'),
      icon: 'i-lucide-trash',
      color: 'error' as const,
      onSelect: () => {
        selectedCategory.value = row.original
        showDeleteModal.value = true
      }
    }
  ]
}

async function handleDelete() {
  if (!selectedCategory.value) return
  isDeleting.value = true
  try {
    const response = await categoryService.delete(selectedCategory.value.id)
    if (response.success) {
      toast.add({
        title: t('pages.category.deletedSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      showDeleteModal.value = false
      await fetchCategories()
    }
  } finally {
    isDeleting.value = false
  }
}

// Initial fetch
onMounted(() => {
  fetchCategories()
})
</script>
