<template>
  <div>
    <section class="relative flex min-h-screen items-center overflow-hidden">
      <video
        v-if="playHeroVideo"
        ref="heroVideoRef"
        class="hero-video absolute inset-0 size-full object-cover"
        :src="heroVideo"
        :poster="heroPoster"
        muted
        loop
        playsinline
        preload="metadata"
        aria-hidden="true"
      />
      <img
        v-else
        :src="heroPoster"
        alt=""
        class="absolute inset-0 size-full object-cover"
      >

      <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-950/45 to-blue-950/90" />
      <div class="hero-vignette pointer-events-none absolute inset-0" />
      <SiteBackground
        dark
        pattern="lines"
        grain
      />

      <div class="relative mx-auto w-full max-w-5xl px-4 py-28 text-center sm:px-6 lg:px-8">
        <div class="hero-seq">
          <p class="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span
              class="h-px w-8 bg-amber-400/50"
              aria-hidden="true"
            />
            {{ $t('site.identity.fullName') }}
            <span
              class="h-px w-8 bg-amber-400/50"
              aria-hidden="true"
            />
          </p>

          <h1 class="mt-8 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {{ $t('site.hero.title') }}
          </h1>

          <p class="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            {{ $t('site.hero.subtitle') }}
          </p>

          <div class="mt-11 flex flex-wrap items-center justify-center gap-3">
            <UButton
              to="/eews"
              color="secondary"
              size="xl"
              icon="i-lucide-radio"
              class="rounded-full px-7 shadow-lg shadow-amber-500/20"
              :label="$t('site.hero.exploreEews')"
            />
            <UButton
              to="/shms"
              color="neutral"
              variant="ghost"
              size="xl"
              icon="i-lucide-building-2"
              class="rounded-full px-6 text-white ring-1 ring-white/40 hover:bg-white/10"
              :label="$t('site.hero.exploreShms')"
            />
          </div>
        </div>
      </div>

      <div class="absolute inset-x-0 bottom-8 hidden justify-center sm:flex">
        <span class="hero-cue flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-white/50">
          {{ $t('site.hero.scrollCue') }}
          <UIcon
            name="i-lucide-chevron-down"
            class="size-5"
          />
        </span>
      </div>
    </section>

    <section class="bg-muted">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid items-center gap-16 lg:grid-cols-12">
          <SiteReveal class="lg:col-span-6">
            <SiteFrame corners>
              <div class="aspect-video w-full overflow-hidden bg-black">
                <iframe
                  :src="smartVideoUrl"
                  title="Smart Monitoring Video"
                  class="size-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                />
              </div>
            </SiteFrame>
          </SiteReveal>

          <SiteReveal
            :delay="120"
            class="lg:col-span-6"
          >
            <SiteSectionHeader
              :eyebrow="$t('site.smart.eyebrow')"
              :title="$t('site.smart.title')"
              :body="$t('site.smart.body')"
            />
          </SiteReveal>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden">
      <SiteCurveDivider
        fill="var(--ui-bg-muted)"
        flip
      />
      <SiteBackground contour />

      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SiteReveal class="lg:col-span-5">
            <SiteSectionHeader
              :eyebrow="$t('site.profile.label')"
              :title="$t('site.profile.title')"
            />
          </SiteReveal>

          <SiteReveal
            :delay="120"
            class="lg:col-span-7"
          >
            <p class="text-base leading-relaxed text-muted lg:text-lg">
              {{ $t('site.profile.body') }}
            </p>
          </SiteReveal>
        </div>

        <div class="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          <SiteReveal
            v-for="(photo, index) in aboutGallery"
            :key="photo.src"
            :delay="index * 80"
            :class="index % 2 === 1 ? 'lg:mt-10' : ''"
          >
            <div class="group overflow-hidden rounded-3xl border border-default shadow-sm">
              <img
                :src="photo.src"
                :alt="photo.alt"
                loading="lazy"
                class="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
            </div>
          </SiteReveal>
        </div>
      </div>
    </section>

    <section class="bg-muted">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SiteReveal>
          <SiteSectionHeader
            :eyebrow="$t('site.about.title')"
            :title="$t('site.about.headline')"
            :body="$t('site.about.body')"
          />
        </SiteReveal>

        <div class="mt-14 grid gap-6 lg:grid-cols-2">
          <SiteReveal
            v-for="(solution, index) in solutions"
            :key="solution.to"
            :delay="index * 120"
            class="h-full"
          >
            <SiteCard :to="solution.to">
              <div class="relative overflow-hidden">
                <img
                  :src="solution.image"
                  alt=""
                  loading="lazy"
                  class="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                <span class="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/25 to-transparent" />
                <p class="absolute bottom-6 left-7 right-7 text-xs font-semibold uppercase tracking-widest text-amber-400">
                  {{ solution.label }}
                </p>
              </div>

              <div class="flex flex-1 flex-col p-7">
                <h3 class="text-xl font-semibold text-highlighted">
                  {{ solution.title }}
                </h3>
                <p class="mt-3 text-sm leading-relaxed text-muted">
                  {{ solution.body }}
                </p>
                <span class="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-primary">
                  {{ solution.linkLabel }}
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </SiteCard>
          </SiteReveal>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden">
      <SiteCurveDivider
        fill="var(--ui-bg-muted)"
        flip
      />
      <SiteBackground pattern="lines" />

      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SiteReveal>
          <SiteSectionHeader
            align="center"
            :eyebrow="$t('site.why.eyebrow')"
            :title="$t('site.why.title')"
          />
        </SiteReveal>

        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <SiteReveal
            v-for="(item, index) in whyChooseUs"
            :key="item.id"
            :delay="index * 90"
            class="h-full"
          >
            <SiteCard>
              <div class="flex h-full flex-col p-7">
                <span class="flex size-16 items-center justify-center rounded-2xl bg-white border border-muted">
                  <img
                    :src="item.icon"
                    alt=""
                    loading="lazy"
                    class="size-9 object-contain"
                  >
                </span>

                <h3 class="mt-6 text-sm font-semibold uppercase tracking-wide text-highlighted">
                  {{ $t(`site.why.items.${item.id}.title`) }}
                </h3>
                <p class="mt-3 text-sm leading-relaxed text-muted">
                  {{ $t(`site.why.items.${item.id}.body`) }}
                </p>
              </div>
            </SiteCard>
          </SiteReveal>
        </div>
      </div>
    </section>

    <section class="bg-muted">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SiteReveal>
          <SiteSectionHeader
            :eyebrow="$t('site.leading.eyebrow')"
            :title="$t('site.leading.title')"
          />
        </SiteReveal>

        <div class="mt-14 grid gap-6 lg:grid-cols-2">
          <SiteReveal
            v-for="(block, index) in leadingBlocks"
            :key="block.title"
            :delay="index * 110"
            class="h-full"
          >
            <SiteCard>
              <div class="flex h-full flex-col p-8">
                <h3 class="text-lg font-semibold text-highlighted">
                  {{ block.title }}
                </h3>
                <ul class="mt-6 space-y-4">
                  <li
                    v-for="entry in block.items"
                    :key="entry"
                    class="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-500/15">
                      <UIcon
                        name="i-lucide-check"
                        class="size-3 text-amber-600"
                      />
                    </span>
                    <span>{{ entry }}</span>
                  </li>
                </ul>
              </div>
            </SiteCard>
          </SiteReveal>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden">
      <SiteCurveDivider
        fill="var(--ui-bg-muted)"
        flip
      />
      <SiteBackground contour />

      <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <SiteReveal class="lg:col-span-5">
            <SiteSectionHeader
              :eyebrow="$t('site.mission.title')"
              :title="$t('site.mission.lead')"
            />

            <div class="relative mt-9 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-transparent to-amber-500/10 p-8">
              <span
                class="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                aria-hidden="true"
              />
              <h3 class="text-xs font-semibold uppercase tracking-widest text-primary">
                {{ $t('site.mission.heading') }}
              </h3>
              <p class="mt-5 text-base font-medium leading-relaxed text-highlighted">
                {{ $t('site.mission.statement') }}
              </p>
              <p class="mt-4 text-sm leading-relaxed text-muted">
                {{ $t('site.mission.followUp') }}
              </p>
            </div>
          </SiteReveal>

          <div class="lg:col-span-7">
            <SiteReveal>
              <p class="text-xs font-semibold uppercase tracking-widest text-primary">
                {{ $t('site.values.title') }}
              </p>
            </SiteReveal>

            <div class="mt-6 border-t border-default">
              <SiteReveal
                v-for="(valueKey, index) in valueKeys"
                :key="valueKey"
                :delay="index * 70"
              >
                <div class="value-row group relative flex gap-6 border-b border-default py-6">
                  <span
                    class="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-gradient-to-b from-primary to-amber-500 transition-transform duration-500 group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <span class="w-10 shrink-0 pl-4 text-2xl font-bold leading-none text-primary/25 transition-colors duration-300 group-hover:text-primary/60">
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                  <div class="pr-4 transition-transform duration-500 group-hover:translate-x-1">
                    <h4 class="text-base font-semibold text-highlighted">
                      {{ $t(`site.values.items.${valueKey}.name`) }}
                    </h4>
                    <p class="mt-2 text-sm leading-relaxed text-muted">
                      {{ $t(`site.values.items.${valueKey}.description`) }}
                    </p>
                  </div>
                </div>
              </SiteReveal>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-y border-default bg-default">
      <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SiteReveal>
          <p class="text-center text-xs font-semibold uppercase tracking-widest text-muted">
            {{ $t('site.clients.title') }}
          </p>
          <div class="mt-10">
            <SiteClientLogos :logos="clientLogos" />
          </div>
        </SiteReveal>
      </div>
    </section>

    <section class="bg-muted">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SiteReveal class="lg:col-span-5">
            <SiteSectionHeader
              :eyebrow="$t('site.faq.eyebrow')"
              :title="$t('site.faq.intro')"
            />
            <p class="mt-8 text-sm text-muted">
              {{ $t('site.faq.help') }}
            </p>
            <UButton
              to="#contact"
              color="primary"
              icon="i-lucide-mail"
              class="mt-4 rounded-full px-6 shadow-lg shadow-primary/20"
              :label="$t('site.cta.talkToUs')"
            />
          </SiteReveal>

          <SiteReveal
            :delay="120"
            class="lg:col-span-7"
          >
            <UAccordion
              :items="faqItems"
              :ui="{ item: 'border-b border-default', trigger: 'py-5 text-left' }"
            />
          </SiteReveal>
        </div>
      </div>
    </section>

    <SiteContactSection />
  </div>
