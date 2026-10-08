<template>
  <div class="space-y-6 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <UButton
          variant="ghost"
          color="neutral"
          icon="i-lucide-arrow-left"
          to="/content/article"
        />
        <div>
          <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {{ $t('pages.article.createTitle') }}
          </h1>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">
            {{ $t('pages.article.createDescription') }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <UButton
          variant="outline"
          color="neutral"
          :loading="isSubmitting && form.status === 'draft'"
          @click="submitForm('draft')"
        >
          {{ $t('pages.article.saveDraft') }}
        </UButton>
        <UButton
          variant="solid"
          color="primary"
          :loading="isSubmitting && form.status === 'publish'"
          @click="submitForm('publish')"
        >
          {{ $t('pages.article.publish') }}
        </UButton>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Left Column: Content & SEO (8 cols) -->
      <div class="lg:col-span-8 space-y-6">
        <!-- Title & Slug Card -->
        <div class="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4">
          <UFormField
            :label="$t('pages.article.fieldTitle')"
            required
          >
            <UInput
              v-model="form.title"
              :placeholder="$t('pages.article.placeholderTitle')"
              size="lg"
              class="w-full font-semibold"
              @input="onTitleInput"
            />
          </UFormField>

          <UFormField :label="$t('pages.article.fieldSlug')">
            <UInput
              v-model="form.slug"
              :placeholder="$t('pages.article.placeholderSlug')"
              class="w-full font-mono text-xs"
            />
          </UFormField>
        </div>

        <!-- Tiptap Editor Card -->
        <div class="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-3">
          <label class="block text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {{ $t('pages.article.fieldContent') }} <span class="text-error-500">*</span>
          </label>
          <CommonTiptapEditor
            v-model="form.content"
            :placeholder="$t('pages.article.placeholderContent')"
          />
        </div>

        <!-- SEO Optimization Card -->
        <div class="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span class="i-lucide-search text-primary-500" />
              {{ $t('pages.article.seoSectionTitle') }}
            </h2>
            <span class="text-xs text-neutral-400">{{ $t('pages.article.seoSectionSubtitle') }}</span>
          </div>

          <div class="space-y-4 pt-2">
            <UFormField :label="$t('pages.article.fieldMetaTitle')">
              <UInput
                v-model="form.metaTitle"
                :placeholder="$t('pages.article.placeholderMetaTitle')"
                class="w-full"
              />
            </UFormField>

            <UFormField :label="$t('pages.article.fieldMetaDescription')">
              <UTextarea
                v-model="form.metaDescription"
                :placeholder="$t('pages.article.placeholderMetaDescription')"
                :rows="3"
                class="w-full"
              />
            </UFormField>

            <UFormField :label="$t('pages.article.fieldMetaKeywords')">
              <UInput
                v-model="form.metaKeywords"
                :placeholder="$t('pages.article.placeholderMetaKeywords')"
                class="w-full"
              />
            </UFormField>

            <UFormField :label="$t('pages.article.fieldCanonicalUrl')">
              <UInput
                v-model="form.canonicalUrl"
                :placeholder="$t('pages.article.placeholderCanonicalUrl')"
                class="w-full"
              />
            </UFormField>

            <!-- Social Meta (OG) -->
            <div class="border-t border-neutral-100 dark:border-neutral-800 pt-4 space-y-4">
              <h3 class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {{ $t('pages.article.socialMetaTitle') }}
              </h3>

              <UFormField :label="$t('pages.article.fieldOgTitle')">
                <UInput
                  v-model="form.ogTitle"
                  :placeholder="$t('pages.article.placeholderOgTitle')"
                  class="w-full"
                />
              </UFormField>

              <UFormField :label="$t('pages.article.fieldOgDescription')">
                <UTextarea
                  v-model="form.ogDescription"
                  :placeholder="$t('pages.article.placeholderOgDescription')"
                  :rows="2"
                  class="w-full"
                />
              </UFormField>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Settings & Cover (4 cols) -->
      <div class="lg:col-span-4 space-y-6">
        <!-- Publishing Meta -->
        <div class="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4">
          <h2 class="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            {{ $t('pages.article.settingsTitle') }}
          </h2>

          <UFormField :label="$t('pages.article.fieldCategory')">
            <USelect
              v-model="form.categoryId"
              :items="categoryOptions"
              :placeholder="$t('pages.article.selectCategory')"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="$t('pages.article.fieldTags')">
            <UInput
              v-model="rawTags"
              :placeholder="$t('pages.article.placeholderTags')"
              class="w-full"
              @blur="syncTags"
            />
            <p class="text-xs text-neutral-400 mt-1">
              {{ $t('pages.article.tagsHelp') }}
            </p>
          </UFormField>
        </div>

        <!-- Cover Image Card -->
        <div class="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4">
          <h2 class="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            {{ $t('pages.article.coverTitle') }}
          </h2>

          <div
            v-if="coverPreviewUrl"
            class="relative rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 aspect-video group"
          >
            <img
              :src="coverPreviewUrl"
              alt="Cover Preview"
              class="w-full h-full object-cover"
            >
            <button
              type="button"
              class="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              @click="removeCover"
            >
              <span class="i-lucide-x text-sm" />
            </button>
          </div>

          <div
            v-else
            class="border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer"
            @click="triggerFileInput"
          >
            <span class="i-lucide-upload-cloud text-3xl text-neutral-400 mx-auto block mb-2" />
            <p class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {{ $t('pages.article.uploadCover') }}
            </p>
            <p class="text-xs text-neutral-400 mt-1">
              PNG, JPG, WEBP (Max 5MB)
            </p>
          </div>

          <input
            ref="fileInputRef"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileUpload"
          >

          <UButton
            v-if="!coverPreviewUrl"
            variant="outline"
            color="neutral"
            size="sm"
            class="w-full justify-center"
            :loading="isUploadingCover"
            @click="triggerFileInput"
          >
            {{ $t('pages.article.chooseFile') }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { articleService } from '~/services/article-service'
import { categoryService } from '~/services/category-service'
import type { ArticlePayload, Category, ArticleStatus } from '~/types/content'

definePageMeta({
  layout: 'dashboard'
})

const { t } = useI18n()
const toast = useToast()

const categories = ref<Category[]>([])
const fileInputRef = ref<HTMLInputElement | null>(null)
const isSubmitting = ref(false)
const isUploadingCover = ref(false)
const coverPreviewUrl = ref<string | null>(null)
const rawTags = ref('')

const form = reactive<ArticlePayload>({
  title: '',
  slug: '',
  categoryId: undefined,
  cover: null,
  content: '',
  tags: [],
  status: 'draft',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  canonicalUrl: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: ''
})

const categoryOptions = computed(() => [
  { label: t('pages.article.noCategory'), value: null as number | null },
  ...categories.value.map(c => ({ label: c.name, value: c.id }))
])

onMounted(async () => {
  const res = await categoryService.getAllList()
  if (res.success) {
    categories.value = res.data
  }
})

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function onTitleInput() {
  if (!form.slug || form.slug === slugify(form.title.slice(0, -1))) {
    form.slug = slugify(form.title)
  }
}

function syncTags() {
  form.tags = rawTags.value
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)
}

function triggerFileInput() {
  fileInputRef.value?.click()
}

async function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  coverPreviewUrl.value = URL.createObjectURL(file)
  isUploadingCover.value = true

  try {
    const res = await articleService.uploadCover(file)
    if (res.success && res.data) {
      form.cover = res.data.path
      toast.add({
        title: t('pages.article.coverUploaded'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
    } else {
      toast.add({
        title: t('pages.article.coverUploadFailed'),
        color: 'error',
        icon: 'i-lucide-circle-x'
      })
    }
  } finally {
    isUploadingCover.value = false
  }
}

function removeCover() {
  form.cover = null
  coverPreviewUrl.value = null
  if (fileInputRef.value) fileInputRef.value.value = ''
}

async function submitForm(targetStatus: ArticleStatus) {
  if (!form.title.trim()) {
    toast.add({
      title: t('pages.article.titleRequired'),
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
    return
  }

  if (!form.content.trim() || form.content === '<p></p>') {
    toast.add({
      title: t('pages.article.contentRequired'),
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
    return
  }

  syncTags()
  form.status = targetStatus
  isSubmitting.value = true

  try {
    const res = await articleService.create(form)
    if (res.success) {
      toast.add({
        title: t('pages.article.createdSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      await navigateTo('/content/article')
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
