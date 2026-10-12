<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-slate-900/90 backdrop-blur-md shadow-xl shadow-slate-950/20 border-b border-white/10 py-3'
        : 'bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-transparent py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <!-- Brand Logo -->
        <NuxtLink
          to="/"
          class="flex items-center gap-3 group focus:outline-none"
        >
          <img
            src="/logo-light.png"
            alt="AMTI Logo"
            class="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          >
          <div class="hidden sm:flex flex-col">
            <span class="text-base font-bold tracking-tight text-white group-hover:text-[#A7E629] transition-colors leading-tight">
              AMTI
            </span>
            <span class="text-[11px] text-slate-300 tracking-wider uppercase font-medium leading-tight">
              Asset Monitoring Teknologi Indonesia
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1 lg:gap-2">
          <NuxtLink
            to="/"
            class="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            :class="[
              route.path === '/' || route.path === '/home'
                ? 'text-[#A7E629] bg-white/10 font-semibold shadow-inner'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
            ]"
          >
            Home
          </NuxtLink>

          <NuxtLink
            to="/eews"
            class="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            :class="[
              route.path === '/eews'
                ? 'text-[#A7E629] bg-white/10 font-semibold shadow-inner'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
            ]"
          >
            EEWS
          </NuxtLink>

          <NuxtLink
            to="/shms"
            class="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            :class="[
              route.path === '/shms'
                ? 'text-[#A7E629] bg-white/10 font-semibold shadow-inner'
                : 'text-slate-200 hover:text-white hover:bg-white/5'
            ]"
          >
            SHMS
          </NuxtLink>

          <NuxtLink
            to="/#about"
            class="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-all duration-200"
            @click="handleAnchorClick('#about')"
          >
            About
          </NuxtLink>

          <NuxtLink
            to="/#why-us"
            class="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-all duration-200"
            @click="handleAnchorClick('#why-us')"
          >
            Keunggulan
          </NuxtLink>

          <NuxtLink
            to="/#faq"
            class="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5 transition-all duration-200"
            @click="handleAnchorClick('#faq')"
          >
            FAQ
          </NuxtLink>
        </nav>

        <!-- CTA & Portal Button -->
        <div class="hidden sm:flex items-center gap-3">
          <NuxtLink
            to="/#contact"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-200"
            @click="handleAnchorClick('#contact')"
          >
            <UIcon
              name="i-lucide-phone-call"
              class="size-4 text-[#A7E629]"
            />
            <span>Kontak</span>
          </NuxtLink>

          <NuxtLink
            :to="authLink"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-slate-900 bg-[#A7E629] hover:bg-[#bbf33e] shadow-md shadow-[#A7E629]/20 hover:shadow-[#A7E629]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <span>{{ isLoggedIn ? 'Buka Dashboard' : 'Portal CMS' }}</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="size-4"
            />
          </NuxtLink>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <div class="flex items-center gap-2 md:hidden">
          <NuxtLink
            :to="authLink"
            class="px-3 py-1.5 text-xs font-semibold rounded-md text-slate-900 bg-[#A7E629]"
          >
            {{ isLoggedIn ? 'App' : 'Masuk' }}
          </NuxtLink>

          <button
            type="button"
            class="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
            :aria-label="mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <UIcon
              :name="mobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
              class="size-6"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-slate-900/98 border-b border-white/10 px-4 pt-3 pb-6 space-y-2 shadow-2xl backdrop-blur-xl"
      >
        <NuxtLink
          to="/"
          class="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="route.path === '/' || route.path === '/home' ? 'text-[#A7E629] bg-white/10 font-semibold' : 'text-slate-200 hover:bg-white/5'"
          @click="mobileMenuOpen = false"
        >
          <span>Home</span>
          <UIcon
            name="i-lucide-chevron-right"
            class="size-4 opacity-50"
          />
        </NuxtLink>

        <NuxtLink
          to="/eews"
          class="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="route.path === '/eews' ? 'text-[#A7E629] bg-white/10 font-semibold' : 'text-slate-200 hover:bg-white/5'"
          @click="mobileMenuOpen = false"
        >
          <div>
            <div class="font-medium">
              EEWS
            </div>
            <div class="text-xs text-slate-400 font-normal">
              Earthquake Early Warning System
            </div>
          </div>
          <UIcon
            name="i-lucide-chevron-right"
            class="size-4 opacity-50"
          />
        </NuxtLink>

        <NuxtLink
          to="/shms"
          class="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          :class="route.path === '/shms' ? 'text-[#A7E629] bg-white/10 font-semibold' : 'text-slate-200 hover:bg-white/5'"
          @click="mobileMenuOpen = false"
        >
          <div>
            <div class="font-medium">
              SHMS
            </div>
            <div class="text-xs text-slate-400 font-normal">
              Structure Health Monitoring System
            </div>
          </div>
          <UIcon
            name="i-lucide-chevron-right"
            class="size-4 opacity-50"
          />
        </NuxtLink>

        <NuxtLink
          to="/#about"
          class="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5"
          @click="handleAnchorClickMobile('#about')"
        >
          <span>About</span>
          <UIcon
            name="i-lucide-chevron-right"
            class="size-4 opacity-50"
          />
        </NuxtLink>

        <NuxtLink
          to="/#why-us"
          class="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5"
          @click="handleAnchorClickMobile('#why-us')"
        >
          <span>Keunggulan AMTI</span>
          <UIcon
            name="i-lucide-chevron-right"
            class="size-4 opacity-50"
          />
        </NuxtLink>

        <NuxtLink
          to="/#faq"
          class="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5"
          @click="handleAnchorClickMobile('#faq')"
        >
          <span>Tanya Jawab (FAQ)</span>
          <UIcon
            name="i-lucide-chevron-right"
            class="size-4 opacity-50"
          />
        </NuxtLink>

        <NuxtLink
          to="/#contact"
          class="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#A7E629] hover:bg-white/5"
          @click="handleAnchorClickMobile('#contact')"
        >
          <span class="flex items-center gap-2">
            <UIcon
              name="i-lucide-phone-call"
              class="size-4"
            />
            Hubungi Kami
          </span>
          <UIcon
            name="i-lucide-arrow-right"
            class="size-4"
          />
        </NuxtLink>

        <div class="pt-3 border-t border-white/10">
          <NuxtLink
            :to="authLink"
            class="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg text-slate-900 bg-[#A7E629] font-semibold text-sm shadow-md"
            @click="mobileMenuOpen = false"
          >
            <span>{{ isLoggedIn ? 'Masuk ke Dashboard' : 'Buka Portal CMS' }}</span>
            <UIcon
              name="i-lucide-arrow-right"
              class="size-4"
            />
          </NuxtLink>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { state: authState } = useAuth()

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const isLoggedIn = computed(() => !!authState.token)
const authLink = computed(() => (isLoggedIn.value ? '/app' : '/auth/sign-in'))

const checkScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 20
  }
}

onMounted(() => {
  checkScroll()
  window.addEventListener('scroll', checkScroll, { passive: true })
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', checkScroll)
  }
})

const handleAnchorClick = (anchor: string) => {
  if (route.path === '/' || route.path === '/home') {
    const el = document.querySelector(anchor)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    router.push('/' + anchor)
  }
}

const handleAnchorClickMobile = (anchor: string) => {
  mobileMenuOpen.value = false
  handleAnchorClick(anchor)
}
</script>
