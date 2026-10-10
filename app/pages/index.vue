<template>
  <div class="space-y-6">
    <!-- Header -->
    <Header
      :title="$t('pages.dashboard.title')"
      :description="$t('pages.dashboard.description')"
    >
      <template #actions>
        <UButton
          v-if="can('articles.create')"
          icon="i-lucide-plus"
          color="primary"
          to="/content/article/create"
        >
          {{ $t('pages.dashboard.quickActionCreate') }}
        </UButton>
      </template>
    </Header>

    <!-- Stat Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      <!-- Total Articles Card -->
      <NuxtLink
        to="/content/article"
        class="group bg-default border border-default hover:border-primary/50 transition-colors p-5 rounded-lg block"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-muted">{{ $t('pages.dashboard.totalArticles') }}</span>
          <div class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-transform group-hover:scale-105">
            <UIcon
              name="i-lucide-file-text"
              class="w-5 h-5"
            />
          </div>
        </div>
        <div class="mt-3">
          <USkeleton
            v-if="isLoadingSummary"
            class="h-8 w-20"
          />
          <div
            v-else
            class="text-2xl sm:text-3xl font-bold text-highlighted tracking-tight"
          >
            {{ summary?.totalArticles ?? 0 }}
          </div>
        </div>
        <div class="mt-3 flex items-center gap-3 text-xs text-muted">
          <span class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {{ summary?.publishedArticles ?? 0 }} {{ $t('pages.dashboard.published') }}
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            {{ summary?.draftArticles ?? 0 }} {{ $t('pages.dashboard.draft') }}
          </span>
        </div>
      </NuxtLink>

      <!-- Total Views Card -->
      <div class="bg-default border border-default p-5 rounded-lg">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-muted">{{ $t('pages.dashboard.totalViews') }}</span>
          <div class="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <UIcon
              name="i-lucide-eye"
              class="w-5 h-5"
            />
          </div>
        </div>
        <div class="mt-3">
          <USkeleton
            v-if="isLoadingSummary"
            class="h-8 w-24"
          />
          <div
            v-else
            class="text-2xl sm:text-3xl font-bold text-highlighted tracking-tight"
          >
            {{ (summary?.totalViews ?? 0).toLocaleString() }}
          </div>
        </div>
        <div class="mt-3 flex items-center text-xs text-muted">
          <UIcon
            name="i-lucide-trending-up"
            class="w-3.5 h-3.5 mr-1 text-emerald-500"
          />
          <span>Akumulasi tayangan artikel</span>
        </div>
      </div>

      <!-- Messages Card -->
      <NuxtLink
        to="/messages"
        class="group bg-default border border-default hover:border-amber-500/50 transition-colors p-5 rounded-lg block"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-muted">{{ $t('pages.dashboard.totalMessages') }}</span>
          <div class="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-transform group-hover:scale-105">
            <UIcon
              name="i-lucide-mail"
              class="w-5 h-5"
            />
          </div>
        </div>
        <div class="mt-3">
          <USkeleton
            v-if="isLoadingSummary"
            class="h-8 w-20"
          />
          <div
            v-else
            class="text-2xl sm:text-3xl font-bold text-highlighted tracking-tight"
          >
            {{ summary?.totalMessages ?? 0 }}
          </div>
        </div>
        <div class="mt-3 flex items-center gap-3 text-xs text-muted">
          <span class="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {{ summary?.unreadMessages ?? 0 }} {{ $t('pages.dashboard.unread') }}
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {{ ((summary?.totalMessages ?? 0) - (summary?.unreadMessages ?? 0)) }} {{ $t('pages.dashboard.read') }}
          </span>
        </div>
      </NuxtLink>

      <!-- Users & Management Card -->
      <NuxtLink
        to="/user"
        class="group bg-default border border-default hover:border-violet-500/50 transition-colors p-5 rounded-lg block"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-muted">{{ $t('pages.dashboard.totalUsers') }}</span>
          <div class="w-10 h-10 rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center transition-transform group-hover:scale-105">
            <UIcon
              name="i-lucide-users"
              class="w-5 h-5"
            />
          </div>
        </div>
        <div class="mt-3">
          <USkeleton
            v-if="isLoadingSummary"
            class="h-8 w-20"
          />
          <div
            v-else
            class="text-2xl sm:text-3xl font-bold text-highlighted tracking-tight"
          >
            {{ summary?.totalUsers ?? 0 }}
          </div>
        </div>
        <div class="mt-3 flex items-center gap-3 text-xs text-muted">
          <span>{{ summary?.totalCategories ?? 0 }} Kategori</span>
          <span>•</span>
          <span>{{ summary?.totalFaqs ?? 0 }} FAQ</span>
        </div>
      </NuxtLink>
    </div>

    <!-- Charts Row 1: Views Trend (AreaChart) & Category Distribution (DonutChart) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <!-- Views Trend Area Chart (8 cols) -->
      <div class="lg:col-span-8 bg-default border border-default p-5 sm:p-6 rounded-lg">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-default pb-4 mb-4">
          <div>
            <h3 class="text-sm font-semibold text-highlighted">
              {{ $t('pages.dashboard.viewsTrendTitle') }}
            </h3>
            <p class="text-xs text-muted mt-0.5">
              {{ $t('pages.dashboard.viewsTrendDesc') }}
            </p>
          </div>
          <span class="text-xs font-medium text-muted">
            7 Hari Terakhir
          </span>
        </div>

        <div class="w-full h-80 min-h-[320px]">
          <USkeleton
            v-if="isLoadingViews"
            class="w-full h-full rounded-lg"
          />
          <div
            v-else-if="!viewsTrend.length"
            class="h-full flex items-center justify-center text-sm text-muted"
          >
            Tidak ada data statistik
          </div>
          <ClientOnly v-else>
            <AreaChart
              :data="viewsTrend"
              :categories="viewsChartCategories"
              x-axis="label"
              :height="320"
              :curve-type="CurveType.MonotoneX"
              variant="gradient"
              tooltip-variant="frosted-glass"
              dot-variant="border"
            />
            <template #fallback>
              <USkeleton class="w-full h-full rounded-lg" />
            </template>
          </ClientOnly>
        </div>
      </div>

      <!-- Categories Donut Chart (4 cols) -->
      <div class="lg:col-span-4 bg-default border border-default p-5 sm:p-6 rounded-lg">
        <div class="border-b border-default pb-4 mb-4">
          <h3 class="text-sm font-semibold text-highlighted">
            {{ $t('pages.dashboard.categoryDistTitle') }}
          </h3>
          <p class="text-xs text-muted mt-0.5">
            {{ $t('pages.dashboard.categoryDistDesc') }}
          </p>
        </div>

        <div class="w-full h-80 min-h-[320px]">
          <USkeleton
            v-if="isLoadingCategories"
            class="w-full h-full rounded-lg"
          />
          <div
            v-else-if="!categoriesDistribution.length"
            class="h-full flex items-center justify-center text-sm text-muted"
          >
            Belum ada kategori artikel
          </div>
          <ClientOnly v-else>
            <DonutChart
              :data="categoriesDistribution"
              :categories="categoryChartCategories"
              name-key="name"
              value-key="count"
              :height="300"
              variant="gradient"
              :legend-position="LegendPosition.BottomCenter"
            />
            <template #fallback>
              <USkeleton class="w-full h-full rounded-lg" />
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>

    <!-- Charts Row 2: Messages Activity BarChart & Recent Messages -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <!-- Messages Bar Chart (6 cols) -->
      <div class="lg:col-span-6 bg-default border border-default p-5 sm:p-6 rounded-lg">
        <div class="flex items-center justify-between border-b border-default pb-4 mb-4">
          <div>
            <h3 class="text-sm font-semibold text-highlighted">
              {{ $t('pages.dashboard.messagesTrendTitle') }}
            </h3>
            <p class="text-xs text-muted mt-0.5">
              {{ $t('pages.dashboard.messagesTrendDesc') }}
            </p>
          </div>
          <NuxtLink
            to="/messages"
            class="text-xs text-primary font-medium hover:underline flex items-center gap-1"
          >
            {{ $t('pages.dashboard.viewAll') }}
            <UIcon
              name="i-lucide-arrow-right"
              class="w-3.5 h-3.5"
            />
          </NuxtLink>
        </div>

        <div class="w-full h-72 min-h-[280px]">
          <USkeleton
            v-if="isLoadingMessagesTrend"
            class="w-full h-full rounded-lg"
          />
          <ClientOnly v-else>
            <BarChart
              :data="messagesTrend"
              :categories="messagesChartCategories"
              :y-axis="['unread', 'read']"
              x-axis="month"
              :height="280"
              variant="duotone"
              stacked
            />
            <template #fallback>
              <USkeleton class="w-full h-full rounded-lg" />
            </template>
          </ClientOnly>
        </div>
      </div>

      <!-- Recent Messages List (6 cols) -->
      <div class="lg:col-span-6 bg-default border border-default p-5 sm:p-6 rounded-lg flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between border-b border-default pb-4 mb-4">
            <div>
              <h3 class="text-sm font-semibold text-highlighted">
                {{ $t('pages.dashboard.recentMessagesTitle') }}
              </h3>
              <p class="text-xs text-muted mt-0.5">
                {{ $t('pages.dashboard.recentMessagesDesc') }}
              </p>
            </div>
            <NuxtLink
              to="/messages"
              class="text-xs text-primary font-medium hover:underline flex items-center gap-1"
            >
              {{ $t('pages.dashboard.viewAll') }}
              <UIcon
                name="i-lucide-arrow-right"
                class="w-3.5 h-3.5"
              />
            </NuxtLink>
          </div>

          <div
            v-if="isLoadingRecentMessages"
            class="space-y-3"
          >
            <USkeleton
              v-for="i in 4"
              :key="i"
              class="h-14 w-full rounded-lg"
            />
          </div>

          <div
            v-else-if="!recentMessages.length"
            class="py-12 text-center text-sm text-muted"
          >
            <UIcon
              name="i-lucide-inbox"
              class="w-8 h-8 mx-auto mb-2 opacity-50"
            />
            {{ $t('pages.dashboard.noRecentMessages') }}
          </div>

          <div
            v-else
            class="divide-y divide-default"
          >
            <NuxtLink
              v-for="msg in recentMessages"
              :key="msg.id"
              to="/messages"
              class="py-3 flex items-start justify-between gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 -mx-2 px-2 rounded-lg transition-colors"
            >
              <div class="flex items-start gap-3 min-w-0">
                <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-semibold">
                  {{ msg.name.charAt(0).toUpperCase() }}
                </div>
                <div class="min-w-0 space-y-0.5">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-highlighted truncate">{{ msg.name }}</span>
                    <span
                      v-if="!msg.isRead"
                      class="w-2 h-2 rounded-full bg-amber-500 shrink-0"
                    />
                  </div>
                  <p class="text-xs text-muted truncate">{{ msg.subject }}</p>
                </div>
              </div>
              <span class="text-xs text-muted whitespace-nowrap shrink-0">
                {{ formatTimeAgo(msg.createdAt) }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Row 3: Recent Articles -->
    <div class="bg-default border border-default p-5 sm:p-6 rounded-lg">
      <div class="flex items-center justify-between border-b border-default pb-4 mb-4">
        <div>
          <h3 class="text-sm font-semibold text-highlighted">
            {{ $t('pages.dashboard.recentArticlesTitle') }}
          </h3>
          <p class="text-xs text-muted mt-0.5">
            {{ $t('pages.dashboard.recentArticlesDesc') }}
          </p>
        </div>
        <NuxtLink
          to="/content/article"
          class="text-xs text-primary font-medium hover:underline flex items-center gap-1"
        >
          {{ $t('pages.dashboard.viewAll') }}
          <UIcon
            name="i-lucide-arrow-right"
            class="w-3.5 h-3.5"
          />
        </NuxtLink>
      </div>

      <div
        v-if="isLoadingRecentArticles"
        class="space-y-3"
      >
        <USkeleton
          v-for="i in 3"
          :key="i"
          class="h-16 w-full rounded-lg"
        />
      </div>

      <div
        v-else-if="!recentArticles.length"
        class="py-12 text-center text-sm text-muted"
      >
        <UIcon
          name="i-lucide-file-text"
          class="w-8 h-8 mx-auto mb-2 opacity-50"
        />
        {{ $t('pages.dashboard.noRecentArticles') }}
      </div>

      <div
        v-else
        class="divide-y divide-default"
      >
        <div
          v-for="art in recentArticles"
          :key="art.id"
          class="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 -mx-2 px-2 rounded-lg transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0">
            <img
              v-if="art.coverUrl"
              :src="art.coverUrl"
              :alt="art.title"
              class="size-11 rounded-lg object-cover border border-default shrink-0"
            >
            <div
              v-else
              class="size-11 rounded-lg bg-muted border border-default flex items-center justify-center text-muted shrink-0"
            >
              <UIcon
                name="i-lucide-image"
                class="w-5 h-5"
              />
            </div>

            <div class="min-w-0 space-y-0.5">
              <NuxtLink
                :to="`/content/article/${art.id}`"
                class="text-sm font-semibold text-highlighted hover:text-primary transition-colors truncate block"
              >
                {{ art.title }}
              </NuxtLink>
              <div class="flex flex-wrap items-center gap-2 text-xs text-muted">
                <span
                  v-if="art.category"
                  class="font-medium text-neutral-600 dark:text-neutral-300"
                >
                  {{ art.category.name }}
                </span>
                <span v-if="art.category">•</span>
                <span>{{ formatDate(art.createdAt) }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4 shrink-0 self-end sm:self-center">
            <div class="flex items-center gap-1 text-xs text-muted">
              <UIcon
                name="i-lucide-eye"
                class="w-3.5 h-3.5"
              />
              <span>{{ (art.viewsCount || 0).toLocaleString() }}</span>
            </div>
            <span
              class="inline-flex items-center gap-1.5 text-xs font-medium"
              :class="art.status === 'publish' ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-500'"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="art.status === 'publish' ? 'bg-emerald-500' : 'bg-neutral-400'"
              />
              {{ art.status === 'publish' ? $t('pages.dashboard.published') : $t('pages.dashboard.draft') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { CurveType, LegendPosition } from 'nuxt-charts/enums'
import { dashboardService } from '~/services/dashboard-service'
import type {
  DashboardSummary,
  ViewsTrendItem,
  ArticlesByCategoryItem,
  MessagesTrendItem,
  DashboardRecentArticle,
  DashboardRecentMessage
} from '~/types/dashboard'

definePageMeta({
  layout: 'dashboard'
})

const { can } = usePermission()

// States for separate endpoints
const summary = ref<DashboardSummary | null>(null)
const viewsTrend = ref<ViewsTrendItem[]>([])
const categoriesDistribution = ref<ArticlesByCategoryItem[]>([])
const messagesTrend = ref<MessagesTrendItem[]>([])
const recentArticles = ref<DashboardRecentArticle[]>([])
const recentMessages = ref<DashboardRecentMessage[]>([])

// Loading states
const isLoadingSummary = ref(true)
const isLoadingViews = ref(true)
const isLoadingCategories = ref(true)
const isLoadingMessagesTrend = ref(true)
const isLoadingRecentArticles = ref(true)
const isLoadingRecentMessages = ref(true)

// Fetch methods for each separate endpoint
const fetchSummary = async () => {
  isLoadingSummary.value = true
  try {
    const res = await dashboardService.getSummary()
    if (res.data) summary.value = res.data
  } catch (err) {
    console.error('Failed to load dashboard summary:', err)
  } finally {
    isLoadingSummary.value = false
  }
}

const fetchViewsTrend = async () => {
  isLoadingViews.value = true
  try {
    const res = await dashboardService.getViewsTrend(7)
    if (res.data) viewsTrend.value = res.data
  } catch (err) {
    console.error('Failed to load views trend:', err)
  } finally {
    isLoadingViews.value = false
  }
}

const fetchCategoriesDistribution = async () => {
  isLoadingCategories.value = true
  try {
    const res = await dashboardService.getCategoriesDistribution()
    if (res.data) categoriesDistribution.value = res.data
  } catch (err) {
    console.error('Failed to load categories distribution:', err)
  } finally {
    isLoadingCategories.value = false
  }
}

const fetchMessagesTrend = async () => {
  isLoadingMessagesTrend.value = true
  try {
    const res = await dashboardService.getMessagesTrend(6)
    if (res.data) messagesTrend.value = res.data
  } catch (err) {
    console.error('Failed to load messages trend:', err)
  } finally {
    isLoadingMessagesTrend.value = false
  }
}

const fetchRecentArticles = async () => {
  isLoadingRecentArticles.value = true
  try {
    const res = await dashboardService.getRecentArticles(5)
    if (res.data) recentArticles.value = res.data
  } catch (err) {
    console.error('Failed to load recent articles:', err)
  } finally {
    isLoadingRecentArticles.value = false
  }
}

const fetchRecentMessages = async () => {
  isLoadingRecentMessages.value = true
  try {
    const res = await dashboardService.getRecentMessages(5)
    if (res.data) recentMessages.value = res.data
  } catch (err) {
    console.error('Failed to load recent messages:', err)
  } finally {
    isLoadingRecentMessages.value = false
  }
}

// Master refresh
const fetchAll = async () => {
  await Promise.allSettled([
    fetchSummary(),
    fetchViewsTrend(),
    fetchCategoriesDistribution(),
    fetchMessagesTrend(),
    fetchRecentArticles(),
    fetchRecentMessages()
  ])
}

onMounted(() => {
  fetchAll()
})

// Views Trend Chart Config
const viewsChartCategories = {
  views: { name: 'Pembaca (Views)', color: '#3b82f6' },
  articles: { name: 'Artikel Terbit', color: '#10b981' }
}

// Category Distribution Chart Config
const categoryPalette = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
const categoryChartCategories = computed(() => {
  const result: Record<string, { name: string, color: string }> = {}
  categoriesDistribution.value.forEach((item, idx) => {
    result[item.name] = {
      name: item.name,
      color: categoryPalette[idx % categoryPalette.length] || '#3b82f6'
    }
  })
  return result
})

// Messages Trend Chart Config
const messagesChartCategories = {
  unread: { name: 'Belum Dibaca', color: '#f59e0b' },
  read: { name: 'Sudah Dibaca', color: '#10b981' }
}

// Helpers
const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const formatTimeAgo = (dateStr: string) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  const now = new Date()
  const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (diffSec < 60) return 'Baru saja'
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} mnt lalu`
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} jam lalu`
  return `${Math.floor(diffSec / 86400)} hari lalu`
}
</script>

<style scoped>
:deep(.vue-chrts) {
  position: relative !important;
  width: 100% !important;
  display: block;
}

:deep(.v-charts-wrapper) {
  position: relative !important;
}

:deep(.vcharts-responsive-container) {
  width: 100% !important;
}
</style>
