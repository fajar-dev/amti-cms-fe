<template>
  <div
    ref="glowEl"
    class="h-full"
    @pointermove="onPointerMove"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <NuxtLink
      v-if="to"
      :to="to"
      class="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-default bg-default text-inherit no-underline cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-blue-950/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <span
        class="pointer-glow"
        aria-hidden="true"
      />

      <span
        class="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <slot />
    </NuxtLink>

    <div
      v-else
      class="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-default bg-default transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-blue-950/10"
    >
      <span
        class="pointer-glow"
        aria-hidden="true"
      />

      <span
        class="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  to?: string
}>()

const { glowEl, onPointerMove, onPointerEnter, onPointerLeave } = usePointerGlow()
</script>

<style scoped>
.pointer-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: var(--glow-opacity, 0);
  transition: opacity 400ms ease;
  background: radial-gradient(
    16rem circle at var(--glow-x, 50%) var(--glow-y, 50%),
    color-mix(in oklab, var(--ui-primary) 14%, transparent),
    transparent 72%
  );
}
</style>
