<template>
  <div class="p-6 space-y-6">
    <!-- Photo -->
    <div class="flex flex-col sm:flex-row items-center gap-6 pb-4 border-b border-default">
      <div
        class="relative group cursor-pointer"
        @click="triggerFileInput"
      >
        <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-default hover:border-primary/50 transition-colors duration-200 flex items-center justify-center bg-muted relative">
          <img
            v-if="previewUrl"
            :src="previewUrl"
            class="w-full h-full object-cover"
          >
          <UIcon
            v-else
            name="i-lucide-user"
            class="w-12 h-12 text-dimmed"
          />

          <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <UIcon
              name="i-lucide-camera"
              class="w-6 h-6 text-white"
            />
          </div>

          <div
            v-if="isUploading"
            class="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <UIcon
              name="i-lucide-loader-2"
              class="w-6 h-6 text-white animate-spin"
            />
          </div>
        </div>
      </div>

      <div class="space-y-1.5 text-center sm:text-left">
        <h3 class="text-base font-semibold text-highlighted">
          {{ $t('pages.profile.information.photoTitle') }}
        </h3>
        <p class="text-sm text-muted pb-1">
          {{ $t('pages.profile.information.photoHint') }}
        </p>
        <div class="flex gap-2 justify-center sm:justify-start">
          <UButton
            size="xs"
            color="neutral"
            variant="outline"
            icon="i-lucide-upload"
            @click="triggerFileInput"
          >
            {{ $t('pages.profile.information.changePhoto') }}
          </UButton>
          <UButton
            v-if="previewUrl || formInfo.photo"
            size="xs"
            color="error"
            variant="outline"
            icon="i-lucide-trash"
            @click="removePhoto"
          >
            {{ $t('pages.profile.information.remove') }}
          </UButton>
        </div>
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          accept="image/*"
          @change="onFileChange"
        >
      </div>
    </div>

    <!-- Form -->
    <UForm
      :schema="infoSchema"
      :state="formInfo"
      class="space-y-4"
      @submit="handleInfoSubmit"
    >
      <UFormField
        :label="$t('pages.profile.information.nameLabel')"
        name="name"
        required
      >
        <UInput
          v-model="formInfo.name"
          :placeholder="$t('pages.profile.information.namePlaceholder')"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="$t('pages.profile.information.emailLabel')"
        name="email"
        required
      >
        <UInput
          v-model="formInfo.email"
          type="email"
          :placeholder="$t('pages.profile.information.emailPlaceholder')"
          class="w-full"
        />
      </UFormField>

      <div class="flex justify-end pt-3 border-t border-default">
        <UButton
          type="submit"
          color="primary"
          :loading="isSavingInfo"
          :disabled="isUploading"
          icon="i-lucide-save"
        >
          {{ $t('pages.profile.information.save') }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { z } from 'zod'
import type { UpdateProfilePayload } from '~/types/profile'
import { userService } from '~/services/user-service'

const { state: authState, service: authService } = useAuth()
const toast = useToast()
const { t } = useI18n()

const isSavingInfo = ref(false)
const isUploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)

const formInfo = reactive<UpdateProfilePayload>({
  name: '',
  email: '',
  photo: null
})

const infoSchema = z.object({
  name: z.string().min(1, t('pages.profile.information.nameRequired')),
  email: z.string().min(1, t('pages.profile.information.emailRequired')).email(t('pages.profile.information.emailInvalid'))
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onFileChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  // Local preview
  previewUrl.value = URL.createObjectURL(file)

  // Upload
  isUploading.value = true
  try {
    const response = await userService.uploadPhoto(file)
    if (response.success && response.data) {
      formInfo.photo = response.data.path
    }
  } catch {
    toast.add({
      title: t('pages.profile.information.photoUploadFailed'),
      icon: 'i-lucide-circle-x',
      color: 'error'
    })
    previewUrl.value = formInfo.photo ?? null
  } finally {
    isUploading.value = false
  }
}

const removePhoto = () => {
  formInfo.photo = null
  previewUrl.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const populateProfile = () => {
  if (authState.user) {
    formInfo.name = authState.user.name
    formInfo.email = authState.user.email
    formInfo.photo = authState.user.photo ?? null
    previewUrl.value = authState.user.photo ?? null
  }
}

const handleInfoSubmit = async () => {
  isSavingInfo.value = true
  try {
    const response = await authService.updateProfile(formInfo)
    if (response.success) {
      toast.add({
        title: t('pages.profile.information.updatedSuccess'),
        icon: 'i-lucide-circle-check'
      })
    }
  } finally {
    isSavingInfo.value = false
  }
}

watch(() => authState.user, () => {
  populateProfile()
}, { immediate: true })

onMounted(() => {
  populateProfile()
})
</script>
