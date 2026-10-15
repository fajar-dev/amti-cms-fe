<template>
  <UModal
    v-model:open="open"
    :title="$t('components.client.updateModal.title')"
    :description="$t('components.client.updateModal.description')"
  >
    <template #body>
      <div class="flex flex-col items-center justify-center pb-4 space-y-2">
        <div class="relative group">
          <div class="size-24 rounded-2xl border-2 border-default flex items-center justify-center bg-muted overflow-hidden">
            <CommonImagePreview
              v-if="previewUrl || form.logo"
              :src="previewUrl || form.logo"
              :alt="form.name || $t('common.imagePreview')"
              image-class="max-h-16 max-w-20 object-contain"
            />
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
            :label="$t('components.client.updateModal.chooseLogo')"
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
            {{ $t('components.client.updateModal.remove') }}
          </UButton>
        </div>
      </div>

      <UForm
        id="update-client-form"
        :schema="schema"
        :state="form"
        class="space-y-3"
        @submit="handleSubmit"
      >
        <UFormField
          :label="$t('components.client.updateModal.nameLabel')"
          name="name"
          required
        >
          <UInput
            v-model="form.name"
            :placeholder="$t('components.client.updateModal.namePlaceholder')"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.client.updateModal.websiteLabel')"
          name="website"
        >
          <UInput
            v-model="form.website"
            :placeholder="$t('components.client.updateModal.websitePlaceholder')"
            icon="i-lucide-globe"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.client.updateModal.orderLabel')"
          name="order"
        >
          <UInput
            v-model.number="form.order"
            type="number"
            :placeholder="$t('components.client.updateModal.orderPlaceholder')"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="$t('components.client.updateModal.statusLabel')"
          name="isActive"
        >
          <div class="flex items-center gap-2">
            <USwitch v-model="form.isActive" />
            <span class="text-sm text-toned">
              {{ form.isActive ? $t('components.client.updateModal.active') : $t('components.client.updateModal.inactive') }}
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
          form="update-client-form"
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
import type { Client, ClientPayload } from '~/types/client'

const props = defineProps<{
  client: Client | null
}>()

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ updated: [] }>()
const toast = useToast()
const isSubmitting = ref(false)
const { t } = useI18n()

const logoFile = ref<File | null>(null)

const {
  isUploading,
  previewUrl,
  uploadFile,
  clearPreview,
  setPreviewFromUrl
} = useImageUpload({
  upload: file => clientService.uploadLogo(file),
  onUploaded: (path) => {
    form.logo = path
  },
  successMessage: t('components.client.updateModal.uploadSuccess'),
  errorMessage: t('components.client.updateModal.uploadFailed')
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
  name: z.string().min(1, t('components.client.updateModal.nameRequired')).max(255),
  logo: z.string().min(1, t('components.client.updateModal.logoRequired')),
  website: z.string().url(t('components.client.updateModal.websiteInvalid')).optional().or(z.literal('')),
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

watch(
  () => props.client,
  (val) => {
    if (val) {
      form.name = val.name
      form.logo = val.logo
      form.website = val.website || ''
      form.order = val.order
      form.isActive = val.isActive
      setPreviewFromUrl(val.logoUrl || val.logo)
    }
  },
  { immediate: true }
)

const handleSubmit = async () => {
  if (!props.client) return
  if (!form.logo) {
    toast.add({
      title: t('components.client.updateModal.logoRequired'),
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
    return
  }

  isSubmitting.value = true
  try {
    const payload: Partial<ClientPayload> = {
      name: form.name.trim(),
      logo: form.logo,
      website: form.website?.trim() || null,
      order: form.order,
      isActive: form.isActive
    }
    const response = await clientService.update(props.client.id, payload)
    if (response.success) {
      toast.add({
        title: t('components.client.updateModal.updatedSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      emit('updated')
      open.value = false
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
</script>
