<template>
  <div
    v-if="isLoading"
    class="space-y-6"
  >
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8 space-y-6">
        <USkeleton class="h-40 w-full rounded-lg" />
        <USkeleton class="h-96 w-full rounded-lg" />
      </div>
      <div class="lg:col-span-4 space-y-6">
        <USkeleton class="h-64 w-full rounded-lg" />
        <USkeleton class="h-56 w-full rounded-lg" />
      </div>
    </div>
  </div>

  <div
    v-else
    class="space-y-6"
  >
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8 space-y-6">
        <UCard :ui="{ body: 'p-6 space-y-4' }">
          <UFormField
            :label="$t('pages.article.fieldTitle')"
            required
          >
            <UInput
              v-model="form.title"
              :placeholder="$t('pages.article.placeholderTitle')"
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
        </UCard>

        <UCard :ui="{ body: 'p-6' }">
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
        </UCard>
      </div>

      <div class="lg:col-span-4 space-y-6">
        <UCard :ui="{ body: 'p-6 space-y-4' }">
          <h2 class="text-base font-semibold text-highlighted">
            {{ $t('pages.article.settingsTitle') }}
          </h2>

          <div
            v-if="article"
            class="flex items-center justify-between p-3 rounded-lg bg-muted border border-default"
          >
            <span class="text-xs text-muted font-medium flex items-center gap-1.5">
              <UIcon
                name="i-lucide-eye"
                class="size-4 text-primary"
              />
              {{ $t('pages.article.totalViews') }}
            </span>
            <span class="text-sm font-bold text-highlighted">
              {{ article.viewsCount || 0 }}
            </span>
          </div>

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
        </UCard>

        <UCard :ui="{ body: 'p-6 space-y-4' }">
          <div>
            <h2 class="text-base font-semibold text-highlighted">
              {{ $t('pages.article.coverTitle') }}
            </h2>
            <p class="text-sm text-muted mt-0.5">
              {{ $t('pages.article.recommendedCoverDimension') }}
            </p>
          </div>

          <div
            v-if="previewUrl"
            class="relative rounded-lg overflow-hidden border border-default aspect-video group"
          >
            <img
              :src="previewUrl"
              :alt="$t('common.imagePreview')"
              class="w-full h-full object-cover"
            >
            <UButton
              icon="i-lucide-x"
              size="xs"
              color="neutral"
              variant="solid"
              class="absolute top-2 right-2 rounded-full"
              :aria-label="$t('pages.settings.removeMedia')"
              @click="removeCover"
            />
            <div
              v-if="isUploading"
              class="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <UIcon
                name="i-lucide-loader-2"
                class="size-6 text-white animate-spin"
              />
            </div>
          </div>

          <UFileUpload
            v-else
            v-model="coverFile"
            icon="i-lucide-image"
            :label="$t('common.dropImageHere')"
            :description="$t('pages.article.recommendedCoverDimension')"
            class="w-full min-h-48"
            :disabled="isUploading"
          />
        </UCard>
      </div>
    </div>

    <div class="flex items-center justify-between pt-4 border-t border-default">
      <UButton
        variant="soft"
        color="neutral"
        to="/app/content/article"
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
import type { Article, ArticlePayload, ArticleStatus, Category } from '~/types/content'
import type { User } from '~/types/user'

const props = defineProps<{
  articleId?: number
}>()

const emit = defineEmits<{ submitted: [] }>()

const { t } = useI18n()
const toast = useToast()
const { state: authState } = useAuth()

const isEditMode = computed(() => props.articleId !== undefined)

const categories = ref<Category[]>([])
const users = ref<User[]>([])
const coverFile = ref<File | null>(null)
const isSubmitting = ref(false)
const isLoading = ref(isEditMode.value)
const article = ref<Article | null>(null)

const form = reactive<ArticlePayload>({
  title: '',
  slug: '',
  authorId: null,
  categoryId: null,
  description: '',
  cover: null,
  content: '',
  tags: [],
  status: 'draft'
})

const {
  isUploading,
  previewUrl,
  uploadFile,
  clearPreview,
  setPreviewFromUrl
} = useImageUpload({
  upload: file => articleService.uploadCover(file),
  onUploaded: (path) => { form.cover = path },
  successMessage: t('pages.article.coverUploaded'),
  errorMessage: t('pages.article.coverUploadFailed')
})

watch(coverFile, (file) => {
  if (file instanceof File) uploadFile(file)
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

function onTitleInput() {
  if (!form.slug || form.slug === slugify(form.title.slice(0, -1))) {
    form.slug = slugify(form.title)
  }
}

function removeCover() {
  form.cover = null
  coverFile.value = null
  clearPreview()
}

function hydrateFromArticle(art: Article) {
  article.value = art
  form.title = art.title
  form.slug = art.slug
  form.authorId = art.authorId ?? null
  form.categoryId = art.categoryId ?? null
  form.description = art.description || ''
  form.cover = art.cover
  form.content = art.content
  form.tags = art.tags || []
  form.status = art.status
  setPreviewFromUrl(art.coverUrl || art.cover)
}

onMounted(async () => {
  try {
    const [catRes, userRes, artRes] = await Promise.all([
      categoryService.getAllList(),
      userService.getAllList(),
      props.articleId !== undefined ? articleService.getById(props.articleId) : Promise.resolve(null)
    ])

    if (catRes?.success) categories.value = catRes.data
    if (userRes?.success) users.value = userRes.data

    if (artRes?.success && artRes.data) {
      hydrateFromArticle(artRes.data)
    } else {
      form.authorId = authState.user?.id ?? null
    }
  } finally {
    isLoading.value = false
  }
})

async function submitForm(targetStatus: ArticleStatus) {
  if (!form.title.trim()) {
    toast.add({ title: t('pages.article.titleRequired'), color: 'error', icon: 'i-lucide-alert-circle' })
    return
  }

  if (isEmptyHtml(form.content)) {
    toast.add({ title: t('pages.article.contentRequired'), color: 'error', icon: 'i-lucide-alert-circle' })
    return
  }

  form.status = targetStatus
  isSubmitting.value = true

  try {
    const res = props.articleId !== undefined
      ? await articleService.update(props.articleId, form)
      : await articleService.create(form)

    if (res.success) {
      toast.add({
        title: t(isEditMode.value ? 'pages.article.updatedSuccess' : 'pages.article.createdSuccess'),
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      emit('submitted')
      await navigateTo('/app/content/article')
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
