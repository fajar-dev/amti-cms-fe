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
      table-class="min-w-5xl"
    >
      <template #filters>
        <div class="flex flex-col sm:flex-row items-center gap-2">
          <USelectMenu
            v-model="selectedCategoryFilter"
            :items="categoryFilterOptions"
            value-key="value"
            :placeholder="$t('pages.article.filterCategory')"
            class="w-full sm:w-44"
          />
          <USelectMenu
            v-model="selectedStatusFilter"
            :items="statusFilterOptions"
            value-key="value"
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
const UAvatar = resolveComponent('UAvatar')
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
const selectedCategoryFilter = ref<string>('all')
const selectedStatusFilter = ref<string>('all')

// Pagination meta
const meta = reactive({
  total: 0,
  from: 0,
  to: 0
})

const categoryFilterOptions = computed(() => [
  { label: t('pages.article.allCategories'), value: 'all' },
  ...categories.value.map(c => ({ label: c.name, value: String(c.id) }))
])

const statusFilterOptions = computed(() => [
  { label: t('pages.article.allStatuses'), value: 'all' },
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
    const categoryId = selectedCategoryFilter.value !== 'all' ? Number(selectedCategoryFilter.value) : undefined
    const status = selectedStatusFilter.value !== 'all' ? (selectedStatusFilter.value as ArticleStatus) : undefined
    const res = await articleService.getAll(
      page.value,
      perPage.value,
      search.value,
      {
        categoryId,
        status
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
  fetchArticles()
})

watch([selectedCategoryFilter, selectedStatusFilter], () => {
  page.value = 1
  fetchArticles()
})

const columns: TableColumn<Article>[] = [
  {
    accessorKey: 'title',
    header: sortHeader(() => t('pages.article.columnTitle'), 'title'),
    cell: ({ row }) => {
      const url = row.original.coverUrl
      const title = row.original.title
      const slug = row.original.slug

      const thumbnail = url
        ? h('img', {
            src: url,
            alt: title,
            class: 'size-11 rounded-lg object-cover border border-default shrink-0'
          })
        : h('div', {
            class: 'size-11 rounded-lg bg-muted border border-default flex items-center justify-center text-muted shrink-0'
          }, [
            h('span', { class: 'i-lucide-image text-lg' })
          ])

      const content = h('div', { class: 'flex flex-col min-w-0' }, [
        h('span', { class: 'font-medium text-highlighted line-clamp-1 text-sm' }, title),
        h('span', { class: 'text-xs text-muted' }, `${slug}`)
      ])

      return h('div', { class: 'flex items-center gap-3 py-0.5 min-w-[220px]' }, [
        thumbnail,
        content
      ])
    }
  },
  {
    accessorKey: 'status',
    header: sortHeader(() => t('pages.article.columnStatus'), 'status'),
    cell: ({ row }) => {
      const isPublish = row.original.status === 'publish'
      return h(
        UBadge,
        {
          color: isPublish ? 'success' : 'neutral',
          variant: 'subtle',
          class: 'capitalize'
        },
        () => (isPublish ? t('pages.article.statusPublish') : t('pages.article.statusDraft'))
      )
    }
  },
  {
    accessorKey: 'category',
    header: sortHeader(() => t('pages.article.columnCategory'), 'category'),
    cell: ({ row }) => {
      const categoryName = row.original.category?.name
      return h('span', { class: categoryName ? 'text-highlighted text-sm' : 'text-muted text-sm' }, categoryName || '-')
    }
  },
  {
    accessorKey: 'author',
    header: sortHeader(() => t('pages.article.columnAuthor'), 'author'),
    cell: ({ row }) => {
      const author = row.original.author
      if (!author) {
        return h('span', { class: 'text-muted text-sm' }, '-')
      }
      return h('div', { class: 'flex items-center gap-2.5 min-w-[160px]' }, [
        h(UAvatar, {
          src: author.photo || undefined,
          alt: author.name,
          size: 'md',
          class: 'shrink-0'
        }),
        h('div', { class: 'flex flex-col min-w-0' }, [
          h('span', { class: 'font-medium text-highlighted text-sm line-clamp-1' }, author.name),
          author.email ? h('span', { class: 'text-xs text-muted truncate' }, author.email) : null
        ])
      ])
    }
  },
  {
    accessorKey: 'viewsCount',
    header: sortHeader(() => t('pages.article.columnViews'), 'viewsCount'),
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-1.5 text-muted text-sm' }, [
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
      return h('span', { class: 'text-muted text-sm whitespace-nowrap' }, new Date(val).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }))
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
