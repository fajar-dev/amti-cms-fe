<template>
  <div class="p-6 space-y-6">
    <!-- Loading Skeleton -->
    <div
      v-if="isLoading"
      class="space-y-6"
    >
      <USkeleton class="h-6 w-48" />
      <USkeleton class="h-10 w-full" />
      <USkeleton class="h-10 w-full" />
      <USkeleton class="h-24 w-full" />
    </div>

    <!-- Meta Form -->
    <UForm
      v-else
      :schema="metaSchema"
      :state="form"
      class="space-y-6"
      @submit="handleSave"
    >
      <!-- Meta SEO Info -->
      <div class="space-y-4">
        <div class="border-b border-default pb-3">
          <h3 class="text-sm font-semibold text-highlighted">
            {{ $t('pages.settings.meta.title') }}
          </h3>
          <p class="text-xs text-muted mt-0.5">
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
            />
          </UFormField>
        </div>
      </div>

      <!-- Media & Branding -->
      <div class="space-y-4 pt-2 border-t border-default">
        <div>
          <h3 class="text-sm font-semibold text-highlighted">
            {{ $t('pages.settings.meta.mediaTitle') }}
          </h3>
          <p class="text-xs text-muted mt-0.5">
            {{ $t('pages.settings.meta.logoHint') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Logo -->
          <div class="space-y-2">
            <label class="text-xs font-medium text-highlighted block">
              {{ $t('pages.settings.meta.logo') }}
            </label>
            <p class="text-xs text-muted">
              {{ $t('pages.settings.meta.logoHint') }}
            </p>

            <div class="border border-default rounded-lg p-3 flex flex-col items-center justify-center gap-2 min-h-40 bg-muted/20 relative">
              <div
                v-if="logoPreview"
                class="relative group w-full h-24 flex items-center justify-center overflow-hidden rounded"
              >
                <img
                  :src="logoPreview"
                  alt="Logo Preview"
                  class="max-h-full max-w-full object-contain"
                >
                <div
                  v-if="can('settings.update')"
                  class="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <UButton
                    size="xs"
                    color="neutral"
                    variant="solid"
                    icon="i-lucide-upload"
                    @click="triggerUpload('logo')"
                  >
                    {{ $t('pages.settings.changeMedia') }}
                  </UButton>
                  <UButton
                    size="xs"
                    color="error"
                    variant="solid"
                    icon="i-lucide-trash"
                    @click="removeMedia('logo')"
                  >
                    {{ $t('pages.settings.removeMedia') }}
                  </UButton>
                </div>
              </div>

              <div
                v-else
                class="flex flex-col items-center justify-center text-center py-2"
              >
                <UIcon
                  name="i-lucide-image"
                  class="w-8 h-8 text-dimmed mb-2"
                />
                <UButton
                  v-if="can('settings.update')"
                  size="xs"
                  color="neutral"
                  variant="outline"
                  icon="i-lucide-upload"
                  :loading="uploadingKey === 'logo'"
                  @click="triggerUpload('logo')"
                >
                  {{ $t('pages.settings.chooseFile') }}
                </UButton>
              </div>

              <div
                v-if="uploadingKey === 'logo'"
                class="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg"
              >
                <UIcon
                  name="i-lucide-loader-2"
                  class="w-6 h-6 text-white animate-spin"
                />
              </div>
            </div>
          </div>

          <!-- Favicon -->
          <div class="space-y-2">
            <label class="text-xs font-medium text-highlighted block">
              {{ $t('pages.settings.meta.favicon') }}
            </label>
            <p class="text-xs text-muted">
              {{ $t('pages.settings.meta.faviconHint') }}
            </p>

            <div class="border border-default rounded-lg p-3 flex flex-col items-center justify-center gap-2 min-h-40 bg-muted/20 relative">
              <div
                v-if="faviconPreview"
                class="relative group w-14 h-14 flex items-center justify-center overflow-hidden rounded border border-default p-2 bg-default"
              >
                <img
                  :src="faviconPreview"
                  alt="Favicon Preview"
                  class="max-h-full max-w-full object-contain"
                >
                <div
                  v-if="can('settings.update')"
                  class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    type="button"
                    class="text-white hover:text-red-400 p-1"
                    @click="removeMedia('favicon')"
                  >
                    <UIcon
                      name="i-lucide-trash"
                      class="w-4 h-4"
                    />
                  </button>
                </div>
              </div>

              <div
                v-else
                class="flex flex-col items-center justify-center text-center py-2"
              >
                <UIcon
                  name="i-lucide-bookmark"
                  class="w-8 h-8 text-dimmed mb-2"
                />
                <UButton
                  v-if="can('settings.update')"
                  size="xs"
                  color="neutral"
                  variant="outline"
                  icon="i-lucide-upload"
                  :loading="uploadingKey === 'favicon'"
                  @click="triggerUpload('favicon')"
                >
                  {{ $t('pages.settings.chooseFile') }}
                </UButton>
              </div>

              <div
                v-if="faviconPreview && can('settings.update')"
                class="flex gap-2"
              >
                <UButton
                  size="xs"
                  color="neutral"
                  variant="outline"
                  icon="i-lucide-upload"
                  @click="triggerUpload('favicon')"
                >
                  {{ $t('pages.settings.changeMedia') }}
                </UButton>
                <UButton
                  size="xs"
                  color="error"
                  variant="outline"
                  icon="i-lucide-trash"
                  @click="removeMedia('favicon')"
                >
                  {{ $t('pages.settings.removeMedia') }}
                </UButton>
              </div>

              <div
                v-if="uploadingKey === 'favicon'"
                class="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg"
              >
                <UIcon
                  name="i-lucide-loader-2"
                  class="w-6 h-6 text-white animate-spin"
                />
              </div>
            </div>
          </div>

          <!-- OpenGraph Image -->
          <div class="space-y-2">
            <label class="text-xs font-medium text-highlighted block">
              {{ $t('pages.settings.meta.ogImage') }}
            </label>
            <p class="text-xs text-muted">
              {{ $t('pages.settings.meta.ogImageHint') }}
            </p>

            <div class="border border-default rounded-lg p-3 flex flex-col items-center justify-center gap-2 min-h-40 bg-muted/20 relative">
              <div
                v-if="ogImagePreview"
                class="relative group w-full aspect-video flex items-center justify-center overflow-hidden rounded border border-default"
              >
                <img
                  :src="ogImagePreview"
                  alt="OG Image Preview"
                  class="w-full h-full object-cover"
                >
                <div
                  v-if="can('settings.update')"
                  class="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <UButton
                    size="xs"
                    color="neutral"
                    variant="solid"
                    icon="i-lucide-upload"
                    @click="triggerUpload('ogImage')"
                  >
                    {{ $t('pages.settings.changeMedia') }}
                  </UButton>
                  <UButton
                    size="xs"
                    color="error"
                    variant="solid"
                    icon="i-lucide-trash"
                    @click="removeMedia('ogImage')"
                  >
                    {{ $t('pages.settings.removeMedia') }}
                  </UButton>
                </div>
              </div>

              <div
                v-else
                class="flex flex-col items-center justify-center text-center py-2"
              >
                <UIcon
                  name="i-lucide-share"
                  class="w-8 h-8 text-dimmed mb-2"
                />
                <UButton
                  v-if="can('settings.update')"
                  size="xs"
                  color="neutral"
                  variant="outline"
                  icon="i-lucide-upload"
                  :loading="uploadingKey === 'ogImage'"
                  @click="triggerUpload('ogImage')"
                >
                  {{ $t('pages.settings.chooseFile') }}
                </UButton>
              </div>

              <div
                v-if="uploadingKey === 'ogImage'"
                class="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg"
              >
                <UIcon
                  name="i-lucide-loader-2"
                  class="w-6 h-6 text-white animate-spin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div
        v-if="can('settings.update')"
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

    <!-- Hidden File Input for Image Uploads -->
    <input
      ref="fileInputRef"
      type="file"
      class="hidden"
      accept="image/*"
      @change="onFileSelected"
    >
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { z } from 'zod'
import { settingService } from '~/services/setting-service'
import type { SettingMetaPayload } from '~/types/setting'

const { t } = useI18n()
const toast = useToast()
const { can } = usePermission()

const isLoading = ref(true)
const isSaving = ref(false)
const uploadingKey = ref<'logo' | 'favicon' | 'ogImage' | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const currentUploadTarget = ref<'logo' | 'favicon' | 'ogImage' | null>(null)

const logoPreview = ref<string | null>(null)
const faviconPreview = ref<string | null>(null)
const ogImagePreview = ref<string | null>(null)

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
  siteName: z.string().trim().min(1, 'Site name is required')
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

      logoPreview.value = data.logoUrl || null
      faviconPreview.value = data.faviconUrl || null
      ogImagePreview.value = data.ogImageUrl || null
    }
  } catch (error) {
    console.error('Failed to load settings:', error)
  } finally {
    isLoading.value = false
  }
}

