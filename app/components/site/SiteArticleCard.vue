<template>
  <SiteCard :to="`/article/${article.slug}`">
    <div class="relative overflow-hidden bg-blue-950">
      <img
        v-if="article.coverUrl"
        :src="article.coverUrl"
        :alt="article.title"
        loading="lazy"
        class="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
      >
      <div
        v-else
        class="flex aspect-video w-full items-center justify-center"
      >
        <span class="flex size-14 items-center justify-center rounded-full bg-white/10 text-white/70">
          <UIcon
            name="i-lucide-newspaper"
            class="size-7"
          />
        </span>
      </div>
      <span
        class="absolute inset-0 bg-gradient-to-t from-blue-950/70 to-transparent"
        aria-hidden="true"
      />
    </div>

    <div class="flex flex-1 flex-col p-7">
      <p class="text-xs font-semibold uppercase tracking-widest text-primary">
        {{ article.category?.name || $t('site.article.uncategorized') }}
      </p>

      <h3 class="mt-4 break-words text-lg font-semibold leading-snug text-highlighted">
        {{ article.title }}
      </h3>

      <p
        v-if="article.description"
        class="mt-3 line-clamp-3 text-sm leading-relaxed text-muted"
      >
        {{ article.description }}
      </p>

      <div class="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7 text-xs text-dimmed">
        <time :datetime="article.publishedAt || article.createdAt">
          {{ formatDate(article.publishedAt || article.createdAt, locale) }}
        </time>
        <span class="flex items-center gap-1.5 font-medium text-primary">
          {{ $t('site.article.readMore') }}
          <UIcon
            name="i-lucide-arrow-right"
            class="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </div>
  </SiteCard>
</template>

<script setup lang="ts">
import type { PublicArticleCard } from '~/types/content'

defineProps<{
  article: PublicArticleCard
}>()

const { locale } = useI18n()
</script>