</template>

<script setup lang="ts">
import { clientService } from '~/services/client-service'
import { faqService } from '~/services/faq-service'

const { t } = useI18n()
const {
  siteName,
  siteDescription,
  ogImageUrl
} = useSiteSettings()

const { data: clientsResponse } = await useAsyncData(
  'public-clients',
  () => clientService.getPublic(),
  {
    lazy: true,
    server: true
  }
)

const { data: faqResponse } = await useAsyncData(
  'public-faqs',
  () => faqService.getPublic(),
  {
    lazy: true,
    server: true
  }
)

const heroVideo = '/amti/videos/home_amti.mp4'
const heroPoster = '/amti/img/index/why-choose-us.png'
const smartVideoUrl = 'https://www.youtube.com/embed/0TvNMWWaF4Q?si=N-3hcc0w4ykDHp9j'

const aboutGallery = [
  { src: '/amti/img/about/monitoring.JPG', alt: 'Monitoring 1' },
  { src: '/amti/img/about/jembatan_cipali.JPG', alt: 'Monitoring 2' },
  { src: '/amti/img/about/astra.JPG', alt: 'Monitoring 3' },
  { src: '/amti/img/about/kedang_pahu.jpg', alt: 'Monitoring 4' }
]

const whyChooseUs = [
  { id: 'tech', icon: '/amti/img/icon/technology.png' },
  { id: 'customer', icon: '/amti/img/icon/customer_driven.png' },
  { id: 'listens', icon: '/amti/img/icon/listenncares.png' },
  { id: 'personalized', icon: '/amti/img/icon/personalized_service.png' }
]