const triggerUpload = (target: 'logo' | 'favicon' | 'ogImage') => {
  currentUploadTarget.value = target
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
    fileInputRef.value.click()
  }
}

const onFileSelected = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  const target = currentUploadTarget.value
  if (!file || !target) return

  const localUrl = URL.createObjectURL(file)
  if (target === 'logo') logoPreview.value = localUrl
  if (target === 'favicon') faviconPreview.value = localUrl
  if (target === 'ogImage') ogImagePreview.value = localUrl

  uploadingKey.value = target
  try {
    const response = await settingService.uploadFile(file)
    if (response.success && response.data?.path) {
      form[target] = response.data.path
      toast.add({
        title: t('pages.settings.uploadSuccess'),
        icon: 'i-lucide-check-circle',
        color: 'success'
      })
    } else {
      throw new Error(response.message || 'Upload failed')
    }
  } catch {
    toast.add({
      title: t('pages.settings.uploadFailed'),
      icon: 'i-lucide-circle-x',
      color: 'error'
    })
    if (target === 'logo') logoPreview.value = form.logo ? logoPreview.value : null
    if (target === 'favicon') faviconPreview.value = form.favicon ? faviconPreview.value : null
    if (target === 'ogImage') ogImagePreview.value = form.ogImage ? ogImagePreview.value : null
  } finally {
    uploadingKey.value = null
    currentUploadTarget.value = null
  }
}

const removeMedia = (target: 'logo' | 'favicon' | 'ogImage') => {
  form[target] = null
  if (target === 'logo') logoPreview.value = null
  if (target === 'favicon') faviconPreview.value = null
  if (target === 'ogImage') ogImagePreview.value = null
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
      logoPreview.value = data.logoUrl || null
      faviconPreview.value = data.faviconUrl || null
      ogImagePreview.value = data.ogImageUrl || null

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
