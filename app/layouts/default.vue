<template>
  <div class="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-[#A7E629]/30 selection:text-slate-900 font-sans">
    <!-- Sticky Glassmorphic Navbar -->
    <WebNavbar />

    <!-- Main Content Area -->
    <main class="flex-1 w-full">
      <slot />
    </main>

    <!-- Footer -->
    <WebFooter />

    <!-- Floating Quick Actions (WhatsApp & Back to Top) -->
    <div class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <!-- WhatsApp Floating Trigger -->
      <a
        href="https://wa.me/6281287456669?text=Halo%20AMTI,%20saya%20tertarik%20dengan%20solusi%20monitoring%20aset%20Anda."
        target="_blank"
        rel="noopener noreferrer"
        class="size-13 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-[#25D366]/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none"
        aria-label="Chat WhatsApp AMTI"
      >
        <UIcon
          name="i-lucide-message-circle"
          class="size-7"
        />
        <span class="sr-only">Chat WhatsApp</span>
      </a>

      <!-- Back To Top Button -->
      <transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-2 scale-90"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-2 scale-90"
      >
        <button
          v-if="showBackToTop"
          type="button"
          class="size-11 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white shadow-lg border border-white/10 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
          aria-label="Kembali ke atas"
          @click="scrollToTop"
        >
          <UIcon
            name="i-lucide-arrow-up"
            class="size-5 text-[#A7E629]"
          />
        </button>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const showBackToTop = ref(false)

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    showBackToTop.value = window.scrollY > 400
  }
}

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>
