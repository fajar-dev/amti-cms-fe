<template>
  <div>
    <section class="relative overflow-hidden">
      <SiteBackground
        pattern="lines"
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
                {{ $t('site.shms.label') }}
              </p>
              <h1 class="mt-6 text-4xl font-bold tracking-tight text-highlighted sm:text-5xl lg:text-6xl">
                {{ $t('site.shms.title') }}
              </h1>
              <p class="mt-7 text-base leading-relaxed text-toned sm:text-lg">
                {{ $t('site.shms.body') }}
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
                  src="/amti/img/shms/shms-title.png"
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
          v-for="(structure, index) in structures"
          :key="structure.id"
          :image="structure.image"
          :title="structure.title"
          :tags="structure.keywords"
          :copy="structure.copy"
          :index="index"
          :reverse="index % 2 === 1"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, tm, rt } = useI18n()

interface StructureMeta {
  id: string
  image: string
}

const structureMetas: StructureMeta[] = [
  { id: 'bridges', image: '/amti/img/shms/bridge.webp' },
  { id: 'buildings', image: '/amti/img/shms/building.webp' },
  { id: 'dam', image: '/amti/img/shms/dam.webp' },
  { id: 'landslide', image: '/amti/img/shms/landslide.webp' },
  { id: 'port', image: '/amti/img/shms/port.webp' },
  { id: 'railway', image: '/amti/img/shms/railway.webp' },
  { id: 'tunnels', image: '/amti/img/shms/tunnel.png' }
]

function getMessageArray(key: string): string[] {
  const raw = (tm as (k: string) => unknown)(key)
  if (!Array.isArray(raw)) return []
  return raw.map((item, index) => {
    if (typeof item === 'string') return item
    try {
      const resolved = (rt as (m: unknown) => string)(item)
      if (typeof resolved === 'string' && resolved && resolved !== '[object Object]') {
        return resolved
      }
    } catch {
      // fallback
    }
    try {
      const indexed = (t as (k: string) => string)(`${key}.${index}`)
      if (typeof indexed === 'string' && indexed && indexed !== `${key}.${index}`) {
        return indexed
      }
    } catch {
      // fallback
    }
    if (item && typeof item === 'object') {
      const obj = item as Record<string, unknown>
      if (typeof obj.source === 'string') return obj.source
      if (typeof obj.body === 'string') return obj.body
      if (typeof obj.static === 'string') return obj.static
    }
    return ''
  }).filter(Boolean)
}

const structures = computed(() => structureMetas.map((meta) => {
  const keywords = getMessageArray(`site.shms.structures.${meta.id}.keywords`)

  return {
    id: meta.id,
    image: meta.image,
    title: (t as (k: string) => string)(`site.shms.structures.${meta.id}.title`),
    keywords,
    copy: (t as (k: string) => string)(`site.shms.structures.${meta.id}.copy`)
  }
}))

useSeoMeta({
  title: () => `${t('site.shms.title')} — ${t('site.identity.name')}`,
  description: () => t('site.shms.body'),
  ogTitle: () => t('site.shms.title'),
  ogDescription: () => t('site.shms.body'),
  ogType: 'website'
})
</script>
