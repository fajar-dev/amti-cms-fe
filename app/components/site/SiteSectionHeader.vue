<template>
  <div :class="align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'">
    <p
      class="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-primary"
      :class="align === 'center' ? 'justify-center' : ''"
    >
      <span
        class="h-px w-10 bg-gradient-to-r from-transparent to-primary/70"
        aria-hidden="true"
      />
      {{ eyebrow }}
      <span
        v-if="align === 'center'"
        class="h-px w-10 bg-gradient-to-l from-transparent to-primary/70"
        aria-hidden="true"
      />
    </p>

    <h2 class="mt-5 text-3xl font-bold tracking-tight text-highlighted sm:text-4xl lg:text-5xl">
      {{ title }}
    </h2>

    <p
      v-if="body"
      class="mt-6 text-base leading-relaxed text-muted"
      :class="align === 'center' ? 'mx-auto' : ''"
    >
      {{ body }}
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow: string
  title: string
  body?: string
  align?: 'start' | 'center'
}>(), {
  body: '',
  align: 'start'
})
</script>
