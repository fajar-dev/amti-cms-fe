<template>
  <div class="p-6 space-y-6">
    <div
      v-if="isLoading"
      class="space-y-6"
    >
      <USkeleton class="h-6 w-48" />
      <USkeleton class="h-10 w-full" />
      <USkeleton class="h-10 w-full" />
      <USkeleton class="h-24 w-full" />
    </div>

    <UForm
      v-else
      :schema="metaSchema"
      :state="form"
      class="space-y-6"
      @submit="handleSave"
    >
      <div class="space-y-4">
        <div class="border-b border-default pb-3">
          <h3 class="text-base font-semibold text-highlighted">
            {{ $t('pages.settings.meta.title') }}
          </h3>
          <p class="text-sm text-muted mt-0.5">
            {{ $t('pages.settings.meta.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UFormField
            :label="$t('pages.settings.meta.siteName')"
            name="siteName"
            required
            class="sm:col-span-2"
          >
            <UInput
              v-model="form.siteName"
              :placeholder="$t('pages.settings.meta.siteNamePlaceholder')"
              icon="i-lucide-globe"
              class="w-full"
              :disabled="!canUpdate"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.settings.meta.author')"
            name="author"
          >
            <UInput
              v-model="form.author"
              :placeholder="$t('pages.settings.meta.authorPlaceholder')"
              icon="i-lucide-user"
              class="w-full"
              :disabled="!canUpdate"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.settings.meta.copyright')"
            name="copyright"
          >
            <UInput
              v-model="form.copyright"
              :placeholder="$t('pages.settings.meta.copyrightPlaceholder')"
              icon="i-lucide-copyright"
              class="w-full"
              :disabled="!canUpdate"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.settings.meta.metaKeywords')"
            :help="$t('pages.settings.meta.metaKeywordsHelp')"
            name="metaKeywords"
            class="sm:col-span-2"
          >
            <UInput
              v-model="form.metaKeywords"
              :placeholder="$t('pages.settings.meta.metaKeywordsPlaceholder')"
              icon="i-lucide-tag"
              class="w-full"
              :disabled="!canUpdate"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.settings.meta.siteDescription')"
            name="siteDescription"
            class="sm:col-span-2"
          >
            <UTextarea
              v-model="form.siteDescription"
              :placeholder="$t('pages.settings.meta.siteDescriptionPlaceholder')"
              :rows="3"
              class="w-full"
              :disabled="!canUpdate"
            />
          </UFormField>
        </div>
      </div>

      <div class="space-y-4 pt-2 border-t border-default">
        <div>
          <h3 class="text-base font-semibold text-highlighted">
            {{ $t('pages.settings.meta.mediaTitle') }}
          </h3>
          <p class="text-sm text-muted mt-0.5">
            {{ $t('pages.settings.meta.mediaDescription') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UFormField
            :label="$t('pages.settings.meta.logo')"
            class="w-full"
          >
            <div
              v-if="logoPreview"
              class="relative rounded-lg overflow-hidden border border-default aspect-video group flex items-center justify-center bg-muted/10 p-4 w-full"
            >
              <img
                :src="logoPreview"
                :alt="$t('common.imagePreview')"
                class="max-h-full max-w-full object-contain"
              >
              <UButton
                v-if="canUpdate"
                icon="i-lucide-x"
                size="xs"
                color="neutral"
                variant="solid"
                class="absolute top-2 right-2 rounded-full"
                :aria-label="$t('pages.settings.removeMedia')"
                @click="removeMedia('logo')"
              />
              <div
                v-if="uploadingKey === 'logo'"
                class="absolute inset-0 bg-black/40 flex items-center justify-center"
              >
                <UIcon
                  name="i-lucide-loader-2"
                  class="w-6 h-6 text-white animate-spin"
                />
              </div>
            </div>

            <UFileUpload
              v-else
              v-model="logoFile"
              icon="i-lucide-image"
              :label="$t('common.dropImageHere')"
              :description="$t('pages.settings.meta.logoHint')"
              class="w-full min-h-48"
              :disabled="!canUpdate"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.settings.meta.favicon')"
            class="w-full"
          >
            <div
              v-if="faviconPreview"
              class="relative rounded-lg overflow-hidden border border-default aspect-video group flex items-center justify-center bg-muted/10 p-4 w-full"
            >
              <img
                :src="faviconPreview"
                :alt="$t('common.imagePreview')"
                class="w-16 h-16 object-contain"
              >
              <UButton
                v-if="canUpdate"
                icon="i-lucide-x"
                size="xs"
                color="neutral"
                variant="solid"
                class="absolute top-2 right-2 rounded-full"
                :aria-label="$t('pages.settings.removeMedia')"
                @click="removeMedia('favicon')"
              />
              <div
                v-if="uploadingKey === 'favicon'"
                class="absolute inset-0 bg-black/40 flex items-center justify-center"
              >
                <UIcon
                  name="i-lucide-loader-2"
                  class="w-6 h-6 text-white animate-spin"
                />
              </div>
            </div>

            <UFileUpload
              v-else
              v-model="faviconFile"
              icon="i-lucide-bookmark"
              :label="$t('common.dropImageHere')"
              :description="$t('pages.settings.meta.faviconHint')"
              class="w-full min-h-48"
              :disabled="!canUpdate"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.settings.meta.ogImage')"
            class="w-full"
          >
            <div
              v-if="ogImagePreview"
              class="relative rounded-lg overflow-hidden border border-default aspect-video group w-full"
            >
              <img
                :src="ogImagePreview"
                :alt="$t('common.imagePreview')"
                class="w-full h-full object-cover"
              >
              <UButton
                v-if="canUpdate"
                icon="i-lucide-x"
                size="xs"
                color="neutral"
                variant="solid"
                class="absolute top-2 right-2 rounded-full"
                :aria-label="$t('pages.settings.removeMedia')"
                @click="removeMedia('ogImage')"
              />
              <div
                v-if="uploadingKey === 'ogImage'"
                class="absolute inset-0 bg-black/40 flex items-center justify-center"
              >
                <UIcon
                  name="i-lucide-loader-2"
                  class="w-6 h-6 text-white animate-spin"
                />
              </div>
            </div>

            <UFileUpload
              v-else
              v-model="ogImageFile"
              icon="i-lucide-image"
              :label="$t('common.dropImageHere')"
              :description="$t('pages.settings.meta.ogImageHint')"
              class="w-full min-h-48"
              :disabled="!canUpdate"
            />
          </UFormField>
        </div>
      </div>

      <div
        v-if="canUpdate"
        class="flex justify-end pt-3 border-t border-default"
      >
        <UButton
          type="submit"
          color="primary"
          :loading="isSaving"
          icon="i-lucide-save"
        >
          {{ $t('pages.settings.meta.save') }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { z } from 'zod'
import { settingService } from '~/services/setting-service'
import type { SettingMetaPayload } from '~/types/setting'

const { t } = useI18n()
const toast = useToast()
const { can } = usePermission()

const canUpdate = computed(() => can('settings.meta.update') || can('settings.update'))

const isLoading = ref(true)
const isSaving = ref(false)
const logoFile = ref<File | null>(null)
const faviconFile = ref<File | null>(null)
const ogImageFile = ref<File | null>(null)

interface FormState {
  siteName: string
  siteDescription: string
  metaKeywords: string
  author: string
  copyright: string
  logo: string | null
  favicon: string | null
  ogImage: string | null
}

const form = reactive<FormState>({
  siteName: '',
  siteDescription: '',
  metaKeywords: '',
  author: '',
  copyright: '',
  logo: null,
  favicon: null,
  ogImage: null
})

const metaSchema = z.object({
  siteName: z.string().trim().min(1, t('pages.settings.meta.siteNameRequired'))
})

const {
  previewUrl: logoPreview,
  isUploading: isUploadingLogo,
  uploadFile: uploadLogo,
  clearPreview: clearLogoPreview,
  setPreviewFromUrl: setLogoPreview
} = useImageUpload({
  upload: file => settingService.uploadFile(file),
  onUploaded: (path) => { form.logo = path },
  successMessage: t('pages.settings.uploadSuccess'),
  errorMessage: t('pages.settings.uploadFailed')
})

const {
  previewUrl: faviconPreview,
  isUploading: isUploadingFavicon,
  uploadFile: uploadFavicon,
  clearPreview: clearFaviconPreview,
  setPreviewFromUrl: setFaviconPreview
} = useImageUpload({
  upload: file => settingService.uploadFile(file),
  onUploaded: (path) => { form.favicon = path },
  successMessage: t('pages.settings.uploadSuccess'),
  errorMessage: t('pages.settings.uploadFailed')
})

const {
  previewUrl: ogImagePreview,
  isUploading: isUploadingOgImage,
  uploadFile: uploadOgImage,
  clearPreview: clearOgImagePreview,
  setPreviewFromUrl: setOgImagePreview
} = useImageUpload({
  upload: file => settingService.uploadFile(file),
  onUploaded: (path) => { form.ogImage = path },
  successMessage: t('pages.settings.uploadSuccess'),
  errorMessage: t('pages.settings.uploadFailed')
})

const uploadingKey = computed<'logo' | 'favicon' | 'ogImage' | null>(() => {
  if (isUploadingLogo.value) return 'logo'
  if (isUploadingFavicon.value) return 'favicon'
  if (isUploadingOgImage.value) return 'ogImage'
  return null
})

const fetchSettings = async () => {
  isLoading.value = true
  try {
    const response = await settingService.get()
    if (response.success && response.data) {
      const data = response.data
      form.siteName = data.siteName || ''
      form.siteDescription = data.siteDescription || ''
      form.metaKeywords = data.metaKeywords || ''
      form.author = data.author || ''
      form.copyright = data.copyright || ''
      form.logo = data.logo || null
      form.favicon = data.favicon || null
      form.ogImage = data.ogImage || null

      setLogoPreview(data.logoUrl)
      setFaviconPreview(data.faviconUrl)
      setOgImagePreview(data.ogImageUrl)
    }
  } catch (error) {
    console.error('Failed to load settings:', error)
  } finally {
    isLoading.value = false
  }
}

watch(logoFile, (file) => {
  const targetFile = Array.isArray(file) ? file[0] : file
  if (targetFile instanceof File) uploadLogo(targetFile)
})

watch(faviconFile, (file) => {
  const targetFile = Array.isArray(file) ? file[0] : file
  if (targetFile instanceof File) uploadFavicon(targetFile)
})

watch(ogImageFile, (file) => {
  const targetFile = Array.isArray(file) ? file[0] : file
  if (targetFile instanceof File) uploadOgImage(targetFile)
})

function removeMedia(target: 'logo' | 'favicon' | 'ogImage') {
  form[target] = null
  if (target === 'logo') {
    clearLogoPreview()
    logoFile.value = null
  }
  if (target === 'favicon') {
    clearFaviconPreview()
    faviconFile.value = null
  }
  if (target === 'ogImage') {
    clearOgImagePreview()
    ogImageFile.value = null
  }
}

const handleSave = async () => {
  isSaving.value = true
  try {
    const payload: SettingMetaPayload = {
      siteName: form.siteName.trim(),
      siteDescription: form.siteDescription?.trim() || null,
      metaKeywords: form.metaKeywords?.trim() || null,
      author: form.author?.trim() || null,
      copyright: form.copyright?.trim() || null,
      logo: form.logo || null,
      favicon: form.favicon || null,
      ogImage: form.ogImage || null
    }

    const response = await settingService.updateMeta(payload)
    if (response.success && response.data) {
      const data = response.data
      setLogoPreview(data.logoUrl)
      setFaviconPreview(data.faviconUrl)
      setOgImagePreview(data.ogImageUrl)

      toast.add({
        title: t('pages.settings.meta.updatedSuccess'),
        icon: 'i-lucide-check-circle',
        color: 'success'
      })
    } else {
      toast.add({
        title: response.message || t('common.error'),
        icon: 'i-lucide-circle-x',
        color: 'error'
      })
    }
  } catch {
    toast.add({
      title: t('common.error'),
      icon: 'i-lucide-circle-x',
      color: 'error'
    })
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  fetchSettings()
})
</script>
