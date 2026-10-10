<template>
  <div class="space-y-6">
    <!-- Top Welcome Banner & Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-default border border-default p-5 sm:p-6 rounded-2xl shadow-xs">
      <div class="space-y-1">
        <h1 class="text-xl sm:text-2xl font-bold text-highlighted tracking-tight">
          {{ $t('pages.dashboard.welcomeBack') }}, {{ userName }}! 👋
        </h1>
        <p class="text-sm text-muted">
          {{ $t('pages.dashboard.todayOverview') }}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2.5">
        <UButton
          icon="i-lucide-refresh-cw"
          color="neutral"
          variant="outline"
          size="md"
          :loading="isLoading"
          @click="fetchStats"
        />
        <UButton
          v-if="can('articles.create')"
          icon="i-lucide-plus"
          color="primary"
          size="md"
          to="/content/article/create"
        >
          {{ $t('pages.dashboard.quickActionCreate') }}
        </UButton>
        <UButton
          v-if="can('messages.view')"
          icon="i-lucide-mail"
          color="neutral"
          variant="outline"
          size="md"
          to="/messages"
        >
          {{ $t('pages.dashboard.quickActionMessages') }}
          <UBadge
            v-if="stats?.summary.unreadMessages"
            color="warning"
            variant="solid"
            size="sm"
            class="ml-1"
          >
            {{ stats.summary.unreadMessages }}
          </UBadge>
        </UButton>
      </div>
    </div>

    <!-- Stat Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      <!-- Total Articles Card -->
      <NuxtLink
        to="/content/article"
        class="group bg-default border border-default hover:border-primary/50 transition-all duration-200 p-5 rounded-2xl shadow-xs block"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-muted">{{ $t('pages.dashboard.totalArticles') }}</span>
          <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-transform group-hover:scale-105">
            <UIcon name="i-lucide-file-text" class="w-5 h-5" />
          </div>
        </div>
        <div class="mt-3">
          <USkeleton v-if="isLoading" class="h-8 w-20" />
          <div v-else class="text-2xl sm:text-3xl font-bold text-highlighted tracking-tight">
            {{ stats?.summary.totalArticles ?? 0 }}
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <UBadge color="success" variant="subtle" size="sm">
            {{ stats?.summary.publishedArticles ?? 0 }} {{ $t('pages.dashboard.published') }}
          </UBadge>
          <UBadge color="neutral" variant="subtle" size="sm">
            {{ stats?.summary.draftArticles ?? 0 }} {{ $t('pages.dashboard.draft') }}
          </UBadge>
        </div>
      </NuxtLink>

      <!-- Total Views Card -->
      <div class="bg-default border border-default p-5 rounded-2xl shadow-xs">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-muted">{{ $t('pages.dashboard.totalViews') }}</span>
          <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <UIcon name="i-lucide-eye" class="w-5 h-5" />
          </div>
        </div>
        <div class="mt-3">
          <USkeleton v-if="isLoading" class="h-8 w-24" />
          <div v-else class="text-2xl sm:text-3xl font-bold text-highlighted tracking-tight">
            {{ (stats?.summary.totalViews ?? 0).toLocaleString() }}
          </div>
        </div>
        <div class="mt-3 flex items-center text-xs text-muted">
          <UIcon name="i-lucide-trending-up" class="w-3.5 h-3.5 mr-1 text-emerald-500" />
          <span>Akumulasi tayangan seluruh artikel</span>
        </div>
      </div>

      <!-- Messages Card -->
      <NuxtLink
        to="/messages"
        class="group bg-default border border-default hover:border-amber-500/50 transition-all duration-200 p-5 rounded-2xl shadow-xs block"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-muted">{{ $t('pages.dashboard.totalMessages') }}</span>
          <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-transform group-hover:scale-105">
            <UIcon name="i-lucide-mail" class="w-5 h-5" />
          </div>
        </div>
        <div class="mt-3">
          <USkeleton v-if="isLoading" class="h-8 w-20" />
          <div v-else class="text-2xl sm:text-3xl font-bold text-highlighted tracking-tight">
            {{ stats?.summary.totalMessages ?? 0 }}
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <UBadge
            :color="(stats?.summary.unreadMessages ?? 0) > 0 ? 'warning' : 'neutral'"
            variant="subtle"
            size="sm"
          >
            {{ stats?.summary.unreadMessages ?? 0 }} {{ $t('pages.dashboard.unread') }}
          </UBadge>
          <UBadge color="success" variant="subtle" size="sm">
            {{ ((stats?.summary.totalMessages ?? 0) - (stats?.summary.unreadMessages ?? 0)) }} {{ $t('pages.dashboard.read') }}
          </UBadge>
        </div>
      </NuxtLink>

      <!-- Users & Management Card -->
      <NuxtLink
        to="/user"
        class="group bg-default border border-default hover:border-violet-500/50 transition-all duration-200 p-5 rounded-2xl shadow-xs block"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-muted">{{ $t('pages.dashboard.totalUsers') }}</span>
          <div class="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center transition-transform group-hover:scale-105">
            <UIcon name="i-lucide-users" class="w-5 h-5" />
          </div>
        </div>
        <div class="mt-3">
          <USkeleton v-if="isLoading" class="h-8 w-20" />
          <div v-else class="text-2xl sm:text-3xl font-bold text-highlighted tracking-tight">
            {{ stats?.summary.totalUsers ?? 0 }}
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2">
          <UBadge color="primary" variant="subtle" size="sm">
            {{ stats?.summary.totalCategories ?? 0 }} Kategori
          </UBadge>
          <UBadge color="neutral" variant="subtle" size="sm">
            {{ stats?.summary.totalFaqs ?? 0 }} FAQ
          </UBadge>
        </div>
      </NuxtLink>
    </div>

    <!-- Charts Row 1: Views Trend (AreaChart) & Category Distribution (DonutChart) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <!-- Views Trend Area Chart (8 cols) -->
      <div class="lg:col-span-8 bg-default border border-default p-5 sm:p-6 rounded-2xl shadow-xs flex flex-col justify-between">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h2 class="text-base font-semibold text-highlighted">
              {{ $t('pages.dashboard.viewsTrendTitle') }}
            </h2>
            <p class="text-xs text-muted">
              {{ $t('pages.dashboard.viewsTrendDesc') }}
            </p>
          </div>
          <UBadge color="primary" variant="subtle" size="sm">
            7 Hari Terakhir
          </UBadge>
        </div>

        <div class="h-80 w-full flex items-center justify-center">
          <USkeleton v-if="isLoading" class="w-full h-full rounded-xl" />
          <div v-else-if="!viewsChartData.length" class="text-sm text-muted">
            Tidak ada data statistik
          </div>
          <AreaChart
            v-else
            :data="viewsChartData"
            :categories="viewsChartCategories"
            x-axis="label"
            :height="300"
            :curve-type="CurveType.MonotoneX"
            variant="gradient"
            tooltip-variant="frosted-glass"
            dot-variant="border"
          />
        </div>
      </div>

      <!-- Categories Donut Chart (4 cols) -->
      <div class="lg:col-span-4 bg-default border border-default p-5 sm:p-6 rounded-2xl shadow-xs flex flex-col justify-between">
        <div class="mb-4">
          <h2 class="text-base font-semibold text-highlighted">
            {{ $t('pages.dashboard.categoryDistTitle') }}
          </h2>
          <p class="text-xs text-muted">
            {{ $t('pages.dashboard.categoryDistDesc') }}
          </p>
        </div>

        <div class="h-80 w-full flex items-center justify-center">
          <USkeleton v-if="isLoading" class="w-full h-full rounded-xl" />
          <div v-else-if="!categoryChartData.length" class="text-sm text-muted">
            Belum ada kategori artikel
          </div>
          <DonutChart
            v-else
            :data="categoryChartData"
            :categories="categoryChartCategories"
            name-key="name"
            value-key="count"
            :height="290"
            variant="gradient"
            :legend-position="LegendPosition.BottomCenter"
          />
        </div>
      </div>
    </div>

    <!-- Charts Row 2: Messages Activity BarChart & Recent Messages -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <!-- Messages Bar Chart (6 cols) -->
      <div class="lg:col-span-6 bg-default border border-default p-5 sm:p-6 rounded-2xl shadow-xs">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-semibold text-highlighted">
              {{ $t('pages.dashboard.messagesTrendTitle') }}
            </h2>
            <p class="text-xs text-muted">
              {{ $t('pages.dashboard.messagesTrendDesc') }}
            </p>
          </div>
          <NuxtLink
            to="/messages"
            class="text-xs text-primary font-medium hover:underline flex items-center gap-1"
          >
            {{ $t('pages.dashboard.viewAll') }}
            <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
          </NuxtLink>
        </div>

        <div class="h-72 w-full flex items-center justify-center">
          <USkeleton v-if="isLoading" class="w-full h-full rounded-xl" />
          <BarChart
            v-else
            :data="messagesChartData"
            :categories="messagesChartCategories"
            :y-axis="['unread', 'read']"
            x-axis="month"
            :height="270"
            variant="duotone"
            stacked
          />
        </div>
      </div>

      <!-- Recent Messages List (6 cols) -->
      <div class="lg:col-span-6 bg-default border border-default p-5 sm:p-6 rounded-2xl shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-base font-semibold text-highlighted">
                {{ $t('pages.dashboard.recentMessagesTitle') }}
              </h2>
              <p class="text-xs text-muted">
                {{ $t('pages.dashboard.recentMessagesDesc') }}
              </p>
            </div>
            <NuxtLink
              to="/messages"
              class="text-xs text-primary font-medium hover:underline flex items-center gap-1"
            >
              {{ $t('pages.dashboard.viewAll') }}
              <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>

          <div v-if="isLoading" class="space-y-3">
            <USkeleton v-for="i in 4" :key="i" class="h-14 w-full rounded-xl" />
          </div>

          <div v-else-if="!stats?.recentMessages?.length" class="py-12 text-center text-sm text-muted">
            <UIcon name="i-lucide-inbox" class="w-8 h-8 mx-auto mb-2 opacity-50" />
            {{ $t('pages.dashboard.noRecentMessages') }}
          </div>

          <div v-else class="divide-y divide-default">
            <NuxtLink
              v-for="msg in stats.recentMessages"
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
                    <span v-if="!msg.isRead" class="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
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
    <div class="bg-default border border-default p-5 sm:p-6 rounded-2xl shadow-xs">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-base font-semibold text-highlighted">
            {{ $t('pages.dashboard.recentArticlesTitle') }}
          </h2>
          <p class="text-xs text-muted">
            {{ $t('pages.dashboard.recentArticlesDesc') }}
          </p>
        </div>
        <NuxtLink
          to="/content/article"
          class="text-xs text-primary font-medium hover:underline flex items-center gap-1"
        >
          {{ $t('pages.dashboard.viewAll') }}
          <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
        </NuxtLink>
      </div>

      <div v-if="isLoading" class="space-y-3">
        <USkeleton v-for="i in 3" :key="i" class="h-16 w-full rounded-xl" />
      </div>

      <div v-else-if="!stats?.recentArticles?.length" class="py-12 text-center text-sm text-muted">
        <UIcon name="i-lucide-file-text" class="w-8 h-8 mx-auto mb-2 opacity-50" />
        {{ $t('pages.dashboard.noRecentArticles') }}
      </div>

      <div v-else class="divide-y divide-default">
        <div
          v-for="art in stats.recentArticles"
          :key="art.id"
          class="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 -mx-2 px-2 rounded-lg transition-colors"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-muted flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-file-text" class="w-5 h-5" />
            </div>
            <div class="min-w-0 space-y-0.5">
              <NuxtLink
                :to="`/content/article/${art.id}`"
                class="text-sm font-semibold text-highlighted hover:text-primary transition-colors truncate block"
              >
                {{ art.title }}
              </NuxtLink>
              <div class="flex flex-wrap items-center gap-2 text-xs text-muted">
                <span v-if="art.category" class="font-medium text-neutral-600 dark:text-neutral-300">
                  {{ art.category.name }}
                </span>
                <span v-if="art.category">•</span>
                <span>{{ formatDate(art.createdAt) }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 shrink-0 self-end sm:self-center">
            <div class="flex items-center gap-1 text-xs text-muted">
              <UIcon name="i-lucide-eye" class="w-3.5 h-3.5" />
              <span>{{ (art.viewsCount || 0).toLocaleString() }}</span>
            </div>
            <UBadge
              :color="art.status === 'publish' ? 'success' : 'neutral'"
              variant="subtle"
              size="sm"
            >
              {{ art.status === 'publish' ? $t('pages.dashboard.published') : $t('pages.dashboard.draft') }}
            </UBadge>
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
import type { DashboardStats } from '~/types/dashboard'

definePageMeta({
  layout: 'dashboard'
})

const { can } = usePermission()
const auth = useAuth()
const userName = computed(() => auth.state.user?.name || 'Admin')

const stats = ref<DashboardStats | null>(null)
const isLoading = ref(true)

// Fetch Stats
const fetchStats = async () => {
  isLoading.value = true
  try {
    const res = await dashboardService.getStats()
    if (res.data) {
      stats.value = res.data
    }
  } catch (err) {
    console.error('Failed to load dashboard stats:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchStats()
})

// Views Trend Chart Config
const viewsChartData = computed(() => {
  return stats.value?.viewsTrend || []
})

const viewsChartCategories = {
  views: { name: 'Pembaca (Views)', color: '#3b82f6' },
  articles: { name: 'Artikel Terbit', color: '#10b981' }
}

// Category Distribution Chart Config
const categoryChartData = computed(() => {
  return stats.value?.articlesByCategory || []
})

const categoryPalette = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
const categoryChartCategories = computed(() => {
  const result: Record<string, { name: string; color: string }> = {}
  categoryChartData.value.forEach((item, idx) => {
    result[item.name] = {
      name: item.name,
      color: categoryPalette[idx % categoryPalette.length] || '#3b82f6'
    }
  })
  return result
})

// Messages Trend Chart Config
const messagesChartData = computed(() => {
  return stats.value?.messagesTrend || []
})

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
