<template>
  <UModal
    v-model:open="open"
    :title="$t('components.rbac.addModal.title')"
    :description="$t('components.rbac.addModal.description')"
    :ui="{ content: 'max-w-2xl' }"
  >
    <template #body>
      <UForm
        id="add-role-form"
        :schema="schema"
        :state="form"
        class="space-y-4"
        @submit="handleSubmit"
      >
        <UFormField
          :label="$t('components.rbac.addModal.nameLabel')"
          name="name"
          required
        >
          <UInput
            v-model="form.name"
            :placeholder="$t('components.rbac.addModal.namePlaceholder')"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.rbac.addModal.descriptionLabel')"
          name="description"
        >
          <UTextarea
            v-model="form.description"
            :placeholder="$t('components.rbac.addModal.descriptionPlaceholder')"
            :rows="2"
            class="w-full"
          />
        </UFormField>

        <!-- Permissions Section -->
        <div class="space-y-3 pt-2 border-t border-default">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-semibold text-highlighted">
                {{ $t('components.rbac.addModal.permissionsLabel') }}
              </h4>
              <p class="text-xs text-muted">
                {{ $t('components.rbac.addModal.permissionsHelp', { count: form.permissionIds.length, total: totalPermissionsCount }) }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <UButton
                size="xs"
                variant="ghost"
                color="primary"
                @click="selectAllPermissions"
              >
                {{ $t('components.rbac.addModal.selectAll') }}
              </UButton>
              <span class="text-muted text-xs">•</span>
              <UButton
                size="xs"
                variant="ghost"
                color="neutral"
                @click="clearAllPermissions"
              >
                {{ $t('components.rbac.addModal.clearAll') }}
              </UButton>
            </div>
          </div>

          <!-- Loading state -->
          <div
            v-if="isLoadingPermissions"
            class="py-8 flex justify-center items-center gap-2 text-muted text-sm"
          >
            <UIcon
              name="i-lucide-loader-2"
              class="animate-spin w-5 h-5 text-primary"
            />
            <span>{{ $t('common.loading') }}</span>
          </div>

          <!-- Permissions grouped by module -->
          <div
            v-else
            class="space-y-3 max-h-80 overflow-y-auto pr-1"
          >
            <div
              v-for="(perms, moduleName) in groupedPermissions"
              :key="moduleName"
              class="border border-default rounded-lg p-3 bg-muted/20"
            >
              <div class="flex items-center justify-between pb-2 border-b border-default/60">
                <div class="flex items-center gap-2">
                  <UIcon
                    :name="getModuleIcon(String(moduleName))"
                    class="w-4 h-4 text-primary"
                  />
                  <span class="text-sm font-medium text-highlighted">{{ moduleName }}</span>
                  <UBadge
                    size="xs"
                    variant="subtle"
                    color="neutral"
                  >
                    {{ getSelectedCountForModule(perms) }} / {{ perms.length }}
                  </UBadge>
                </div>
                <UButton
                  size="xs"
                  variant="link"
                  color="neutral"
                  @click="toggleModulePermissions(perms)"
                >
                  {{ isModuleAllSelected(perms) ? $t('components.rbac.addModal.deselectModule') : $t('components.rbac.addModal.selectModule') }}
                </UButton>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2.5">
                <label
                  v-for="perm in perms"
                  :key="perm.id"
                  class="flex items-start gap-2.5 p-1.5 rounded hover:bg-muted/40 cursor-pointer transition-colors"
                >
                  <UCheckbox
                    :model-value="form.permissionIds.includes(perm.id)"
                    @update:model-value="(val) => togglePermission(perm.id, !!val)"
                  />
                  <div class="flex flex-col text-xs leading-tight">
                    <span class="font-medium text-highlighted text-xs">{{ perm.name }}</span>
                    <span
                      v-if="perm.description"
                      class="text-muted text-[10px] mt-0.5"
                    >{{ perm.description }}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </UForm>
    </template>
    <template #footer>
      <div class="flex justify-end items-center gap-2 w-full">
        <UButton
          :label="$t('common.cancel')"
          color="neutral"
          variant="soft"
          @click="() => { open = false }"
        />
        <UButton
          type="submit"
          form="add-role-form"
          color="primary"
          :loading="isSubmitting"
        >
          {{ $t('common.save') }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { rbacService } from '~/services/rbac-service'
import type { Permission } from '~/types/rbac'

const emit = defineEmits<{
  (e: 'created'): void
}>()

const open = defineModel<boolean>({ default: false })
const { t } = useI18n()
const toast = useToast()

const isSubmitting = ref(false)
const isLoadingPermissions = ref(false)
const groupedPermissions = ref<Record<string, Permission[]>>({})

const form = reactive({
  name: '',
  description: '',
  permissionIds: [] as number[]
})

const schema = computed(() =>
  z.object({
    name: z.string().min(2, t('components.rbac.addModal.nameRequired')),
    description: z.string().optional(),
    permissionIds: z.array(z.number())
  })
)

const totalPermissionsCount = computed(() => {
  return Object.values(groupedPermissions.value).reduce((sum, list) => sum + list.length, 0)
})

async function loadPermissions() {
  if (Object.keys(groupedPermissions.value).length > 0) return
  isLoadingPermissions.value = true
  try {
    const res = await rbacService.getPermissions()
    if (res.success && res.data) {
      groupedPermissions.value = res.data.grouped
    }
  } finally {
    isLoadingPermissions.value = false
  }
}

watch(open, (isOpen) => {
  if (isOpen) {
    form.name = ''
    form.description = ''
    form.permissionIds = []
    loadPermissions()
  }
})

function togglePermission(permId: number, selected: boolean) {
  if (selected) {
    if (!form.permissionIds.includes(permId)) {
      form.permissionIds.push(permId)
    }
  } else {
    form.permissionIds = form.permissionIds.filter(id => id !== permId)
  }
}

function getSelectedCountForModule(perms: Permission[]) {
  return perms.filter(p => form.permissionIds.includes(p.id)).length
}

function isModuleAllSelected(perms: Permission[]) {
  return perms.length > 0 && perms.every(p => form.permissionIds.includes(p.id))
}

function toggleModulePermissions(perms: Permission[]) {
  const allSelected = isModuleAllSelected(perms)
  if (allSelected) {
    const idsToRemove = new Set(perms.map(p => p.id))
    form.permissionIds = form.permissionIds.filter(id => !idsToRemove.has(id))
  } else {
    const idsToAdd = perms.map(p => p.id).filter(id => !form.permissionIds.includes(id))
    form.permissionIds.push(...idsToAdd)
  }
}

function selectAllPermissions() {
  const allIds: number[] = []
  for (const list of Object.values(groupedPermissions.value)) {
    for (const p of list) {
      allIds.push(p.id)
    }
  }
  form.permissionIds = allIds
}

function clearAllPermissions() {
  form.permissionIds = []
}

function getModuleIcon(moduleName: string) {
  const map: Record<string, string> = {
    'Users': 'i-lucide-users',
    'Roles & Permissions': 'i-lucide-shield-check',
    'Categories': 'i-lucide-folder',
    'Articles': 'i-lucide-file-text',
    'FAQs': 'i-lucide-help-circle'
  }
  return map[moduleName] || 'i-lucide-box'
}

async function handleSubmit() {
  isSubmitting.value = true
  try {
    const res = await rbacService.create({
      name: form.name,
      description: form.description || undefined,
      permissionIds: form.permissionIds
    })

    if (res.success) {
      toast.add({
        title: t('components.rbac.addModal.createdSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      open.value = false
      emit('created')
    } else {
      toast.add({
        title: res.message || t('common.error'),
        color: 'error',
        icon: 'i-lucide-circle-alert'
      })
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
