<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="scrolled
      ? 'border-b border-default bg-default/80 shadow-xs shadow-blue-950/5 backdrop-blur-xl'
      : overDark
        ? 'border-b border-white/10 bg-blue-950/20 backdrop-blur-md'
        : 'border-b border-default/60 bg-default/70 backdrop-blur-xl'"
  >
    <div
      class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6 lg:px-8"
      :class="scrolled ? 'h-16' : 'h-20'"
    >
      <NuxtLink
        to="/"
        class="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90"
        :aria-label="$t('site.identity.fullName')"
      >
        <img
          :src="overDark ? '/logo-light.png' : '/logo.png'"
          alt=""
          class="h-10 w-auto transition-transform duration-500"
          :class="scrolled ? 'scale-95' : 'scale-100'"
        >
        <span class="hidden leading-tight sm:block">
          <span
            class="block text-base font-semibold tracking-tight"
            :class="overDark ? 'text-white' : 'text-highlighted'"
          >{{ $t('site.identity.name') }}</span>
          <span
            class="block text-xs"
            :class="overDark ? 'text-white/60' : 'text-muted'"
          >{{ $t('site.identity.fullName') }}</span>
        </span>
      </NuxtLink>

      <nav
        class="hidden items-center gap-1 rounded-full border p-1.5 transition-all duration-500 lg:flex"
        :class="overDark
          ? 'border-white/15 bg-white/10 shadow-lg shadow-black/20 backdrop-blur-xl ring-1 ring-white/10'
          : 'border-default/80 bg-muted/60 shadow-xs shadow-blue-950/5 backdrop-blur-xl ring-1 ring-default/40'"
        aria-label="Main Navigation"
      >
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="relative flex items-center gap-2 rounded-full px-4.5 py-1.5 text-[13px] tracking-wide transition-all duration-200"
          :class="item.isActive
            ? overDark
              ? 'bg-white/20 font-semibold text-white shadow-xs ring-1 ring-white/30 backdrop-blur-sm'
              : 'bg-primary/10 font-semibold text-primary shadow-xs ring-1 ring-primary/20'
            : overDark
              ? 'font-medium text-white/75 hover:bg-white/10 hover:text-white'
              : 'font-medium text-toned hover:bg-default/70 hover:text-highlighted'"
        >
          <span>{{ item.label }}</span>
          <span
            v-if="item.isActive"
            class="size-1.5 shrink-0 rounded-full transition-transform"
            :class="overDark
              ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]'
              : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]'"
            aria-hidden="true"
          />
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2.5">
        <LanguageSwitcher
          variant="ghost"
          class="hidden sm:inline-flex"
          :button-class="overDark
            ? 'rounded-full text-white/80 hover:bg-white/10 hover:text-white'
            : 'rounded-full text-toned hover:bg-muted hover:text-highlighted'"
        />
        <UButton
          :to="whatsappHref"
          target="_blank"
          rel="noopener noreferrer"
          :color="overDark ? 'neutral' : 'primary'"
          variant="solid"
          icon="i-lucide-message-circle"
          class="hidden rounded-full px-5 py-2 font-medium shadow-md transition-transform duration-300 hover:scale-105 active:scale-95 sm:inline-flex"
          :class="overDark ? '' : 'shadow-primary/20'"
          :label="$t('site.nav.contact')"
        />
        <UButton
          icon="i-lucide-menu"
          color="neutral"
          variant="ghost"
          :class="overDark ? 'text-white hover:bg-white/10' : ''"
          :aria-label="$t('site.nav.openMenu')"
          class="lg:hidden"
          @click="mobileOpen = true"
        />
      </div>
    </div>

    <div
      class="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-primary via-primary to-amber-500"
      :style="{ transform: `scaleX(${progress})` }"
      aria-hidden="true"
    />

    <USlideover
      v-model:open="mobileOpen"
      :title="$t('site.identity.name')"
      side="right"
    >
      <template #body>
        <nav class="flex flex-col gap-1.5">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200"
            :class="item.isActive
              ? 'bg-primary/10 font-semibold text-primary ring-1 ring-primary/20'
              : 'text-toned hover:bg-muted hover:text-highlighted'"
            @click="mobileOpen = false"
          >
            <span>{{ item.label }}</span>
            <span
              v-if="item.isActive"
              class="size-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
              aria-hidden="true"
            />
          </NuxtLink>
        </nav>

        <USeparator class="my-6" />

        <div class="space-y-3 text-sm">
          <p class="flex items-start gap-3 text-muted">
            <UIcon
              name="i-lucide-map-pin"
              class="mt-0.5 size-4 shrink-0 text-amber-500"
            />
            {{ address }}
          </p>
          <a
            :href="phoneHref"
            class="flex items-center gap-3 text-toned hover:text-primary"
          >
            <UIcon
              name="i-lucide-phone"
              class="size-4 shrink-0 text-amber-500"
            />
            {{ phone }}
          </a>
          <a
            :href="emailHref"
            class="flex items-center gap-3 text-toned hover:text-primary"
          >
            <UIcon
              name="i-lucide-mail"
              class="size-4 shrink-0 text-amber-500"
            />
            {{ email }}
          </a>
        </div>
      </template>
      <template #footer>
        <UButton
          :to="whatsappHref"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          icon="i-lucide-message-circle"
          block
          class="rounded-full shadow-md shadow-primary/20"
          :label="$t('site.nav.contact')"
        />
      </template>
    </USlideover>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

const {
  address,
  phone,
  phoneHref,
  email,
  emailHref,
  whatsappHref
} = useSiteSettings()

const navLinks = [
  { key: 'home', to: '/' },
  { key: 'eews', to: '/eews' },
  { key: 'shms', to: '/shms' },
  { key: 'article', to: '/article' }
]

const scrolled = ref(false)
const progress = ref(0)
const mobileOpen = ref(false)

const hasDarkHero = computed(() => route.path === '/')
const overDark = computed(() => hasDarkHero.value && !scrolled.value)

function isItemActive(to: string): boolean {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

const navItems = computed(() => navLinks.map(item => ({
  key: item.key,
  label: t(`site.nav.${item.key}`),
  to: item.to,
  isActive: isItemActive(item.to)
})))

let frame = 0

function onScroll() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    scrolled.value = window.scrollY > 24

    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(window.scrollY / max, 1) : 0
  })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  onBeforeUnmount(() => {
    if (frame) cancelAnimationFrame(frame)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })
})
</script>
