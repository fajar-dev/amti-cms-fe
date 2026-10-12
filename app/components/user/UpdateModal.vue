<template>
  <UModal
    v-model:open="open"
    :title="$t('components.user.updateModal.title')"
    :description="$t('components.user.updateModal.description')"
  >
    <template #body>
      <!-- Avatar Upload Section -->
      <div class="flex flex-col items-center justify-center pb-4 space-y-2">
        <div class="relative group">
          <UAvatar
            :src="previewUrl || undefined"
            :alt="$t('components.user.updateModal.choosePhoto')"
            icon="i-lucide-user"
            :ui="{ root: 'size-24 text-3xl border-2 border-default' }"
          />

          <div class="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <UIcon
              name="i-lucide-camera"
              class="size-6 text-white"
            />
          </div>

          <div
            v-if="isUploading"
            class="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center"
          >
            <UIcon
              name="i-lucide-loader-2"
              class="size-6 text-white animate-spin"
            />
          </div>
        </div>
        <div class="flex gap-2">
          <UFileUpload
            v-model="photoFile"
            variant="button"
            size="xs"
            color="neutral"
            icon="i-lucide-upload"
            accept="image/*"
            reset
            :label="$t('components.user.updateModal.choosePhoto')"
            :disabled="isUploading"
          />
          <UButton
            v-if="previewUrl || form.photo"
            size="xs"
            color="error"
            variant="outline"
            icon="i-lucide-trash"
            @click="removePhoto"
          >
            {{ $t('components.user.updateModal.remove') }}
          </UButton>
        </div>
      </div>

      <UForm
        id="update-user-form"
        :schema="schema"
        :state="form"
        class="space-y-3"
        @submit="handleSubmit"
      >
        <UFormField
          :label="$t('components.user.updateModal.nameLabel')"
          name="name"
          required
        >
          <UInput
            v-model="form.name"
            :placeholder="$t('components.user.updateModal.namePlaceholder')"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="$t('components.user.updateModal.emailLabel')"
          name="email"
          required
        >
          <UInput
            v-model="form.email"
            type="email"
            :placeholder="$t('components.user.updateModal.emailPlaceholder')"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="$t('components.user.updateModal.passwordLabel')"
          name="password"
        >
          <UInput
            v-model="form.password"
            type="password"
            :placeholder="$t('components.user.updateModal.passwordPlaceholder')"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="$t('components.user.updateModal.roleLabel')"
          name="roleId"
        >
          <USelectMenu
            v-model="form.roleId"
            :items="roleOptions"
            value-key="value"
            :placeholder="$t('components.user.updateModal.rolePlaceholder')"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="$t('components.user.updateModal.statusLabel')"
          name="isActive"
        >
          <div class="flex items-center gap-2">
            <USwitch v-model="form.isActive" />
            <span class="text-sm text-toned">{{ form.isActive ? $t('components.user.updateModal.active') : $t('components.user.updateModal.inactive') }}</span>
          </div>
        </UFormField>
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
          form="update-user-form"
          color="primary"
          :loading="isSubmitting"
          :disabled="isUploading"
        >
          {{ $t('common.save') }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { userService } from '~/services/user-service'
import { rbacService } from '~/services/rbac-service'
import type { User, UserPayload } from '~/types/user'

const open = defineModel<boolean>({ default: false })

const props = defineProps<{
  user: User | null
}>()

const emit = defineEmits<{ updated: [] }>()
const toast = useToast()
const isSubmitting = ref(false)
const photoFile = ref<File | null>(null)
const roleOptions = ref<Array<{ label: string, value: number | null }>>([])

const { t } = useI18n()

async function loadRoles() {
  const res = await rbacService.getAllList()
  if (res.success && res.data) {
    roleOptions.value = [
      { label: t('components.user.updateModal.noRole'), value: null },
      ...res.data.map(r => ({
        label: r.name,
        value: r.id
      }))
    ]
  }
}

// Schema for updating (password is optional, min 6 if filled)
const schema = z.object({
  name: z.string().min(1, t('components.user.updateModal.nameRequired')),
  email: z.string().min(1, t('components.user.updateModal.emailRequired')).email(t('components.user.updateModal.emailInvalid')),
  password: z.string().min(6, t('components.user.updateModal.passwordMin')).optional().or(z.literal('')),
  isActive: z.boolean(),
  roleId: z.number().nullable().optional()
})

const form = reactive<UserPayload>({
  name: '',
  email: '',
  password: '',
  photo: null,
  isActive: true,
  roleId: null
})

const {
  isUploading,
  previewUrl,
  uploadFile,
  clearPreview,
  setPreviewFromUrl
} = useImageUpload({
  upload: file => userService.uploadPhoto(file),
  onUploaded: (path) => { form.photo = path },
  successMessage: t('components.user.updateModal.photoUploadSuccess'),
  errorMessage: t('components.user.updateModal.photoUploadFailed')
})

watch(photoFile, (file) => {
  if (file) uploadFile(file)
})

const populateForm = () => {
  if (props.user) {
    form.name = props.user.name
    form.email = props.user.email
    form.password = ''
    form.photo = props.user.photo // will contain the MinIO presigned URL (or path)
    form.isActive = props.user.isActive
    form.roleId = props.user.roleId ?? props.user.role?.id ?? null
    photoFile.value = null
    setPreviewFromUrl(props.user.photo) // display existing photo
  }
}

const removePhoto = () => {
  form.photo = null
  photoFile.value = null
  clearPreview()
}

const handleSubmit = async () => {
  if (!props.user) return
  isSubmitting.value = true

  // Build payload
  const payload: UserPayload = {
    name: form.name,
    email: form.email,
    photo: form.photo,
    isActive: form.isActive,
    roleId: form.roleId ?? null
  }

  // Only send password if user filled it
  if (form.password && form.password.trim() !== '') {
    payload.password = form.password
  }

  try {
    const response = await userService.update(props.user.id, payload)
    if (response.success) {
      toast.add({
        title: t('components.user.updateModal.updatedSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      emit('updated')
      open.value = false
    }
  } finally {
    isSubmitting.value = false
  }
}

watch(open, async (val) => {
  if (val) {
    await loadRoles()
    populateForm()
  } else {
    photoFile.value = null
    clearPreview()
  }
})
</script>
