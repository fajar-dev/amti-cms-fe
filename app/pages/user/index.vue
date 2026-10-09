<template>
  <div class="space-y-6">
    <!-- Header -->
    <Header
      :title="$t('pages.user.title')"
      :description="$t('pages.user.description')"
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
      :search-placeholder="$t('pages.user.searchPlaceholder')"
      table-class="min-w-3xl"
    >
      <template #actions>
        <UButton
          v-if="can('users.create')"
          color="primary"
          variant="solid"
          icon="i-lucide-plus-circle"
          class="w-full sm:w-auto justify-center"
          @click="() => { showAddModal = true }"
        >
          {{ $t('pages.user.addUser') }}
        </UButton>
      </template>
    </DataTable>

    <!-- Modals -->
    <UserAddModal
      v-model="showAddModal"
      @created="fetchUsers"
    />
    <UserUpdateModal
      v-model="showUpdateModal"
      :user="selectedUser"
      @updated="fetchUsers"
    />
    <DeleteModal
      v-model="showDeleteModal"
      :title="$t('pages.user.deleteTitle')"
      :item-name="selectedUser?.name"
      :loading="isDeleting"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { userService } from '~/services/user-service'
import type { User } from '~/types/user'

definePageMeta({
  layout: 'dashboard'
})

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UAvatar = resolveComponent('UAvatar')
const UBadge = resolveComponent('UBadge')
const { t } = useI18n()

// State
const data = ref<User[]>([])
const isLoading = ref(false)
const selectedUser = ref<User | null>(null)

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

// Fetch users from API
async function fetchUsers() {
  isLoading.value = true
  try {
    const response = await userService.getAll(page.value, perPage.value, search.value, '', sortBy.value, order.value)
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
const { search, perPage, page, sortBy, order, sortHeader } = useTableQuery(fetchUsers)

// Table columns
const columns = computed<TableColumn<User>[]>(() => {
  const cols: TableColumn<User>[] = [
    {
      accessorKey: 'name',
      header: sortHeader(() => t('pages.user.columnProfile'), 'name'),
      cell: ({ row }) => {
        const name = row.original.name
        const email = row.original.email
        const photo = row.original.photo
        return h('div', { class: 'flex items-center gap-3' }, [
          h(UAvatar, {
            src: photo || undefined,
            alt: name,
            size: 'lg',
            class: 'bg-primary/10 text-primary'
          }),
          h('div', { class: 'flex flex-col' }, [
            h('span', { class: 'font-medium text-highlighted' }, name),
            h('span', { class: 'text-xs text-muted' }, email)
          ])
        ])
      }
    },
    {
      accessorKey: 'role',
      header: () => t('pages.user.columnRole'),
      cell: ({ row }) => {
        const role = row.original.role
        if (!role) {
          return h('span', { class: 'text-sm text-dimmed' }, '-')
        }
        return h(
          UBadge,
          {
            color: 'neutral',
            variant: 'subtle'
          },
          () => role.name
        )
      }
    },
    {
      accessorKey: 'isActive',
      header: sortHeader(() => t('pages.user.columnStatus'), 'isActive'),
      cell: ({ row }) => {
        const isActive = row.original.isActive
        return h(
          UBadge,
          {
            color: isActive ? 'primary' : 'error',
            variant: 'subtle'
          },
          () => (isActive ? t('pages.user.active') : t('pages.user.inactive'))
        )
      }
    },
    {
      accessorKey: 'createdAt',
      header: sortHeader(() => t('pages.user.columnJoinedDate'), 'createdAt'),
      cell: ({ row }) => {
        const val = row.getValue('createdAt') as string
        if (!val) return '-'
        return new Date(val).toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      }
    }
  ]

  if (can('users.update') || can('users.delete')) {
    cols.push({
      id: 'actions',
      header: () => t('pages.user.columnAction'),
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
            'aria-label': t('pages.user.actionsDropdown')
          },
          () =>
            h(UButton, {
              'icon': 'i-lucide-ellipsis-vertical',
              'color': 'neutral',
              'variant': 'ghost',
              'aria-label': t('pages.user.actionsDropdown')
            })
        )
      }
    })
  }

  return cols
})

function getRowItems(row: Row<User>): DropdownMenuItem[] {
  const items: DropdownMenuItem[] = []
  if (can('users.update')) {
    items.push({
      label: t('pages.user.editUser'),
      icon: 'i-lucide-edit',
      onSelect() {
        selectedUser.value = row.original
        showUpdateModal.value = true
      }
    })
  }
  if (can('users.delete')) {
    items.push({
      label: t('pages.user.deleteUser'),
      color: 'error',
      icon: 'i-lucide-trash',
      onSelect() {
        selectedUser.value = row.original
        showDeleteModal.value = true
      }
    })
  }
  return items
}

// Handle delete
const toast = useToast()
const handleDelete = async () => {
  if (!selectedUser.value) return
  isDeleting.value = true
  try {
    const response = await userService.delete(selectedUser.value.id)
    if (response.success) {
      toast.add({
        title: t('pages.user.deletedSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
    }
    showDeleteModal.value = false
    fetchUsers()
  } finally {
    isDeleting.value = false
  }
}

// Initial fetch
onMounted(() => {
  fetchUsers()
})
</script>
