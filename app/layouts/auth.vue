<template>
  <div class="flex min-h-screen w-full select-none">
    <!-- Left Panel -->
    <div class="hidden lg:flex lg:w-2/5 relative overflow-hidden">
      <!-- Hero image -->
      <div class="absolute inset-0 z-0 bg-[url('/hero.png')] bg-cover bg-right pointer-events-none" />

      <!-- Grid overlay -->
      <div class="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-cover bg-center opacity-40 pointer-events-none" />

      <!-- Dark gradient overlay (bottom-heavy, keeps top clean) -->
      <div class="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />

      <!-- Subtle vignette -->
      <div class="absolute inset-0 z-20 pointer-events-none shadow-inner" />

      <!-- Bottom Content -->
      <div class="relative z-30 flex w-full flex-col justify-end p-14 text-white">
        <slot name="hero">
          <h1 class="text-3xl font-semibold leading-tight drop-shadow-md">
            {{ $t('components.authLayout.heroTitle') }}
          </h1>
          <p class="text-lg text-white/90 drop-shadow-sm">
            {{ $t('components.authLayout.heroSubtitle') }}
          </p>
        </slot>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="relative z-50 flex flex-1 lg:w-3/5 lg:flex-none items-center justify-center bg-default px-6 py-12 lg:shadow-xl">
      <!-- Dark Mode Toggle + Language Switcher (top-right) -->
      <div class="absolute top-6 right-6 z-30 flex items-center gap-2">
        <UColorModeButton
          color="neutral"
          variant="ghost"
        />
        <LanguageSwitcher variant="ghost" />
      </div>

      <slot />
    </div>
  </div>
</template>
