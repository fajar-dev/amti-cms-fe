<template>
  <div class="flex min-h-screen flex-col bg-default text-default antialiased">
    <SiteNavbar />

    <main class="flex-1">
      <slot />
    </main>

    <SiteFooter />

    <SiteLiveChatWidget />

    <div class="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-3">
      <UButton
        v-show="showBackToTop"
        icon="i-lucide-arrow-up"
        color="neutral"
        variant="solid"
        size="lg"
        class="rounded-full shadow-lg"
        :aria-label="$t('site.cta.backToTop')"
        @click="scrollToTop"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const showBackToTop = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const onScroll = () => {
    showBackToTop.value = window.scrollY > 600
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})
</script>
