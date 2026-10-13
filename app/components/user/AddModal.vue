<template>
  <UModal
    v-model:open="open"
    :title="$t('components.user.addModal.title')"
    :description="$t('components.user.addModal.description')"
  >
    <template #body>
      <div class="flex flex-col items-center justify-center pb-4 space-y-2">
        <div class="relative group">
          <UAvatar
            :src="previewUrl || undefined"
            :alt="$t('components.user.addModal.choosePhoto')"
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
            :label="$t('components.user.addModal.choosePhoto')"
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
            {{ $t('components.user.addModal.remove') }}
          </UButton>
        </div>
      </div>

      <UForm
        id="add-user-form"
        :schema="schema"
        :state="form"
        class="space-y-3"
        @submit="handleSubmit"
      >
        <UFormField
          :label="$t('components.user.addModal.nameLabel')"
          name="name"
          required
        >
          <UInput
            v-model="form.name"
            :placeholder="$t('components.user.addModal.namePlaceholder')"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="$t('components.user.addModal.emailLabel')"
          name="email"
          required
        >
          <UInput
            v-model="form.email"
            type="email"
            :placeholder="$t('components.user.addModal.emailPlaceholder')"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="$t('components.user.addModal.passwordLabel')"
          name="password"
          required
        >
          <UInput
            v-model="form.password"
            type="password"
            :placeholder="$t('components.user.addModal.passwordPlaceholder')"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="$t('components.user.addModal.roleLabel')"
          name="roleId"
        >
          <USelectMenu
            v-model="form.roleId"
            :items="roleOptions"
            value-key="value"
            :placeholder="$t('components.user.addModal.rolePlaceholder')"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.user.addModal.statusLabel')"
          name="isActive"
        >
          <div class="flex items-center gap-2">
            <USwitch v-model="form.isActive" />
            <span class="text-sm text-toned">{{ form.isActive ? $t('components.user.addModal.active') : $t('components.user.addModal.inactive') }}</span>
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
          form="add-user-form"
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
import type { UserPayload } from '~/types/user'

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ created: [] }>()
const toast = useToast()
const isSubmitting = ref(false)
const photoFile = ref<File | null>(null)
const roleOptions = ref<Array<{ label: string, value: number | null }>>([])

const { t } = useI18n()

async function loadRoles() {
  const res = await rbacService.getAllList()
  if (res.success && res.data) {
    roleOptions.value = [
      { label: t('components.user.addModal.noRole'), value: null },
      ...res.data.map(r => ({
        label: r.name,
        value: r.id
      }))
    ]
  }
}

const schema = z.object({
  name: z.string().min(1, t('components.user.addModal.nameRequired')),
  email: z.string().min(1, t('components.user.addModal.emailRequired')).email(t('components.user.addModal.emailInvalid')),
  password: z.string().min(6, t('components.user.addModal.passwordMin')),
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
  clearPreview
} = useImageUpload({
  upload: file => userService.uploadPhoto(file),
  onUploaded: (path) => { form.photo = path },
  successMessage: t('components.user.addModal.photoUploadSuccess'),
  errorMessage: t('components.user.addModal.photoUploadFailed')
})

watch(photoFile, (file) => {
  if (file) uploadFile(file)
})

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.password = ''
  form.photo = null
  form.isActive = true
  form.roleId = null
  photoFile.value = null
  clearPreview()
}

watch(open, (isOpen) => {
  if (isOpen) {
    loadRoles()
  } else {
    resetForm()
  }
})

const removePhoto = () => {
  form.photo = null
  photoFile.value = null
  clearPreview()
}

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    const response = await userService.create(form)
    if (response.success) {
      toast.add({
        title: t('components.user.addModal.createdSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      emit('created')
      open.value = false
      resetForm()
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
