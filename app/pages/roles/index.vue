<template>
  <div class="space-y-6">
    <!-- Header -->
    <Header
      :title="$t('pages.roles.title')"
      :description="$t('pages.roles.description')"
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
      :search-placeholder="$t('pages.roles.searchPlaceholder')"
      table-class="min-w-4xl"
    >
      <template #actions>
        <UButton
          color="primary"
          variant="solid"
          icon="i-lucide-plus-circle"
          class="w-full sm:w-auto justify-center"
          @click="() => { showAddModal = true }"
        >
          {{ $t('pages.roles.addRole') }}
        </UButton>
      </template>
    </DataTable>

    <!-- Modals -->
    <RbacAddModal
      v-model="showAddModal"
      @created="fetchRoles"
    />
    <RbacUpdateModal
      v-model="showUpdateModal"
      :role="selectedRole"
      @updated="fetchRoles"
    />
    <DeleteModal
      v-model="showDeleteModal"
      :title="$t('pages.roles.deleteTitle')"
      :item-name="selectedRole?.name"
      :loading="isDeleting"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { rbacService } from '~/services/rbac-service'
import type { Role } from '~/types/rbac'

definePageMeta({
  layout: 'dashboard'
})

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UBadge = resolveComponent('UBadge')
const UAvatarGroup = resolveComponent('UAvatarGroup')
const UAvatar = resolveComponent('UAvatar')
const { t } = useI18n()
const toast = useToast()

// State
const data = ref<Role[]>([])
const isLoading = ref(false)
const selectedRole = ref<Role | null>(null)

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

// Fetch roles from API
async function fetchRoles() {
  isLoading.value = true
  try {
    const response = await rbacService.getAll(
      page.value,
      perPage.value,
      search.value,
      sortBy.value,
      order.value
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

const { search, perPage, page, sortBy, order, sortHeader } = useTableQuery(fetchRoles)

// Table columns
const columns: TableColumn<Role>[] = [
  {
    accessorKey: 'name',
    header: sortHeader(() => t('pages.roles.columnRole'), 'name'),
    cell: ({ row }) => {
      const name = row.original.name
      const id = row.original.id
      return h('div', { class: 'flex flex-col gap-0.5' }, [
        h('span', { class: 'font-medium text-highlighted' }, name),
        h('span', { class: 'text-xs text-muted' }, `#${id}`)
      ])
    }
  },
  {
    accessorKey: 'description',
    header: () => t('pages.roles.columnDescription'),
    cell: ({ row }) => {
      const desc = row.original.description
      return h('span', { class: 'text-sm text-toned line-clamp-2 max-w-xs' }, desc || '-')
    }
  },
  {
    accessorKey: 'permissions',
    header: () => t('pages.roles.columnPermissions'),
    cell: ({ row }) => {
      const count = row.original.permissionCount ?? (row.original.permissions?.length ?? 0)
      return h(
        UBadge,
        {
          color: 'neutral',
          variant: 'subtle'
        },
        () => `${count} ${t('pages.roles.permissionsBadge')}`
      )
    }
  },
  {
    accessorKey: 'users',
    header: () => t('pages.roles.columnUsers'),
    cell: ({ row }) => {
      const users = row.original.users || []
      if (!users.length) {
        return h('span', { class: 'text-sm text-muted' }, '-')
      }
      return h(
        UAvatarGroup,
        { max: 5 },
        () =>
          users.map(user =>
            h(UAvatar, {
              key: user.id,
              src: user.photo || undefined,
              alt: user.name,
              loading: 'lazy',
              title: user.name
            })
          )
      )
    }
  },
  {
    id: 'actions',
    header: () => t('pages.roles.columnAction'),
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
          'aria-label': t('pages.roles.actionsDropdown')
        },
        () =>
          h(UButton, {
            'icon': 'i-lucide-ellipsis-vertical',
            'color': 'neutral',
            'variant': 'ghost',
            'aria-label': t('pages.roles.actionsDropdown')
          })
      )
    }
  }
]

function getRowItems(row: Row<Role>): DropdownMenuItem[] {
  return [
    {
      label: t('pages.roles.editRole'),
      icon: 'i-lucide-edit',
      onSelect() {
        selectedRole.value = row.original
        showUpdateModal.value = true
      }
    },
    {
      label: t('pages.roles.deleteRole'),
      color: 'error' as const,
      icon: 'i-lucide-trash',
      onSelect() {
        selectedRole.value = row.original
        showDeleteModal.value = true
      }
    }
  ]
}

// Handle delete
async function handleDelete() {
  if (!selectedRole.value) return
  isDeleting.value = true
  try {
    const response = await rbacService.delete(selectedRole.value.id)
    if (response.success) {
      toast.add({
        title: t('pages.roles.deletedSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      showDeleteModal.value = false
      fetchRoles()
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
  fetchRoles()
})
</script>
