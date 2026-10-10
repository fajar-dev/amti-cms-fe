<template>
  <div class="space-y-6">
    <Header
      :title="$t('pages.settings.index.title')"
      :description="$t('pages.settings.index.description')"
    >
      <template #tabs>
        <NuxtLink
          v-if="can('settings.meta.view') || can('settings.view')"
          to="/settings/meta"
          class="pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer"
          :class="[
            $route.path === '/settings/meta' || $route.path === '/settings'
              ? 'border-primary text-primary font-semibold'
              : 'border-transparent text-muted hover:text-highlighted'
          ]"
        >
          {{ $t('pages.settings.index.tabMeta') }}
        </NuxtLink>
        <NuxtLink
          v-if="can('settings.contact.view') || can('settings.view')"
          to="/settings/contact"
          class="pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer"
          :class="[
            $route.path === '/settings/contact'
              ? 'border-primary text-primary font-semibold'
              : 'border-transparent text-muted hover:text-highlighted'
          ]"
        >
          {{ $t('pages.settings.index.tabContact') }}
        </NuxtLink>
        <NuxtLink
          v-if="can('settings.social.view') || can('settings.view')"
          to="/settings/social"
          class="pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer"
          :class="[
            $route.path === '/settings/social'
              ? 'border-primary text-primary font-semibold'
              : 'border-transparent text-muted hover:text-highlighted'
          ]"
        >
          {{ $t('pages.settings.index.tabSocial') }}
        </NuxtLink>
      </template>
    </Header>

    <div class="max-w-4xl bg-default border border-default rounded-lg">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
const { can } = usePermission()

definePageMeta({
  layout: 'dashboard',
  middleware: [
    (to) => {
      const { can } = usePermission()
      if (to.path === '/settings') {
        if (can('settings.meta.view') || can('settings.view')) {
          return navigateTo('/settings/meta')
        }
        if (can('settings.contact.view')) {
          return navigateTo('/settings/contact')
        }
        if (can('settings.social.view')) {
          return navigateTo('/settings/social')
        }
        return navigateTo('/')
      }
    }
  ]
})
</script>