const valueKeys = ['innovation', 'reliability', 'excellence', 'integrity', 'impact']

const defaultClientLogos = [
  { name: 'Astra', src: '/amti/img/clients/astra.png', website: null as string | null },
  { name: 'President', src: '/amti/img/clients/president.png', website: null as string | null },
  { name: 'ITM', src: '/amti/img/clients/ITM.png', website: null as string | null }
]

const clientLogos = computed(() => {
  const list = clientsResponse.value?.data
  if (Array.isArray(list) && list.length > 0) {
    const activeClients = list.filter(item => item.isActive !== false)
    if (activeClients.length > 0) {
      return activeClients.map(item => ({
        name: item.name,
        src: item.logoUrl || item.logo,
        website: item.website || null
      }))
    }
  }
  return defaultClientLogos
})

const faqItemKeys = ['q1', 'q2', 'q3', 'q4', 'q5']

const backendFaqs = computed(() => {
  const list = faqResponse.value?.data
  if (Array.isArray(list) && list.length > 0) {
    return list.filter(item => item.isActive !== false)
  }
  return []
})

const faqItems = computed(() => {
  if (backendFaqs.value.length > 0) {
    return backendFaqs.value.map((item, index) => ({
      label: `${String(item.order || index + 1).padStart(2, '0')}  ${item.question}`,
      content: item.answer,
      value: String(item.id ?? index)
    }))
  }
  return faqItemKeys.map((k, index) => ({
    label: `${String(index + 1).padStart(2, '0')}  ${t(`site.faq.items.${k}.question`)}`,
    content: t(`site.faq.items.${k}.answer`),
    value: String(index)
  }))
})

