<template>
  <section
    id="contact"
    class="relative overflow-hidden scroll-mt-20 bg-blue-950 text-white"
  >
    <SiteBackground
      dark
      pattern="grid"
      contour
      grain
    />

    <div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <SiteReveal>
            <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <span
                class="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/70"
                aria-hidden="true"
              />
              {{ $t('site.contact.directHeading') }}
            </p>

            <h2 class="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              {{ $t('site.contact.ctaTitle') }}
            </h2>

            <p class="mt-6 text-base leading-relaxed text-white/75">
              {{ $t('site.contact.ctaBody') }}
            </p>

            <ul class="mt-10 space-y-5">
              <li class="flex gap-4">
                <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-400">
                  <UIcon
                    name="i-lucide-map-pin"
                    class="size-5"
                  />
                </span>
                <span class="text-sm leading-relaxed text-white/80">{{ address }}</span>
              </li>
              <li class="flex gap-4">
                <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-400">
                  <UIcon
                    name="i-lucide-phone"
                    class="size-5"
                  />
                </span>
                <a
                  :href="phoneHref"
                  class="text-sm text-white/80 transition-colors hover:text-amber-400"
                >{{ phone }}</a>
              </li>
              <li class="flex gap-4">
                <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-400">
                  <UIcon
                    name="i-lucide-mail"
                    class="size-5"
                  />
                </span>
                <a
                  :href="emailHref"
                  class="text-sm text-white/80 transition-colors hover:text-amber-400"
                >{{ email }}</a>
              </li>
            </ul>

            <div class="mt-10 flex flex-wrap items-center gap-3">
              <UButton
                v-for="social in siteSocials"
                :key="social.name"
                :to="social.href"
                target="_blank"
                rel="noopener noreferrer"
                color="neutral"
                variant="ghost"
                size="lg"
                square
                :icon="social.icon"
                :aria-label="social.name"
                class="rounded-full text-white ring-1 ring-white/25 hover:bg-white/10"
              />
            </div>
          </SiteReveal>
        </div>

        <SiteReveal
          :delay="120"
          class="lg:col-span-7"
        >
          <div class="rounded-3xl border border-white/15 bg-default p-7 shadow-2xl sm:p-9">
            <h3 class="text-lg font-semibold text-highlighted">
              {{ $t('site.contact.formHeading') }}
            </h3>
            <p class="mt-2 text-sm text-muted">
              {{ $t('site.contact.formIntro') }}
            </p>

            <USeparator class="my-7" />

            <SiteContactForm />
          </div>
        </SiteReveal>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const {
  address,
  phone,
  phoneHref,
  email,
  emailHref,
  siteSocials
} = useSiteSettings()
</script>
