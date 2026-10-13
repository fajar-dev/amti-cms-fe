<template>
  <article class="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
    <div
      class="lg:col-span-5"
      :class="reverse ? 'lg:order-2' : ''"
    >
      <SiteReveal>
        <SiteFrame corners>
          <div class="relative">
            <img
              :src="image"
              :alt="title"
              loading="lazy"
              class="aspect-video w-full object-cover"
            >
            <span
              class="absolute inset-0 bg-gradient-to-t from-blue-950/70 to-transparent"
              aria-hidden="true"
            />
            <span class="absolute bottom-4 left-5 text-5xl font-bold leading-none text-white sm:text-6xl">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>
        </SiteFrame>
      </SiteReveal>
    </div>

    <div class="lg:col-span-7">
      <SiteReveal :delay="100">
        <h2 class="text-2xl font-bold tracking-tight text-highlighted sm:text-3xl lg:text-4xl">
          {{ title }}
        </h2>

        <p
          v-if="tags?.length"
          class="mt-4 text-xs font-medium uppercase tracking-wider text-muted"
        >
          <template
            v-for="(tag, tagIndex) in tags"
            :key="tag"
          >
            <span>{{ tag }}</span>
            <span
              v-if="tagIndex < tags.length - 1"
              class="mx-2 text-primary/40"
            >|</span>
          </template>
        </p>

        <p
          v-if="copy"
          class="mt-6 text-sm leading-relaxed text-muted sm:text-base"
        >
          {{ copy }}
        </p>

        <ul
          v-if="actions?.length"
          class="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2"
        >
          <li
            v-for="action in actions"
            :key="action.label"
            class="flex items-start gap-3"
          >
            <span class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-amber-500/15 text-primary ring-1 ring-primary/10">
              <UIcon
                :name="action.icon"
                class="size-4"
              />
            </span>
            <span class="text-sm text-toned">{{ action.label }}</span>
          </li>
        </ul>
      </SiteReveal>
    </div>
  </article>
</template>

<script setup lang="ts">
export interface SiteEntryAction {
  label: string
  icon: string
}

defineProps<{
  image: string
  title: string
  index: number
  reverse?: boolean
  tags?: string[]
  copy?: string | null
  actions?: SiteEntryAction[]
}>()
</script>
