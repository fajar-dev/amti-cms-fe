<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-highlighted tracking-tight">
        {{ $t('pages.article.createTitle') }}
      </h1>
      <p class="text-sm text-muted">
        {{ $t('pages.article.createDescription') }}
      </p>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Left Column: Content (8 cols) -->
      <div class="lg:col-span-8 space-y-6">
        <!-- Title & Slug Card -->
        <div class="bg-default border border-default rounded-lg p-6 space-y-4">
          <UFormField
            :label="$t('pages.article.fieldTitle')"
            required
          >
            <UInput
              v-model="form.title"
              :placeholder="$t('pages.article.placeholderTitle')"
              size="lg"
              class="w-full"
              @input="onTitleInput"
            />
          </UFormField>

          <UFormField :label="$t('pages.article.fieldSlug')">
            <UInput
              v-model="form.slug"
              :placeholder="$t('pages.article.placeholderSlug')"
              class="w-full"
            />
          </UFormField>
        </div>

        <!-- Tiptap Editor Card -->
        <div class="bg-default border border-default rounded-lg p-6">
          <UFormField
            :label="$t('pages.article.fieldContent')"
            required
            class="w-full"
          >
            <CommonTiptapEditor
              v-model="form.content"
              :placeholder="$t('pages.article.placeholderContent')"
            />
          </UFormField>
        </div>
      </div>

      <!-- Right Column: Settings & Cover (4 cols) -->
      <div class="lg:col-span-4 space-y-6">
        <!-- Publishing Settings -->
        <div class="bg-default border border-default rounded-lg p-6 space-y-4">
          <h2 class="text-base font-semibold text-highlighted">
            {{ $t('pages.article.settingsTitle') }}
          </h2>

          <UFormField :label="$t('pages.article.fieldAuthor')">
            <USelectMenu
              v-model="selectedAuthor"
              :avatar="selectedAuthor?.avatar"
              :items="authorOptions"
              by="value"
              :placeholder="$t('pages.article.selectAuthor')"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="$t('pages.article.fieldCategory')">
            <USelectMenu
              v-model="form.categoryId"
              :items="categoryOptions"
              value-key="value"
              :placeholder="$t('pages.article.selectCategory')"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="$t('pages.article.fieldTags')"
            :help="$t('pages.article.tagsHelp')"
          >
            <UInputTags
              v-model="form.tags"
              :placeholder="$t('pages.article.placeholderTags')"
              class="w-full"
            />
          </UFormField>

          <UFormField :label="$t('pages.article.fieldDescription')">
            <UTextarea
              v-model="form.description"
              :placeholder="$t('pages.article.placeholderDescription')"
              :rows="3"
              class="w-full"
            />
          </UFormField>
        </div>

        <!-- Cover Image Card -->
        <div class="bg-default border border-default rounded-lg p-6 space-y-4 overflow-hidden">
          <div>
            <h2 class="text-base font-semibold text-highlighted">
              {{ $t('pages.article.coverTitle') }}
            </h2>
            <p class="text-xs text-muted mt-0.5">
              {{ $t('pages.article.recommendedCoverDimension') }}
            </p>
          </div>

          <div
            v-if="coverPreviewUrl"
            class="relative rounded-lg overflow-hidden border border-default aspect-video group"
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

          <UFileUpload
            v-else
            v-model="coverFile"
            icon="i-lucide-image"
            label="Drop your image here"
            :description="$t('pages.article.recommendedCoverDimension')"
            class="w-full min-h-48"
          />
        </div>
      </div>
    </div>

    <!-- Bottom Actions -->
    <div class="flex items-center justify-between pt-4 border-t border-default">
      <UButton
        variant="soft"
        color="neutral"
        to="/content/article"
      >
        {{ $t('common.cancel') }}
      </UButton>

      <div class="flex items-center gap-3">
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
  </div>
</template>

<script setup lang="ts">
import { articleService } from '~/services/article-service'
import { categoryService } from '~/services/category-service'
import { userService } from '~/services/user-service'
import type { ArticlePayload, Category, ArticleStatus } from '~/types/content'
import type { User } from '~/types/user'

definePageMeta({
  layout: 'dashboard'
})

const { t } = useI18n()
const toast = useToast()
const { state: authState } = useAuth()

const categories = ref<Category[]>([])
const users = ref<User[]>([])
const coverFile = ref<File | null>(null)
const isSubmitting = ref(false)
const isUploadingCover = ref(false)
const coverPreviewUrl = ref<string | null>(null)

const form = reactive<ArticlePayload>({
  title: '',
  slug: '',
  authorId: authState.user?.id ?? null,
  categoryId: null,
  description: '',
  cover: null,
  content: '',
  tags: [],
  status: 'draft'
})

const categoryOptions = computed(() => [
  { label: t('pages.article.noCategory'), value: null as number | null },
  ...categories.value.map(c => ({ label: c.name, value: c.id }))
])

const authorOptions = computed(() =>
  users.value.map(u => ({
    label: u.name,
    value: u.id,
    avatar: {
      src: u.photo || undefined,
      alt: u.name,
      loading: 'lazy' as const
    }
  }))
)

const selectedAuthor = computed({
  get() {
    return authorOptions.value.find(item => item.value === form.authorId)
  },
  set(val: { value: number } | undefined) {
    form.authorId = val?.value ?? null
  }
})

onMounted(async () => {
  const [catRes, userRes] = await Promise.all([
    categoryService.getAllList(),
    userService.getAllList()
  ])
  if (catRes.success) {
    categories.value = catRes.data
  }
  if (userRes.success) {
    users.value = userRes.data
  }
  if (!form.authorId && authState.user?.id) {
    form.authorId = authState.user.id
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

watch(coverFile, async (file) => {
  if (file instanceof File) {
    await uploadCover(file)
  }
})

async function uploadCover(file: File) {
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
      coverPreviewUrl.value = null
      coverFile.value = null
      toast.add({
        title: t('pages.article.coverUploadFailed'),
        color: 'error',
        icon: 'i-lucide-circle-x'
      })
    }
  } catch {
    coverPreviewUrl.value = null
    coverFile.value = null
    toast.add({
      title: t('pages.article.coverUploadFailed'),
      color: 'error',
      icon: 'i-lucide-circle-x'
    })
  } finally {
    isUploadingCover.value = false
  }
}

function removeCover() {
  form.cover = null
  coverPreviewUrl.value = null
  coverFile.value = null
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
