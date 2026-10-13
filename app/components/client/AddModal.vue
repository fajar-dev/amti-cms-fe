<template>
  <UModal
    v-model:open="open"
    :title="$t('components.client.addModal.title')"
    :description="$t('components.client.addModal.description')"
  >
    <template #body>
      <div class="flex flex-col items-center justify-center pb-4 space-y-2">
        <div class="relative group">
          <div class="size-24 rounded-2xl border-2 border-default flex items-center justify-center bg-muted overflow-hidden">
            <img
              v-if="previewUrl || form.logo"
              :src="previewUrl || form.logo"
              :alt="form.name || 'Client Logo'"
              class="max-h-16 max-w-20 object-contain"
            >
            <UIcon
              v-else
              name="i-lucide-building-2"
              class="size-10 text-muted"
            />
          </div>

          <div
            v-if="isUploading"
            class="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center"
          >
            <UIcon
              name="i-lucide-loader-2"
              class="size-6 text-white animate-spin"
            />
          </div>
        </div>

        <div class="flex gap-2">
          <UFileUpload
            v-model="logoFile"
            variant="button"
            size="xs"
            color="neutral"
            icon="i-lucide-upload"
            accept="image/*"
            reset
            :label="$t('components.client.addModal.chooseLogo')"
            :disabled="isUploading"
          />
          <UButton
            v-if="previewUrl || form.logo"
            size="xs"
            color="error"
            variant="outline"
            icon="i-lucide-trash"
            @click="removeLogo"
          >
            {{ $t('components.client.addModal.remove') }}
          </UButton>
        </div>
      </div>

      <UForm
        id="add-client-form"
        :schema="schema"
        :state="form"
        class="space-y-3"
        @submit="handleSubmit"
      >
        <UFormField
          :label="$t('components.client.addModal.nameLabel')"
          name="name"
          required
        >
          <UInput
            v-model="form.name"
            :placeholder="$t('components.client.addModal.namePlaceholder')"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.client.addModal.websiteLabel')"
          name="website"
        >
          <UInput
            v-model="form.website"
            :placeholder="$t('components.client.addModal.websitePlaceholder')"
            icon="i-lucide-globe"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.client.addModal.orderLabel')"
          name="order"
        >
          <UInput
            v-model.number="form.order"
            type="number"
            :placeholder="$t('components.client.addModal.orderPlaceholder')"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.client.addModal.statusLabel')"
          name="isActive"
        >
          <div class="flex items-center gap-2">
            <USwitch v-model="form.isActive" />
            <span class="text-sm text-toned">
              {{ form.isActive ? $t('components.client.addModal.active') : $t('components.client.addModal.inactive') }}
            </span>
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
          form="add-client-form"
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
import { clientService } from '~/services/client-service'
import type { ClientPayload } from '~/types/client'

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ created: [] }>()
const toast = useToast()
const isSubmitting = ref(false)
const { t } = useI18n()

const logoFile = ref<File | null>(null)

const {
  isUploading,
  previewUrl,
  uploadFile,
  clearPreview
} = useImageUpload({
  upload: file => clientService.uploadLogo(file),
  onUploaded: (path) => {
    form.logo = path
  },
  successMessage: t('components.client.addModal.uploadSuccess'),
  errorMessage: t('components.client.addModal.uploadFailed')
})

watch(logoFile, async (file) => {
  if (file) {
    await uploadFile(file)
  }
})

const removeLogo = () => {
  logoFile.value = null
  form.logo = ''
  clearPreview()
}

const schema = z.object({
  name: z.string().min(1, t('components.client.addModal.nameRequired')).max(255),
  logo: z.string().min(1, t('components.client.addModal.logoRequired')),
  website: z.string().url(t('components.client.addModal.websiteInvalid')).optional().or(z.literal('')),
  order: z.number().int().optional(),
  isActive: z.boolean()
})

const form = reactive<{
  name: string
  logo: string
  website: string
  order: number
  isActive: boolean
}>({
  name: '',
  logo: '',
  website: '',
  order: 0,
  isActive: true
})

const resetForm = () => {
  form.name = ''
  form.logo = ''
  form.website = ''
  form.order = 0
  form.isActive = true
  logoFile.value = null
  clearPreview()
}

const handleSubmit = async () => {
  if (!form.logo) {
    toast.add({
      title: t('components.client.addModal.logoRequired'),
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
    return
  }

  isSubmitting.value = true
  try {
    const payload: ClientPayload = {
      name: form.name.trim(),
      logo: form.logo,
      website: form.website?.trim() || null,
      order: form.order,
      isActive: form.isActive
    }
    const response = await clientService.create(payload)
    if (response.success) {
      toast.add({
        title: t('components.client.addModal.createdSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      emit('created')
      open.value = false
      resetForm()
    } else {
      toast.add({
        title: response.message || t('common.error'),
        color: 'error',
        icon: 'i-lucide-circle-x'
      })
    }
  } finally {
    isSubmitting.value = false
  }
}

watch(open, (val) => {
  if (!val) resetForm()
})
</script>
