<template>
  <div class="space-y-6">
    <!-- Header -->
    <Header
      :title="$t('pages.article.title')"
      :description="$t('pages.article.description')"
    />

    <!-- Data Table -->
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
      :search-placeholder="$t('pages.article.searchPlaceholder')"
      table-class="min-w-4xl"
    >
      <template #filters>
        <div class="flex flex-col sm:flex-row items-center gap-2">
          <USelect
            v-model="selectedCategoryFilter"
            :items="categoryFilterOptions"
            :placeholder="$t('pages.article.filterCategory')"
            class="w-full sm:w-44"
          />
          <USelect
            v-model="selectedStatusFilter"
            :items="statusFilterOptions"
            :placeholder="$t('pages.article.filterStatus')"
            class="w-full sm:w-36"
          />
        </div>
      </template>

      <template #actions>
        <UButton
          color="primary"
          variant="solid"
          icon="i-lucide-plus-circle"
          class="w-full sm:w-auto justify-center"
          to="/content/article/create"
        >
          {{ $t('pages.article.addArticle') }}
        </UButton>
      </template>
    </DataTable>

    <!-- Delete Modal -->
    <DeleteModal
      v-model="showDeleteModal"
      :title="$t('pages.article.deleteTitle')"
      :item-name="selectedArticle?.title"
      :loading="isDeleting"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { articleService } from '~/services/article-service'
import { categoryService } from '~/services/category-service'
import type { Article, ArticleStatus, Category } from '~/types/content'

definePageMeta({
  layout: 'dashboard'
})

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UBadge = resolveComponent('UBadge')
const { t } = useI18n()
const toast = useToast()

// State
const data = ref<Article[]>([])
const categories = ref<Category[]>([])
const isLoading = ref(false)
const selectedArticle = ref<Article | null>(null)
const showDeleteModal = ref(false)
const isDeleting = ref(false)

// Filters
const selectedCategoryFilter = ref<number | ''>('')
const selectedStatusFilter = ref<ArticleStatus | ''>('')

// Pagination meta
const meta = reactive({
  total: 0,
  from: 0,
  to: 0
})

const categoryFilterOptions = computed(() => [
  { label: t('pages.article.allCategories'), value: '' },
  ...categories.value.map(c => ({ label: c.name, value: c.id }))
])

const statusFilterOptions = computed(() => [
  { label: t('pages.article.allStatuses'), value: '' },
  { label: t('pages.article.statusDraft'), value: 'draft' },
  { label: t('pages.article.statusPublish'), value: 'publish' }
])

async function fetchCategories() {
  const res = await categoryService.getAllList()
  if (res.success) {
    categories.value = res.data
  }
}

async function fetchArticles() {
  isLoading.value = true
  try {
    const res = await articleService.getAll(
      page.value,
      perPage.value,
      search.value,
      {
        categoryId: selectedCategoryFilter.value,
        status: selectedStatusFilter.value || undefined
      },
      sortBy.value,
      order.value
    )
    if (res.success) {
      data.value = res.data
      if (res.meta) {
        meta.total = res.meta.total
        meta.from = res.meta.from
        meta.to = res.meta.to
      }
    }
  } finally {
    isLoading.value = false
  }
}

const { search, perPage, page, sortBy, order, sortHeader } = useTableQuery(fetchArticles)

onMounted(() => {
  fetchCategories()
})

watch([selectedCategoryFilter, selectedStatusFilter], () => {
  page.value = 1
  fetchArticles()
})

const columns: TableColumn<Article>[] = [
  {
    accessorKey: 'cover',
    header: () => t('pages.article.columnCover'),
    cell: ({ row }) => {
      const url = row.original.coverUrl
      if (!url) {
        return h('div', { class: 'w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400' }, [
          h('span', { class: 'i-lucide-image text-lg' })
        ])
      }
      return h('img', {
        src: url,
        alt: row.original.title,
        class: 'w-12 h-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-800'
      })
    }
  },
  {
    accessorKey: 'title',
    header: sortHeader(() => t('pages.article.columnTitle'), 'title'),
    cell: ({ row }) => {
      return h('div', { class: 'space-y-0.5' }, [
        h('p', { class: 'font-medium text-neutral-900 dark:text-neutral-100 line-clamp-1' }, row.original.title),
        h('p', { class: 'text-xs text-neutral-400 line-clamp-1 font-mono' }, `/${row.original.slug}`)
      ])
    }
  },
  {
    accessorKey: 'category',
    header: () => t('pages.article.columnCategory'),
    cell: ({ row }) => row.original.category?.name || '-'
  },
  {
    accessorKey: 'status',
    header: sortHeader(() => t('pages.article.columnStatus'), 'status'),
    cell: ({ row }) => {
      const isPublish = row.original.status === 'publish'
      return h(
        UBadge,
        {
          color: isPublish ? 'success' : 'warning',
          variant: 'subtle'
        },
        () => (isPublish ? t('pages.article.statusPublish') : t('pages.article.statusDraft'))
      )
    }
  },
  {
    accessorKey: 'viewsCount',
    header: sortHeader(() => t('pages.article.columnViews'), 'viewsCount'),
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 text-sm' }, [
        h('span', { class: 'i-lucide-eye text-xs' }),
        h('span', {}, String(row.original.viewsCount || 0))
      ])
    }
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
    cell: ({ row }) => {
      return h(
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
    }
  }
]

function getRowItems(row: Row<Article>) {
  return [
    {
      label: t('common.edit'),
      icon: 'i-lucide-pencil',
      onSelect: () => {
        navigateTo(`/content/article/${row.original.id}`)
      }
    },
    {
      label: t('common.delete'),
      icon: 'i-lucide-trash',
      color: 'error' as const,
      onSelect: () => {
        selectedArticle.value = row.original
        showDeleteModal.value = true
      }
    }
  ]
}

async function handleDelete() {
  if (!selectedArticle.value) return
  isDeleting.value = true
  try {
    const res = await articleService.delete(selectedArticle.value.id)
    if (res.success) {
      toast.add({
        title: t('pages.article.deletedSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      showDeleteModal.value = false
      await fetchArticles()
    }
  } finally {
    isDeleting.value = false
  }
}
</script>
