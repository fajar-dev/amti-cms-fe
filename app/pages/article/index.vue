<template>
  <div>
    <section class="relative overflow-hidden">
      <SiteBackground
        pattern="grid"
        contour
      />

      <div class="relative mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8 lg:pt-36">
        <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <SiteReveal class="lg:col-span-6">
            <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-primary">
              <span
                class="h-px w-10 bg-gradient-to-r from-transparent to-primary/70"
                aria-hidden="true"
              />
              {{ $t('site.nav.article') }}
            </p>
            <h1 class="mt-6 text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
              {{ $t('site.articlePage.featuredHeadline') }}
            </h1>
          </SiteReveal>

          <SiteReveal
            :delay="120"
            class="lg:col-span-6"
          >
            <SiteFrame corners>
              <img
                :src="heroImage"
                alt=""
                class="aspect-video w-full object-cover"
              >
            </SiteFrame>
          </SiteReveal>
        </div>
      </div>
    </section>

    <section class="bg-muted">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div class="max-w-3xl">
          <h2 class="text-2xl font-semibold tracking-tight text-highlighted sm:text-3xl">
            {{ $t('site.articlePage.title') }}
          </h2>
          <p class="mt-4 text-base leading-relaxed text-muted">
            {{ $t('site.articlePage.body') }}
          </p>
        </div>

        <div class="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 class="text-xl font-semibold text-highlighted sm:text-2xl">
            {{ $t('site.article.recentTitle') }}
          </h2>

          <UInput
            v-model="search"
            icon="i-lucide-search"
            variant="outline"
            class="w-full sm:w-72"
            :placeholder="$t('site.article.searchPlaceholder')"
          />
        </div>

        <div
          v-if="pending"
          class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <USkeleton
            v-for="n in 3"
            :key="n"
            class="h-96 w-full rounded-3xl"
          />
        </div>

        <div
          v-else-if="!articles.length"
          class="mt-12"
        >
          <UEmpty
            icon="i-lucide-newspaper"
            :title="$t('site.article.empty')"
            :description="$t('site.article.emptyHint')"
          />
        </div>

        <div
          v-else
          class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <SiteReveal
            v-for="(article, index) in articles"
            :key="article.id"
            :delay="(index % 3) * 80"
            class="h-full"
          >
            <SiteArticleCard :article="article" />
          </SiteReveal>
        </div>

        <div
          v-if="total > pageSize"
          class="mt-14 flex justify-center"
        >
          <UPagination
            v-model:page="page"
            :total="total"
            :items-per-page="pageSize"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { articleService } from '~/services/article-service'

const { t } = useI18n()

const heroImage = '/amti/img/index/why-choose-us.png'
const pageSize = 9
const page = ref(1)
const search = ref('')
const activeSearch = ref('')

let searchTimer: ReturnType<typeof setTimeout> | undefined
watch(search, (value) => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    page.value = 1
    activeSearch.value = value
  }, 350)
})

const { data, pending } = await useAsyncData(
  'public-articles',
  () => articleService.getPublicList(page.value, pageSize, activeSearch.value),
  { watch: [page, activeSearch], default: () => null }
)

const articles = computed(() => data.value?.data ?? [])
const total = computed(() => data.value?.meta?.total ?? 0)

useSeoMeta({
  title: () => `${t('site.nav.article')} — ${t('site.identity.name')}`,
  description: () => t('site.articlePage.body'),
  ogTitle: () => t('site.articlePage.featuredHeadline'),
  ogDescription: () => t('site.articlePage.body'),
  ogType: 'website'
})
</script>