const leadingBlocks = computed(() => [
  {
    title: t('site.leading.block1.title'),
    items: [
      t('site.leading.block1.item1'),
      t('site.leading.block1.item2'),
      t('site.leading.block1.item3')
    ]
  },
  {
    title: t('site.leading.block2.title'),
    items: [
      t('site.leading.block2.item1'),
      t('site.leading.block2.item2'),
      t('site.leading.block2.item3')
    ]
  }
])

const solutions = computed(() => [
  {
    to: '/shms',
    label: t('site.nav.shms'),
    title: t('site.solutions.shmsTitle'),
    body: t('site.solutions.shmsBody'),
    linkLabel: t('site.solutions.seeShms'),
    image: '/amti/img/shms/shms-title.png'
  },
  {
    to: '/eews',
    label: t('site.nav.eews'),
    title: t('site.solutions.eewsTitle'),
    body: `${t('site.solutions.eewsBody').slice(0, 180)}…`,
    linkLabel: t('site.solutions.seeEews'),
    image: '/amti/img/eews/buildings.webp'
  }
])

useSeoMeta({
  title: () => `${siteName.value} — Earthquake Early Warning & Structure Health Monitoring System`,
  description: () => siteDescription.value?.slice(0, 180) || t('site.smart.body').slice(0, 180),
  ogTitle: () => t('site.hero.title'),
  ogDescription: () => t('site.hero.subtitle'),
  ogImage: () => ogImageUrl.value || undefined,
  ogType: 'website'
})

const heroVideoRef = ref<HTMLVideoElement | null>(null)
const playHeroVideo = ref(true)

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    playHeroVideo.value = false
    return
  }

  heroVideoRef.value?.play().catch(() => {
    playHeroVideo.value = false
  })
})
</script>

<style scoped>
@keyframes amti-hero-in {
  from { opacity: 0; transform: translate3d(0, 1.75rem, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}

@keyframes amti-hero-zoom {
  from { transform: scale(1.03); }
  to { transform: scale(1.12); }
}

@keyframes amti-cue {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(0.4rem); opacity: 0.9; }
}

.hero-video {
  animation: amti-hero-zoom 32s ease-in-out infinite alternate;
}

.hero-vignette {
  background: radial-gradient(75% 60% at 50% 45%, transparent 0%, rgba(11, 18, 27, 0.3) 100%);
}

.hero-cue {
  animation: amti-cue 2.6s ease-in-out infinite;
}

@media (prefers-reduced-motion: no-preference) {
  .hero-seq > * {
    opacity: 0;
    animation: amti-hero-in 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .hero-seq > *:nth-child(1) { animation-delay: 80ms; }
  .hero-seq > *:nth-child(2) { animation-delay: 180ms; }
  .hero-seq > *:nth-child(3) { animation-delay: 280ms; }
  .hero-seq > *:nth-child(4) { animation-delay: 380ms; }
}

.value-row:hover {
  background: color-mix(in oklab, var(--ui-bg-muted) 60%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .hero-video,
  .hero-cue {
    animation: none;
  }
}
</style>
