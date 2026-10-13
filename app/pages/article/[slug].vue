<template>
  <div>
    <section
      v-if="!pending && !article"
      class="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8"
    >
      <UEmpty
        icon="i-lucide-file-question"
        :title="$t('site.article.notFoundTitle')"
        :description="$t('site.article.notFoundBody')"
      >
        <template #actions>
          <UButton
            to="/article"
            color="primary"
            icon="i-lucide-arrow-left"
            :label="$t('site.article.backToList')"
          />
        </template>
      </UEmpty>
    </section>

    <template v-else>
      <section class="relative overflow-hidden">
        <SiteBackground pattern="grid" />

        <div class="relative mx-auto max-w-4xl px-4 pt-32 pb-10 sm:px-6 lg:px-8">
          <SiteReveal>
            <p class="mt-8 text-xs font-medium uppercase tracking-widest text-primary">
              {{ article?.category?.name || $t('site.article.uncategorized') }}
            </p>

            <USkeleton
              v-if="pending"
              class="mt-4 h-12 w-full"
            />
            <h1
              v-else
              class="mt-4 text-3xl font-bold leading-tight tracking-tight text-highlighted sm:text-4xl lg:text-5xl"
            >
              {{ article?.title }}
            </h1>

            <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span
                v-if="article?.author"
                class="flex items-center gap-2"
              >
                <UAvatar
                  size="xs"
                  :alt="article.author.name"
                  icon="i-lucide-user"
                />
                {{ article.author.name }}
              </span>
              <span
                v-if="publishedLabel"
                class="flex items-center gap-2"
              >
                <UIcon
                  name="i-lucide-calendar"
                  class="size-4"
                />
                <time :datetime="article?.publishedAt || article?.createdAt">{{ publishedLabel }}</time>
              </span>
              <span
                v-if="article"
                class="flex items-center gap-2"
              >
                <UIcon
                  name="i-lucide-eye"
                  class="size-4"
                />
                {{ formatNumber(article.viewsCount, locale) }} {{ $t('site.article.views') }}
              </span>
            </div>
          </SiteReveal>
        </div>
      </section>

      <section class="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <SiteFrame v-if="article?.coverUrl">
          <img
            :src="article.coverUrl"
            :alt="article.title"
            class="aspect-video w-full object-cover"
          >
        </SiteFrame>

        <div
          v-if="article?.tags?.length"
          class="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-wider text-muted"
        >
          <UIcon
            name="i-lucide-tag"
            class="size-4 text-primary"
          />
          <template
            v-for="(tag, index) in article.tags"
            :key="tag"
          >
            <span>{{ tag }}</span>
            <span
              v-if="index < article.tags.length - 1"
              class="text-primary/40"
            >|</span>
          </template>
        </div>

        <div
          v-if="pending"
          class="mt-10 space-y-4"
        >
          <USkeleton
            v-for="n in 6"
            :key="n"
            class="h-5 w-full"
          />
        </div>

        <!-- eslint-disable vue/no-v-html -->
        <article
          v-else
          class="article-content mt-10"
          v-html="article?.content"
        />
        <!-- eslint-enable vue/no-v-html -->

        <USeparator class="my-14" />

        <div class="flex flex-wrap items-center justify-between gap-4">
          <UButton
            to="/article"
            color="neutral"
            variant="outline"
            icon="i-lucide-arrow-left"
            class="rounded-full px-6"
            :label="$t('site.article.backToList')"
          />
          <UButton
            :to="whatsappHref"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            icon="i-lucide-message-circle"
            class="rounded-full px-6 shadow-lg shadow-primary/20"
            :label="$t('site.cta.talkToUs')"
          />
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { articleService } from '~/services/article-service'

const whatsappHref = 'https://wa.me/6281287456669'
const route = useRoute()
const { t, locale } = useI18n()

const slug = computed(() => String(route.params.slug))

const { data, pending } = await useAsyncData(
  `public-article-${slug.value}`,
  () => articleService.getBySlug(slug.value),
  { watch: [slug] }
)

const article = computed(() => (data.value?.success ? data.value.data : null))

const publishedLabel = computed(() => {
  const value = article.value?.publishedAt || article.value?.createdAt
  return value ? formatDateTime(value, locale.value) : ''
})

useSeoMeta({
  title: () => (article.value ? `${article.value.title} — ${t('site.identity.name')}` : t('site.identity.name')),
  description: () => article.value?.description || '',
  ogTitle: () => article.value?.title || '',
  ogDescription: () => article.value?.description || '',
  ogImage: () => article.value?.coverUrl || undefined,
  ogType: 'article'
})

if (!article.value) {
  setResponseStatus(404)
}

onMounted(() => {
  if (article.value) {
    articleService.recordView(article.value.id, window.location.href).catch(() => {})
  }
})
</script>

<style scoped>
.article-content {
  color: var(--ui-text-toned);
  font-size: 1.0625rem;
  line-height: 1.85;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3) {
  color: var(--ui-text-highlighted);
  font-weight: 650;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.article-content :deep(h1) { margin: 2.5rem 0 1rem; font-size: 1.875rem; }
.article-content :deep(h2) { margin: 2.25rem 0 0.9rem; font-size: 1.5rem; }
.article-content :deep(h3) { margin: 2rem 0 0.75rem; font-size: 1.25rem; }

.article-content :deep(p) { margin: 1.15rem 0; }

.article-content :deep(a) {
  color: var(--ui-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.article-content :deep(strong) { color: var(--ui-text-highlighted); font-weight: 600; }

.article-content :deep(ul),
.article-content :deep(ol) { margin: 1.15rem 0; padding-left: 1.5rem; }
.article-content :deep(ul) { list-style: disc; }
.article-content :deep(ol) { list-style: decimal; }
.article-content :deep(li) { margin: 0.5rem 0; }

.article-content :deep(blockquote) {
  margin: 1.75rem 0;
  border-left: 3px solid var(--ui-primary);
  padding: 0.25rem 0 0.25rem 1.25rem;
  color: var(--ui-text-muted);
  font-style: italic;
}

.article-content :deep(img) {
  margin: 1.75rem 0;
  border-radius: 0.75rem;
  border: 1px solid var(--ui-border);
  width: 100%;
}

.article-content :deep(code) {
  border-radius: 0.375rem;
  background: var(--ui-bg-muted);
  padding: 0.15rem 0.4rem;
  font-size: 0.9em;
}

.article-content :deep(pre) {
  margin: 1.5rem 0;
  overflow-x: auto;
  border-radius: 0.75rem;
  background: var(--color-blue-950);
  padding: 1.15rem 1.25rem;
  color: #F2F5F8;
}

.article-content :deep(pre code) { background: transparent; padding: 0; }

.article-content :deep(hr) {
  margin: 2.5rem 0;
  border: 0;
  border-top: 1px solid var(--ui-border);
}
</style>
