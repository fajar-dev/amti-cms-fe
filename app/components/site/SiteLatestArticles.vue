<template>
  <section class="bg-default">
    <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <SiteReveal class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SiteSectionHeader
          :eyebrow="$t('site.nav.article')"
          :title="$t('site.article.latestTitle')"
          :body="$t('site.article.latestBody')"
        />
        <UButton
          to="/article"
          trailing-icon="i-lucide-arrow-right"
          variant="link"
          class="shrink-0 self-start lg:self-auto"
        >
          {{ $t('site.article.viewAll') }}
        </UButton>
      </SiteReveal>

      <div
        v-if="pending"
        class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        aria-busy="true"
      >
        <USkeleton
          v-for="n in 4"
          :key="n"
          class="h-96 w-full rounded-3xl"
        />
      </div>
      <UEmpty
        v-else-if="error || !data?.success"
        icon="i-lucide-circle-alert"
        :title="$t('site.article.loadError')"
        class="mt-12"
      />
      <UEmpty
        v-else-if="!articles.length"
        icon="i-lucide-newspaper"
        :title="$t('site.article.empty')"
        :description="$t('site.article.emptyHint')"
        class="mt-12"
      />
      <div
        v-else
        class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <SiteReveal
          v-for="(article, index) in articles"
          :key="article.id"
          :delay="index * 80"
          class="h-full min-w-0"
        >
          <SiteArticleCard :article="article" />
        </SiteReveal>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { articleService } from '~/services/article-service'

const { data, pending, error } = await useAsyncData(
  'home-latest-articles',
  () => articleService.getPublicList(1, 4, '', undefined, 'publishedAt', 'DESC'),
  { lazy: true, server: true }
)

const articles = computed(() => data.value?.data?.slice(0, 4) ?? [])
</script>
