<template>
  <div class="space-y-6">
    <!-- Header -->
    <Header
      :title="$t('pages.settings.title')"
      :description="$t('pages.settings.description')"
    >
      <template #tabs>
        <button
          type="button"
          class="pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-2"
          :class="[
            activeTab === 'meta'
              ? 'border-primary text-primary font-semibold'
              : 'border-transparent text-muted hover:text-highlighted'
          ]"
          @click="activeTab = 'meta'"
        >
          <UIcon
            name="i-lucide-globe"
            class="w-4 h-4"
          />
          {{ $t('pages.settings.tabMeta') }}
        </button>

        <button
          type="button"
          class="pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-2"
          :class="[
            activeTab === 'contact'
              ? 'border-primary text-primary font-semibold'
              : 'border-transparent text-muted hover:text-highlighted'
          ]"
          @click="activeTab = 'contact'"
        >
          <UIcon
            name="i-lucide-phone"
            class="w-4 h-4"
          />
          {{ $t('pages.settings.tabContact') }}
        </button>

        <button
          type="button"
          class="pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-2"
          :class="[
            activeTab === 'social'
              ? 'border-primary text-primary font-semibold'
              : 'border-transparent text-muted hover:text-highlighted'
          ]"
          @click="activeTab = 'social'"
        >
          <UIcon
            name="i-lucide-share-2"
            class="w-4 h-4"
          />
          {{ $t('pages.settings.tabSocial') }}
        </button>
      </template>

      <template
        v-if="can('settings.update')"
        #actions
      >
        <UButton
          color="primary"
          variant="solid"
          icon="i-lucide-save"
          :loading="isSaving"
          @click="handleSave"
        >
          {{ isSaving ? $t('pages.settings.savingButton') : $t('pages.settings.saveButton') }}
        </UButton>
      </template>
    </Header>

    <!-- Loading Skeleton -->
    <div
      v-if="isLoading"
      class="space-y-6"
    >
      <div class="bg-default border border-default rounded-lg p-6 space-y-4">
        <USkeleton class="h-6 w-48" />
        <USkeleton class="h-10 w-full" />
        <USkeleton class="h-24 w-full" />
      </div>
    </div>

    <!-- Main Content -->
    <div
      v-else
      class="space-y-6"
    >
      <!-- Tab 1: Meta Website -->
      <div
        v-show="activeTab === 'meta'"
        class="space-y-6"
      >
        <!-- General Meta Information Card -->
        <div class="bg-default border border-default rounded-lg p-6 space-y-6">
          <div class="border-b border-default pb-4">
            <h3 class="text-base font-semibold text-highlighted">
              {{ $t('pages.settings.metaSection.title') }}
            </h3>
            <p class="text-xs text-muted mt-1">
              {{ $t('pages.settings.metaSection.description') }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField
              :label="$t('pages.settings.metaSection.siteName')"
              required
              class="md:col-span-2"
            >
              <UInput
                v-model="form.siteName"
                :placeholder="$t('pages.settings.metaSection.siteNamePlaceholder')"
                icon="i-lucide-globe"
                class="w-full"
              />
            </UFormField>

            <UFormField :label="$t('pages.settings.metaSection.author')">
              <UInput
                v-model="form.author"
                :placeholder="$t('pages.settings.metaSection.authorPlaceholder')"
                icon="i-lucide-user"
                class="w-full"
              />
            </UFormField>

            <UFormField :label="$t('pages.settings.metaSection.copyright')">
              <UInput
                v-model="form.copyright"
                :placeholder="$t('pages.settings.metaSection.copyrightPlaceholder')"
                icon="i-lucide-copyright"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="$t('pages.settings.metaSection.metaKeywords')"
              :help="$t('pages.settings.metaSection.metaKeywordsHelp')"
              class="md:col-span-2"
            >
              <UInput
                v-model="form.metaKeywords"
                :placeholder="$t('pages.settings.metaSection.metaKeywordsPlaceholder')"
                icon="i-lucide-tag"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="$t('pages.settings.metaSection.siteDescription')"
              class="md:col-span-2"
            >
              <UTextarea
                v-model="form.siteDescription"
                :placeholder="$t('pages.settings.metaSection.siteDescriptionPlaceholder')"
                :rows="4"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>

        <!-- Media & Branding Card -->
        <div class="bg-default border border-default rounded-lg p-6 space-y-6">
          <div class="border-b border-default pb-4">
            <h3 class="text-base font-semibold text-highlighted">
              {{ $t('pages.settings.metaSection.mediaTitle') }}
            </h3>
            <p class="text-xs text-muted mt-1">
              {{ $t('pages.settings.metaSection.logoHint') }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Logo Upload -->
            <div class="space-y-3">
              <div class="space-y-1">
                <label class="text-sm font-medium text-highlighted block">
                  {{ $t('pages.settings.metaSection.logo') }}
                </label>
                <p class="text-xs text-muted">
                  {{ $t('pages.settings.metaSection.logoHint') }}
                </p>
              </div>

              <div class="border border-default rounded-lg p-4 flex flex-col items-center justify-center gap-3 min-h-48 bg-muted/20 relative">
                <div
                  v-if="logoPreview"
                  class="relative group w-full h-28 flex items-center justify-center overflow-hidden rounded"
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
                  class="flex flex-col items-center justify-center text-center py-4"
                >
                  <UIcon
                    name="i-lucide-image"
                    class="w-10 h-10 text-dimmed mb-2"
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

            <!-- Favicon Upload -->
            <div class="space-y-3">
              <div class="space-y-1">
                <label class="text-sm font-medium text-highlighted block">
                  {{ $t('pages.settings.metaSection.favicon') }}
                </label>
                <p class="text-xs text-muted">
                  {{ $t('pages.settings.metaSection.faviconHint') }}
                </p>
              </div>

              <div class="border border-default rounded-lg p-4 flex flex-col items-center justify-center gap-3 min-h-48 bg-muted/20 relative">
                <div
                  v-if="faviconPreview"
                  class="relative group w-16 h-16 flex items-center justify-center overflow-hidden rounded border border-default p-2 bg-default"
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
                  class="flex flex-col items-center justify-center text-center py-4"
                >
                  <UIcon
                    name="i-lucide-bookmark"
                    class="w-10 h-10 text-dimmed mb-2"
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

            <!-- OpenGraph Image Upload -->
            <div class="space-y-3">
              <div class="space-y-1">
                <label class="text-sm font-medium text-highlighted block">
                  {{ $t('pages.settings.metaSection.ogImage') }}
                </label>
                <p class="text-xs text-muted">
                  {{ $t('pages.settings.metaSection.ogImageHint') }}
                </p>
              </div>

              <div class="border border-default rounded-lg p-4 flex flex-col items-center justify-center gap-3 min-h-48 bg-muted/20 relative">
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
                  class="flex flex-col items-center justify-center text-center py-4"
                >
                  <UIcon
                    name="i-lucide-share"
                    class="w-10 h-10 text-dimmed mb-2"
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
      </div>

      <!-- Tab 2: Kontak -->
      <div
        v-show="activeTab === 'contact'"
        class="bg-default border border-default rounded-lg p-6 space-y-6"
      >
        <div class="border-b border-default pb-4">
          <h3 class="text-base font-semibold text-highlighted">
            {{ $t('pages.settings.contactSection.title') }}
          </h3>
          <p class="text-xs text-muted mt-1">
            {{ $t('pages.settings.contactSection.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormField :label="$t('pages.settings.contactSection.phone')">
            <UInput
              v-model="form.phone"
              :placeholder="$t('pages.settings.contactSection.phonePlaceholder')"
              icon="i-lucide-phone"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="$t('pages.settings.contactSection.email')">
            <UInput
              v-model="form.email"
              type="email"
              :placeholder="$t('pages.settings.contactSection.emailPlaceholder')"
              icon="i-lucide-mail"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.settings.contactSection.address')"
            class="md:col-span-2"
          >
            <UTextarea
              v-model="form.address"
              :placeholder="$t('pages.settings.contactSection.addressPlaceholder')"
              :rows="4"
              class="w-full"
            />
          </UFormField>
        </div>
      </div>

      <!-- Tab 3: Sosial Media -->
      <div
        v-show="activeTab === 'social'"
        class="bg-default border border-default rounded-lg p-6 space-y-6"
      >
        <div class="border-b border-default pb-4">
          <h3 class="text-base font-semibold text-highlighted">
            {{ $t('pages.settings.socialSection.title') }}
          </h3>
          <p class="text-xs text-muted mt-1">
            {{ $t('pages.settings.socialSection.description') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UFormField :label="$t('pages.settings.socialSection.facebook')">
            <UInput
              v-model="form.facebook"
              :placeholder="$t('pages.settings.socialSection.facebookPlaceholder')"
              icon="i-lucide-facebook"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="$t('pages.settings.socialSection.instagram')">
            <UInput
              v-model="form.instagram"
              :placeholder="$t('pages.settings.socialSection.instagramPlaceholder')"
              icon="i-lucide-instagram"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="$t('pages.settings.socialSection.tiktok')">
            <UInput
              v-model="form.tiktok"
              :placeholder="$t('pages.settings.socialSection.tiktokPlaceholder')"
              icon="i-lucide-music-2"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="$t('pages.settings.socialSection.linkedin')">
            <UInput
              v-model="form.linkedin"
              :placeholder="$t('pages.settings.socialSection.linkedinPlaceholder')"
              icon="i-lucide-linkedin"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="$t('pages.settings.socialSection.twitter')">
            <UInput
              v-model="form.twitter"
              :placeholder="$t('pages.settings.socialSection.twitterPlaceholder')"
              icon="i-lucide-twitter"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="$t('pages.settings.socialSection.youtube')">
            <UInput
              v-model="form.youtube"
              :placeholder="$t('pages.settings.socialSection.youtubePlaceholder')"
              icon="i-lucide-youtube"
              class="w-full"
            />
          </UFormField>
        </div>
      </div>

      <!-- Bottom Save Action -->
      <div
        v-if="can('settings.update')"
        class="flex justify-end pt-4 border-t border-default"
      >
        <UButton
          color="primary"
          variant="solid"
          icon="i-lucide-save"
          :loading="isSaving"
          @click="handleSave"
        >
          {{ isSaving ? $t('pages.settings.savingButton') : $t('pages.settings.saveButton') }}
        </UButton>
      </div>
    </div>

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
import { settingService } from '~/services/setting-service'
import type { SettingPayload } from '~/types/setting'

definePageMeta({
  layout: 'dashboard'
})

const { t } = useI18n()
const toast = useToast()
const { can } = usePermission()

const activeTab = ref<'meta' | 'contact' | 'social'>('meta')
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
  phone: string
  email: string
  address: string
  facebook: string
  instagram: string
  tiktok: string
  linkedin: string
  twitter: string
  youtube: string
}

const form = reactive<FormState>({
  siteName: '',
  siteDescription: '',
  metaKeywords: '',
  author: '',
  copyright: '',
  logo: null,
  favicon: null,
  ogImage: null,
  phone: '',
  email: '',
  address: '',
  facebook: '',
  instagram: '',
  tiktok: '',
  linkedin: '',
  twitter: '',
  youtube: ''
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
      form.phone = data.phone || ''
      form.email = data.email || ''
      form.address = data.address || ''
      form.facebook = data.facebook || ''
      form.instagram = data.instagram || ''
      form.tiktok = data.tiktok || ''
      form.linkedin = data.linkedin || ''
      form.twitter = data.twitter || ''
      form.youtube = data.youtube || ''

      // Setup image previews
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

  // Create temporary local preview
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
    // Revert preview to previous stored value if upload failed
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
  if (!form.siteName?.trim()) {
    toast.add({
      title: t('pages.settings.metaSection.siteName') + ' ' + t('common.error'),
      description: 'Site Name is required',
      icon: 'i-lucide-circle-x',
      color: 'error'
    })
    return
  }

  isSaving.value = true
  try {
    const payload: SettingPayload = {
      siteName: form.siteName.trim(),
      siteDescription: form.siteDescription?.trim() || null,
      metaKeywords: form.metaKeywords?.trim() || null,
      author: form.author?.trim() || null,
      copyright: form.copyright?.trim() || null,
      logo: form.logo || null,
      favicon: form.favicon || null,
      ogImage: form.ogImage || null,
      phone: form.phone?.trim() || null,
      email: form.email?.trim() || null,
      address: form.address?.trim() || null,
      facebook: form.facebook?.trim() || null,
      instagram: form.instagram?.trim() || null,
      tiktok: form.tiktok?.trim() || null,
      linkedin: form.linkedin?.trim() || null,
      twitter: form.twitter?.trim() || null,
      youtube: form.youtube?.trim() || null
    }

    const response = await settingService.update(payload)
    if (response.success && response.data) {
      const data = response.data
      logoPreview.value = data.logoUrl || null
      faviconPreview.value = data.faviconUrl || null
      ogImagePreview.value = data.ogImageUrl || null

      toast.add({
        title: t('pages.settings.savedSuccess'),
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
