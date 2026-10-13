<template>
  <footer class="relative overflow-hidden bg-blue-950 text-white">
    <SiteBackground
      dark
      pattern="lines"
      contour
    />

    <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <div class="flex items-center gap-3">
            <img
              :src="logoUrl || '/logo-light.png'"
              alt=""
              class="h-11 w-auto"
            >
            <span class="leading-tight">
              <span class="block text-lg font-semibold tracking-tight">{{ siteName }}</span>
              <span class="block text-sm text-white/70">{{ $t('site.identity.fullName') }}</span>
            </span>
          </div>
          <p class="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
            {{ $t('site.identity.tagline') }}
          </p>

          <div class="mt-6 flex flex-wrap gap-2">
            <UButton
              v-for="social in siteSocials"
              :key="social.name"
              :to="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :icon="social.icon"
              color="neutral"
              variant="ghost"
              size="sm"
              class="text-white/80 hover:bg-white/10 hover:text-white"
              :aria-label="social.name"
            />
          </div>
        </div>

        <div
          id="kontak"
          class="lg:col-span-4 scroll-mt-24"
        >
          <h2 class="text-sm font-semibold uppercase tracking-widest text-white/60">
            {{ $t('site.footer.contactUs') }}
          </h2>

          <ul class="mt-6 space-y-4 text-sm">
            <li class="flex gap-3">
              <UIcon
                name="i-lucide-map-pin"
                class="mt-0.5 size-5 shrink-0 text-amber-400"
              />
              <span class="text-white/75">{{ address }}</span>
            </li>
            <li class="flex gap-3">
              <UIcon
                name="i-lucide-phone"
                class="mt-0.5 size-5 shrink-0 text-amber-400"
              />
              <a
                :href="phoneHref"
                class="text-white/75 transition-colors hover:text-white"
              >{{ phone }}</a>
            </li>
            <li class="flex gap-3">
              <UIcon
                name="i-lucide-mail"
                class="mt-0.5 size-5 shrink-0 text-amber-400"
              />
              <a
                :href="emailHref"
                class="text-white/75 transition-colors hover:text-white"
              >{{ email }}</a>
            </li>
          </ul>
        </div>

        <div class="lg:col-span-4">
          <div class="h-64 w-full overflow-hidden rounded-2xl border border-white/15 shadow-xl sm:h-72 lg:h-full lg:min-h-[220px]">
            <iframe
              :src="mapsUrl"
              :title="$t('site.footer.mapTitle')"
              class="size-full border-0"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>

      <USeparator class="my-10 border-white/10" />

      <div class="flex flex-col gap-3 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>{{ copyright }}</p>
        <div class="flex flex-wrap items-center gap-6">
          <NuxtLink
            to="/privacy-policy"
            class="transition-colors hover:text-white/80"
          >
            {{ $t('site.footer.privacyPolicy') }}
          </NuxtLink>
          <NuxtLink
            to="/terms-of-service"
            class="transition-colors hover:text-white/80"
          >
            {{ $t('site.footer.termsOfService') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const {
  siteName,
  logoUrl,
  address,
  phone,
  phoneHref,
  email,
  emailHref,
  mapsUrl,
  copyright,
  siteSocials
} = useSiteSettings()
</script>
