<template>
  <div>
    <section class="relative overflow-hidden">
      <SiteBackground
        pattern="grid"
        contour
      />

      <div class="relative mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8 lg:pt-36">
        <div class="grid items-center gap-14 lg:grid-cols-12">
          <div class="lg:col-span-6">
            <SiteReveal>
              <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-primary">
                <span
                  class="h-px w-10 bg-gradient-to-r from-transparent to-primary/70"
                  aria-hidden="true"
                />
                {{ $t('site.nav.eews') }}
              </p>
              <h1 class="mt-6 text-4xl font-bold tracking-tight text-highlighted sm:text-5xl lg:text-6xl">
                {{ $t('site.eews.title') }}
              </h1>
              <p class="mt-7 text-base leading-relaxed text-toned sm:text-lg">
                {{ $t('site.eews.body') }}
              </p>

              <div class="mt-10 flex flex-wrap items-center gap-3">
                <UButton
                  to="/#contact"
                  color="primary"
                  size="xl"
                  icon="i-lucide-mail"
                  class="rounded-full px-7 shadow-lg shadow-primary/20"
                  :label="$t('site.cta.talkToUs')"
                />
              </div>
            </SiteReveal>
          </div>

          <div class="lg:col-span-6">
            <SiteReveal :delay="120">
              <SiteFrame corners>
                <img
                  src="/amti/img/eews/buildings.webp"
                  alt=""
                  class="aspect-video w-full object-cover"
                >
              </SiteFrame>
            </SiteReveal>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-muted">
      <div class="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:space-y-24 lg:px-8 lg:py-24">
        <SiteEntryBlock
          v-for="(sector, index) in sectors"
          :key="sector.id"
          :image="sector.image"
          :title="sector.title"
          :tags="sector.tags"
          :copy="sector.copy"
          :actions="sector.actions"
          :index="index"
          :reverse="index % 2 === 1"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, tm } = useI18n()

interface SectorMeta {
  id: string
  image: string
  actionIcons: string[]
}

const sectorMetas: SectorMeta[] = [
  {
    id: 'buildings',
    image: '/amti/img/eews/buildings.webp',
    actionIcons: ['i-lucide-volume-2', 'i-lucide-power', 'i-lucide-door-open', 'i-lucide-unlock', 'i-lucide-octagon-pause']
  },
  {
    id: 'transportation',
    image: '/amti/img/eews/TRANSPORTATION.png',
    actionIcons: ['i-lucide-train-front', 'i-lucide-plane', 'i-lucide-signpost', 'i-lucide-bus']
  },
  {
    id: 'utilities',
    image: '/amti/img/eews/utilities.webp',
    actionIcons: ['i-lucide-gauge', 'i-lucide-shield', 'i-lucide-file-text', 'i-lucide-zap-off']
  },
  {
    id: 'oilGasChemicals',
    image: '/amti/img/eews/oil.webp',
    actionIcons: ['i-lucide-gauge', 'i-lucide-circle-slash', 'i-lucide-droplets', 'i-lucide-shield', 'i-lucide-file-text']
  },
  {
    id: 'mines',
    image: '/amti/img/eews/mines.webp',
    actionIcons: ['i-lucide-timer-off', 'i-lucide-truck', 'i-lucide-shield']
  }
]

function getMessageArray(key: string): string[] {
  const raw = (tm as (k: string) => unknown)(key)
  return Array.isArray(raw) ? (raw as unknown[]).map(String) : []
}

const sectors = computed(() => sectorMetas.map((meta) => {
  const tags = getMessageArray(`site.eews.sectors.${meta.id}.tags`)
  const actionLabels = getMessageArray(`site.eews.sectors.${meta.id}.actions`)

  return {
    id: meta.id,
    image: meta.image,
    title: (t as (k: string) => string)(`site.eews.sectors.${meta.id}.title`),
    tags,
    copy: (t as (k: string) => string)(`site.eews.sectors.${meta.id}.copy`),
    actions: actionLabels.map((label: string, idx: number) => ({
      label,
      icon: meta.actionIcons[idx] || 'i-lucide-check'
    }))
  }
}))

useSeoMeta({
  title: () => `${t('site.eews.title')} — ${t('site.identity.name')}`,
  description: () => t('site.eews.body').slice(0, 180),
  ogTitle: () => t('site.eews.title'),
  ogDescription: () => t('site.eews.body').slice(0, 180),
  ogType: 'website'
})
</script>
